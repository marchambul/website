//
// function contactDirective() {
//     return {
//         templateUrl: 'main/Directives/psHome/psHome.tpl.html',
//         restrict: 'E',
//         controller: 'psHomeController',
//         controllerAs: 'vm',
//         bindtocontroller: true,
//         scope: {
//             profileCanAccess: '='
//         }
//     };
// }
//
// class contactController {
//     constructor($scope, $location, AuthenticationService, ConfigService) {
//         this.profileCanAccess = $scope.profile;
//         this.$location = $location;
//         this.AuthenticationService = AuthenticationService;
//         this.ConfigService = ConfigService;
//
//         ConfigService.getProfile().then((profile) =>{
//             this.name = profile && profile.name;
//         });
//     }
//
//     wantLogout() {
//         this.$location.path('/login');
//
//         this.AuthenticationService.logout();
//     }
//
//     wantLogin() {
//         this.$location.path('/login');
//     }
// }
//
// angular.module('proposal')
//         .controller('psHomeController', psHomeController)
//         .directive('psHome', psHomeDirective);
