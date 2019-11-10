
const handleAllMeeting = (req, res, client) => {

    const status = "running", status2 = "past", status3 = "upcoming";

    client.query("SELECT title,m_code, duration, s_time, user_list from meeting where (m_status = $1 OR m_status = $2 OR  m_status = $3)", [status,status2,status3], (err, results) => {
        if( err ) return res.status(400).json("Something Wrong !");
        var lol = results.rows;

        for(var i=0; i<lol.length; i++) {
            lol[i].participants = results.rows[i].user_list.length;  
        }

        res.status(200).json(lol);
    })
}

module.exports = {
    handleAllMeeting: handleAllMeeting
};