class MapCtrl{

    constructor($scope, $http){
        console.log('MapCtrl', this.city);
        var marchambulIcon;

        L.mapbox.accessToken = 'pk.eyJ1IjoibWFyY2hhbWJ1bCIsImEiOiI5NzI1MTA5ODk4MjFlM2EwZWIwM2Y4N2JiMjI5NTE4ZiJ9.2SFijYH9C8e_tZ2WyWboEQ';

        this.map = L.mapbox.map('map', 'mapbox.streets');


        $http.get(`/api/rounds/${this.city}.json`).then((res) => {
            this.sellers = res.data.sellers;
            this.toggled = res.data.toggled;
        });

        $http.get(`/api/map/${this.city}.json`).then((res) =>{

            this.map.setView(res.data.centerView, res.data.zoom);
            for (let ville of res.data.features) {

                let popupConfig = {
                    closeButton: false,
                    maxWidth: 150,
                    minWidth: 150
                };

                popupConfig.className = (this.city == 'all') ? 'all-popup' : 'city-popup';

                let popup = L.popup(popupConfig);

                let content = '<h4>' + ville.properties.name + '</h4><p>' + ville.properties.description + '</p>';

                if (ville.properties.link){
                    content += `<a class="popup-button" href="${ville.properties.link}" target="_blank">Accéder au site</a>`;
                }

                popup.setContent(content);
                let coordinates = [ville.geometry.coordinates[1], ville.geometry.coordinates[0]];

                L.marker(coordinates, {
                    icon: L.icon({
                        iconUrl: 'img/icon.svg',
                        iconSize: [65,27]
                    })
                }).addTo(this.map).bindPopup(popup);

                // if (this.city == 'all'){
                    popup.setLatLng(coordinates);
                    this.map.addLayer(popup);
                //}
            }
        });
    }

    fly (round) {
        this.map.setView(L.latLng(round.geometry.coordinates[1], round.geometry.coordinates[0]), 14, {animate: true});
    }
}


function roundMapDirective () {
    return {
        templateUrl: 'map/roundMap.tpl.html',
        restrict: 'E',
        controller: 'MapCtrl',
        controllerAs: 'vm',
        scope : {
            city: '@'
        },
        bindToController: true
    };
}



angular.module("marchambul").controller("MapCtrl", MapCtrl);
angular.module("marchambul").directive("roundMap", roundMapDirective);
