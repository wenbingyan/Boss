const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')
const model = require('./model')
const Chat = model.getModel('chat')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function(socket){
  socket.on('sendMsg', function(data){
    console.log('sendMsg',data)
    const { from, to, content} = data
    const chatid = [from, to].sort().join('_')
    Chat.create({chatid, from, to, content }, function(err, doc){
      io.emit('recvmsg', doc)
    })
  })
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)
server.listen(9093, function(){
  console.log('node app start at port 9093')
}) 