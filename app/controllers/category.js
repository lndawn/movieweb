var _=require('underscore')
var mongoose=require('mongoose')
var Movie=require('../models/movie')
var Category=require('../models/category')
exports.new=function(req,res){ //request,response
  res.render('categoryadmin',{ //url和样式模板
    title:'imooc 后台分类录入页',
    category:{}
  }) 
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
  var _category=req.body.category
  var category=new Category(_category)
  category.save(function(err,movie){
    if(err){
      console.log(err)
    }
    res.redirect('/admin/category/list')
  })
}
exports.list=function(req,res){ //request,response
  Category .fetch(function(err,categories){
    if(err){
      console.log(err)
    }
    res.render('categorylist',{
      title:'imooc 列表页',
      categories:categories
    })
  })
}