
const handleUpcomingMeeting = (req, res, client) => {

    const status = "upcoming";

    client.query("SELECT title,m_code, duration, s_time, user_list from meeting where m_status = $1", [status], (err, results) => {
        if( err ) return res.status(400).json("Something Wrong !");
        var lol = results.rows;

        for(var i=0; i<lol.length; i++) {
            lol[i].participants = results.rows[i].user_list.length;  
        }

        res.status(200).json(lol);
    })
}

module.exports = {
    handleUpcomingMeeting: handleUpcomingMeeting
};