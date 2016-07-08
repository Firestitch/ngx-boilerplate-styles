'use strict';

/**
 * @ngdoc directive
 * @name app.directive:footer
 * @description
 * # footer
 */
angular.module('app')
    .directive('fsCode', function() {
        return {
            templateUrl: './views/directives/fscode.html',
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                htmlInclude: '=?fsHtmlInclude',
                jsInclude: '=?fsJsInclude',
                example: '=?fsExample',
                param1: '=?fsParam1',
                param2: '=?fsParam2'
            },

            link: function($scope, el, attrs, ctrl, transclude) {

                angular.forEach(transclude(),function(node) {
                    if(node.nodeName.match(/^fs-js$/i)) {
                        
                        angular.element(node).attr('fs-js-include');
                        $scope.js = angular.element(node).html();
                    }

                    if(node.nodeName.match(/^fs-html$/i)) {
                        $scope.html = angular.element(node).html().replace('<!--','').replace('-->','');
                    }
                });

                $scope.htmlIncludeUrl = 'views/pattern/' + $scope.htmlInclude;
                $scope.jsIncludeUrl = 'scripts/' + $scope.jsInclude;
            }
        };
    });
