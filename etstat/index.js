
var app = angular.module('workfCharts', []);
app.controller('workfController', function ($scope, $http) {
    $http.get('workf.json').then(function (res) {
        var result = res.data;
        $scope.workflows = result.workflowList;
        console.log(result.workflowList);
    });
});
