const handleProfile = (req, res, client) => {

    const currentUser = "shawon";

    client.query('SELECT "firstName","lastName","designation","email" FROM users WHERE username = $1', [currentUser], (err, results) => {
        if( err ) return res.status(400).json("Something Wrong !");
        res.status(200).json(results.rows);
    })
}

module.exports = {
    handleProfile: handleProfile
};