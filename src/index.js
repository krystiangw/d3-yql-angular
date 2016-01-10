import angular from 'angular';
import uibs from 'angular-ui-bootstrap';
import chart from 'components/chart-directive.js';
import selection from 'components/selection-directive.js';
import style from 'style.css';
import yqlModule from 'services/yql-service.js';

class AppController {

  constructor(yql) {
    var vm = this;
    vm.chartStocks = ['YHOO', 'CVGW'];
    vm.chartStartDate = '2013-08-10';
    vm.chartEndDate = '2014-03-10';

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

  }

}

angular.module('stockApp', [uibs, chart, yqlModule, selection])
  .controller('AppController', AppController);

angular.bootstrap(document, ['stockApp']);
