angular.module("marchambul", [
  'ui.router',
  "ui.bootstrap.tpls",
  "ui.bootstrap.transition",
  "ui.bootstrap.collapse",
  'ui.bootstrap.position',
  'ui.bootstrap.bindHtml',
  'ui.bootstrap.typeahead',
  'ui.bootstrap.modal',
  'ui.bootstrap.tooltip',
  'ui.bootstrap.position',
  'ui.bootstrap.bindHtml',
  'ui.bootstrap.popover'
])

.config(($stateProvider)=>{

    //routes config
    $stateProvider
    .state('account', {
      url: "/account",
      onEnter: ($state)=>{
        console.log("test");
      },
      params:{configId: null},
      templateUrl: "account/account.html",
      controller: "AccountCtrl"
    });
  }
)
