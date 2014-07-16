var app = angular.module("umbraco");

app.directive('wantFocus', function ($timeout) {
  return {
    link: function (scope, el, attrs) {
      scope.$watch(attrs.wantFocus, function (value) {
        if (value == attrs.index) {
          $timeout(function () {
            el[0].focus();
          });
        }
      });
    }
  }
});

app.controller("EpiphanyStringListController", ['$scope', 'assetsService', function ($scope, assetsService) {

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  $scope.focusedRow = -1;

  $scope.sortableOptions = {
    handle: '.handle'
  }

  if ($scope.model.value instanceof Array == false) {
    $scope.model.value = [''];
  }

  $scope.min = isNumeric($scope.model.config.min) ? $scope.model.config.min : 0;
  $scope.max = isNumeric($scope.model.config.max) && $scope.model.config.max !== 0 ? $scope.model.config.max : Number.MAX_VALUE;
  $scope.allowBlanks = $scope.model.config.allowBlanks;

  $scope.addRow = function () {
    $scope.model.value.push('');
  }

  $scope.hasMinimum = function() {
    return $scope.model.value.length == $scope.min;
  }

  $scope.hasMaximum = function() {
    return $scope.model.value.length == $scope.max;
  }

  $scope.focusRow = function(index) {
    $scope.focusedRow = index;
  }

  $scope.onKeydown = function (ev, index) {
    // enter
    var len = $scope.model.value.length;
    if (ev.which == 13 && index + 1 == len && len < $scope.max) {
      $scope.addRow();
      $scope.focusRow($scope.model.value.length - 1);
      ev.preventDefault();
      return;
    }
  }

  $scope.removeRow = function(index) {
    $scope.model.value.splice(index, 1);
  }

  assetsService.loadCss('/App_Plugins/SortableStringList/sortablestringlist.css');
}]);