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
app.use(cors({ origin: '*' }));

const mongoose = require('mongoose');

main().catch(err => console.log(err));
//Reading in the mongodb with Damo as username(my name) and admin as password
async function main() {
  await mongoose.connect('mongodb+srv://Damo:admin@damodatabase.cefelej.mongodb.net/?retryWrites=true&w=majority');
}

const jobSchema = new mongoose.Schema({
  name: String,
  profession: String,
  location: String, 
  price: String,      
  number: String,
});


const jobModel = mongoose.model('fdgdfgdfgdfg', jobSchema);

//User Login
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

const userModel = mongoose.model('User', userSchema);

app.post('/api/jobs',(req,res)=>{
  console.log(req.body);

  jobModel.create({
    name: req.body.name,
      profession: req.body.profession,
      experience: req.body.experience,
      location: req.body.location,
      price: req.body.price,
      number: req.body.number
  })
  
  res.send('Data Recieved');
})

// Modify  /api/jobs route to handle profession search
app.get('/api/jobs', (req, res) => {
   // Get the profession from query parameter
  const { profession } = req.query;

  // If a profession is provided, filter jobs by profession, else return all jobs
  const filter = profession ? { profession } : {};

  jobModel.find(filter, (error, data) => {
    if (error) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(data);
    }
  });
});


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

//Users
app.post('/api/register', (req, res) => {
  const { username, password, email } = req.body;

  userModel.create({
    username,
    password, 
    email,
  }, (error, user) => {
    if (error) {
      res.status(500).json({ error: 'Registration failed' });
    } else {
      res.status(201).json({ message: 'Registration successful' });
    }
  });
});

// //Log in
 app.post('/api/login', (req, res) => {
   const { username, password } = req.body;

   userModel.findOne({ username, password }, (error, user) => {
     if (error) {
       res.status(500).json({ error: 'Login failed' });
     } else if (!user) {
       res.status(401).json({ error: 'Invalid credentials' });
     } else {
       res.status(200).json({ message: 'Login successful' });
     }
   });
 });

//File is been send to this location
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/../build/index.html'));
  });
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
