const connection = require("../data/db.js");

//Index
function index(req, res) {
    const sql = `
        SELECT *
        FROM comments
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ message: err.message });
        };
        res.json(results);
    });
};


module.exports = { index }