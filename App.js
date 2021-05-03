var express=require('express')
var app = express();
var http = require('http').createServer(app);
var PORT=process.env.PORT || 3000
var io = require('socket.io')(http);

app.use(express.static(__dirname +'/public'))

app.get('/', function(req, res) {
   res.sendFile(__dirname+'/index.html');
});
http.listen(PORT, function() {
    console.log(`listening on *:${PORT}`);
 });

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
   console.log('A user connected');
   socket.on('message',(msg)=>{
      socket.broadcast.emit('message',msg)
      console.log(msg)
   })
});

