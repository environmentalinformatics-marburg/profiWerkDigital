
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

/*
texts[texts.length] = new Text(1,0,1,2,"becomes apparent fairly early in their first semester",300,100);
texts[texts.length] = new Text(2,0,1,2,"linguistics is a difficult subject for most first-year students",280,120);

texts[texts.length] = new Text(3,0,2,2,"is due to",260,140);
texts[texts.length] = new Text(4,0,2,2,"three reasons",240,160);

texts[texts.length] = new Text(5,0,3,2,"The first reason",220,180);
texts[texts.length] = new Text(6,0,3,2,"the fact that linguistics is usually not taught at school",320,80);

texts[texts.length] = new Text(7,0,4,2,"In this respect",200,200);
texts[texts.length] = new Text(8,0,4,2,"literature or cultural studies",200,220);
texts[texts.length] = new Text(9,0,4,2,"have a more privileged status",200,240);

texts[texts.length] = new Text(10,0,5,2,"These subjects",220,260);
texts[texts.length] = new Text(11,0,5,2,"are taught by teachers in schoo",240,280);

texts[texts.length] = new Text(12,0,6,2,"The second reason",260,300);
texts[texts.length] = new Text(13,0,6,2,"the fact that students have to learn",280,320);
texts[texts.length] = new Text(14,0,6,2,"many new terms",300,340);
texts[texts.length] = new Text(15,0,6,2,"in linguistics",320,360);

texts[texts.length] = new Text(1,0,1,2,"becomes apparent fairly early in their first semester",rpos(canvasWidth),rpos(fieldHeight));
texts[texts.length] = new Text(2,0,1,2,"linguistics is a difficult subject for most first-year students",rpos(canvasWidth),rpos(fieldHeight));

texts[texts.length] = new Text(3,0,2,2,"is due to",rpos(canvasWidth, 85, 400),rpos(fieldHeight));
texts[texts.length] = new Text(4,0,2,2,"three reasons",rpos(canvasWidth, 85, 400),rpos(fieldHeight));

texts[texts.length] = new Text(5,0,3,2,"The first reason",rpos(canvasWidth, 85, 400),rpos(fieldHeight));
texts[texts.length] = new Text(6,0,3,2,"the fact that linguistics is usually not taught at school",rpos(canvasWidth, 50, 400),rpos(fieldHeight));

texts[texts.length] = new Text(7,0,4,2,"In this respect",rpos(canvasWidth, 85, 400),rpos(fieldHeight));
texts[texts.length] = new Text(8,0,4,2,"literature or cultural studies",rpos(canvasWidth, 85, 400),rpos(fieldHeight));
texts[texts.length] = new Text(9,0,4,2,"have a more privileged status",rpos(canvasWidth, 85, 400),rpos(fieldHeight));

texts[texts.length] = new Text(10,0,5,2,"These subjects",rpos(canvasWidth, 85, 400),rpos(fieldHeight));
texts[texts.length] = new Text(11,0,5,2,"are taught by teachers in schoo",rpos(canvasWidth, 85, 400),rpos(fieldHeight));

texts[texts.length] = new Text(12,0,6,2,"The second reason",rpos(canvasWidth, 85, 400),rpos(fieldHeight));
texts[texts.length] = new Text(13,0,6,2,"the fact that students have to learn",rpos(canvasWidth, 85, 400),rpos(fieldHeight));
texts[texts.length] = new Text(14,0,6,2,"many new terms",rpos(canvasWidth, 85, 400),rpos(fieldHeight));
texts[texts.length] = new Text(15,0,6,2,"in linguistics",rpos(canvasWidth, 85, 400),rpos(fieldHeight));

texts[texts.length] = new Text(9999,0,0,1," It",rpos(canvasWidth, 5, 30),rpos(fieldHeight, 100, 350));
texts[texts.length] = new Text(9999,0,0,1,"that ",rpos(canvasWidth, 5, 30),rpos(fieldHeight, 100, 350));
texts[texts.length] = new Text(9999,0,0,1," This ",rpos(canvasWidth, 5, 30),rpos(fieldHeight, 100, 350));
texts[texts.length] = new Text(9999,0,0,1," is ",rpos(canvasWidth, 5, 30),rpos(fieldHeight, 100, 350));
texts[texts.length] = new Text(9999,0,0,1," is",rpos(canvasWidth, 5, 30),rpos(fieldHeight, 100, 350));
texts[texts.length] = new Text(9999,0,0,1,".  ",rpos(canvasWidth, 5, 30),rpos(fieldHeight, 100, 350));
texts[texts.length] = new Text(9999,0,0,1,". ",rpos(canvasWidth, 5, 30),rpos(fieldHeight, 100, 350));
texts[texts.length] = new Text(9999,0,0,1,". ",rpos(canvasWidth, 5, 30),rpos(fieldHeight, 100, 350));
texts[texts.length] = new Text(9999,0,0,1,". ",rpos(canvasWidth, 5, 30),rpos(fieldHeight, 100, 350));
texts[texts.length] = new Text(9999,0,0,1,", ",rpos(canvasWidth, 5, 30),rpos(fieldHeight, 100, 350));
texts[texts.length] = new Text(9999,0,0,1,". ",rpos(canvasWidth, 5, 30),rpos(fieldHeight, 100, 350));
*/
texts[texts.length] = new Text(1,0,1,2,"It");
texts[texts.length] = new Text(2,0,1,2,"becomes apparent fairly early in their first semester");
texts[texts.length] = new Text(3,0,1,2,"that");
texts[texts.length] = new Text(4,0,1,2,"linguistics is a difficult subject for most first-year students");

