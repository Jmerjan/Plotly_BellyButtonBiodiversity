
// Create initial INIT function that will read and run the function 
async function init() {
  const response = await fetch ("./samples.json");
  data = await response.json();
  console.log(data)

  

  var samples= data.samples
  // console.log(samples)
  metadata= data.metadata
  // console.log(metadata)
  names= data.names
  // console.log(names)

  //dropdown / demographics

  //need to create a variable 

  var dropdown=document.getElementById("selDataset");
  // chosenid= dropdown.addEventListener('change', optionChanged()) 
  // console.log(chosenid);
  for(var id = 0; id < names.length; id++) {
    var id_demographics=names[id];
    var info= document.createElement("option");
    info.textContent=id_demographics;
    info.value=id_demographics;
    dropdown.appendChild(info);
    // console.log(info)
    // console.log(id_demographics)
  }

  //initial bar, bubble and demograph function for the first ID in the index //

  var firstid= data.names[0]
  var resultArray = metadata.filter(sampleObj => sampleObj.id == firstid);
  var result= resultArray[0]


  var PANEL=document.getElementById("sample-metadata")
  PANEL.innerHTML=""
  
  for(let [key, value] of Object.entries(result)){
    console.log(`${key.toUpperCase()}: ${value}`);
    PANEL.append(`${key.toUpperCase()}: ${value} \n`)
  }
  
  // Bar Chart//
  // get the initial X & Y  axis data

  var samplevalues= samples[0].sample_values
  .sort((a,b) => b - a)
  .slice(0,10)
  .reverse();
  // console.log(samplevalues)

  var otulabels = samples[0].otu_ids.map(d => `OTU ${d}`)
  .slice(0,10)
  .reverse();
  // console.log(otulabels)

  var hovertext= samples[0].otu_labels
  .slice(0,10)
  .reverse();
  // console.log(hovertext)

  // Create trace and necessary info for bar chart

  var bartrace= {
      type: 'bar',
      x: samplevalues,
      y: otulabels,
      text: hovertext,
      orientation: 'h'
  }

  var bardata= [bartrace]
  var layout = {
      title: 'Top 10 OTUs',
      yaxis: {
        autorange: true,
      },
      xaxis: {
        autorange: true,
      },
    };

    Plotly.newPlot("bar", bardata, layout);


    /// Create a bubble chart

    //variables otu_ids (x values), sample_values (y values), sample_values (y marker values),
    // otu_ids marker colors, otu_labels text labels
    
    //x bubble Values
    var bubotuids = samples[0].otu_ids

    //y bubble
    var samplevalues= samples[0].sample_values
    
  
    //text values bubble
    var bublabels= samples[0].otu_labels
    

    var bubbletrace = {
      x: bubotuids,
      y: samplevalues,
      text: bublabels,
      mode: 'markers',
      marker: {
          size: samplevalues,
          color: bubotuids,
          colorscale: "Earth",
      }};
      
      var bublayout =  {
          xaxis: {
          title: 'OTU ID',
          },
          showlegend: false,
          height: 600,
          width: 1200
        };
        
      var bubdata= [bubbletrace];


}

// Option Change function created to change the data off of the //
async function optionChanged(){
  //creating the selector variable for the dropdown
  var select = document.getElementById('selDataset');
  var value = select.options[select.selectedIndex].value;
  console.log(value); 
  createmetadata(value);
  createplots(value);
  
}

function createmetadata(id){

  //demographic bar for the ID of the ID selected in demographic bar//
  metadata= data.metadata


  var resultArray = metadata.filter(sampleObj => sampleObj.id == id);
  var result= resultArray[0]

  var PANEL=document.getElementById("sample-metadata")
  PANEL.innerHTML=""
  // var firstid= metadata[0]
  for(let [key, value] of Object.entries(result)){
    console.log(`${key.toUpperCase()}: ${value}`);
    PANEL.append(`${key.toUpperCase()}: ${value} \n`)
  }};

  function createplots(id){


  // get the samples variable from the initial retrieving of JSON
  samples= data.samples
  
      // Bar Chart for the selected ID//
  // get the initial X & Y  axis data

  // use a filter to match the sample data 
  var chosensamplefilter= samples.filter(sampleObj => sampleObj.id == id);

  var chosensample= chosensamplefilter[0];

  // for bar chart sort and slice to ensure we are receiving the top 10 
  var samplevalues= chosensample.sample_values
  .sort((a,b) => b - a)
  .slice(0,10)
  .reverse();
  // console.log(samplevalues)

  var otulabels = chosensample.otu_ids.map(d => `OTU ${d}`)
  .slice(0,10)
  .reverse();
  // console.log(otulabels)

  var hovertext= chosensample.otu_labels
  .slice(0,10)
  .reverse();
  // console.log(hovertext)
  

  // Create trace and necessary info for bar chart

  var bartrace= {
      type: 'bar',
      x: samplevalues,
      y: otulabels,
      text: hovertext,
      orientation: 'h'
  }

  var bardata= [bartrace]
  var layout = {
      title: 'Top 10 OTUs',
      yaxis: {
        autorange: true,
      },
      xaxis: {
        autorange: true,
      },
    };

    Plotly.newPlot("bar", bardata, layout);


    /// Create a bubble chart for selected ID

    //variables otu_ids (x values), sample_values (y values), sample_values (y marker values),
    // otu_ids marker colors, otu_labels text labels

    
    //x bubble Values
    var bubotuids = chosensample.otu_ids;
    console.log(bubotuids)
    

    //y bubble values
    var bubsamplevalues= chosensample.sample_values;
    
  
    //text values bubble
    var bublabels= chosensample.otu_labels;
    

    var bubbletrace = {
      x: bubotuids,
      y: bubsamplevalues,
      text: bublabels,
      mode: 'markers',
      marker: {
          size: bubsamplevalues,
          color: bubotuids,
          colorscale: "Earth",
      }};
      
      var bublayout =  {
          xaxis: {
          title: 'OTU ID',
          },
          showlegend: false,
          height: 600,
          width: 1200
        };
        
      var bubdata= [bubbletrace];

      Plotly.newPlot("bubble", bubdata, bublayout);
  }
init()