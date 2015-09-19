class RoundFormCtrl{
  constructor($scope, $rootScope, RoundDatabaseService, $state, $stateParams){

    this._init = function(){
      $scope.round = {
        location: {}
      };

    };

    $scope.create = function(){
    };

    this._init();
  }
}

angular.module("marchambul").controller("RoundFormCtrl", RoundFormCtrl);