texts[texts.length] = new Text(5,0,2,2," This ");
texts[texts.length] = new Text(6,0,2,2,"is due to");
texts[texts.length] = new Text(7,0,2,2,"three reasons");

texts[texts.length] = new Text(8,0,3,2,"The first reason");
texts[texts.length] = new Text(9,0,3,2,"is");
texts[texts.length] = new Text(10,0,3,2,"the fact that linguistics is usually not taught at school");

texts[texts.length] = new Text(11,0,4,2,"In this respect");
texts[texts.length] = new Text(12,0,4,2,"literature or cultural studies");
texts[texts.length] = new Text(13,0,4,2,"have a more privileged status");

texts[texts.length] = new Text(14,0,5,2,"These subjects");
texts[texts.length] = new Text(15,0,5,2,"are taught by teachers in school");

texts[texts.length] = new Text(16,0,6,2,"The second reason");
texts[texts.length] = new Text(17,0,6,2,"is");
texts[texts.length] = new Text(18,0,6,2,"the fact that students have to learn");
texts[texts.length] = new Text(19,0,6,2,"many new terms");
texts[texts.length] = new Text(20,0,6,2,"in linguistics");

texts[texts.length] = new Text(21,0,7,2,"To get a grip on");
texts[texts.length] = new Text(22,0,7,2,"all the new concepts");
texts[texts.length] = new Text(23,0,7,2,"is very demanding");

texts[texts.length] = new Text(24,0,8,2,"Another reason");
texts[texts.length] = new Text(25,0,9,2,"is");
texts[texts.length] = new Text(26,0,10,2,"the abstract nature of linguistics");

texts[texts.length] = new Text(27,0,11,2,"Often");
texts[texts.length] = new Text(28,0,11,2,"this");
texts[texts.length] = new Text(29,0,11,2,"scares students off");

//texts[texts.length] = new Text(9999,0,0,1,"that ",rpos(canvasWidth, 5, 30),rpos(fieldHeight, 100, 350));
//texts[texts.length] = new Text(9999,0,0,1," is ",rpos(canvasWidth, 5, 30),rpos(fieldHeight, 100, 350));
//texts[texts.length] = new Text(9999,0,0,1," is",rpos(canvasWidth, 5, 30),rpos(fieldHeight, 100, 350));

texts[texts.length] = new Text(1,0,0,1,".  ",rpos(canvasWidth, 5, 30),rpos(canvasWidth, 100, 350));
texts[texts.length] = new Text(2,0,0,1,". ",rpos(canvasWidth, 5, 30),rpos(canvasWidth, 100, 350));
texts[texts.length] = new Text(3,0,0,1,".  ",rpos(canvasWidth, 5, 30),rpos(canvasWidth, 100, 350));
texts[texts.length] = new Text(4,0,0,1,". ",rpos(canvasWidth, 5, 30),rpos(canvasWidth, 100, 350));
texts[texts.length] = new Text(5,0,0,1,". ",rpos(canvasWidth, 5, 30),rpos(canvasWidth, 100, 350));
texts[texts.length] = new Text(6,0,0,1,". ",rpos(canvasWidth, 5, 30),rpos(canvasWidth, 100, 350));
texts[texts.length] = new Text(7,0,0,1,", ",rpos(canvasWidth, 5, 30),rpos(canvasWidth, 100, 350));
texts[texts.length] = new Text(8,0,0,1,". ",rpos(canvasWidth, 5, 30),rpos(canvasWidth, 100, 350));

