class AccountCtrl{
  constructor($scope, $rootScope, RoundDatabaseService, $state, $stateParams){

    this._init = function(configuration){

      RoundDatabaseService.listDocuments({type: 'round'}).then(function(res){
        $scope.rounds = res;
      });
    };

    $scope.create = function(){
    };

    this._init();
  }
}

angular.module("marchambul").controller("AccountCtrl", AccountCtrl);
