
const handleEditProfile = ( req, res, client ) => {

    const { firstName, lastName, designation, email } = req.body;
    const currentUser = 'shawon8';

    client.query('UPDATE users SET "firstName"=$1, "lastName"=$2, "designation"=$3, "email"=$4 WHERE username=$5 RETURNING *',[firstName,lastName,designation,email,currentUser], (err, results) => {
        if (err) return res.status('400').json('Unable to update profile.');
        res.status(200).json(results.rows);
    })

}

module.exports = { 
    handleEditProfile : handleEditProfile 
}