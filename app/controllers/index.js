var mongoose=require('mongoose')
var Movie=require('../models/movie')
//定义路由 index page
exports.index=function(req,res){ //request,response
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err);
		}
		res.render('index',{
			title:'imooc 首页',
			movies:movies
		})
	})
}
