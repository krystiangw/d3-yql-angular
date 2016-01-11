
import angular from 'angular';

export default angular.module('directives.dataTable', [])
  .directive('datatable', dataTableDirective)
  .name;


function dataTableDirective(){
    return {
        restrict: 'E',
        scope: {
            datatableData:'=',
            datatableSelectedDay: '='
        },
        template: `
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Total data for {{datatableData[0].Symbol}}</h3>
          </div>
          <div class="panel-body">
            <table class="table table-hover">
              <tr>
                <th>
                  Date
                </th>
                <th>
                  Open
                </th>
                <th>
                  Close
                </th>
                <th>
                  High
                </th>
                <th>
                  Low
                </th>
                <th>
                  Volume
                </th>
              </tr>
              <tr ng-repeat="item in datatableData" ng-class="{'active':item.Date == datatableSelectedDay}" ng-click="select(item.Date)">
                <td>
                  {{item.Date | date}}
                </td>
                <td>
                  {{item.Close | currency}}
                </td>
                <td>
                  {{item.Close | currency}}
                </td>
                <td>
                  {{item.High | currency}}
                </td>
                <td>
                  {{item.Low | currency}}
                </td>
                <td>
                  {{item.Volume}}
                </td>
              </tr>
              <tr ng-if="!datatableData.length">
               <th colspan="5">
                 <span >
                  Select stock symbol
                  </span>
               </th>
              </tr>
            </table>
          </div>
        </div>
        `,
        link: linkChartData
    };


    function linkChartData(scope, elm, attrs) {
        scope.select = function(date) {
            scope.datatableSelectedDay = date;
        };
    }

}