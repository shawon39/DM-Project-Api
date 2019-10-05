const handleRegister = (req, res, client, bcrypt) => {

    const { firstName, lastName, designation, username, password, email } = req.body;

    if (!firstName || !lastName || !designation || !username || !password || !email) {
        return res.status('400').json('incorrect from submission.');
    }

    const saltRounds = 10;

    client.query('BEGIN', err => {

        if (err) return res.status('400').json('Unable to register');

        const insertQuery = 'INSERT INTO users("firstName", "lastName", "designation", "username", "email") VALUES($1, $2, $3, $4, $5) RETURNING *';

        client.query(insertQuery, [firstName, lastName, designation, username, email], (err, resultAll) => {

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