const connection = require('../data/db');

function Index(req, res) {

    const sql = `SELECT * FROM main`

    connection.query(sql, (err, shows) => {
        if (err) res.status(500).json('Error internal server to Index controller', err)

        res.json(shows)
    })
}

function Show(req, res) {

    const { id } = req.params

    const sql = `SELECT * FROM main WHERE id_show = ?`

    connection.query(sql, [id], (err, show) => {
        if (err) res.status(500).json('Error internal server to Index controller', err)

        res.json(show)
    })
}

module.exports = { Index, Show }