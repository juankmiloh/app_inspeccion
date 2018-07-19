'use strict';

/**
 * @ngdoc overview
 * @name procesarSstApp
 * @description
 * # procesarSstApp
 *
 * Main module of the application.
 */
angular.module('procesarSstApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ngMaterial',
  'ngSidebarJS'
])
.controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log, SidebarJS, $mdDialog, $filter) {
  $scope.status = '  ';
  $scope.customFullscreen = true;

  $scope.showAlert = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('This is an alert title')
        .textContent('You can specify some description text in here.')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
    );
  };

  $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Would you like to delete your debt?')
          .textContent('All of the banks have agreed to forgive you your debts.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Please do it!')
          .cancel('Sounds like a scam');

    $mdDialog.show(confirm).then(function() {
      $scope.status = 'You decided to get rid of your debt.';
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });
  };

  $scope.showPrompt = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .title('What would you name your dog?')
      .textContent('Bowser is a common name.')
      .placeholder('Dog name')
      .ariaLabel('Dog name')
      .initialValue('Buddy')
      .targetEvent(ev)
      .required(true)
      .ok('Okay!')
      .cancel('I\'m a cat person');

    $mdDialog.show(confirm).then(function(result) {
      $scope.status = 'You decided to name your dog ' + result + '.';
    }, function() {
      $scope.status = 'You didn\'t name your dog.';
    });
  };

  $scope.showAdvanced = function(ev) {
    SidebarJS.toggle();
    $mdDialog.show({
      controller: DialogController,
      templateUrl: './websites/dialog/index/dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $("body").removeClass("bloquear_scroll");
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $("body").removeClass("bloquear_scroll");
      $scope.status = 'You cancelled the dialog.';
    });
  };

  $scope.showTabDialog = function(ev) {
    console.log(ev);
    $mdDialog.show({
      controller: DialogController,
      templateUrl: './websites/dialog/index/tabDialog.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
  };

  $scope.showPrerenderedDialog = function(ev) {
    $mdDialog.show({
      contentElement: '#myDialog',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
  };

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }



  $scope.prueba = "hola mundo!";

  $scope.settings = [
    { name: 'Wi-Fi', extraScreen: 'Wi-fi menu', icon: 'device:network-wifi', enabled: true },
    { name: 'Bluetooth', extraScreen: 'Bluetooth menu', icon: 'device:bluetooth', enabled: false },
  ];

  $scope.options = [
    {id: 1, title: "Option A", selected: false},
    {id: 2, title: "Option B", selected: true},
    {id: 3, title: "Option C", selected: true},
  ];

  $scope.options_1 = [
    {id: 1, title: "Option 1", selected: false},
    {id: 2, title: "Option 2", selected: true},
    {id: 3, title: "Option 3", selected: true},
  ];

  $scope.navigateTo = function(to, event, option) {
    $scope.activeOption = option; //DEJAR SOMBREADA LA VISTA
    $("body").addClass("bloquear_scroll");
    // $("html").css("overflow", "scroll");
    // $("body").css("overflow", "hidden");
    // $("html").css("height", "100%");
    $scope.showAdvanced(event);
    // $mdDialog.show(
    //   $mdDialog.alert()
    //     .title('Navigating')
    //     .textContent('Imagine being taken to ' + to)
    //     .ariaLabel('Navigation demo')
    //     .ok('Neat!')
    //     .targetEvent(event)
    // );
  };





    $scope.contacts = [{
      'id': 1,
      'fullName': 'Maria Guadalupe',
      'lastName': 'Guadalupe',
      'title': "CEO, Found"
    }, {
      'id': 2,
      'fullName': 'Gabriel García Marquéz',
      'lastName': 'Marquéz',
      'title': "VP Sales & Marketing"
    }, {
      'id': 3,
      'fullName': 'Miguel de Cervantes',
      'lastName': 'Cervantes',
      'title': "Manager, Operations"
    }, {
      'id': 4,
      'fullName': 'Pacorro de Castel',
      'lastName': 'Castel',
      'title': "Security"
    }];
    $scope.selectedId = 2;
    $scope.selectedUser = function() {
      return $filter('filter')($scope.contacts, { id: $scope.selectedId })[0].lastName;
    };




  $scope.toggleSidebarJS = function() {
    console.log("hola");
    SidebarJS.toggle();
  }

  $scope.onSidebarOpen = function() {
    console.log('is open!');
    $("html").addClass("bloquear_scroll");
      // $("html").css("position", "fixed");
      // $("body").css("position", "fixed");
    // $('#menu_lateral').show(0.33);
    
    // if( $('#menu_lateral').is(":visible") ){ //esta visible
    //   //si esta visible
    //   $("html").css("overflow", "hidden");
    //   $("body").css("overflow", "hidden");
    // }
  }

  $scope.onSidebarClose = function() {
    console.log('is close!');
    $("html").removeClass("bloquear_scroll");
    // $('#menu_lateral').hide();
    // $("html").css("position", "absolute");
    // $("body").css("position", "absolute");
    // if( $('#menu_lateral').is(":visible") ){ //esta visible
    //   //si esta visible
    // }else{
    //   //si no esta visible
    //   $("html").css("overflow", "scroll");
    //   $("body").css("overflow", "scroll");
    // }
  }
  $scope.toggleLeft = buildDelayedToggler('left');

  /**
   * Supplies a function that will continue to operate until the
   * time is up.
   */
  function debounce(func, wait, context) {
    var timer;

    return function debounced() {
      var context = $scope,
        args = Array.prototype.slice.call(arguments);
      $timeout.cancel(timer);
      timer = $timeout(function() {
        timer = undefined;
        func.apply(context, args);
      }, wait || 10);
    };
  }

  /**
   * Build handler to open/close a SideNav; when animation finishes
   * report completion in console
   */
  function buildDelayedToggler(navID) {
    return debounce(function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }, 200);
  }

  $scope.swipeIzq = function() {
    $scope.estado = "<-- Swipe";
    // $scope.close();
    SidebarJS.toggle();
  }

  $scope.swipeDer = function() {
    $scope.estado = "Swipe -->";
    // $scope.toggleLeft();
    SidebarJS.toggle();
  }

  $scope.close = function () {
    // Component lookup should always be available since we are not using `ng-if`
    $mdSidenav('left').close()
      .then(function () {
        $log.debug("close LEFT is done");
      });
  };
})
.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function () {
    // Component lookup should always be available since we are not using `ng-if`
    $mdSidenav('left').close()
      .then(function () {
        $log.debug("close LEFT is done");
      });
  };
})