const express = require('express')
const utility = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')

const _filter = {pwd: 0, __v: 0}

Router.get('/list', function(req, res){
  // User.remove({}, function(e, d){})
  User.find({}, function(err, doc){
    return res.json(doc)
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