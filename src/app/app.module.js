angular.module("marchambul", [
  'ui.router',
  "ui.bootstrap.tpls",
  "ui.bootstrap.transition",
  "ui.bootstrap.collapse",
  'ui.bootstrap.position',
  'ui.bootstrap.bindHtml',
  'ui.bootstrap.typeahead',
  'ui.bootstrap.modal',
  'ui.bootstrap.tooltip',
  'ui.bootstrap.position',
  'ui.bootstrap.bindHtml',
  'ui.bootstrap.popover',
  'ui.bootstrap.tabs',
  'ngStorage'
])

.config(function($httpProvider){
  $httpProvider.interceptors.push(function ($q, $location, $localStorage) {
   return {
       'request': function (config) {
           config.headers = config.headers || {};
           if ($localStorage.token) {
               config.headers.Authorization = 'Bearer ' + $localStorage.token;
           }
           return config;
       },
       'responseError': function (response) {
           if (response.status === 401 || response.status === 403) {
               $location.path('/login');
           }
           return $q.reject(response);
           }
       };
    });

})

.run(function($rootScope, $localStorage, $state){
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    if (toState.type === 'account' && typeof $localStorage.token === 'undefined') {
      // event.preventDefault();
      // $state.go('login');
      }
  });
});
