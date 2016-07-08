(function () {
    'use strict';

    angular.module('app')

    .controller('PatternsCtrl', function ($scope, pattern, $templateCache, param1, param2, $rootScope) {

        if(!$rootScope.patternSection) {
            $rootScope.patternSection = 'inputs';
        }

        $templateCache.remove('views/pattern/include.html');
      
        $scope.pattern = pattern;
        $scope.param1 = param1;
        $scope.param2 = param2;
      
        $scope.title = [];
        angular.forEach($scope.pattern.split('-'),function(part) {
            
            var title = part.charAt(0).toUpperCase() + part.slice(1).replace(/_/g,' ');
            
            $scope.title.push(title);
        });

        if($scope.pattern) {
            $scope.include = 'views/patterns/' + $scope.pattern + '.html';
        }

        $scope.toggleSection = function(section) {
            $rootScope.patternSection = section;
        }
    })

    .controller('PatternSpecExampleCtrl', function ($scope, $timeout) {

        $timeout(function() {
            var el = document.querySelector('#form-spec-example');
            var button = document.querySelector('#form-spec-example .submit');
            button.click();
        });

        $scope.list = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];

        $scope.hint = 'Hint hint hint hint.';
        $scope.background = false;
    })

    .controller('patternsComponentsAddressCtrl', function ($scope) {
            $scope.address = {};
            $scope.options = { map: true };
    })

    .controller('patternsModalCtrl', function ($scope, text, fsModal) {
        $scope.text = text;
        $scope.cancel = function() {
            fsModal.hide();
        }
    })

})();

