"use strict";angular.module("mobile",["ionic"]).config(["$stateProvider","$urlRouterProvider",function(e,o){e.state("app",{url:"/app",abstract:!0,templateUrl:"templates/menu.html",controller:"MenuController"}).state("app.search",{url:"/search",views:{menuContent:{templateUrl:"templates/search.html",controller:"SearchController"}}}).state("app.favorites",{cache:!1,url:"/favorites",views:{menuContent:{templateUrl:"templates/favorites.html",controller:"FavoritesController"}}}).state("app.login",{url:"/login",views:{menuContent:{templateUrl:"templates/login.html",controller:"LoginController"}}}).state("app.myqodes",{cache:!1,url:"/myqodes",views:{menuContent:{templateUrl:"templates/myqodes.html",controller:"FavoritesController"}}}).state("app.qodeview",{url:"/qodeview/:id",views:{menuContent:{templateUrl:"templates/qodeview.html",controller:"QodeViewController"}}}).state("app.register",{url:"/register",views:{menuContent:{templateUrl:"templates/register.html",controller:"RegisterController"}}}).state("app.welcome",{url:"/welcome",views:{menuContent:{templateUrl:"templates/welcome.html"}}}),o.otherwise("/app/search")}]),angular.module("mobile").factory("userFactory",["$http",function(e){return{getUser:function(){return e.get("/user")},addToFavorites:function(){return e.put("/user/addtofavorites")},deleteQode:function(o){return e.delete("/user/deleteqode/"+o)},isLogged:function(){return e.get("/user/isLogged")},login:function(o){return e.post("/user/login",o)},logout:function(){return e.get("/user/logout")},recovery:function(){return e.post("/user/passwordrecovery")},register:function(o){return e.post("/user",o)},reset:function(){return e.put("/user")},removeFromFavorites:function(o){return e.put("/user/removefromfavorites",{favId:o})}}}]),angular.module("mobile").factory("qodeFactory",["$http",function(e){return{getQode:function(o){return e.get("/api/qodes/"+o)},upVote:function(o){return e.post("/api/qodes/upvote/",{toUpvote:o})},addToFavorites:function(o){return e.put("/user/addtofavorites/",{favId:o})}}}]),angular.module("mobile").controller("AppController",["$scope","$rootScope","userFactory","qodeFactory",function(e,o,t,n){o.logged={log:!1,name:""},t.isLogged().then(function(e){void 0!==e.data.isLogged&&!0===e.data.isLogged.log?(o.logged.log=!0,o.logged.name=e.data.isLogged.name):o.logged.log=!1},function(e){if(e)throw e})}]),angular.module("mobile").controller("QodeViewController",["$scope","$stateParams","qodeFactory","$ionicPopup","$timeout","$ionicLoading",function(e,o,t,n,r,a){a.show(),e.$on("$ionicView.beforeEnter",function(){t.getQode(o.id).then(function(o){e.qode=o.data,a.hide()},function(e){a.hide();var o=n.alert({title:"Oops..",template:e.statusText});r(function(){o.close()},2500)})}),e.likeQode=function(o){t.upVote(o).then(function(){e.qode.upVotes++,e.qode.isLiked=!0},function(e){var o=n.alert({title:"Oops..",template:e.statusText});r(function(){o.close()},2500)})},e.addToFavorites=function(o){t.addToFavorites(o).then(function(){e.qode.isFavorited=!0},function(e){var o=n.alert({title:"Oops..",template:e.statusText});r(function(){o.close()},2500)})}}]),angular.module("mobile").controller("SearchController",["$scope","$stateParams","qodeFactory","$state","$timeout",function(e,o,t,n,r){var a=document.decode.char1,i=document.decode.char2,l=document.decode.char3,s=document.decode.char4,u=document.decode.char5,c=function(){a.value="",i.value="",l.value="",s.value="",u.value=""};e.jumpnext=function(e){switch($("#status").html("&nbsp;"),e){case 1:i.focus();break;case 2:l.focus();break;case 3:s.focus();break;case 4:u.focus();break;case 5:if(""!==a.value&&""!==i.value&&""!==l.value&&""!==s.value&&""!==u.value){$("#status").html('<i class="fa fa-refresh fa-spin"></i>&nbsp;&nbsp;Searching...');var o=(a.value+i.value+l.value+s.value+u.value).toUpperCase();t.getQode(o).then(function(e){document.activeElement.blur(),$("#status").html('<i class="fa fa-check is-green"></i>&nbsp;&nbsp;Found'),r(function(){c(),$("#status").html("&nbsp;"),n.go("app.qodeview",{id:o})},500)},function(e){$("#status").html('<i class="fa fa-times is-red"></i>&nbsp;&nbsp;'+e.statusText+" :("),document.activeElement.blur(),c()})}else c(),document.activeElement.blur()}}}]),angular.module("mobile").controller("LoginController",["$scope","$rootScope","$state","$ionicPopup","$timeout","userFactory","$ionicHistory","$ionicLoading",function(e,o,t,n,r,a,i,l){e.doLogin=function(){l.show();var e={mail:document.login.mail.value,password:document.login.password.value};a.login(e).then(function(e){o.logged={log:!0,name:e.name},i.nextViewOptions({disableBack:!0}),t.go("app.search"),r(function(){l.hide()},250)},function(){l.hide();var e=n.alert({title:"Oops..",template:"We didn't find you"});r(function(){e.close()},2500)})}}]),angular.module("mobile").controller("MenuController",["$scope","$rootScope","$state","userFactory","$ionicHistory","$ionicPopup","$timeout",function(e,o,t,n,r,a,i){e.doLogout=function(){n.logout().then(function(){o.logged={log:!1,name:""}},function(){var e=a.alert({title:"Oops..",template:"We can't log you out"});i(function(){e.close()},2e3)})}}]),angular.module("mobile").controller("FavoritesController",["$scope","$rootScope","$state","$ionicPopup","$timeout","userFactory","$ionicHistory","$ionicLoading",function(e,o,t,n,r,a,i,l){l.show(),e.$on("$ionicView.beforeEnter",function(){a.getUser().then(function(o){e.qode=o.data,l.hide()},function(e){l.hide();var o=n.alert({title:"Oops..",template:e.statusText});r(function(){o.close(),i.nextViewOptions({disableBack:!0}),t.go("app.search")},2500)})}),e.removeFromFavorites=function(o,t){e.qode.favorites.splice(o,1),a.removeFromFavorites(t)},e.deleteQode=function(o,t){e.qode.myqodes.splice(o,1),a.deleteQode(t)}}]),angular.module("mobile").controller("RegisterController",["$scope","$rootScope","$state","$ionicPopup","$timeout","userFactory","$ionicHistory","$ionicLoading",function(e,o,t,n,r,a,i,l){e.name="",e.mail="",e.password="",e.confirmPassword="",e.doRegister=function(){l.show();var s={name:e.name,mail:e.mail,password:e.password,confirmPassword:e.confirmPassword};if(s.password!==s.confirmPassword){l.hide();var u=n.alert({title:"Oops..",template:"Passwords doesn't match"});return void r(function(){u.close()},2500)}a.register(s).then(function(e){o.logged={log:!0,name:e.data.name},i.nextViewOptions({disableBack:!0}),l.hide(),t.go("app.welcome")},function(o){l.hide();var a=n.alert({title:"Oops..",template:o.data.error.message});e.name="",e.mail="",e.password="",e.confirmPassword="",r(function(){a.close(),i.nextViewOptions({disableBack:!0}),t.go("app.search")},2500)})}}]);