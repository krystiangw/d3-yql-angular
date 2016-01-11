
import angular from 'angular';

export default angular.module('directives.daytable', [])
  .directive('daytable', daytableDirective)
  .name;


function daytableDirective(){
    return {
        restrict: 'E',
        scope: {
            daytableData:'=',
            daytableSelectedDay: '='
        },
        template: `
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Daily details {{daytableSelectedDay | date}}</h3>
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
            <tr ng-repeat="item in daytableData" >
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
            <tr ng-if="!daytableData.length">
             <th colspan="5">
               <span ng-if="daytableData">
                No data for {{chartDetailsDate | date:'EEEE yyyy MMMM dd'}}</span>
               </span>
               <span ng-if="!daytableData">
                Select date on x Axis first
                </span>
             </th>
            </tr>
          </table>
        </div>
        `
    };
}