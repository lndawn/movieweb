//入口文件编码
var express=require('express')
var jade=require('jade')
var _=require('underscore')
var mongoose=require('mongoose')
var bodyParser=require('body-parser')
var cookieParser=require('cookie-parser')
var session=require('express-session')
var mongoStore=require('connect-mongo')(session)
var logger=require('morgan')
var static=require('serve-static')
var path=require('path')
var fs=require('fs')
var port=process.env.PORT || 3000
var app=express()
var dbUrl='mongodb://localhost/moviedb'
var db=mongoose.connect(dbUrl)
db.connection.on('open',function(){console.log('数据库连接成功')})
db.connection.on('error',function(err){console.log('数据库连接失败')})
var models_path=__dirname+'/app/models'
//通过mongoose.model获取模型
var walk=function(path){
  fs
    .readdirSync(path)
    .forEach(function(file){
      var newPath=path +'/'+ file
      var stat=fs.statSync(newPath)
      if(stat.isFile()){
        if(/(.*)\.(js|coffee)/.test(file)){
          require(newPath)
        }
      }
      else if(stat.isDirectory()){
        walk(newPath)
      }
    })
}
walk(models_path)
app.locals.moment=require('moment')
app.set('views','./app/views/pages') //设置实例和根目录
app.set('view engine','jade') //设置模板引擎
app.use(bodyParser.urlencoded({extended:true}))//表单数据的格式化
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
	secret:'imooc',
  resave:false,
  saveUninitialized:true,
	store: new mongoStore({
		url:dbUrl,
		collection:'sessions'
	})
}))
var env=express.env.NODE_ENV || 'development'
if ('development' === env) {
  app.set('showStackError', true)
  app.use(logger(':method :url :status'))
  app.locals.pretty = true
  //mongoose.set('debug', true)
}
app.use(static(path.join(__dirname,'public')))
require('./config/routes')(app)
app.listen(port)
console.log('imooc started on port' + port)