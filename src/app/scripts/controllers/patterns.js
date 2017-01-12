(function () {
    'use strict';

    angular.module('app')

    .controller('PatternsCtrl', function ($scope, pattern, $templateCache, param1, param2, $rootScope, $q) {

        if(!$rootScope.patternSection) {
            $rootScope.patternSection = 'spec';
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
    .controller('PatternInputCtrl', function ($scope, $q) {

		$scope.query = function(text) {
			return $q(function(resolve) {

				var list = [{ name: 'Bob', value: 1 },
							{ name: 'Ryan', value: 2 },
							{ name: 'Jane', value: 3 },
							{ name: 'Dave', value: 4 }];

				resolve(list);
			});
		}

	    $scope.items = [{ name: 'Item 1', id: 1 },
	    				{ name: 'Item 2', id: 2 },
	    				{ name: 'Item 3', id: 3 }];



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

    .controller('PatternsListerFilterCtrl', function($scope, $timeout, $q, fsApi) {

        $scope.listerInstance = {};

        $scope.listerConf = {
            data: function(query, cb) {

                query.count = 23;
                fsApi
                    .get('dummy', query, {url: 'https://service.firestitch.com/api/'})
                    .then(function(result) {
                        cb(result.objects, result.paging);
                    });
            },
            inline: true,
            paging: {
                infinite: true,
                limit: 10
            },
            columns: [
                {title: 'Name', value: function(data) {
                        return "<b>" + data['name'] + "</b>";
                    }},
                {title: 'GUID', className: 'center', value: function(data) {
                        return '<a href="#/test">' + data["guid"] + '</a>';
                    }},
                {title: 'Date',
                    className: 'center',
                    value: function(data, $scope, myresolve) {
                        return data["date"];
                    },
                    resolve: {
                        myresolve: function() {
                            return "myresolve!!";
                        }
                    }
                },
                {title: 'Select',
                    value: function(label, $scope, data, list) {
                        return '<md-input-container style="margin:0"><md-select ng-model="someModel" placeholder="{{label}}"><md-option ng-value="opt" ng-repeat="opt in list">{{ opt.label }}</md-option></md-select></md-input-container>';
                    },
                    resolve: {
                        label: function() {
                            return "Select a state!";
                        },
                        list: function() {
                            return [{label: "Item 1"}, {label: "Item 2"}]
                        }
                    },
                    scope: {
                        prefix: 'Make a section '
                    }
                }
            ],
            filters: [
                {
                    name: 'search',
                    type: 'text',
                    label: 'Search'
                },
                {
                    name: 'state',
                    type: 'select',
                    label: 'State',
                    values: {
                        undefined: 'All',
                        active: 'Active',
                        deleted: 'Deleted'
                    }
                },
                {
                    name: 'date',
                    type: 'date',
                    label: 'Date'
                },
                {
                    name: 'range',
                    type: 'range',
                    label: 'Numbered range',
                    placeholders: ['Min', 'Max']
                },
                {
                    name: 'checkbox',
                    type: 'checkbox',
                    label: 'Show Deleted',
                    checked: 'deleted',
                    unchecked: 'active'
                },
            ]
        };
    })

    .controller('PatternsListerSimpleSearchCtrl', function ($scope, $timeout, $q, fsApi) {

        $scope.listerInstance = {};

        $scope.listerConf = {

            data: function(query, cb) {

                query.count = 23;
                fsApi
                    .get('dummy',query,{ url: 'https://service.firestitch.com/api/' })
                    .then(function(result) {
                        cb(result.objects,result.paging);
                    });
            },

            inline: false,
            paging: {
                infinite: true,
                limit: 10
            },

            actions: [

                {
                    label: 'Edit',
                    icon: 'edit',
                    click: function(data, event) {
                        alert("Edit Action Click: " + JSON.stringify(data));
                    }
                },

                {
                    label: 'Delete',
                    icon: 'delete',
                    delete:  {
                                content: 'Are you sure you would like to remove this?',
                                ok: function(data) {
                                    alert("Delete Action Click: " + JSON.stringify(data));
                                }
                            }
                }

            ],

            columns: [
                { title: 'Name' , value: function(data) {
                    return "<b>" + data['name'] + "</b>";
                }},
                { title: 'GUID' , className: 'center', value: function(data) {
                    return '<a href="#/test">' + data["guid"] + '</a>';
                }},
                {   title: 'Date',
                    className: 'center',
                    value: function(data, $scope, myresolve) {
                        return data["date"];
                    },
                    resolve: {
                        myresolve: function() {
                            return "myresolve!!";
                        }
                    }
                }
            ],

            filters: [
                {
                    name: 'search',
                    type: 'text',
                    label: 'Search'
                },
                {
                    name: 'state',
                    type: 'select',
                    label: 'State',
                    values: {
                        undefined: 'All',
                        active: 'Active',
                        deleted: 'Deleted'
                    }
                },
                {
                    name: 'date',
                    type: 'date',
                    label: 'Date'
                },
                {
                    name: 'search',
                    type: 'text',
                    label: 'Search'
                },
                {
                    name: 'state',
                    type: 'select',
                    label: 'State',
                    values: {
                        undefined: 'All',
                        active: 'Active',
                        deleted: 'Deleted'
                    }
                },
                {
                    name: 'date',
                    type: 'date',
                    label: 'Date'
                },
                {
                    name: 'range',
                    type: 'range',
                    label: 'Numbered range',
                    placeholder: ['Min long placeholder', 'Max long placeholder']
                }
            ]
        };
    })
    ;

})();

