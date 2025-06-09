const connection = require("../data/db.js")

//Index
function index(req, res) {
    const { city } = req.query

    let sql = `SELECT * FROM comments WHERE city = ?`

    connection.query(sql, city, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        }
        res.json(results)
    })
}

//Store
function store(req, res) {
    const { username, text } = req.body

    const city = "Rome"
    const date = new Date().toISOString().split("T")[0]

    const sql = `INSERT INTO comments (username, city, date, text) VALUES (?, ?, ?, ?)`

    connection.query(sql, [username, city, date, text], (err, results) => {
        if (err) {
            res.status(500).json({ message: err.message })
        }

        res.status(201).json({ message: "Comment added" })
    })
}


module.exports = { index, store }