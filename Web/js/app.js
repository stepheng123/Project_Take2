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
    console.log(DATA);

    optionChanged(seld.node().value)
}

function dataFilter(fval){
    console.log(fval);
    let fData = orgData.filter(d=>d.Year == Number(fval))[0]['Trade'];
    fData = fData.filter(d=>!((isNaN(d.Export)||d.Export==null) && (isNaN(d.Import)||d.Import==null)))
    for(let i=0; i<fData.length; i++){
        fData[i]['Balance'] = fData[i].Export-fData[i].Import
        fData[i]['Total'] = fData[i].Export+fData[i].Import
    }
    console.log(DATA);
    return fData
}

// ===== Bubble Scatter ==========================================================================================
const svgHeight = 800;
const svgWidth = 1000;
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
var zLinearScale = d3.scaleLinear().range([-40, 50]);
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
const svgHeight_Bar = 100;
const svgWidth_Bar = 150;
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
    .attr('height_Bar', svgHeight_Bar)
    .attr('width_Bar', svgWidth_Bar);
var chartGroup_Bar = svg_Bar.append('g').attr('transform', `translate(${svgMargin_Bar.left}, ${svgMargin_Bar.top})`);

var xLinearScale_Bar = d3.scaleLinear().range([0, width_Bar]);
var yLinearScale_Bar = d3.scaleLinear().range([height_Bar, 0]);
var zLinearScale_Bar = d3.scaleLinear().range([-40, 50]);
var colorScaleOrdinal_Bar = d3.scaleOrdinal().range(['red', 'black', 'green']).domain([-1, 0, 1]);

var gButtomAxis_Bar = chartGroup_Bar.append('g').attr('transform', `translate(0,${height_Bar})`);
var gLeftAxis_Bar = chartGroup_Bar.append('g');

function xxx(DATA){

    const ttDATA = 
    xLinearScale_Bar.domain([-2000, d3.max(DATA, d=>d.Export)]);
    yLinearScale_Bar.domain([-2000, d3.max(DATA, d=>d.Import)]);
    zLinearScale_Bar.domain([d3.min(DATA, d=>d.Balance), d3.max(DATA, d=>d.Balance)]);

    gButtomAxis_Bar.call(d3.axisBottom(xLinearScale_Bar));
    gLeftAxis_Bar.call(d3.axisLeft(yLinearScale_Bar));

    var gCircle = chartGroup_Bar.selectAll("circle").data(DATA)
    gCircle
        .enter()
        .append("circle")
        .merge(gCircle)
        .attr("cx", d => xLinearScale_Bar(d.Export))
        .attr("cy", d => yLinearScale_Bar(d.Import))
        .attr("r", d => zLinearScale_Bar(d.Total))
        .attr("fill", d => colorScaleOrdinal_Bar((d.Balance>0)?1:(d.Balance<0)?-1:0))
        .attr("opacity", "0.3")
        .attr("stroke", "black")
        .on("mouseover")//, showTooltip)
    gCircle.exit().remove()
}
// ===============================================================================================================


function optionChanged(svalue){
    DATA = dataFilter(svalue);
    bscatter(DATA);
    xxx(DATA)
}


d3.json('../data/aus_trade.json').then(data =>{
    orgData = data;
    init(orgData)
})
