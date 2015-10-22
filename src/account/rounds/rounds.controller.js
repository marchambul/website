class RoundCtrl{
  constructor($scope, $rootScope, RoundDatabaseService, $state, $stateParams){

    this._init = function(){
      $scope.rounds = [];
    };

    this._init();
  }
}

angular.module("marchambul").controller("RoundCtrl", RoundCtrl);
