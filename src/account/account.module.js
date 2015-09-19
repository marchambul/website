angular.module("marchambul").config(function($stateProvider){
  $stateProvider
    .state('account', {
      url: "/account",
      templateUrl: "account/account.html",
      controller: "AccountCtrl",
      type: "account",
      resolve:{
        auth: function($localStorage, $location, $q){
          if (typeof $localStorage.token !== 'undefined') {
            console.log('success init profile: ' + $localStorage.token);
          }
          else{
            console.log("err");
            $location.path('login');
            return $q.reject();
          }
        }
      }
    })
    .state('newRound', {
      url: "/rounds/new",
      templateUrl: "account/rounds/roundForm.html",
      controller: "RoundFormCtrl",
      type: "account",
      resolve:{
        auth: function($localStorage, $location, $q){
          if (typeof $localStorage.token !== 'undefined') {
            console.log('success init profile: ' + $localStorage.token);
          }
          else{
            console.log("err");
            $location.path('login');
            return $q.reject();
          }
        }
      }
    });
  }
);
