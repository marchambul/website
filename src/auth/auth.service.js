class AuthService {

  constructor($http, $localStorage, $q) {
    this.$http = $http;
    this.$localStorage = $localStorage;
    this.$q = $q;
  }

  login(user){
    var deferred = this.$q.defer();
    var $localStorage = this.$localStorage;
    this.$http.post("http://localhost:5000/auth/sign_in").then(function(res){
      $localStorage.token = res.data.token;
      $localStorage.cloudantApi = res.data.token;
      console.log("res.token: " + res.data.token);
      deferred.resolve();
    });
    return deferred.promise;
  }
}

angular.module("marchambul").service("AuthService", AuthService);
