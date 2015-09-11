class AccountCtrl{
  constructor($scope, $rootScope, DatabaseService, $state, $stateParams){

    this._init = function(configuration){

      DatabaseService.listDocuments({type: 'round'}).then((res) => {
        $scope.rounds = res;
      });
    }

    $scope.create = function(){
      DatabaseService.postDocument($scope.configuration, 'configuration').then((res) => {
        $state.go('app.home');
      });
    }

    $scope.createItem = function(){
      $scope._saveConfig();
      $state.go('app.item', { configId: $scope.configuration._id });
    }

    $scope.editItem = function(itemId){
      console.log("editItem");
      $scope._saveConfig();
      $state.go('app.item', { itemId: itemId });
    }

    $scope.deleteItem = function($event, item){
      $event.stopPropagation();
      DatabaseService.deleteDocument(item).then(()=> $scope._initItems());
    }

    $scope._saveConfig = function(){
      $rootScope.currentConfiguration = $scope.configuration;
      console.log("test:" + $rootScope.currentConfiguration._id);
    }

    $scope._initItems = function(){
      //list items of configuration
      DatabaseService.listDocuments({type: 'item', configId: $scope.configuration._id}).then((res) => {
        $scope.items = res;
      });
    }

    this._initConfig = function(configuration){
      $scope.configuration = configuration;
      $scope._initItems();
    }

    this._init();
  }
}

angular.module("marchambul").controller("AccountCtrl", AccountCtrl);
