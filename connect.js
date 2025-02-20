let mysql= require("mysql");

let con= mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "college"
});

//  con.connect(function(err) {
  //  if (err) {
      //  console.error("Error connecting to the database: " + err.stack);
      //  return;
  //  }
  //  console.log("Connected !");
//  });
 
module.exports = con;