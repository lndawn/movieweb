var Index=require('../app/controllers/index')
var User=require('../app/controllers/user')
var Movie=require('../app/controllers/movie')
module.exports=function(app){
	//对用户信息预处理
	app.use(function(req,res,next){
		var _user=req.session.user
		if(_user){
			app.locals.user=_user
		}
		next()
	})
	//index
	app.get('/',Index.index)
	//User
	app.post('/user/signup',User.signup)
	app.post('/user/signin',User.signin)
	app.get('/signin',User.showSignin)
	app.get('/signup',User.showSignup)
	app.get('/logout',User.logout)
	app.get('/admin/user/list',User.signinRequired,User.adminRequired,User.list)
	//Movie
	app.get('/movie/:id',Movie.detail)
	app.get('/admin/movie/new',User.signinRequired,User.adminRequired,Movie.new)
	app.get('/admin/update/:id',User.signinRequired,User.adminRequired,Movie.update)
	app.post('/admin/movie',User.signinRequired,User.adminRequired,Movie.save)
	app.get('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.list)
	app.delete('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.del)
}