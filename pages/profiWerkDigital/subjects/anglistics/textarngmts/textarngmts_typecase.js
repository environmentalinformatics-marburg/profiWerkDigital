
var checkOrder = 0;
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
var canvasWidth=$canvas.width();
var canvasHeigth=$canvas.height();

var text_height = 16;
var text_gap = 7;
var typecase_border = 0;

// variables to save last mouse position
// used to see how far the user dragged the mouse
// and then move the text by that distance
var startX;
var startY;

// some text objects
var texts = new Array();
var arranged_texts = new Array();
var scalaPositions = 0;
// some test texts
/*
texts.push({text:"Man",x:rpos(canvasWidth),y:rpos(canvasHeigth)});
texts.push({text:"glaubt",x:rpos(canvasWidth),y:rpos(canvasHeigth)});
texts.push({text:"man",x:rpos(canvasWidth),y:rpos(canvasHeigth)});
texts.push({text:"hat",x:rpos(canvasWidth),y:rpos(canvasHeigth)});
texts.push({text:"schon",x:rpos(canvasWidth),y:rpos(canvasHeigth)});
texts.push({text:"alles",x:rpos(canvasWidth),y:rpos(canvasHeigth)});
texts.push({text:"gesehen",x:rpos(canvasWidth),y:rpos(canvasHeigth)});
texts.push({text:"und",x:rpos(canvasWidth),y:rpos(canvasHeigth)});
texts.push({text:"dann",x:rpos(canvasWidth),y:rpos(canvasHeigth)});
texts.push({text:"kam",x:rpos(canvasWidth),y:rpos(canvasHeigth)});
texts.push({text:"ProPraxis",x:rpos(canvasWidth),y:rpos(canvasHeigth)});*/

/**
 * Text
 **/
function Text(id, arrId, sentenceId, type, text, x, y)
{
  this.id = id;
  this.arrId = arrId;
  this.sentenceId = sentenceId;
  this.type = type;
  this.x = x;
  this.y = y;
  this.text = text;
  this.width = 0;//ctx.measureText(this.text).width;
  this.height = 0;//ctx.measureText(this.text).height;
}

// Sentence 1
arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"That");
arranged_texts[arranged_texts.length] = new Text(4,1,1,2,"linguistics is a difficult subject for most first-year students");
texts[texts.length] = new Text(1,0,1,2,"It");
arranged_texts[arranged_texts.length] = new Text(2,0,1,2,"becomes apparent fairly early in their first semester");
texts[texts.length] = new Text(3,0,1,2,"that");
arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"(1).");


// Sentence 2
arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"There are");
arranged_texts[arranged_texts.length] = new Text(7,1,2,2,"three reasons");
arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"for");
arranged_texts[arranged_texts.length] = new Text(0,2,0,0,"this");
arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"(2).");
texts[texts.length] = new Text(5,0,2,2," This ");
texts[texts.length] = new Text(6,0,2,2,"is due to");

// Sentence 3
arranged_texts[arranged_texts.length] = new Text(0,1,0,0,"The fact that linguistics is usually not taught at school");
arranged_texts[arranged_texts.length] = new Text(9,0,3,2,"is");
arranged_texts[arranged_texts.length] = new Text(0,2,0,0,"the first reason");
texts[texts.length] = new Text(8,0,3,2,"The first reason");
texts[texts.length] = new Text(10,0,3,2,"the fact that linguistics is usually not taught at school");
arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"(3).");

// Sentence 4
arranged_texts[arranged_texts.length] = new Text(0,1,0,0,"Literature or cultural studies");
arranged_texts[arranged_texts.length] = new Text(13,0,4,2,"have a more privileged status");
arranged_texts[arranged_texts.length] = new Text(0,2,0,0,"in this respect");
texts[texts.length] = new Text(11,0,4,2,"In this respect,");
texts[texts.length] = new Text(12,0,4,2,"literature or cultural studies");
arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"(4).");

// Sentence 5
arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"Teachers teach");
arranged_texts[arranged_texts.length] = new Text(0,2,0,0,"these subjects in school");
texts[texts.length] = new Text(14,0,5,2,"These subjects");
texts[texts.length] = new Text(15,0,5,2,"are taught by teachers in school");
arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"(5).");

// Sentence 6
arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"The fact that students have to learn");
arranged_texts[arranged_texts.length] = new Text(17,2,6,2,"is");
arranged_texts[arranged_texts.length] = new Text(0,2,0,0,"the second reason");
texts[texts.length] = new Text(18,0,6,2,"the fact that students have to learn");
texts[texts.length] = new Text(19,1,6,2,"many new terms");
texts[texts.length] = new Text(16,0,6,2,"The second reason");
texts[texts.length] = new Text(20,0,6,2,"in linguistics");
arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"(6).");

