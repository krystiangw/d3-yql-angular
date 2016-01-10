import angular from 'angular';
import dataUtilModule from 'services/data_util-service.js';

class ChartController {
  constructor() {
    this.title = 'Angular Webpack Minimal Starter';
    this.info = angular.version;
  }
}

export default angular.module('directives.chart', [dataUtilModule])
  .directive('chart', ChartDirective)
  .name;


function ChartDirective(dataUtils){

    return {
        restrict: 'E',
        scope: {
            chartData: '=',
            chartStartDay: '=',
            chartEndDay: '=',
        },
        template: `
          <div>
          </div>
        `,
        link: chartLink
    };


    function chartLink(scope, elm, attrs) {
        scope.$watch('chartData',() =>{
            if (scope.chartData && scope.chartData.length) {
                render(scope.chartData);
            }
        });

        var margin = { top: 30, right: 40, bottom: 30, left: 50 },
                width = 600 - margin.left - margin.right,
                height = 270 - margin.top - margin.bottom;

        // // Parse the date / time
        var parseDate = d3.time.format("%Y-%m-%d").parse;

        // Set the ranges
        var x = d3.time.scale().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);

        var xAxis = d3.svg.axis().scale(x)
            .orient("bottom").ticks(5);

        var yAxis = d3.svg.axis().scale(y)
            .orient("left").ticks(5);

        var valueline = d3.svg.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.high); });


        var svg = d3.select(elm[0])
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate("+ margin.left+ "," + margin.top + ")");

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);

            svg.append("text")
                .attr("x", (width / 2))
                .attr("y", margin.top / 2)
                .attr("text-anchor", "middle")
                .attr("class", "shadow")
                .style("font-size", "16px");

            svg.append("text")
                .attr("class", "stock")
                .attr("x", (width / 2))
                .attr("y", margin.top / 2)
                .attr("text-anchor", "middle")
                .style("font-size", "16px");


        function render(data) {
            data.forEach(function(d) {
                d.date = parseDate(d.Date);
                d.high = +d.High;
                d.low = +d.Low;
            });
            let groups = dataUtils.groupBy(data, (item) => {
                return item.Symbol;
            });

            x.domain(d3.extent(data, function(d) {
                return d.date; }));
            y.domain([
                d3.min(data, function(d) { 
                    return d.low; }), 
                d3.max(data, function(d) { 
                    return d.high; })
            ]);

            var svg = d3.select(elm[0]).transition(),
            svgBase = d3.select(elm[0]).select('g');
            svgBase.selectAll('.line').remove();

            groups.forEach(function(group){
                svgBase.append("path")
                .attr("class", "line")
                .attr("d", valueline(group))
                .text('group !');
            });

            svg.select(".label")   // change the label text
            .duration(750)
            .attr("transform", "translate(" + (width+3) + "," + y(data[0].high) + ")");

            svg.select(".shadow") // change the title shadow
            .duration(750)
            .text('Title shadow');  

            svg.select(".stock")   // change the title
            .duration(750)
            .text('text stock');

            svg.select(".x.axis") // change the x axis
            .duration(750)
            .call(xAxis);
            svg.select(".y.axis") // change the y axis
            .duration(750)
            .call(yAxis);

        }
    }

}