const express = require('express')
const path = require('path');
const { Student, Campus } = require('./db');

//create the app
const app = express()
// static middleware & json middleware (give you access to req.body)
app.use('/public', express.static(path.join(__dirname, '../public')))
app.use(express.json())

//routing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
}); 

app.get('/api',(req,res)=>{
  res.send('../public/index.html')
})

//get
app.get('/api/students', async(req,res,next)=> {
  try{
    res.send(await Student.findAll({
      include: Campus
    }));
  }
  catch(ex){
    next(ex)
  }
})

app.get('/api/campuses', async(req,res,next)=> {
  try{
    res.send(await Campus.findAll({
      include:Student //only needs [] when multiple things
    }));
  }
  catch(ex){
    next(ex)
  }
})

app.get('/api/students/:studentId', async(req,res,next)=> {
  try{
    const student = await Student.findByPk(req.params.studentId);//,{include:Campus} delete for update 
    if(!student){
      return res.sendStatus(404) 
      }
    res.send(student);
  }
  catch(ex){
    next(ex)
  }
})

app.get('/api/campuses/:campusId', async(req,res,next)=> {
  try{
    const campus = await Campus.findByPk(req.params.campusId); //include student for initial getting, but delete for updating : ,{include:Student}
    console.log(campus)
    if(!campus){
      return res.sendStatus(404)  
      }
    res.send(campus);
  }
  catch(ex){
    next(ex)
  }
})

app.get('/api/campuses/:campusId/students', async(req,res,next)=> {
  try{
    const campus = await Campus.findByPk(req.params.campusId);
    if(!campus){
      return res.sendStatus(404)  
      }
    const students = await Student.findAll({
      where:{
        campusId:req.params.campusId
      },
      include:[Campus]
    })
    res.send(students);
  }
  catch(ex){
    next(ex)
  }
})

//update
app.put('/api/students/:studentId', async(req,res,next)=> {
  try{
    if(!Number(req.params.studentId)){
      return res.sendStatus(400) 
      }
    const student = await Student.findByPk(req.params.studentId);
    if(!student){
      return res.sendStatus(404) //must return
      }
    await student.update(req.body);
    res.send(student);
  }
  catch(ex){
    next(ex)
  }
})

app.put('/api/campuses/:campusId', async(req,res,next)=> {
  try{
    if(!Number(req.params.campusId)){
      return res.sendStatus(400) 
      }
    const campus = await Campus.findByPk(req.params.campusId);
    if(!campus){
      return res.sendStatus(404)  
      }
    await campus.update(req.body);
    res.send(campus);
  }
  catch(ex){
    next(ex)
  }
})

//post
app.post('/api/students', async(req, res, next)=> {
  try {
    res.send(await Student.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/campuses', async(req, res, next)=> {
  try {
    res.status(201).send(await Campus.create(req.body));
  }catch(ex){
    next(ex);
  }
});

//delete
app.delete('/api/students/:id', async(req, res, next)=> {
  try {
    if(!Number(req.params.id)){
      return res.sendStatus(400) 
      }
    
    const student = await Student.findByPk(req.params.id);
    
    if(!student){
      return res.sendStatus(404) //must return
      }
    
    await student.destroy();
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/campuses/:id', async(req, res, next)=> {
  try {
    if(!Number(req.params.id)){
      return res.sendStatus(400) 
      }
    const campus = await Campus.findByPk(req.params.id);
    
    if(!campus){
        return res.sendStatus(404) //must return
        }
      
    await campus.destroy();
    res.sendStatus(204);
  }
  catch(ex){
  next(ex);
  }
});

//export
module.exports = app;

