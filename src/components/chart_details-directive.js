
import angular from 'angular';

export default angular.module('directives.chartDetails', [])
  .directive('chartDetails', chartDetails)
  .name;


function chartDetails(){
    return {
        restrict: 'E',
        scope: {
            chartDetailsData:'=',
            chartDetailsDate: '='
        },
        template: `
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Daily details {{chartDetailsDate | date}}</h3>
          </div>
          <table class="table">
            <tr>
              <th>
                Symbol
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
            <tr ng-repeat="item in chartDetailsData" >
              <td>
                {{item.Symbol}}
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
            <tr ng-if="!chartDetailsData.length">
             <th colspan="5">
               <span ng-if="chartDetailsDate">
                No data for {{chartDetailsDate | date:'EEEE yyyy MMMM dd'}}</span>
               </span>
               <span ng-if="!chartDetailsDate">
                Select date on x Axis first
                </span>
             </th>
            </tr>
          </table>
        </div>
        `
    };
}