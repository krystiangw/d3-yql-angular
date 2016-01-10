
import angular from 'angular';

export default angular.module('directives.selection', [])
  .directive('selection', SelectionDirective)
  .name;


function SelectionDirective(dataUtils){

    return {
        restrict: 'E',
        scope: {
            selected: '=',
            onSelected: '&'
        },
        template: `
          <h5>Select max 3 stock symbols.</h5>
          <ul class="list-group list-selection">
            <a ng-repeat="symbol in vm.SYMBOLS"
             ng-click="vm.select(symbol)"
             class="list-group-item"
             ng-class="{'active':vm.isSelected(symbol)}">{{symbol}}</a>
          </ul>
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
            } else if (vm.selected.length < 3) {
                vm.selected.push(item);
                vm.onSelected();
            }
        }
    }
}