var orgData;
var DATA;

function init(data){
    let dYear = [];
    for(let i=0; i<data.length; i++){
        dYear.push(data[i].Year)
    }
    dYear.sort().reverse();

    const seld = d3Select.select('#selDataset');
    dYear.forEach(d=>{
        let opt = seld.append('option')
            .attr('value', d)
            .text(d);
    })
    optionChanged(seld.node().value)
}

function dataFilter(fval){
    let fData = orgData.filter(d=>d.Year == Number(fval))[0]['Trade'];
    fData = fData.filter(d=>!(d.Export==0 && d.Import==0))

    return fData
}

// ===== Bubble Scatter ==========================================================================================
const svgHeight = 450;
const svgWidth = 500;
const svgMargin = {
    top : 25,
    right : 25,
    bottom : 75,
    left : 75
}
const width = svgWidth - svgMargin.left - svgMargin.right;
const height = svgHeight - svgMargin.top - svgMargin.bottom;

const d3Select = d3.select('#bscatter');
const svg = d3Select.append('svg')
    .attr('height', svgHeight)
    .attr('width', svgWidth);
var chartGroup = svg.append('g').attr('transform', `translate(${svgMargin.left}, ${svgMargin.top})`);

var xLinearScale = d3.scaleLinear().range([0, width]);
var yLinearScale = d3.scaleLinear().range([height, 0]);
var zLinearScale = d3.scaleLinear().range([1, 25]);
var colorScaleOrdinal = d3.scaleOrdinal().range(['red', 'black', 'green']).domain([-1, 0, 1]);

var gButtomAxis = chartGroup.append('g').attr('transform', `translate(0,${height})`);
var gLeftAxis = chartGroup.append('g');

const tooltip = d3Select.append("use")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("opacity", 0)
    .style("background-color", "black")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "white");

function showTooltip(d) {
    tooltip
        .style("top", `${d3.mouse(this)[1]}px`)
        .style("left", `${d3.mouse(this)[0]}px`)
        .style("opacity", 0.5)
        .html(`Country : ${d.Country}`)
}

function bscatter(DATA){

    xLinearScale.domain([-2000, d3.max(DATA, d=>d.Export)]);
    yLinearScale.domain([-2000, d3.max(DATA, d=>d.Import)]);
    zLinearScale.domain([d3.min(DATA, d=>d.Balance), d3.max(DATA, d=>d.Balance)]);

    gButtomAxis.call(d3.axisBottom(xLinearScale));
    gLeftAxis.call(d3.axisLeft(yLinearScale));

    var gCircle = chartGroup.selectAll("circle").data(DATA)
    gCircle
        .enter()
        .append("circle")
        .merge(gCircle)
        .attr("cx", d => xLinearScale(d.Export))
        .attr("cy", d => yLinearScale(d.Import))
        .attr("r", d => zLinearScale(d.Total))
        .attr("fill", d => colorScaleOrdinal((d.Balance>0)?1:(d.Balance<0)?-1:0))
        .attr("opacity", "0.3")
        .attr("stroke", "black")
        .on("mouseover", showTooltip)
    gCircle.exit().remove()
}
// ===============================================================================================================

// ===== Barchart ==========================================================================================
const svgHeight_Bar = 450;
const svgWidth_Bar = 500;
const svgMargin_Bar = {
    top : 25,
    right : 25,
    bottom : 75,
    left : 75
}
const width_Bar = svgWidth_Bar - svgMargin_Bar.left - svgMargin_Bar.right;
const height_Bar = svgHeight_Bar - svgMargin_Bar.top - svgMargin_Bar.bottom;

const d3Select_Bar = d3.select('#barchartx');
const svg_Bar = d3Select_Bar.append('svg')
    .attr('height', svgHeight_Bar)
    .attr('width', svgWidth_Bar);
var chartGroup_Bar = svg_Bar.append('g').attr('transform', `translate(${svgMargin_Bar.left}, ${svgMargin_Bar.top})`);

var xLinearScale_Bar = d3.scaleBand()
                        .range([0, width_Bar])
                        .padding(0.2);
var yLinearScale_Bar = d3.scaleLinear()
                        .range([height_Bar, 0]);
var gButtomAxis_Bar = chartGroup_Bar.append('g')
                                    .attr("transform", `translate(0, ${height_Bar})`);
var gLeftAxis_Bar = chartGroup_Bar.append('g');
// var zLinearScale_Bar = d3.scaleLinear().range([10, 50]);
// var colorScaleOrdinal_Bar = d3.scaleOrdinal().range(['red', 'black', 'green']).domain([-1, 0, 1]);


function barchart(DATA, topx){
    const topSlice = 10;
    let topDATA;
    let col = '';
    switch (topx){
        case 0: // Top Deficit
            topDATA = DATA.sort((a, b) => a.Balance - b.Balance).slice(0,topSlice);
            for(let i=0; i<topDATA.length; i++){
                topDATA[i].Balance *= -1
            }
            col = 'Balance';
            break
        case 1: // Top Surplus
            topDATA = DATA.sort((a, b) => b.Balance - a.Balance).slice(0,topSlice);
            col = 'Balance';
            break
        case 2: // Top Export
            topDATA = DATA.sort((a, b) => b.Export - a.Export).slice(0,topSlice);
            col = 'Export';
            break
        case 3: // Top Import
            topDATA = DATA.sort((a, b) => b.Import - a.Import).slice(0,topSlice);
            col = 'Import';
            break
        default: // Top Total
            topDATA= DATA.sort((a, b) => b.Total - a.Total).slice(0,topSlice);
            col = 'Total'
    }

    xLinearScale_Bar.domain(topDATA.map(d=>d.Country));
    yLinearScale_Bar.domain([d3.min(topDATA, d=>d[col]), d3.max(topDATA, d=>d[col])]);
    // zLinearScale_Bar.domain([d3.min(topDATA, d=>d.Balance), d3.max(topDATA, d=>d.Balance)]);

    gButtomAxis_Bar.call(d3.axisBottom(xLinearScale_Bar))
                    .selectAll("text")
                    .attr("transform", "translate(-10,0)rotate(-45)")
                    .style("text-anchor", "end");
    gLeftAxis_Bar.call(d3.axisLeft(yLinearScale_Bar));

    var gBar = chartGroup_Bar.selectAll("rect").data(topDATA)
    gBar
        .enter()
        .append("rect")
        .merge(gBar)
        .transition().duration(1000)
        .attr("x", d => xLinearScale_Bar(d.Country))
        .attr("y", d => yLinearScale_Bar(d[col]))
        .attr("width", 25)
        .attr("height", d=>height_Bar-yLinearScale_Bar(d[col]))
        .attr("fill", "pink")
    gBar.exit().remove()
}
// ===============================================================================================================


function optionChanged(svalue){
    DATA = dataFilter(svalue);
    bscatter(DATA);
    barchart(DATA,0)
}


d3.json('../data/aus_trade.json').then(data =>{
    orgData = data;
    init(orgData)
})
