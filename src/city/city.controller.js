class CityController {
    constructor ($stateParams, $http) {
        console.log('CityController');
        this.$http = $http;
        this.loadCityData($stateParams.city);
    }

    loadCityData (city) {
        this.city = city;
        this.$http.get(`data/city/${city}.json`).then((i18n) => {
            this.i18n = i18n.data;
        });
    }
}

angular.module("marchambul").controller("CityController", CityController);
