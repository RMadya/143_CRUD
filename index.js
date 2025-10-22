const express = require("express");
let mysql = require("mysql2");
const app = express();
const PORT = 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//route utama
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port.${PORT}`);
});
//confDB
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ragehaste90!',
    database: 'mahasiswa',
    port: 3309
});
//cekconDB
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected Sussessfully');
});
//apiget:ambil semua data
app.get('/api/mahasiswa', (req, res) => {
    db.query('SELECT * from biodata', (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).send('Error fetching mahasiswa');
            return;
        }
        res.json(results);
    });
});


