const express = require('express')
const utility = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')

Router.get('/list', function(req, res){
  // User.remove({}, function(e, d){})
  User.find({}, function(err, doc){
    return res.json(doc)
  })
})

Router.post('/register', function(req, res){
  const { user, pwd, type } = req.body
  User.findOne({user}, function(err, doc){
    if (doc) {
      return res.json({code: 1, msg: '用户已存在'})
    }
    User.create({user, pwd: md5Pwd(pwd), type}, function(err, doc){
      if (err) {
        return res.json({code: 1, msg: '服务器出错'})
      }
      return res.json({code:0})
    })
  })
})

Router.get('/info', function(req, res){
  return res.json({code:1})
})

function md5Pwd(pwd){
  const salt = 'itisross_+*&^%()qweasd123456789'
  return utility.md5(utility.md5(pwd))
}

module.exports = Router