/**
 *  shufle array random, extends of class Array
 **/
Array.prototype.shuffle = arrayShuffle;

function arrayShuffle(){
  var tmp, rand;
  for(var i =0; i < this.length; i++){
    rand = Math.floor(Math.random() * this.length);
    tmp = this[i]; 
    this[i] = this[rand]; 
    this[rand] =tmp;
  }
}

var yPositions = new Array(); 
for(var i = 0; i<texts.length; i++) {
     yPositions[i] = i*10 + 60;
}
yPositions.shuffle();

arranged_texts=new Array();
//load_media();
ctx.font="16px verdana";

// calculate x and y position and width of each text for hit-testing purposes
for(var i = 0;i < texts.length;i++){
	var text=texts[i];
	if(text.type == 1){
	  	text.x = 10;
	  	text.y = text.id*10+80;
	} else {
	    scalaPositions++;
	  	text.x=rpos(canvasWidth, 80, canvasWidth/2);
	  	text.y=yPositions[i];
	} 
	text.width=ctx.measureText(text.text).width;
	text.height=text_height;
}
// calculate x and y position and width of each arranded text for hit-testing purposes
for(var i=0;i<arranged_texts.length;i++){
	var text=arranged_texts[i];
	text.width=ctx.measureText(text.text).width;
	text.height=text_height;
}
update_arranged_texts();
update_texts();

// this var will hold the index of the selected text
var selectedText = -1;
var selectedType = 0; // 0 == text, 1 == arranged_text
//var selectedId = 0;

// START: draw all texts to the canvas
draw();

/*function load_media()
{
  scala_image = new Image();
  scala_image.src="scala_1.png";
  scala_image_start = new Image();
  scala_image_start.src="scala_0.png";
}*/

// clear the canvas draw all texts
function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = '#f6f7cd';
	ctx.fillRect(0, 0, canvas.width, typecase_border);
	for(var i=0;i<texts.length;i++){
		var text=texts[i];
	//	ctx.fillStyle = '#f50';
		ctx.font="14px Arial";
		ctx.fillStyle = 'grey';
		if (selectedType == 0)
		  if(selectedText >- 1 && selectedText == i){
      			ctx.font="bold 16px Arial";
		}
    	ctx.fillText(text.text,text.x,text.y);	
	}
	ctx.fillStyle = 'black';	
	for(var i=0;i<arranged_texts.length;i++){
		var text=arranged_texts[i];
		ctx.fillText(text.text,text.x,text.y);
	}
}

function update_arranged_texts() {
	var posX = 0;
	typecase_border = text_height + text_gap;
	var posY = typecase_border;	

	for(var i=0;i<arranged_texts.length;i++){
		var text=arranged_texts[i];
		text.arrId = i;
		text.x = posX;
		text.y = posY;		
		posX += ctx.measureText(text.text).width + text_gap;
		if(posX>canvas.width && text.x>0) {
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

function update_texts() {
	for(var i=0;i<texts.length;i++){
		var text = texts[i];
		if(text.x+ctx.measureText(text.text).width  > canvas.width) {
			text.x = canvas.width -ctx.measureText(text.text).width ;
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
	return(x>=text.x && 
		x<=text.x+ctx.measureText(text.text).width  &&
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
		//  selectedId = texts[i].id;
	  }
  }
  for(var i=0;i<arranged_texts.length;i++){
	  if(textHittest(arranged_texts, startX, startY, i)){
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
	  } else if(selectedType==1) {
		  var text = arranged_texts[selectedText];
		  if(text.y>typecase_border) {
			  arranged_texts.splice(selectedText, 1);
			  texts.push(text);
		  } else {
				targetText = -1;  
				for(var i=0;i<arranged_texts.length;i++){
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
      var dif = 131/(scalaPositions)*checkOrder;//30ctx.fillStyle = 'red';
      document.getElementById("scala").style.height = 131-dif + "px";
      document.getElementById("scala").style.top = 381+dif + "px";
  	 // ctx.fillRect(canvasWidth-100,136+dif, 78, 60-dif);
	  //  ctx.drawImage(scala_image,0,0,150,200,canvasWidth-130,100,150,200);
    // document.getElementById("index").innerHTML= "checkOrder:" +checkOrder;
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

  if(selectedType==0) {
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

}); // end $(function(){});
