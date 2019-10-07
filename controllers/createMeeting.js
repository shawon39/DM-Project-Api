const handleCreateMeeting = (req, res, client) => {

    const { title, meeting_type, venue, description, m_code, s_time, m_status, user_list } = req.body;
    //console.log(title, meeting_type, venue, description, m_code, s_time, m_status, user_list);

    if (!title || !meeting_type || !venue || !description || !m_code ) {
        return res.status('400').json('incorrect from submission.');
    }

    const insertQuery = 'INSERT INTO meeting("title", "meeting_type", "venue", "description", "m_code", "s_time", "m_status", "user_list") VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
    const insertValues = [title, meeting_type, venue, description, m_code, s_time, m_status, user_list];

    client.query(insertQuery, insertValues, (err, results) => {
        if (err) return res.status('400').json('Unable to create meeting.');
        res.status(200).json(results.rows);
    })
}

module.exports = {
    handleCreateMeeting: handleCreateMeeting
};