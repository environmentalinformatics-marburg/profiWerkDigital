$(function(){

var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");

// variables used to get mouse position on the canvas
var $canvas=$("#canvas");
var canvasOffset=$canvas.offset();
var offsetX=canvasOffset.left;
var offsetY=canvasOffset.top;
var scrollX=$canvas.scrollLeft();
var scrollY=$canvas.scrollTop();

var text_height = 16;
var text_gap = 7;
var typecase_border = 0;

// variables to save last mouse position
// used to see how far the user dragged the mouse
// and then move the text by that distance
var startX;
var startY;

// some text objects
var texts=[];

// some test texts
texts.push({text:"Man",x:20,y:20});
texts.push({text:"glaubt",x:150,y:70});
texts.push({text:"man",x:90,y:70});
texts.push({text:"hat",x:60,y:90});
texts.push({text:"schon",x:80,y:120});
texts.push({text:"alles",x:180,y:300});
texts.push({text:"gesehen",x:800,y:300});
texts.push({text:"und",x:200,y:160});
texts.push({text:"dann",x:300,y:200});
texts.push({text:"kam",x:350,y:250});
texts.push({text:"ProPraxis",x:20,y:300});

/*// some test long texts
texts.push({text:"ManManManManManManManMan",x:20,y:20});
texts.push({text:"glaubtglaubtglaubtglaubtglaubt",x:20,y:70});
texts.push({text:"manmanmanmanmanmanmanmanmanman",x:90,y:70});
texts.push({text:"hathathathathathathathathat",x:60,y:90});
texts.push({text:"schonschonschonschonschonschonschon",x:80,y:120});
texts.push({text:"allesallesallesallesallesallesalles",x:180,y:300});
texts.push({text:"gesehengesehengesehengesehengesehengesehengesehen",x:800,y:300});
texts.push({text:"undundundundundundundundundund",x:200,y:160});
texts.push({text:"danndanndanndanndanndanndanndanndann",x:300,y:200});
texts.push({text:"kamkamkamkamkamkamkamkamkamkam",x:350,y:250});
texts.push({text:"ProPraxisProPraxisProPraxisProPraxisProPraxisProPraxisProPraxisProPraxis",x:20,y:300});*/

typecased_texts = [];

// calculate width of each text for hit-testing purposes
ctx.font="16px verdana";
for(var i=0;i<texts.length;i++){
	var text=texts[i];
	text.width=ctx.measureText(text.text).width;
	text.height=text_height;
}
for(var i=0;i<typecased_texts.length;i++){
	var text=typecased_texts[i];
	text.width=ctx.measureText(text.text).width;
	text.height=text_height;
}
update_typecased_texts();
update_texts();

// this var will hold the index of the selected text
var selectedText=-1;
var selectedType = 0;   // 0 == text, 1 == typecased_text

// START: draw all texts to the canvas
draw();

// clear the canvas draw all texts
function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = '#f6f7cd';
	ctx.fillRect(0, 0, canvas.width, typecase_border);
	
	ctx.fillStyle = 'grey';	
	for(var i=0;i<texts.length;i++){
		var text=texts[i];
		ctx.fillText(text.text,text.x,text.y);
	}
	
	ctx.fillStyle = 'black';	
	for(var i=0;i<typecased_texts.length;i++){
		var text=typecased_texts[i];
		ctx.fillText(text.text,text.x,text.y);
	}
}

function update_typecased_texts() {
	var posX = 0;
	typecase_border = text_height + text_gap;
	var posY = typecase_border;
	for(var i=0;i<typecased_texts.length;i++){
		var text=typecased_texts[i];
		text.x = posX;
		text.y = posY;		
		posX += text.width + text_gap;
		if(posX>canvas.width && text.x>0) {
			typecase_border += text_height + text_gap;
			posX = 0;
			posY = typecase_border;
			text.x = posX;
			text.y = posY;
			posX += text.width + text_gap;
		}
	}
	typecase_border += text_height + text_gap;
}

function update_texts() {
	for(var i=0;i<texts.length;i++){
		var text = texts[i];
		if(text.x+text.width > canvas.width) {
			text.x = canvas.width - text.width;
		}
		if(text.x<0) {
			text.x = 0;
		}
		if(text.y < typecase_border + text.height) {
			text.y = typecase_border + text.height;
		}
		if(text.y > canvas.height) {
			text.y = canvas.height;
		}
	}
}

// test if x,y is inside the bounding box of texts[textIndex]
function textHittest(array, x, y, textIndex){
	var text = array[textIndex];
	return(x>=text.x && 
		x<=text.x+text.width &&
		y>=text.y-text.height && 
		y<=text.y);
}

// handle mousedown events
// iterate through texts[] and see if the user
// mousedown'ed on one of them
// If yes, set the selectedText to the index of that text
function handleMouseDown(e){
  e.preventDefault();
  startX=parseInt(e.clientX-offsetX);
  startY=parseInt(e.clientY-offsetY);

  // Put your mousedown stuff here
  for(var i=0;i<texts.length;i++){
	  if(textHittest(texts, startX, startY, i)){
		  selectedType=0;
		  selectedText=i;
	  }
  }
  for(var i=0;i<typecased_texts.length;i++){
	  if(textHittest(typecased_texts, startX, startY, i)){
		  selectedType=1;
		  selectedText=i;
	  }
  }  
}

// done dragging
function handleMouseUp(e){
  e.preventDefault();
  var startX = parseInt(e.clientX-offsetX);
  var startY = parseInt(e.clientY-offsetY);
  if(selectedText>=0) {
	  if(selectedType==0) {
		  var text = texts[selectedText];
		  if(text.y<typecase_border) {
			targetText = -1;  
			for(var i=0;i<typecased_texts.length;i++){
				if(textHittest(typecased_texts, startX, startY, i)){
					targetText=i;
				}
			}
			if(targetText < 0) {
				texts.splice(selectedText, 1);
				typecased_texts.push(text);
			} else {
				texts.splice(selectedText, 1);
				typecased_texts.splice(targetText, 0, text);
			}
		  }
	  } else if(selectedType==1) {
		  var text = typecased_texts[selectedText];
		  if(text.y>typecase_border) {
			  typecased_texts.splice(selectedText, 1);
			  texts.push(text);
		  } else {
				targetText = -1;  
				for(var i=0;i<typecased_texts.length;i++){
					if(i!=selectedText && textHittest(typecased_texts, startX, startY, i)){
						targetText=i;
					}
				}
				if(targetText >= 0) {
					if(selectedText<targetText) {
						typecased_texts.splice(selectedText, 1);
						typecased_texts.splice(targetText - 1, 0, text);
					} else if(selectedText>targetText) {
						typecased_texts.splice(selectedText, 1);
						typecased_texts.splice(targetText, 0, text);
					}
				}
			}
	  }
  }
  selectedText=-1;
  update_typecased_texts();
  update_texts();
  draw();
}

// also done dragging
function handleMouseOut(e){
  e.preventDefault();
  selectedText=-1;
  update_typecased_texts();
  update_texts();
  draw();
}

// handle mousemove events
// calc how far the mouse has been dragged since
// the last mousemove event and move the selected text
// by that distance
function handleMouseMove(e){
  if(selectedText<0){return;}
  e.preventDefault();
  mouseX=parseInt(e.clientX-offsetX);
  mouseY=parseInt(e.clientY-offsetY);

  // Put your mousemove stuff here
  var dx=mouseX-startX;
  var dy=mouseY-startY;
  startX=mouseX;
  startY=mouseY;

  if(selectedType==0) {
	  var text=texts[selectedText];
	  text.x += dx;
	  text.y += dy;
  } else if(selectedType==1) {
	  var text = typecased_texts[selectedText];
	  text.x += dx;
	  text.y += dy;
  }
  draw();
}

// listen for mouse events
$("#canvas").mousedown(function(e){handleMouseDown(e);});
$("#canvas").mousemove(function(e){handleMouseMove(e);});
$("#canvas").mouseup(function(e){handleMouseUp(e);});
$("#canvas").mouseout(function(e){handleMouseOut(e);});

}); // end $(function(){});