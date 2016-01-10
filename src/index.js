import angular from 'angular';
import uibs from 'angular-ui-bootstrap';
import chart from 'components/chart-directive.js';
import chartDetails from 'components/chart_details-directive.js';
import selection from 'components/selection-directive.js';
import style from 'style.css';
import yqlModule from 'services/yql-service.js';

class AppController {

  constructor(yql, $scope) {
    var vm = this;
    vm.chartStocks = ['YHOO'];
    vm.chartStartDate = '2014-01-10';
    vm.chartEndDate = '2014-03-10';
    vm.selectedData = [];

    vm.title = 'Angular Webpack Minimal Starter';
    vm.info = angular.version;

    vm.onSelected = () => {
        yql.get(vm.chartStocks, vm.chartStartDate, vm.chartEndDate)
        .then((data)=>{
            vm.chartData = data;
        });
    };
    // init data load
    vm.onSelected();

    vm.chartSelected = (data) =>{
        vm.chartDetailsData=data.data;
        vm.chartDetailsDate = data.date;
        $scope.$apply();
    };

  }

}

angular.module('stockApp', [uibs, chart, yqlModule, selection, chartDetails])
  .controller('AppController', AppController);

angular.bootstrap(document, ['stockApp']);
