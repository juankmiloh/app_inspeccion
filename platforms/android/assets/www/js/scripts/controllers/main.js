'use strict';

/**
 * @ngdoc function
 * @name procesarSstApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the procesarSstApp
 */
angular.module('procesarSstApp')
  .controller('MainCtrl', function ($scope, $timeout, $mdSidenav) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }
  });
