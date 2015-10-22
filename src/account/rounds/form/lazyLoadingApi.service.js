class LazyLoadApiService {
  constructor($window,$q) {
    this.$q = $q;
    this.$window = $window;
    }


    loadScript() {
      console.log('loadScript');
      var deferred = this.$q.defer();
      this.$window.initMap = function () {
        deferred.resolve();
      };

      // use global document since Angular's $document is weak
      var s = document.createElement('script');
      s.src = '//maps.googleapis.com/maps/api/js?key=AIzaSyDbT9SSU7np8VI98BnFh1vM_RtZdk-AxNg&v=3.exp&sensor=false&libraries=places&callback=initMap';
      document.body.appendChild(s);

      return deferred.promise;
    }



}

angular.module("marchambul").service("LazyLoadApiService", LazyLoadApiService);
