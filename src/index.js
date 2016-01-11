import angular from 'angular';
import uibs from 'angular-ui-bootstrap';
import chart from 'components/chart-directive.js';
import chartDetails from 'components/chart_details-directive.js';
import chartData from 'components/chart_data-directive.js';
import selection from 'components/selection-directive.js';
import style from 'style.css';
import yqlModule from 'services/yql-service.js';


class AppController {

  constructor(yql, $scope, $filter) {
    var vm = this;
    // init data
    vm.chartStocks = ['YHOO', 'CAMP'];
    vm.chartStartDate = '2014-01-10';
    vm.chartEndDate = '2014-03-10';

    vm.selectedDay = '2014-01-10';

    vm.selectedData = [];

    var dateFilter = $filter('date');

    vm.onSelected = () => {
        vm.loading = true;
        yql.get(vm.chartStocks, 
            dateFilter(vm.chartStartDate, 'yyyy-MM-dd'), 
            dateFilter(vm.chartEndDate, 'yyyy-MM-dd'
        ))
        .then((data)=>{
            vm.loading = false;
            vm.chartData = data;
            // init values
            vm.chartDetailsData = data.filter((item)=>{
                return item.Date === data[0].Date;
            });

            vm.selectedDay = data[0].Date;
            vm.stockData = data.filter((item)=>{
                return item.Symbol === data[0].Symbol;
            });
        });
    };
    // init data load
    vm.onSelected();

    vm.chartDaySelected = (data) =>{
        vm.chartDetailsData = data.data;
        vm.selectedDay = data.date;
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

angular.module('stockApp', [uibs, chart, yqlModule, selection, chartDetails, chartData])
  .controller('AppController', AppController);

angular.bootstrap(document, ['stockApp']);
