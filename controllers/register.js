const handleRegister = (req, res, client, bcrypt) => {

    const { firstName, lastName, designation, username, password, email } = req.body;

    if (!firstName || !lastName || !designation || !username || !password || !email) {
        return res.status('400').json('incorrect from submission.');
    }

    const saltRounds = 10;

    client.query('BEGIN', err => {

        if (err) return res.status('400').json('Unable to register');

        const insertQuery = 'INSERT INTO users("firstName", "lastName", "designation", "username", "email", "role") VALUES($1, $2, $3, $4, $5, $6) RETURNING *';

        client.query(insertQuery, [firstName, lastName, designation, username, email, "user"], (err, resultAll) => {

            if (err) return res.status('400').json('Unable to register');

            bcrypt.hash(password, saltRounds, (err, hash) => {

                if (err) return res.status('400').json('Unable to register.');

                const queryText = 'INSERT INTO login("username", "email", "hash") VALUES ($1, $2, $3)';
                const insertValues = [username, resultAll.rows[0].email, hash];

                client.query(queryText, insertValues, (err, result) => {

                    if (err) return res.status('400').json('Unable to register');
                    client.query('COMMIT', err => {
                        if (err) return res.status('400').json('Error committing transaction');
                        res.status(200).json(resultAll.rows);
                    })
                })
            })
        })
    })
}

module.exports = {
    handleRegister: handleRegister
};

// INSERT INTO meeting("title", "meeting_type", "venue", "description","m_code", "s_time", "e_time",
// 				   "isFinished", "user_list")
// VALUES ("Dept Meeting", "LOl", "CSE dept", "Bla blaa blaa", "12ds2e", "'01-01-2017 10:2', 'DD-MM-YYYY SS:MS'", 
// 	   "'01-01-2017 10:2', 'DD-MM-YYYY SS:MS'", "TRUE", '{"shawon","Rakib"}');