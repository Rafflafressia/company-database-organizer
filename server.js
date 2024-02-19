const express = require("express");
const mysql = require ("mysql2");

const PORT = process.env.PORT || 3001; 
const app = express();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: ' ',
        databse: 'employee_db'
    }
);

app.use((req, res) => {
    res.status(404).end();
  });
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
  