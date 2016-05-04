//入口文件编码
var express=require('express')
var bodyParser=require('body-parser')
var path=require('path')
var port=process.env.PORT || 3000
var app=express()
app.set('views','./views/pages') //设置实例和根目录
app.set('view engine','jade') //设置模板引擎
app.use(bodyParser.urlencoded({extended:false}))//表单数据的格式化
app.use(express.static(path.join(__dirname,'bower_components')))
app.listen(port)
console.log('imooc started on port' + port)
//定义路由 index page
app.get('/',function(req,res){ //request,response
	res.render('index',{
		title:'imooc 首页',
		movies:[{
			title:'钢铁侠',
			_id:1,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			},{
			title:'钢铁侠',
			_id:2,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			},{
			title:'钢铁侠',
			_id:3,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			},{
			title:'钢铁侠',
			_id:4,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			},{
			title:'钢铁侠',
			_id:5,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			},{
			title:'钢铁侠',
			_id:6,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
		}]
	})
})
app.get('/movie/:id',function(req,res){ //request,response
	res.render('detail',{
		title:'imooc 详情页',
		movie:{
			doctor:'javan',
			country:'china',
			title:'钢铁侠',
			year:2014,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language:'chinese',
			flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			summary:'中国制造中国制造中国制造中国制造中国制造中国制造中国制造中国制造中国制造'
			}
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
app.get('/admin/list',function(req,res){ //request,response
	res.render('list',{
		title:'imooc 列表页',
		movies:[{
			_id:1,
			doctor:'javan',
			country:'china',
			title:'钢铁侠',
			year:2014,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language:'chinese',
			flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			summary:'中国制造中国制造中国制造中国制造中国制造中国制造中国制造中国制造中国制造'
			},{
			_id:2,
			doctor:'javan',
			country:'china',
			title:'钢铁侠',
			year:2014,
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language:'chinese',
			flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			summary:'中国制造中国制造中国制造中国制造中国制造中国制造中国制造中国制造中国制造'
		}]
	})
})