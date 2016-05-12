var mongoose=require('mongoose')
var Movie=require('../models/movie')
var Category=require('../models/category')
//定义路由 index page
exports.index=function(req,res){ //request,response
	Category
    .find({})
    .populate({path:'movies',options:{limit:5}})
    .exec(function(err,categories){
      if(err){
      console.log(err);
      }
      res.render('index',{
        title:'imooc 首页',
        categories:categories
      })
    })
}
