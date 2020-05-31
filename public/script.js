

 var socket = io();
  socket.on('message', addMessages)

$(() => {
    $("#send").click(()=>{
       sendMessage({
          message:$("#message").val()});
        })
      getMessages()
    })
    
function addMessages(message){
   $('#messages').append(`
      
      <p>  ${message.message} </p>`)
   }
   
function getMessages(){
  $.get('http://localhost:3000/messages', (data) => {
   data.forEach(addMessages);
   })
 }
 
function sendMessage(message){
   $.post('http://localhost:3000/messages', message)
 }
