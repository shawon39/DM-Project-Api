
const handleEditMeeting = (req, res, client) => {

    const m_code = "1f6mwr";
    client.query("SELECT title,meeting_type, venue, s_time, description, user_list, m_code from meeting where m_code = $1", [m_code], (err, results) => {
        if( err ) return res.status(400).json("Something Wrong !");
        res.status(200).json(results.rows);
    })
}

module.exports = {
    handleEditMeeting: handleEditMeeting
};  