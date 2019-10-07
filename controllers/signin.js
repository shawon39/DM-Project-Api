const handleSignin = (req, res, client, bcrypt) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status('400').json('incorrect from submission.');
    }

    client.query("SELECT username, hash from login where username = $1", [username], (err, results) => {

        if (err) {
            return res.status('400').json('Username or Password is incorrect.');
        } else if (results.rows.length === 0) {
            return res.status('400').json('Username or Password is incorrect.');
        }

        var hash = results.rows[0].hash.toString();
        bcrypt.compare(password, hash, (err, result) => {
            if (err) {
                return res.status('400').json('Username or Password is incorrect.');
            } 
            if (result === true) {
                return res.status('200').json(results.rows[0].username);
            } else {
                return res.status('400').json('Username or Password is incorrect.');
            }
        });

    })
}

module.exports = {
    handleSignin: handleSignin
};