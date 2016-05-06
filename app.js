//入口文件编码
var express=require('express')
var jade=require('jade')
var _=require('underscore')
var mongoose=require('mongoose')
var Movie=require('./models/movie')
var bodyParser=require('body-parser')
var path=require('path')
var port=process.env.PORT || 3000
var app=express()
app.locals.moment=require('moment')
app.set('views','./views/pages') //设置实例和根目录
app.set('view engine','jade') //设置模板引擎
app.use(bodyParser.urlencoded({extended:true}))//表单数据的格式化
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'public')))
var db=mongoose.connect('mongodb://localhost/moviedb')
db.connection.on('open',function(){console.log('数据库连接成功')})
db.connection.on('error',function(err){console.log('数据库连接失败')})
app.listen(port)
console.log('imooc started on port' + port)
//定义路由 index page
app.get('/',function(req,res){ //request,response
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err);
		}
		res.render('index',{
			title:'imooc 首页',
			movies:movies
		})
	})
})
app.get('/movie/:id',function(req,res){ //request,response
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
})
app.get('/admin/movie',function(req,res){ //request,response
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
})
app.get('/admin/update/:id',function(req,res){
	var id=req.params.id
	if(id){
		Movie.findById(id,function(err,movie){
			res.render('admin',{
				title:'imooc 后台更新页',
				movie:movie
			})
		})
	}
})
//删除路由
app.delete('/admin/list',function(req,res){
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
})
app.post('/admin/movie/new',function(req,res){
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
})
app.get('/admin/list',function(req,res){ //request,response
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('list',{
			title:'imooc 列表页',
			movies:movies
		})
	})
})