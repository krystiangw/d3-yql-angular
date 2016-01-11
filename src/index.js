import angular from 'angular';
import uibs from 'angular-ui-bootstrap';
import chart from 'components/chart-directive.js';
import daytable from 'components/daytable-directive.js';
import dataTable from 'components/datatable-directive.js';
import selection from 'components/selection-directive.js';
import style from 'style.css';
import yqlModule from 'services/yql-service.js';


class AppController {

  constructor(yql, $scope, $filter) {
    var vm = this,
        dateFilter = $filter('date'),
        dateNow = new Date();

    // init data
    vm.chartStocks = ['YHOO', 'MOS'];
    vm.chartEndDate = dateFilter(dateNow, 'yyyy-MM-dd');
    vm.chartStartDate = dateFilter(dateNow.setMonth(dateNow.getMonth()-6), 'yyyy-MM-dd');

    vm.selectedDay = '2014-01-10';

    vm.chartData = [];

    

    vm.onSelected = () => {
        vm.loading = true;
        yql.get(vm.chartStocks, 
            dateFilter(vm.chartStartDate, 'yyyy-MM-dd'), 
            dateFilter(vm.chartEndDate, 'yyyy-MM-dd'
        ))
        .then((data)=>{
            vm.loading = false;
            vm.chartData = data;
            if (!vm.chartData.length){
                return;
            }
            // init values
            vm.chartDetailsData = data.filter((item)=>{
                return item.Date === data[0].Date;
            });
            vm.selectedDay = data[0].Date;

            vm.stockData = vm.chartData.filter((item)=>{
                return item.Symbol === data[0].Symbol;
            });
        });
    };
    // init data load
    vm.onSelected();

    vm.chartStockSelected = (data) =>{
        vm.stockData = data.data; 
        $scope.$apply();
    };


    $scope.$watch('vm.selectedDay', function (argument) {
        vm.selectedDay = dateFilter(vm.selectedDay, 'yyyy-MM-dd');

        vm.chartDetailsData = vm.chartData.filter((item)=>{
            return item.Date === vm.selectedDay;
        });
    });

  }

}

AppController.$inject = ['yql', '$scope', '$filter'];

angular.module('stockApp', [uibs, chart, yqlModule, selection, daytable, dataTable])
  .controller('AppController', AppController);

angular.bootstrap(document, ['stockApp']);
