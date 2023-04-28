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
// mongodb+srv://<username>:<password>@cluster0.v3ubqnx.mongodb.net/test
////mongodb+srv://admin:admin@cluster0.bya2oxm.mongodb.net/test
//mongodb+srv://admin:<password>@cluster0.8taek.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://admin:admin@cluster0.bya2oxm.mongodb.net/test
//Old Code
 //getting-started.js
//  const mongoose = require('mongoose');
//  main().catch(err => console.log(err));
//  async function main() {
//   //await 
//   mongoose.connect('mongodb+srv://admin:admin@cluster0.8taek.mongodb.net/test');
//   await mongoose.connect('mongodb+srv://admin:admin@cluster0.8taek.mongodb.net/?retryWrites=true&w=majority');
//    //use `await mongoose.connect('mongodb://user:password@localhost:27017/test');//` if your database has auth enabled
// const mongoose = require('mongoose');
// main().catch(err => console.log(err));
// async function main() {
//   await mongoose.connect('mongodb+srv://admin:admin@cluster0.8taek.mongodb.net/?retryWrites=true&w=majority');
//   // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
// }


const mongoose = require('mongoose');

main().catch(err => console.log(err));
//Reading in the mongodb with Damo as username(my name) and admin as password
async function main() {
  await mongoose.connect('mongodb+srv://Damo:admin@damodatabase.cefelej.mongodb.net/?retryWrites=true&w=majority');
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

//New MongoDB
// const mongoose = require('mongoose');

// async function connect() {
//   try {
//     await mongoose.connect('mongodb+srv://admin:admin@cluster0.8taek.mongodb.net/test', {
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false
//     });
//     console.log('MongoDB Connected...');
//   } catch (error) {
//     console.error(error.message);
//     process.exit(1);
//   }
// }

//connect();

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
