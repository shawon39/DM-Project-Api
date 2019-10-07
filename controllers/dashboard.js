
 let pre,cur,post, recent;

const handleDashboard = (req, res, client) => {

    client.query("SELECT COUNT(*) from meeting where m_status = $1", ["past"], (err, results) => {
        if( err ) return res.status(400).json("Something Wrong !");
        pre = results.rows[0].count;
    });

    client.query("SELECT COUNT(*) from meeting where m_status = $1", ["running"], (err, results) => {
        if( err ) return res.status(400).json("Something Wrong !");
        cur = results.rows[0].count;
    });

    client.query("SELECT COUNT(*) from meeting where m_status = $1", ["upcoming"], (err, results) => {
        if( err ) return res.status(400).json("Something Wrong !");
        post = results.rows[0].count;
    });

    // it will be e_time ! 
    client.query("SELECT s_time from meeting where m_status = $1 ORDER BY s_time DESC LIMIT 1",["past"], (err, results) => {
        if( err ) return res.status(400).json("Something Wrong !");
        recent = results.rows[0].s_time;
    });

    const status = "upcoming";

    client.query("SELECT title,m_code, duration, s_time, user_list from meeting where m_status = $1", [status], (err, results) => {
        if( err ) return res.status(400).json("Something Wrong !");
        var lol = results.rows;

        for(var i=0; i<lol.length; i++) {
            lol[i].participants = results.rows[i].user_list.length;  
        }
        lol.push({ previous: pre, running: cur, upcoming: post, recent_meeting: recent });
        res.status(200).json(lol);
    })
}

module.exports = {
    handleDashboard: handleDashboard
};