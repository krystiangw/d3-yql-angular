
import angular from 'angular';

export default angular.module('directives.chartDataStock', [])
  .directive('chartData', chartData)
  .name;


function chartData(){
    return {
        restrict: 'E',
        scope: {
            chartDataStock:'=',
        },
        template: `
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Total data for {{chartDataStock[0].Symbol}}</h3>
          </div>
          <div class="panel-body">
            <table class="table">
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
              <tr ng-repeat="item in chartDataStock" >
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
              <tr ng-if="!chartDataStock.length">
               <th colspan="5">
                 <span >
                  Select stock symbol
                  </span>
               </th>
              </tr>
            </table>
          </div>
        </div>
        `
    };
}