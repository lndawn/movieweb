var mongoose=require('mongoose')
var Schema=mongoose.Schema
var ObjectId=Schema.Types.ObjectId
var MovieSchema=new Schema({
	doctor:String,
	title:String,
	language:String,
	country:String,
	summary:String,
	flash:String,
	poster:String,
	year:String,//视频中是number
	pv:{type:Number,default:0},
	category:{type:ObjectId,ref:'Category'},//既可以存储成string类型也可以存储成Object类型，在此推荐使用Object类型,双向映射
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
MovieSchema.pre('save',function(next){
	//判断数据库中是否存在该数据
	if(this.isNew){
		this.meta.createAt=this.meta.updateAt=Date.now()
	}
	else{
		this.meta.updateAt=Date.now()
	}
	next()
})
//静态方法不会被模式直接调用，必须经过模型调用
MovieSchema.statics={
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

module.exports = MovieSchema