// Sentence 7
arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"It");
arranged_texts[arranged_texts.length] = new Text(23,0,7,2,"is very demanding");
arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"to get a grip on");
texts[texts.length] = new Text(21,0,7,2,"To get a grip on");
arranged_texts[arranged_texts.length] = new Text(22,2,7,2,"all the new concepts");
arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"(7).");

// Sentence 8
arranged_texts[arranged_texts.length] = new Text(0,1,0,0,"The abstract nature of linguistics");
texts[texts.length] = new Text(24,0,8,2,"Another reason");
arranged_texts[arranged_texts.length] = new Text(25,0,8,2,"is");
arranged_texts[arranged_texts.length] = new Text(0,2,0,0,"another reason");
texts[texts.length] = new Text(26,0,8,2,"the abstract nature of linguistics");
arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"(8).");

// Sentence 9
texts[texts.length] = new Text(27,0,9,2,"Often,");
arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"Often");
arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"students are scared off by");
arranged_texts[arranged_texts.length] = new Text(28,2,9,2,"this");
texts[texts.length] = new Text(29,0,9,2,"scares students off");
arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"(9).");

arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"To include aspects of linguistics into English language teaching ...(10).");

/**
 *  shufle array random, extends of class Array
 **/
Array.prototype.shuffle = arrayShuffle;
//load_media();
ctx.font="12px aral";
var yPositions = new Array();

// this var will hold the index of the selected text
var selectedText = -1;
var selectedType = 0; // 0 == text, 1 == arranged_text


function arrayShuffle(){
  var tmp, rand;
  for(var i =0; i < this.length; i++){
    rand = Math.floor(Math.random() * this.length);
    tmp = this[i]; 
    this[i] = this[rand]; 
    this[rand] =tmp;
  }
}

for(var i = 0; i<texts.length; i++) {
     yPositions[i] = i*11 + 180;
}

yPositions.shuffle();

update_arranged_texts(true);
update_texts(true);

// START: draw all texts to the canvas
draw();
update_arranged_texts(false);
draw();

/// expand with color, background etc.
function drawTextBG(txt, x, y, style, font='32px arial') {
    ctx.save();
   // ctx.font = font;
    ctx.textBaseline = 'top';
    ctx.fillStyle = style;
    var width = ctx.measureText(txt).width;
    ctx.fillRect(x, y, width, parseInt(font, 10));
    ctx.fillStyle = '#000';
    ctx.fillText(txt, x, y);
    ctx.restore();
}

// clear the canvas draw all texts
function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
		//ctx.fillStyle = '#333333';
	ctx.fillStyle = '#f6f7cd';
	ctx.fillRect(0, 0, canvas.width, typecase_border);
	for(var i = 0;i < texts.length;i++){
		var text=texts[i];
	  ctx.fillStyle = '#333333';
	  if( text.id === 0){
	    ctx.fillStyle = '#999';
	  }
	  ctx.fillText(text.text,text.x,text.y);	
	}
	for(i = 0;i < arranged_texts.length;i++){
		var text=arranged_texts[i];
		ctx.fillStyle = '#333333';
	  if(text.arrId === 1){
		  ctx.fillStyle = '#0bea70';
		  var width = ctx.measureText(text.text).width;
		  ctx.fillRect(text.x, text.y-text.height, width, text.height+2);
		  ctx.fillStyle = '#333333';
		} 
		if(text.arrId === 2){
		  ctx.fillStyle = 'green';
		} 
		ctx.fillText(text.text,text.x,text.y);
		
	}
}

function update_arranged_texts(start_play) {
	var posX = 0;
	typecase_border = text_height + text_gap;
	var posY = typecase_border;	

	for(var i=0;i<arranged_texts.length;i++){
		var text=arranged_texts[i];
			// calculate x and y position and width of each arranded text for hit-testing purposes
  	if(start_play) {
    	if(text.type == 2){
    	  	scalaPositions++;
    	} 
    	text.width=ctx.measureText(text.text).width;
    	text.height=text_height;
    }
	//	text.arrId = i;
		text.x = posX;
		text.y = posY;		
		posX += ctx.measureText(text.text).width + text_gap;
		if(posX > canvas.width && text.x>0) {
			typecase_border += text_height + text_gap;
			posX = 0;
			posY = typecase_border;
			text.x = posX;
			text.y = posY;
			posX += ctx.measureText(text.text).width  + text_gap;
		}
	}	
	typecase_border += text_height + text_gap;
}

