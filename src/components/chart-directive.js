import angular from 'angular';
import dataUtilModule from 'services/data_util-service.js';

export default angular.module('directives.chart', [dataUtilModule])
  .directive('chart', chartDirective)
  .name;

function chartDirective(){

    return {
        restrict: 'E',
        scope: {
            chartData: '=',
            chartSelectedDay: '=',
            chartStockSelected: '&',
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

        var margin = { top: 30, right: 40, bottom: 110, left: 50 },
                width = 600 - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom;

        // // Parse the date / time
        var parseDate = d3.time.format("%Y-%m-%d").parse;

        // Set the ranges
        var x = d3.time.scale().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);

        var xAxis = d3.svg.axis().scale(x)
            .orient("bottom").ticks(35);

        var yAxis = d3.svg.axis().scale(y)
            .orient("left").ticks(5);

        var color = d3.scale.category10();

        var priceline = d3.svg.line()   
            .x(function(d) { return x(new Date(d.Date)); })
            .y(function(d) { return y(d.Close); });


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

        function dateSelected(date, index){
            scope.chartSelectedDay = date;
            scope.$apply();
        }

        function render(data) {
            data.forEach(function(d) {
                d.date = parseDate(d.Date);
                d.high = +d.High;
                d.low = +d.Low;
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
            svgBase.selectAll('.legend').remove();

            var dataNest = d3.nest()
                .key(function(d) {return d.Symbol;})
                .entries(data);

            
            dataNest.forEach(function(d,i) { 
                svgBase.append("path")
                .attr("class", "line")
                .style("stroke", () => { 
                    d.color = color(d.key); 
                    return d.color;
                })
                .attr("id", 'tag'+d.key.replace(/\s+/g, '')) // assign ID
                .attr("d", priceline(d.values));

                svgBase.append("text")
                .attr("x", (100/2)+i*100)  // space legend
                .attr("y", height + (margin.bottom/2)+ 5)
                .attr("class", "legend")    // style the legend
                .style("fill",() => { // Add the colours dynamically
                    d.color = color(d.key); 
                    return d.color;
                })
                .on("click", function(){
                    svgBase.selectAll(".line").style('stroke-width','1px');
                    svgBase.selectAll(".legend").style('font-weight','normal');

                    d3.select("#tag"+d.key.replace(/\s+/g, ''))
                    .transition().duration(100) 
                    .style("stroke-width", '3px');

                    this.style.setProperty('font-weight', 'bold');

                    scope.chartStockSelected({
                        symbol: d.key,
                        data: d.values
                    });
                })  
                .text(d.key); 
             });

            svg.select(".label")   // change the label text
            .duration(750)
            .attr("transform", "translate(" + (width+3) + "," + y(data[0].high) + ")");

            svg.select(".x.axis") // change the x axis
            .duration(750)
            .call(xAxis)
            .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-75)" );

            svgBase.select(".x.axis").selectAll('.tick')
            .on('mouseover', mouseOver)
            .on('mouseout', mouseOut)
            .on('click', dateSelected);

            svg.select(".y.axis") // change the y axis
            .duration(750)
            .call(yAxis);

            function mouseOver(date, index){
                svgBase.select(".x.axis")
                .selectAll("text")[0][index]
                .style.setProperty("font-weight", "bold");
            }

            function mouseOut(date, index){
                svgBase.select(".x.axis")
                .selectAll("text")[0][index]
                .style.setProperty("font-weight", "normal");
            }

        }

    }

}