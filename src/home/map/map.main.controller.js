class MapCtrl{

    constructor($scope, $http){
        var marchambulIcon;

            L.mapbox.accessToken = 'pk.eyJ1IjoibWFyY2hhbWJ1bCIsImEiOiI5NzI1MTA5ODk4MjFlM2EwZWIwM2Y4N2JiMjI5NTE4ZiJ9.2SFijYH9C8e_tZ2WyWboEQ';

            this.map = L.mapbox.map('map', 'mapbox.streets').setView([48.8, 2.35], 6);

            $http.get("/api/villes.json").then((res) =>{

              for (let ville of res.data.features) {

                let popup = L.popup({
                  closeButton: false,
                  maxWidth: 150,
                  minWidth: 150,
                  className: 'custom-popup'
                });

                popup.setContent(
                    '<h4>' + ville.properties.name + '</h4><p>' + ville.properties.description + '</p>' +
                    '<a class="popup-button">Accéder au site</a>'
                );
                let coordinates = [ville.geometry.coordinates[1], ville.geometry.coordinates[0]];

                L.marker(coordinates, {
                    icon: L.icon({
                        iconUrl: 'img/marchambul-icon.png'
                    })
                }).addTo(this.map).bindPopup(popup);

            popup.setLatLng(coordinates);
                this.map.addLayer(popup);
              }
            });



            // map.on('style.load', function () {
            //
            //     $http.get("/api/villes.json").then(function(res) {
            //         map.addSource("markers", {
            //             "type": "geojson",
            //             "data": res.data
            //         });
            //
            //
            //
            //         map.addLayer({
            //             "id": "markers",
            //             "type": "symbol",
            //             "source": "markers",
            //             "layout": {
            //                 "icon-image": "{marker-symbol}-15",
            //                 "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            //                 "text-offset": [0, 0.6],
            //                 "text-anchor": "top"
            //             },
            //             "paint": {
            //                 "text-size": 12
            //             }
            //         });
            //
            //         for (let tournee of res.data.features) {
            //             var tooltip = new mapboxgl.Popup()
            //             .setLngLat(tournee.geometry.coordinates)
            //             .setHTML('<h4>' + tournee.properties.name + '</h4><p>' + tournee.properties.description + '</p>')
            //             .addTo(map);
            //         }
            //     });
            // });
    }

    fly () {
        this.map.setView(L.latLng(48.103850800000004,-1.6723922), 15, {animate: true});
    }

}

angular.module("marchambul").controller("MapCtrl", MapCtrl);
