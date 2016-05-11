var mongoose=require('mongoose')
var bcrypt=require('bcryptjs') //密码的加密
var SALT_WORK_FACTOR=10
var UserSchema=new mongoose.Schema({
	name:{
		unique:true,
		type:String
	},
	password:String,
	//normal user 0
	//verified user 1
	//advanced user 2
	//admin >10
	//super admin >50
	role:{
		type:Number,
		default:0
	},
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})
//每次存储数据之前都要调用该方法
UserSchema.pre('save',function(next){
	//判断数据库中是否存在该数据
	var user=this
	if(this.isNew){
		this.meta.createAt=this.meta.updateAt=Date.now()
	}
	else{
		this.meta.updateAt=Date.now()
	}
	//生成随机的盐
	bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
		if(err) return next(err)
		bcrypt.hash(user.password,salt,function(err,hash){
			if(err) return next(err)
			user.password=hash
			next()
		})
	}) 
})
//实例方法
UserSchema.methods = {
  comparePassword: function(_password, cb) {
    bcrypt.compare(_password, this.password, function(err, isMatch) {
      if (err) return cb(err)

      cb(null, isMatch)
    })
  }
}
//静态方法不会被模式直接调用，必须经过模型调用
UserSchema.statics={
	fetch: function(cb){
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById:function(id,cb){
		return this
			.findOne({_id: id})
			.exec(cb)
	}
}

module.exports = UserSchema