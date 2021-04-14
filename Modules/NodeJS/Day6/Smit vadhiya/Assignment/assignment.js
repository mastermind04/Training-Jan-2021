const express = require('express');
const fs = require('fs');
const app = express();
var students =  require('./assignmentJSON/students.json')

app.use(express.json());

app.listen(3000, () => {
    console.log('3000 port is listening');
})

// 1) Create a RESTFUL API which will return a Studentlist.
//    http://localhost:3000/students

app.get('/students',(req,res) => {
    res.send(students)
})

// 2) Create RESTFUL API which will return a Particular Student Record
//    http://localhost:3000/students/1
app.get('/students/:id',(req,res) => {
    const myData = students.find((temp) => temp.ID == req.params.id); 
    if(!myData){
        res.status(404).send("<h1><h1>404 user not found</h1></h1>")
    }
    res.send(myData)
})


// 3) Create a RESTFUL API which return a particular student FEES Record. Fees field are 
//     http://localhost:3000/students/1/fees

app.get('/students/:id/fees',(req,res) => {
    const myData = students.find((temp) => temp.ID == req.params.id); 
    if(!myData){
        res.status(404).send("<h1><h1>404 user not found</h1></h1>")
    }
    res.send(myData.Fees)
})

// 4) Create a RESTFUL API which will return a particular student Exam Result. Result Fields are 
//    http://localhost:3000/students/1/result

app.get('/students/:id/result',(req,res) => {
    const myData = students.find((temp) => temp.ID == req.params.id); 
    if(!myData){
        res.status(404).send("<h1><h1>404 user not found</h1></h1>")
    }
    res.send(myData.Result)
})

// 5) Create a RESTFUL API which will update a result of result of student id 1. Update the marks for English Subject.
//    http://localhost:3000/students/1/:sub


app.put('/students/:id/eng/:marks',(req,res) => {
    const myData = students.find((temp) => temp.ID == req.params.id); 
    if(!myData){
        res.status(404).send("<h1><h1>404 user not found</h1></h1>")
    }
    const index = students.indexOf(myData)
    students[0].Result.Eng = 80
    fs.writeFile('./assignmentJSON/students.json',JSON.stringify(students), (err) => {
        if(err){
            console.log(err);
        }
    })
})