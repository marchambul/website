class MapCtrl{
  constructor($scope, $http){
    var map, marchambulIcon;
    L.mapbox.accessToken = 'pk.eyJ1IjoibWFyY2hhbWJ1bCIsImEiOiI5NzI1MTA5ODk4MjFlM2EwZWIwM2Y4N2JiMjI5NTE4ZiJ9.2SFijYH9C8e_tZ2WyWboEQ';

    marchambulIcon = L.icon({
      iconUrl: 'marchambul-icon.png'
    });


    this._init = function(){

        // Create a map in the div #map
        var map = L.mapbox.map('map', 'marchambul.6b67e8ac')
        .setView([48.109, -1.67], 18);
    };
    this._init();
  }
}

angular.module("marchambul").controller("MapCtrl", MapCtrl);
