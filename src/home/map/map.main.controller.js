class MapCtrl{
  constructor($scope, $http){
    var map, marchambulIcon;

    var map = L.map('map').setView([48.109, -1.67], 15);

    var marchambulIcon = L.icon({
      iconUrl: 'marchambul-icon.png'
    });


    this._init = function(){
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'marchambul.nm12nk8ng',
        accessToken: 'pk.eyJ1IjoibWFyY2hhbWJ1bCIsImEiOiI5NzI1MTA5ODk4MjFlM2EwZWIwM2Y4N2JiMjI5NTE4ZiJ9.2SFijYH9C8e_tZ2WyWboEQ#4/48.86/2.35'
      }).addTo(map);

      $http.get("/api/tournees.json").then(function(res) {
          console.log('res : '  + JSON.stringify(res));
        for (let tournee of res.data.features) {
            console.log('tournee : '  + JSON.stringify(tournee));
          let popup = L.popup({
            closeButton: false,
            maxWidth: 150,
            minWidth: 150,
            className: 'custom-popup'
          });

          popup.setContent('<h4>' + tournee.properties.name + '</h4><p>' + tournee.properties.description + '</p>');
          console.log('tournee.geometry.coordinates : '  + JSON.stringify(tournee.geometry.coordinates));
          let coordinates = [tournee.geometry.coordinates[1], tournee.geometry.coordinates[0]];
          L.marker(coordinates, {
            icon: marchambulIcon
          }).addTo(map).bindPopup(popup);

popup.setLatLng(coordinates);
          map.addLayer(popup);
          console.log('ttt');
        }
      });
    }
    //this._init();
  }
}

angular.module("marchambul").controller("MapCtrl", MapCtrl);
