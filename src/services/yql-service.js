import angular from 'angular';

export default angular.module('services.yql', [])
    .service('yql', yql)
    .name;

yql.$inject = ['$http', '$q'];

function yql($http, $q) {
    const baseUrl = "http://query.yahooapis.com/v1/public/yql";

    return {
        get: get
    };


    function get(stocks, startDate, endDate) {
        let deferred = $q.defer(),
        // YQL query
            query = encodeURIComponent(`select * from yahoo.finance.historicaldata where symbol in ` +
            `${JSON.stringify(stocks).replace('[','(').replace(']', ')')}` +
            `and startDate = "${startDate}" and endDate = "${endDate}"`
        );

        $http({
            method: 'GET', 
            url: baseUrl + '?q=' + query, 
            params: {
                format: 'json',
                env: 'store://datatables.org/alltableswithkeys'
            }
        }).success((data) =>{
            let results = data.query.results || {quote: []};
            deferred.resolve(results.quote);
        }).error(deferred.reject);

        return deferred.promise;
    }

}