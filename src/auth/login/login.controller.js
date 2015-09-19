class LoginCtrl {
  constructor($scope, $rootScope, AuthService, $state){

    this._init = function(){

    };


    $scope.login = function(){
      console.log("$scope.user:" + $scope.user.email);
      AuthService.login($scope.user).then(
        function() {
          $state.go('account');
        },
        function(loginError) {
          console.log("loginError:" + loginError);
        }
      );
    };

    this._init();
  }
}

angular.module("marchambul").controller("LoginCtrl", LoginCtrl);
