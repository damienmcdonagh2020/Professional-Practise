const express = require('express')
const app = express()
const port = 4000
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Finding this path
const path = require('path');
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));

const cors = require('cors');
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//mongodb+srv://admin:<password>@cluster0.8taek.mongodb.net/?retryWrites=true&w=majority
// getting-started.js
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.8taek.mongodb.net/?retryWrites=true&w=majority');
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

const jobSchema = new mongoose.Schema({
  name: String,
  profession: String,
  experience: String,
  price: Number
});

const jobModel = mongoose.model('fdgdfgdfgdfg', jobSchema);

app.post('/api/jobs',(req,res)=>{
  console.log(req.body);

  jobModel.create({
    name: req.body.name,
      profession: req.body.profession,
      experience: req.body.experience,
      price: req.body.price
  })
  
  res.send('Data Recieved');
})

app.get('/api/jobs', (req, res) => {
  jobModel.find((error, data)=>{
    res.json(data);
  })
})

app.get('/api/job/:id', (req, res)=>{
  console.log(req.params.id);
  jobModel.findById(req.params.id,(error,data)=>{
    res.json(data);
  })
})

app.put('/api/job/:id', (req, res)=>{
  console.log("Update: "+req.params.id);

 jobModel.findByIdAndUpdate(req.params.id, req.body, {new:true},
    (error,data)=>{
      res.send(data);
    })
})

app.delete('/api/job/:id',(req, res)=>{
  console.log('Deleting: '+req.params.id);
  jobModel.findByIdAndDelete({_id:req.params.id},(error,data)=>{
    res.send(data);
  })
})
//File is been send to this location
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/../build/index.html'));
  });
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})