function update_texts(start_play) {
	 var posX = 0;
	for(var i = 0;i < texts.length;i++){
		var text = texts[i];
		if(start_play) {
  		if(text.type == 2){
  	  	scalaPositions++;
    	} 
  		if(posX > canvas.width/2) {
  			posX = 0;
  		}	
  		text.x = posX;
  		posX += ctx.measureText(text.text).width + text_gap;
  	  text.y = yPositions[i];
  	  text.width=ctx.measureText(text.text).width;
  	  text.height=text_height;
	  } else {
    		if(text.x + ctx.measureText(text.text).width > canvas.width) {
    			text.x = canvas.width - ctx.measureText(text.text).width ;
    		}
    		if(text.x < 0) {
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
}

// test the order of arranged text
function check_arranged_texts() {
	for(var i = 0;i < arranged_texts.length;i++){
		if(i > 0){
		  if(arranged_texts[i].id-arranged_texts[i-1].id == 1 && 
		    arranged_texts[i].sentenceId == arranged_texts[i-1].sentenceId ){
		      checkOrder++;
		  }
		}//else if (arranged_texts[i].id == arranged_texts[i].id){checkOrder = 1;}
		else checkOrder = 0;
  }
}

// test if x,y is inside the bounding box of texts[textIndex]
function textHittest(array, x, y, textIndex){
	var text = array[textIndex];
	return(x >= text.x && 
		x <= text.x + ctx.measureText(text.text).width  &&
		y >= text.y - text.height && 
		y <= text.y);
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
  for(var i = 0;i < texts.length;i++){
	  if(textHittest(texts, startX, startY, i)){
		  selectedType = 0;
		  selectedText = i;
		//  selectedId = texts[i].id;
	  }
  }
  for(i = 0;i < arranged_texts.length;i++){
	  if(textHittest(arranged_texts, startX, startY, i)){
		  selectedType = 1;
		  selectedText = i;
	  }
  }  
}

// done dragging
function handleMouseUp(e){
  e.preventDefault();
  var startX = parseInt(e.clientX-offsetX);
  var startY = parseInt(e.clientY-offsetY);
  if(selectedText >= 0) {
	  if(selectedType === 0) {
		  var text = texts[selectedText];
		  if(text.y<typecase_border) {
			targetText = -1;  
			for(var i=0;i<arranged_texts.length;i++){
				if(textHittest(arranged_texts, startX, startY, i)){
					targetText=i;
				}	
			}
			if(targetText < 0) {
				texts.splice(selectedText, 1);
				arranged_texts.push(text);
			} else {
				texts.splice(selectedText, 1);
				arranged_texts.splice(targetText, 0, text);
			}
		  }
	  } else if(selectedType === 1) {
		    text = arranged_texts[selectedText];
		  if(text.y>typecase_border) {
			  arranged_texts.splice(selectedText, 1);
			  texts.push(text);
		  } else {
				targetText = -1;  
				for(i=0;i<arranged_texts.length;i++){
					if(i!=selectedText && textHittest(arranged_texts, startX, startY, i)){
						targetText=i;
					}
				}
				if(targetText >= 0) {
					if(selectedText<targetText) {
						arranged_texts.splice(selectedText, 1);
						arranged_texts.splice(targetText - 1, 0, text);
					} else if(selectedText>targetText) {
						arranged_texts.splice(selectedText, 1);
						arranged_texts.splice(targetText, 0, text);
					}
				}
			}
	  }
  }
  
  selectedText=-1;
  update_arranged_texts();
  update_texts();
  check_arranged_texts();
  draw();
  
  if(checkOrder > 0) {	
      if (checkOrder === 20) {
        document.getElementById("scala").style.background = "#0bea70";
        document.getElementById("window").style.display = "block";
      }
      var dif = 72/(scalaPositions)*checkOrder;//30ctx.fillStyle = 'red';
      document.getElementById("scala").style.height = 72-dif + "px";
      document.getElementById("scala").style.top = 380+dif + "px";
  }
}

// also done dragging
function handleMouseOut(e){
  e.preventDefault();
  selectedText=-1;
  update_arranged_texts();
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

  if(selectedType === 0) {
	  var text=texts[selectedText];
	  text.x += dx;
	  text.y += dy;
  } else if(selectedType==1) {
	  var text = arranged_texts[selectedText];
	  text.x += dx;
	  text.y += dy;
  }
  draw();
}

function rpos(p, left, right){
  var p = p;
  var res = 0;
  res = Math.floor((Math.random() * p) + 1);
  if (res > right) {
    return right-Math.round(Math.random()*100);
  }   
  if (res < left) {
    return left+Math.round(Math.random()*10);;
  } 
	return res;
}

// listen for mouse events
$("#canvas").mousedown(function(e){handleMouseDown(e);});
$("#canvas").mousemove(function(e){handleMouseMove(e);});
$("#canvas").mouseup(function(e){handleMouseUp(e);});
$("#canvas").mouseout(function(e){handleMouseOut(e);});
document.getElementById('exit').onclick = function() {  
       document.getElementById("window").style.display="none"; 
      location.reload();
}
}); // end $(function(){});
