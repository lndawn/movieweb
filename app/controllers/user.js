var mongoose=require('mongoose')
var User=require('../models/user')
//提交用户注册表
exports.signup=function(req,res){
	var _user=req.body.user
	User.findOne({name:_user.name},function(err,user){
		if(err){
			console.log(err)
		}
		if(user){
			return res.redirect('/signin')
		}
		else{
			var user=new User(_user)
			user.save(function(err,user){
				if(err){
					console.log(err)
				}
				req.session.user=user
				res.redirect('/')
			})
		}
	})
}
exports.signin=function(req,res){
	var _user=req.body.user
	var name=_user.name
	var password=_user.password
	User.findOne({name:name},function(err,user){
		if(err){
			console.log(err)
		}
		if(!user){
			return res.redirect('/signup')
		}
		user.comparePassword(password,function(err,isMatch){
			if(err){
				console.log(err)
			}
			if(isMatch){
				req.session.user=user
				return res.redirect('/')
			}
			else{
				return res.redirect('/signin')
			}
		})
	})
}
exports.showSignup=function(req,res){
	res.render('signup',{
		title:'注册页面'
	})
}
exports.showSignin=function(req,res){
	res.render('signin',{
		title:'登录页面'
	})
}
exports.logout=function(req,res){
	delete req.session.user
	res.redirect('/')
}
exports.list=function(req,res){ //request,response
	User.fetch(function(err,users){
		if(err){
			console.log(err)
		}
		res.render('userlist',{
			title:'imooc 列表页',
			users:users
		})
	})	
}
//登录中间件
exports.signinRequired=function(req,res,next){
	var user=req.session.user
	if(!user){
		return res.redirect('/signin')
	}
	next()
}
//管理员中间件
exports.adminRequired=function(req,res,next){
	var user=req.session.user
	if(user.role<=10){
		return res.redirect('/signin')
	}
	console.log(user.role)
	next()
}