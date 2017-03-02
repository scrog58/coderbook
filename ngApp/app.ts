namespace coderbook2 {

    angular.module('coderbook2', ['ui.router', 'ngResource', 'ui.bootstrap']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ) => {
        // Define routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/ngApp/views/home.html',
                controller: coderbook2.Controllers.HomeController,
                controllerAs: 'controller',
                data: {
                  requiresAuthentication: true
                }
            })
            .state('user', {
                url: '/user/:id',
                templateUrl: '/ngApp/views/user.html',
                controller: coderbook2.Controllers.UserController,
                controllerAs: 'controller',
                data: {
                  requiresAuthentication: true
                }
            })
            .state('login', {
              url: '/login',
              templateUrl: '/ngApp/views/login.html',
              controller: coderbook2.Controllers.LoginController,
              controllerAs: 'controller'
            })
            .state('notFound', {
                url: '/notFound',
                templateUrl: '/ngApp/views/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });

  angular.module('coderbook2').run((
    $state,
    $rootScope,
    userService
  ) => {
    $rootScope.$on('$stateChangeStart', (e, to) => {
      if (to.data && to.data.requiresAuthentication) {
        if (!userService.isLoggedIn()) {
          e.preventDefault();
          $state.go('login');
        }
      }
    });
  });

}
