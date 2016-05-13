//入口文件编码
var express=require('express')
var jade=require('jade')
var _=require('underscore')
var mongoose=require('mongoose')
//var connect=require('connect')
//var session=require('express-session')
var mongoStore=require('connect-mongo')(express)
var bodyParser=require('body-parser')
var path=require('path')
var port=process.env.PORT || 3000
var app=express()
var dbUrl='mongodb://localhost/moviedb'
var db=mongoose.connect(dbUrl)
db.connection.on('open',function(){console.log('数据库连接成功')})
db.connection.on('error',function(err){console.log('数据库连接失败')})
app.locals.moment=require('moment')
app.set('views','./app/views/pages') //设置实例和根目录
app.set('view engine','jade') //设置模板引擎
app.use(bodyParser.urlencoded({extended:true}))//表单数据的格式化
app.use(bodyParser.json())
app.use(express.cookieParser())
app.use(express.multipart())
app.use(express.session({
	secret:'imooc',
	store: new mongoStore({
		url:dbUrl,
		collection:'sessions'
	})
}))
if ('development' === app.get('env')) {
  app.set('showStackError', true)
 // app.use(express.logger(':method :url :status'))
  app.locals.pretty = true
  //mongoose.set('debug', true)
}
app.use(express.static(path.join(__dirname,'public')))
require('./config/routes')(app)
app.listen(port)
console.log('imooc started on port' + port)