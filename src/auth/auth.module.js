angular.module("marchambul").config(function($stateProvider){
  $stateProvider
    .state('login', {
      url: "/login",
      params:{redirectState: null},
      templateUrl: "auth/login/login.html",
      controller: "LoginCtrl"
    })
    .state('logout', {
      url: "/logout",
      templateUrl: "auth/logout/logout.html",
      controller: "LogoutCtrl"
    });
  }
);
