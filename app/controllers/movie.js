var _=require('underscore')
var mongoose=require('mongoose')
var Movie=require('../models/movie')
var Comment=require('../models/comment')
var Category=require('../models/category')
exports.detail=function(req,res){ //request,response
	var id=req.params.id
	Movie.findById(id,function(err,movie){
		//callback
		Comment
			.find({movie:id})
			.populate('from','name')
			.populate('reply.from reply.to','name')
			.exec(function(err,comments){
				res.render('detail',{
					title:"imooc 详情页",
					movie:movie,
					comments:comments
			})
		})
	})
}
exports.new=function(req,res){ //request,response
	Category.find({},function(err,categories){
		res.render('admin',{ //url和样式模板
			title:'imooc 后台录入页',
			categories:categories,
			movie:{}
		}) 
	})
}
exports.update=function(req,res){
	var id=req.params.id
	if(id){
		Movie.findById(id,function(err,movie){
			Category.find({},function(err,categories){
				res.render('admin',{
					title:'imooc 后台更新页',
					movie:movie,
					categories:categories
				})
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
	var id=req.body.movie._id
	var movieObj=req.body.movie
	var _movie
	if(id){
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
		_movie=new Movie(movieObj)
		var categoryId=_movie.category
		console.log(movieObj)
		_movie.save(function(err,movie){
			if(err){
				console.log(err)
			}
			Category.findById(categoryId,function(err,category){
				console.log(_movie)
				category.movies.push(movie._id)
				category.save(function(err,category){
					res.redirect('/movie/'+movie._id)
				})
			})
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