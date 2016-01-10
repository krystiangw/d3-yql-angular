import angular from 'angular';

export default angular.module('services.dataUtils', [])
    .service('dataUtils', dataUtils)
    .name;

function dataUtils() {

    return {
        groupBy: groupBy
    };

    function groupBy(arr, fnc){
        var groups = {};

        arr.forEach( (item) => {
            var group = JSON.stringify( fnc(item) );
            groups[group] = groups[group] || [];
            groups[group].push( item );  
        });

        return Object.keys(groups).map( (group) => {
            return groups[group]; 
        });
    }
}