const con= require("./connect");
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const path = require('path');


// app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Set up the public folder to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up the views folder and the view engine (EJS in this example)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// A simple route to render a view
// app.get('/', (req, res) => {
//   res.render('index'); 
// });

app.get("/login",function(req, res){
    res.render("student_reg");
});

app.post("/login", function(req, res){
    const fname = req.body.fname;
    const lname = req.body.lname;
    const regNo = req.body.regNo;
    const address = req.body.address;
    const branchId = req.body.branchId;
    const gender = req.body.gender;
    const mno = req.body.mobile;
    const email = req.body.email;
    const degreeId = req.body.degreeId;
    const status = req.body.status;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword; 
    const year = req.body.year;

    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }

    bcrypt.hash(password, 10, function (err, hashedPassword) { 
        if (err) {
            console.error(err);
            return res.status(500).send('Error hashing password');
        }

    // console.log(req.body);
    con.connect(function(err){
        if(err) throw err;

        const sql= "INSERT INTO students(fname, lname, regNo, address, branchId, gender, mno, email, status, password, year, degreeId) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        con.query(sql,[fname, lname, regNo, address, branchId, gender, mno, email, status, hashedPassword, year, degreeId],function(err,result){
            if(err) throw err;
            console.log("student registration successful");
            return res.send('student registration successful');
             });
        });
    });
});

app.listen(5550, () => {
    console.log("Server running on http://localhost:5550");
});
