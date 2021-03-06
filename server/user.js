const express = require('express')
const utility = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')

const _filter = {pwd: 0, __v: 0}

Router.post('/readmsg', function(req, res){
  const {userid} = req.cookies
  const {from} = req.body
  Chat.update(
    {from,to: userid},
    {'$set': {read: true}},
    {'multi': true},
    function(err, doc){
      console.log(doc)
      if(!err) {
        return res.json({code: 0, num: doc.nModified})
      }
      return res.json({code: 1, msg: '更新失败'})
    }
  )
})

Router.get('/getmsglist', function(req, res){
  const {userid} = req.cookies
  User.find({}, function(err, userdoc){
    let users = {}
    userdoc.forEach(v=>{
      users[v._id] = {name: v.user, avatar: v.avatar}
    })
    Chat.find({'$or': [{from: userid}, {to: userid}]}, function(err,doc){
      if (!err) {
        return res.json({code: 0, msgs: doc, users: users})
      }
    })
  })
})

Router.get('/delete', function(req,res){
  Chat.remove({}, function(e, d){})
  return res.json({code:0})
})

Router.get('/list', function(req, res){
  // User.remove({}, function(e, d){})
  const { type } = req.query
  const seach = type ? {type} : {}
  User.find(seach, _filter, function(err, doc){
    if(err){
      return res.json({code:1, msg: '服务器出错'})
    }
    return res.json({code:0, data:doc})
  })
})

Router.post('/update', function(req, res){
  const {userid} = req.cookies
  if(!userid){
    return json.dumps({code: 1})
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, function(err, doc){
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    },body)
    return res.json({code: 0, data})
  })
})

Router.post('/login', function(req, res){
  const { user, pwd } = req.body
  User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function(err, doc){
    if (!doc) {
      return res.json({code: 1, msg: '账号密码错误'})
    }
    res.cookie('userid', doc._id)
    return res.json({code:0, data: doc})
  })
})

Router.post('/register', function(req, res){
  const { user, pwd, type } = req.body
  User.findOne({user}, function(err, doc){
    if (doc) {
      return res.json({code: 1, msg: '用户已存在'})
    }
    const userModel = new User({ user, type, pwd: md5Pwd(pwd) })
    userModel.save(function(err, doc){
      if(err) {
        return res.json({code: 1, msg: '服务器出错'})
      }
      const { user, type, _id} = doc
      res.cookie('userid', _id)
      return res.json({code: 0, data: { user, type, _id}})
    })
  })
})

Router.get('/info', function(req, res){
  const {userid} = req.cookies
  if (!userid) {
    return res.json({code:1})
  }
  User.findOne({_id: userid}, _filter, function(err, doc){
    if (err) {
      return res.json({code:1, msg: '服务器出错'})
    }
    if (doc) {
      return res.json({code:0, data: doc})
    }
  })
})

function md5Pwd(pwd){
  const salt = 'itisross_+*&^%()qweasd123456789'
  return utility.md5(utility.md5(pwd))
}

module.exports = Router