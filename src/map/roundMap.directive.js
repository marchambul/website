class MapCtrl{

    scrollTo (selector) {
        $('body').animate({
            scrollTop: $(selector).offset().top
        } , 600);
    }

    popupConfig(properties){
        let popupConfig = {
            closeButton: false,
            maxWidth: 150,
            minWidth: 150
        };

        popupConfig.className = (this.city == 'all') ? 'all-popup' : 'city-popup';

        let popup = L.popup(popupConfig);

        let content = '<h4>' + marker.properties.name + '</h4><p>' + marker.properties.description + '</p>';

        if (marker.properties.link){
            content += `<a class="popup-button" href="${marker.properties.link}" target="_blank">Accéder au site</a>`;
        }

        popup.setContent(content);
        let coordinates = [marker.geometry.coordinates[1], marker.geometry.coordinates[0]];

        const mapMarker = L.marker(coordinates, {
            icon: L.icon({
                iconUrl: 'img/icon.svg',
                iconSize: [65,27]
            })
        });

        return mapMarker;
    }

    constructor($scope, $http){
        var marchambulIcon;

        L.mapbox.accessToken = 'pk.eyJ1IjoibWFyY2hhbWJ1bCIsImEiOiI5NzI1MTA5ODk4MjFlM2EwZWIwM2Y4N2JiMjI5NTE4ZiJ9.2SFijYH9C8e_tZ2WyWboEQ';

        this.map = L.mapbox.map('map', 'mapbox.streets');

        this.placeDescriptionLayer = new L.LayerGroup();
        this.markers= {};
        this.cityMarkers = [];
        this.roundMarkers = [];
        this.cityLayer = {};
        this.roundLayer = {};

        //
        // var myLayer = L.mapbox.featureLayer()
        //   .loadURL(`/api/map/${this.city}.json`)
        //   .on('ready', function() {
        //     myLayer.eachLayer(function(layer) {
        //       layer.bindPopup(this.popupConfig(layer.features.properties));
        //     });
        //   })
        //   .addTo(this.map);



        $http.get(`/api/rounds/${this.city}.json`).then((res) => {
            this.sellers = res.data.sellers;
            this.toggled = res.data.toggled;
        });

        $http.get(`/api/map/${this.city}.json`).then((res) =>{

            this.map.setView(res.data.centerView, res.data.zoom);
            for (let marker of res.data.features) {

                let popupConfig = {
                    closeButton: false,
                    maxWidth: 150,
                    minWidth: 150
                };

                popupConfig.className = (this.city == 'all') ? 'all-popup' : 'city-popup';

                let popup = L.popup(popupConfig);

                let content = '<h4>' + marker.properties.name + '</h4><p>' + marker.properties.description + '</p>';

                if (marker.properties.link){
                    content += `<a class="popup-button" href="${marker.properties.link}" target="_blank">Accéder au site</a>`;
                }

                popup.setContent(content);
                let coordinates = [marker.geometry.coordinates[1], marker.geometry.coordinates[0]];

                const mapMarker = L.marker(coordinates, {
                    icon: L.icon({
                        iconUrl: 'img/icon.svg',
                        iconSize: [65,27]
                    })
                });



                this.markers[marker.properties.name] = mapMarker;

                if (marker.properties.cityMarker){
                    this.cityMarkers.push(mapMarker);
                    popup.setLatLng(coordinates);
                    this.placeDescriptionLayer.addLayer(popup);
                }
                else {
                    this.roundMarkers.push(mapMarker.bindPopup(popup));
                }
            }

            this.cityLayer = L.layerGroup(this.cityMarkers);
            this.roundLayer =  L.layerGroup(this.roundMarkers);

            if (res.data.displayOnInit === "cities"){
                this.map.addLayer(this.cityLayer);
                this.placeDescriptionLayer.addTo(this.map);
            }
            else {
                this.map.addLayer(this.roundLayer);
            }

            this.map.on('zoomend', () => {
                if (this.map.getZoom() > 6) {
                    this.map.removeLayer(this.placeDescriptionLayer);
                    this.map.removeLayer(this.cityLayer);
                    this.map.addLayer(this.roundLayer);
                } else {
                    this.placeDescriptionLayer.addTo(this.map);
                    this.map.removeLayer(this.roundLayer);
                    this.map.addLayer(this.cityLayer);
                }
            });
       });


    }

    fly (round) {
        this.map.setView(L.latLng(round.geometry.coordinates[1], round.geometry.coordinates[0]), 14, {animate: true});
        this.openPopup(round);
    }

    openPopup (round) {
        this.markers[round.properties.place].openPopup();
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
