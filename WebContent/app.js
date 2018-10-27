var app=angular.module("App",["ngRoute"])
app.controller("homecontroller",function($scope)
		{
	$scope.test="athomecontroller";
});
app.controller("blogcontroller",function($scope,$http)
		{
	$scope.x="abc";
	$scope.postBlog = function (t, desc, wby,d_blog,brf) {
console.log("at post blog");

	var blogData = {

	        title: t,

	        description: desc,

	        writtenby: wby,
	        
	        date_blog:d_blog,
	        
	        brief:brf
	        

	};//blogData  object

	//Call the services

	$http.post('http://localhost:2020/mavenweb3/createblog',
	        JSON.stringify(blogData)).then(function (response) {

	if (response.data)

	$scope.msg = "Blog  Created Successfully!";

	},
	function (response) {

	$scope.msg = "Service not Exists";

	$scope.statusval = response.status;

	$scope.statustext = response.statusText;

	$scope.headers = response.headers();

	}); //then

	}; //postBlog

	$http.get('http://localhost:2020/mavenweb3/getBlogDetails').success(function(response)
			{
		$scope.status=response.statustext;
		$scope.getBlogDetails=response.bloglist;
		$scope.st=response.status;
	}); //controller

		})
		app.config(function($routeProvider){
			$routeProvider
			.when("/",{
				templateUrl:'Home/Home.html',
				controller:'homecontroller'
			})
			.when("/Home",{
				templateUrl:'Home/Home.html',
				controller:'homecontroller'
			})
			.when("/Blog",{
				templateUrl:'Blog/Blog.html',
				controller:'blogcontroller'
			}).otherwise({
			       redirectTo: "/"
			   });
			
		});