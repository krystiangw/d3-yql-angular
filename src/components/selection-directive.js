
import angular from 'angular';

export default angular.module('directives.selection', [])
  .directive('selection', SelectionDirective)
  .name;


function SelectionDirective(){

    return {
        restrict: 'E',
        scope: {
            selected: '=',
            onSelected: '&'
        },
        template: `
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">Select max 3 stock symbols: </h3>
              <h3 class="panel-title">{{vm.selected.join(' ')}}</h3>
            </div>
            <div class="panel-body">
              <ul class="list-group list-selection">
                <a ng-repeat="symbol in vm.SYMBOLS"
                 ng-click="vm.select(symbol)"
                 class="list-group-item"
                 ng-class="{'active':vm.isSelected(symbol)}">{{symbol}}</a>
              </ul>
            </div>
          </div>
        `,
        controller: selectionCtrl,
        controllerAs: 'vm',
        bindToController: true
    };


    function selectionCtrl() {
        var vm = this;
        vm.isSelected = isSelected;
        vm.select = select;
        // example stock symbols
        vm.SYMBOLS = [
            "APP",
            "YHOO",
            "CVGW", 
            "ANGO",
            "CAMP",
            "LNDC",
            "MOS",
            "NEOG",
            "SONC",
            "TISI",
            "SHLM",
            "FDO",
            "FC",
            "JPST.PK",
            "RECN",
            "RELL",
            "RT",
            "UNF",
            "WOR",
            "WSCI",
            "ZEP",
            "AEHR" 
        ];


        function isSelected(item){
            return vm.selected.indexOf(item) > -1;
        }

        function select(item){
            if (isSelected(item) && vm.selected.length > 1){
                vm.selected.splice(vm.selected.indexOf(item), 1);
                vm.onSelected();
            } else if (!isSelected(item) && vm.selected.length < 3) {
                vm.selected.push(item);
                vm.onSelected();
            }
        }
    }
}