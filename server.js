
var mongoose = require('mongoose');
const express=require('express');
const app=express()
const path=require('path');
const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended:true}))

var Message = mongoose.model('Message',{
    message : String
  })

const url='mongodb://localhost:27017/chatdb';


const server=app.listen(3000,()=>{
    console.log("listening");
})

app.set("view engine","ejs")

app.use(express.static('public'))

app.get('/',(req,res)=>{
res.render('index')

})

const io=require('socket.io')(server)

  app.get('/messages', (req, res) => {
    Message.find({},(err, messages)=> {
      res.send(messages);
    })
  })
  
  app.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save((err) =>{
      if(err)
        sendStatus(500);
      io.emit('message', req.body);
      res.sendStatus(200);
    })
  })



  mongoose.connect(url ,{useUnifiedTopology: true},(err) => {
    console.log('mongodb connected',err);
  })

  io.on('connection', () =>{
    console.log('a user is connected')
  })

