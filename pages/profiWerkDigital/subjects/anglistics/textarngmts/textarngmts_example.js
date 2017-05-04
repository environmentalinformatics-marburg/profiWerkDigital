// set the background relation colors for the text elements belong together
function setColorRelations(){
  document.getElementById("ex-content-1").style.display = "none";
  document.getElementById("ex-content-2").style.display = "block";
  document.getElementById("ex-but-2").style.display = "block";
}

// display the example sentence
function viewExample(){
  document.getElementById("ex-content-3").style.display = "block";
  document.getElementById("ex-but-3").style.display = "block";
}

function openSite(site) { 
  window.open(site);
}