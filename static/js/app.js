
 
function buildMetadata(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      let metadata = data.metadata;
      let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      let result = resultArray[0];
      let PANEL = d3.select("#sample-metadata");
      PANEL.html("");
      for (key in result){
        PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
      };
    });
  }
function myCharts(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      let samples = data.samples;
      let resultArray = samples.filter(sampleObj => sampleObj.id === sample);
      let result = resultArray[0];
      let otu_ids = result.otu_ids;
      let otu_labels = result.otu_labels;
      let sample_values = result.sample_values;

      let bubbleData = [
        {
          y: otu_ids,
          x: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
          }
         
        }
      ];
      let bubbleLayout = {
        title: "Bubble Bacteria Chart",
        margin: { t: 30},
        hovermode: "closest",
        xaxis: {title: "OTU ID"}
      };
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);

      let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
      let barData = [
        {
          y: yticks,
          x: sample_values.slice(0, 10).reverse(),
          text: otu_labels.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h",
        }
      ];
      let barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: { t: 30, l: 150 }
      };
      Plotly.newPlot("bar", barData, barLayout);

    });
}

function init() {
    let selector = d3.select("#selDataset");
    // Use the list of sample names to populate the select options
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      let sampleNames = data.names;
      for (let i = 0; i < sampleNames.length; i++){
        selector
          .append("option")
          .text(sampleNames[i])
          .property("value", sampleNames[i]);
      };
      let firstSample = sampleNames[0];
      myCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  function optionChanged(newSample) {
    myCharts(newSample);
    buildMetadata(newSample);
}
  // Initialize the dashboard
init();