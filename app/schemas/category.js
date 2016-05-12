var mongoose=require('mongoose')
var Schema=mongoose.Schema
var ObjectId=Schema.Types.ObjectId
var CategorySchema=new Schema({
  name:String,
  movies:[{type:ObjectId,ref:'Movie'}],
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
CategorySchema.pre('save',function(next){
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
CategorySchema.statics={
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

module.exports = CategorySchema