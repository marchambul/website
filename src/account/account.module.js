angular.module("marchambul").config(function($stateProvider){
  $stateProvider
    .state('account', {
      url: "/account",
      templateUrl: "account/account.html",
      controller: "AccountCtrl",
      type: "account"
    })
    .state('account.rounds', {
      url: "/rounds",
      templateUrl: "account/rounds/rounds.html",
      controller: "RoundCtrl",
      type: "account"
    })
    .state('account.rounds.new', {
      url: "/new",
      templateUrl: "account/rounds/form/roundForm.html",
      controller: "RoundFormCtrl",
      type: "account"
    })
    .state('account.sales', {
      url: "/sales",
      templateUrl: "account/sales/sales.html",
      controller: "SalesCtrl",
      type: "account"
    });
  }
);
