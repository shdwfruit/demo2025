// Load the data
const penguins = d3.csv("penguins.csv");

// Once the data is loaded, proceed with plotting
penguins.then(function(data) {
    // Convert string values to numbers
    data.forEach(function(d) {
        d.bill_length_mm = +d.bill_length_mm;
        d.flipper_length_mm = +d.flipper_length_mm;
    });

    // Define the dimensions and margins for the SVG
    const width = 600, height = 400;
    const margin = {top: 30, bottom: 30, left: 30, right: 30};

    // Create the SVG container
    const svg = d3.select("#scatterplot")
      .attr("width", width)
      .attr("height", height)
      .style('background', '#e9f7f2');
      
    // Set up scales for x and y axes
    const xScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.bill_length_mm)-5, d3.max(data, d => d.bill_length_mm)+5])
        .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.flipper_length_mm)-5, d3.max(data, d => d.flipper_length_mm)+5])
        .range([height - margin.bottom, margin.top]);

    // Add scales     
    svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));

    svg.append('g')
          .attr('transform', `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom().scale(xScale));

    // Add circles for each data point
    svg.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("cx", d => xScale(d.bill_length_mm))
        .attr("cy", d => yScale(d.flipper_length_mm))
        .attr("r", 3);
});