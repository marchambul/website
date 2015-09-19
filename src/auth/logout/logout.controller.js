class LogoutCtrl{
  constructor($scope, $rootScope, $auth, DatabaseService, $state){

    this._init = function(configuration){
      $auth.signOut().then(
        () => {
          $state.go('app.home');
        },
        (logoutError) => {
          console.log("logoutError:" + logoutError);
        }
      )
    }

    this._init();
  }
}

angular.module("marchambul").controller("LogoutCtrl", LogoutCtrl);
