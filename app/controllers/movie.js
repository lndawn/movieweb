var _=require('underscore')
var mongoose=require('mongoose')
var Movie=require('../models/movie')
exports.detail=function(req,res){ //request,response
	var id=req.params.id
	Movie.findById(id,function(err,movie){
		if(err){
			console.log(err)
		}
		res.render('detail',{
			title:"imooc 详情页",
			movie:movie
		})
	})
}
exports.new=function(req,res){ //request,response
	res.render('admin',{ //url和样式模板
		title:'imooc 后台录入页',
		movie:{
			doctor:'',
			country:'',
			title:'',
			year:'',
			poster:'',
			language:'',
			flash:'',
			summary:''
		}
	}) 
}
exports.update=function(req,res){
	var id=req.params.id
	if(id){
		Movie.findById(id,function(err,movie){
			res.render('admin',{
				title:'imooc 后台更新页',
				movie:movie
			})
		})
	}
}
//删除路由
exports.del=function(req,res){
	var id=req.query.id
	if(id){
		Movie.remove({_id: id},function(err,movie){
			if(err){
				console.log(err)
			}
			else{
				res.json({success:1})
			}
		})
	}
}
exports.save=function(req,res){
	console.log(req.body)
	console.log(req.body.movie)
	var id=req.body.movie._id
	var movieObj=req.body.movie
	var _movie
	if(id !== undefined){
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err)
			}
			_movie=_.extend(movie,movieObj)
			_movie.save(function(err,movie){
				if(err){
					console.log(err)
				}
				res.redirect('/movie/'+movie._id)
			})
		})
	}else{
		_movie=new Movie({
			doctor:movieObj.doctor,
			title:movieObj.title,
			language:movieObj.language,
			country:movieObj.country,
			year:movieObj.year,
			poster:movieObj.poster,
			flash:movieObj.flash,
			summary:movieObj.summary
		})
		_movie.save(function(err,movie){
			if(err){
				console.log(err)
			}
			res.redirect('/movie/'+movie._id)
		})
	}
}
exports.list=function(req,res){ //request,response
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('list',{
			title:'imooc 列表页',
			movies:movies
		})
	})
}