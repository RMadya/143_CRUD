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
//api post: tambah data
app.post('/api/mahasiswa', (req, res) => {
    const { nama, alamat, agama } = req.body;

    if (!nama || !alamat || !agama) {
        return res.status(400).json({ message: "Nama, alamat, dan agama harus diisi." })
    }

    db.query(
        "INSERT INTO biodata (nama, alamat, agama) VALUES (?, ?, ?)",
        [nama, alamat, agama],
        (err, result) => {
            if (err) {
                console.error("Error inserting data: ", err);
            }
            res.status(201).json({ message: "User create successfully" });
        }
    );
});

app.delete("/api/mahasiswa/:id", (req, res) => {
    const userId = req.params.id;
    db.query("DELETE FROM biodata WHERE id = ?", [userId], (err, results) => {
        if (err) {
            console.error("Error deleting data: ", err);
            return res.status(500).json({ message: "Database Error" });
        }
        res.json({ message: "User deletedc successfuly" });
    });
});
