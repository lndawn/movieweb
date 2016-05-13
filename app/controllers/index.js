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
exports.search=function(req,res){ //request,response
  var catId=req.query.cat
  var page=parseInt(req.query.p)
  var count=2
  var index=page*count
  Category
    .find({_id:catId})
    .populate({
      path:'movies',
      select:'title poster',
     // options:{limit:2,skip:index} mongoose不支持skip参数查找
    })
    .exec(function(err,categories){
      if(err){
      console.log(err);
      }
      var category=categories[0] || {}
      var movies=category.movies || []
      var results=movies.slice(index,index+count)
      res.render('results',{
        title:'imooc 结果列表页面',
        keyword:category.name,
        currentPage:(page+1),
        query:catId,
        totalPage:Math.ceil(movies.length/count),
        movies:results
      })
    })
}
