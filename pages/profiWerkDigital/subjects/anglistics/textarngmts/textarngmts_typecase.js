
var checkOrder = 0;

// some text objects
var texts = new Array();
var arranged_texts = new Array();
var submited_texts = new Array();
var submitedSentences = "";
var resultSentences = "";
var colors=[{color:"#111111", cls:"black"},
  {color:"#FFCC00", cls:"yellow"},
  {color:"#32CD32", cls:"green"},
  {color:"#9900CC", cls:"violett"},
  {color:"#1E90FF", cls:"blue"},
  {color:"#FF0000", cls:"red"},
  {color:"#666666", cls:"grey"}];
  
$(function(){

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  
  // variables used to get mouse position on the canvas
  var $canvas = $("#canvas");
  var canvasOffset = $canvas.offset();
  var offsetX = canvasOffset.left;
  var offsetY = canvasOffset.top;
  var scrollX = $canvas.scrollLeft();
  var scrollY = $canvas.scrollTop();
  var canvasWidth = $canvas.width();
  var canvasHeigth = $canvas.height();
  
  var $submitButton = $('#tc-but-1');
  var text_height = 20;
  var text_gap = 7;
  var typecase_border = 0;
  var yPlayField = 180;
  
  // variables to save last mouse position
  // used to see how far the user dragged the mouse
  // and then move the text by that distance
  var startX;
  var startY;
  // number of scala positions
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
  function Text(id, colorId, sentenceId, type, numberWords, isH, text, x, y)
  {
    this.id = id;
    this.colorId = colorId;
    this.sentenceId = sentenceId;
    this.type = type;
    this.numberWords = numberWords;
    this.isH = isH;
    this.text = text;
    this.distance = 0;
    this.x = x;
    this.y = y;
    
    this.width = 0;//ctx.measureText(this.text).width;
    this.height = 0;//ctx.measureText(this.text).height;
  }
  
  // Sentence 1
  //arranged_texts[arranged_texts.length] = new Text(0,2,0,0,"That");
  //arranged_texts[arranged_texts.length] = new Text(4,1,1,2,"linguistics is a difficult subject for most first-year students");
  //arranged_texts[arranged_texts.length] = new Text(2,1,1,2,"becomes apparent fairly early in their first semester");
  //arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"(1).");
  texts[texts.length]  = new Text(1,0,1,0,1,1,"It");
  texts[texts.length] = new Text(3,1,1,1,10,0 ,"That linguistics is a difficult subject for most first-year students");
  texts[texts.length] = new Text(2,0,1,0,8,0,"becomes apparent fairly early in their first semester");
  texts[texts.length] = new Text(99,0,1,0,0,0,".");
  
  
  // Sentence 2
  //arranged_texts[arranged_texts.length] = new Text(0,2,0,0,"There are");
  //arranged_texts[arranged_texts.length] = new Text(7,1,2,2,"three reasons");
  //arranged_texts[arranged_texts.length] = new Text(0,2,0,0,"for");
  //arranged_texts[arranged_texts.length] = new Text(0,2,0,0,"this");
  //arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"(2).");
  texts[texts.length] = new Text(99,0,2,0,0,0,"There are");
  texts[texts.length] = new Text(7,2,2,1,2,0,"three reasons");
  texts[texts.length] = new Text(99,0,2,0,0,0,"for this");
  texts[texts.length] = new Text(5,1,2,0,1,1," This ");
  texts[texts.length] = new Text(6,0,2,0,3,1,"is due to");
  texts[texts.length] = new Text(99,0,2,0,0,0,".");
  
  // Sentence 3
  //arranged_texts[arranged_texts.length] = new Text(0,1,0,0,"The fact that linguistics is usually not taught at school");
  //arranged_texts[arranged_texts.length] = new Text(9,2,3,2,"is");
  //arranged_texts[arranged_texts.length] = new Text(0,2,0,0,"the first reason");
  //arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"(3).");
  texts[texts.length] = new Text(10,3,3,1,10,0,"The fact that linguistics is usually not taught at school"); // violet main
  texts[texts.length] = new Text(9,0,3,0,1,0,"is(3)");
  texts[texts.length] = new Text(8,2,3,0,3,0,"the first reason");
  texts[texts.length] = new Text(99,0,3,0,0,0, ".");
  
  // Sentence 4
  //arranged_texts[arranged_texts.length] = new Text(0,1,0,0,"Literature or cultural studies");
  //arranged_texts[arranged_texts.length] = new Text(13,1,4,2,"have a more privileged status");
  //arranged_texts[arranged_texts.length] = new Text(0,2,0,0,"in this respect");
  //arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"(4).");
  texts[texts.length] = new Text(12,4,4,1,5,0,"Literature or cultural studies");// blue main
  texts[texts.length] = new Text(13,0,4,0,4,0,"have a more privileged status");
  texts[texts.length] = new Text(11,3,4,0,3,0,"in this respect"); //violet 
  texts[texts.length] = new Text(99,0,4,0,0,0,".");
  
  // Sentence 5
  //arranged_texts[arranged_texts.length] = new Text(0,2,0,0,"Teachers teach");
  //arranged_texts[arranged_texts.length] = new Text(0,2,0,0,"these subjects in school");
  //arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"(5).");
  texts[texts.length] = new Text(99,0,5,0,0,0,"Teachers teach");
  texts[texts.length] = new Text(14,4,5,0,2,0,"these subjects"); //blue
  texts[texts.length]= new Text(99,0,5,0,0,0,"in school");
  texts[texts.length] = new Text(15,0,5,0,6,1,"are taught by teachers in school");
  texts[texts.length] = new Text(99,0,5,0,0,0,".");
  
  // Sentence 6
  //arranged_texts[arranged_texts.length] = new Text(0,1,0,0,"The fact that students have to learn");
  //arranged_texts[arranged_texts.length] = new Text(17,2,6,2,"is");
  //arranged_texts[arranged_texts.length] = new Text(0,1,0,0,"the second reason");
  //arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"(6).");
  texts[texts.length] = new Text(18,0,6,0,7,0, "The fact that students have to learn");
  texts[texts.length] = new Text(19,5,6,1,3,0,"many new terms"); // red main
  texts[texts.length] = new Text(20,0,6,0,2,0,"in linguistics"); 
  texts[texts.length]  = new Text(17,0,6,0,1,0,"is(6)");
  texts[texts.length] = new Text(16,2,6,0,3,0,"the second reason");
  texts[texts.length] = new Text(99,0,6,0,0,0,".");
  
  // Sentence 7
  //arranged_texts[arranged_texts.length] = new Text(0,2,0,0,"It");
  //arranged_texts[arranged_texts.length] = new Text(22,1,7,2,"is very demanding");
  //arranged_texts[arranged_texts.length] = new Text(0,1,0,0,"to get a grip on");
  //arranged_texts[arranged_texts.length] = new Text(21,2,7,2,"all the new concepts");
  //arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"(7).");
  texts[texts.length] = new Text(99,0,6,0,0,0,"It");
  texts[texts.length] = new Text(24,0,7,0,3,0,"is very demanding");
  texts[texts.length] = new Text(22,0,7,0,5,0,"to get a grip on");
  texts[texts.length] = new Text(23,5,7,0,4,0,"all the new concepts");
  texts[texts.length] = new Text(99,0,7,0,0,0,".");
  
  
  // Sentence 8
  //arranged_texts[arranged_texts.length] = new Text(0,1,0,0,"The abstract nature of linguistics");
  //arranged_texts[arranged_texts.length] = new Text(24,2,8,2,"is");
  //arranged_texts[arranged_texts.length] = new Text(0,2,0,0,"another reason");
  //arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"(8).");
  texts[texts.length] = new Text(27,6,8,1,5,0,"The abstract nature of linguistics"); // grey main
  texts[texts.length] = new Text(26,0,8,0,1,0,"is(8)");
  texts[texts.length] = new Text(25,2,8,0,2,0,"another reason");
  texts[texts.length] = new Text(99,0,8,0,0,0,".");
  
  // Sentence 9
  //arranged_texts[arranged_texts.length] = new Text(26,2,0,0,"Often");
  //arranged_texts[arranged_texts.length] = new Text(0,1,0,0,"students are scared off by");
  //arranged_texts[arranged_texts.length] = new Text(27,2,9,2,"this");
  //arranged_texts[arranged_texts.length] = new Text(0,0,0,0,"(9).");
  texts[texts.length] = new Text(28,0,9,0,1,0,"Often");
  texts[texts.length]  = new Text(99,0,8,0,0,0,"students are scared off by");
  texts[texts.length]= new Text(29,6,9,0,1,0,"this");
  texts[texts.length] = new Text(30,0,9,0,3,1,"scares students off");
  texts[texts.length] = new Text(99,0,9,0,0,0,".");

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
       yPositions[i] = i*9+10;
  }
  
  yPositions.shuffle();
  
  update_arranged_texts(true);
  update_texts(true);
  
  // START: draw all texts to the canvas
  //draw();
  //update_arranged_texts(false);
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
  	ctx.strokeStyle = '#999999';
  	ctx.strokeRect(0, yPlayField -50, canvas.width, typecase_border-yPlayField-20);
  	ctx.strokeRect(0, yPlayField, canvas.width, typecase_border-yPlayField);
  	for(var i = 0;i < texts.length;i++){
  		var text=texts[i];
  		ctx.fillStyle = colors[text.colorId].color;
  		if( text.type === 1) {  
  		  var width = ctx.measureText(text.text).width;
    		ctx.fillRect(text.x, text.y-text.height+3, width, text.height+1);
  		  ctx.fillStyle = '#333333';
  		} ctx.fillText(text.text,text.x,text.y);
  	}
  	for(i = 0;i < arranged_texts.length;i++){
  		var text = arranged_texts[i];
  		ctx.fillStyle = colors[text.colorId].color;
  		if( text.type === 1) {  
  		  var width = ctx.measureText(text.text).width;
    		ctx.fillRect(text.x, text.y-text.height, width, text.height+2);
  		  ctx.fillStyle = '#333333';
  		  	
  		} ctx.fillText(text.text,text.x,text.y);
  	}
  }
  
  function update_arranged_texts(start_play) {
  	var posX = 0;
  	typecase_border = yPlayField +text_height + text_gap;
  	var posY = typecase_border;	
  
  	for(var i=0;i < arranged_texts.length;i++){
  		var text = arranged_texts[i];
    		// calculate x and y position and width of each arranded text for hit-testing purposes
      	if(start_play) {
        	text.width = ctx.measureText(text.text).width;
        	text.height = text_height;
        }
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
  	}typecase_border += text_height + text_gap;
  }
  
  function update_texts(start_play) {
  	 var posX = 0;
  	 var posY = 20;
  	 var posXH = 0;
  	 var posYH = 150;
  	for(var i = 0;i < texts.length;i++){
  		var text = texts[i];
  		if(start_play) {
  		  scalaPositions++;
    	  if(text.isH === 1){
    	  	text.x = posXH;
    	    text.y = posYH;
    	    posXH += ctx.measureText(text.text).width + text_gap;
      	} else{
    		  text.x = posX;
    		  text.y = posY;
    		  posX += ctx.measureText(text.text).width + text_gap;	}
    		//if(text.id == 99) {text.x =text.x-text_gap;}
    		
    	  if(posX > canvas.width && text.x > 0) {
    	    posX = 0;
    	    posY += text_height ;
    	    text.x = posX;
    		  text.y = posY;
    		  posX += ctx.measureText(text.text).width  + text_gap;
    	  }
    	  text.width = ctx.measureText(text.text).width;
    	  text.height = text_height;
  	  } else {
      		if(text.x + ctx.measureText(text.text).width > canvas.width) {
      			text.x = canvas.width - ctx.measureText(text.text).width ;
      		}
      		if(text.x < 0) {
      			text.x = 0;
      		}
      		if(text.y > typecase_border + text.height) {
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
  		  if(arranged_texts[i].id - arranged_texts[i-1].id == 1 && 
  		    arranged_texts[i].sentenceId == arranged_texts[i-1].sentenceId ){
  		    checkOrder++;
  		    //alert(checkOrder);
  		  }
  		}//else if (arranged_texts[i].id == arranged_texts[i].id){checkOrder = 1;}
  		//else checkOrder = 0;
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
  	
  		  if(text.y > yPlayField) {
  			targetText = -1;  
  			for(var i=0;i < arranged_texts.length;i++){
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
  		  if(text.y < yPlayField) {
  			  arranged_texts.splice(selectedText, 1);
  			  texts.push(text);
  		  } else {
  				targetText = -1;  
  				for(i=0;i < arranged_texts.length;i++){
  					if(i!=selectedText && textHittest(arranged_texts, startX, startY, i)){
  						targetText=i;
  					}
  				}
  				if(targetText >= 0) {
  					if(selectedText < targetText) {
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
        document.getElementById("scala").style.top = 402+dif + "px";
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
      return left+Math.round(Math.random()*10);
    } 
  	return res;
  }
  
  // listen for mouse events
  $("#canvas").mousedown(function(e){handleMouseDown(e);});
  $("#canvas").mousemove(function(e){handleMouseMove(e);});
  $("#canvas").mouseup(function(e){handleMouseUp(e);});
  $("#canvas").mouseout(function(e){handleMouseOut(e);});
  
  document.getElementById('tc-but-3').onclick = function() {  
    document.getElementById("window").style.display="none"; 
    document.getElementById("tc-but-3").style.display="none";
    document.getElementById("result-content-1").style.display="none";
    resultSentences = "";
    document.getElementById("result-content-2").style.display="none";
    results = "";
    location.reload();
  }
   
  function drawText(text, colorId, type){
    if(type === 1) return "<span class=\""+ colors[colorId].cls+"\">" + text + "</span>";
    return  "<font color=\""+ colors[colorId].color+"\">" + text + "</font>";
  }
  
  // submit the sentence
  document.getElementById('submit').onclick = function() {  

    for(i = 0;i < arranged_texts.length;i++){
       submited_texts.push(arranged_texts[i]);
       if(i == arranged_texts.length -1){
          submitedSentences += drawText(arranged_texts[i].text, arranged_texts[i].colorId,arranged_texts[i].type) + "("+ arranged_texts[i].sentenceId +").";
          resultSentences += drawText(arranged_texts[i].text, arranged_texts[i].colorId,arranged_texts[i].type) + "("+ arranged_texts[i].sentenceId +").";
          
       }
       else {
        submitedSentences += drawText(arranged_texts[i].text,arranged_texts[i].colorId,arranged_texts[i].type) +" ";
         resultSentences += drawText(arranged_texts[i].text,arranged_texts[i].colorId,arranged_texts[i].type) +" ";
       }
    }
    for(var i = arranged_texts.length - 1; i >= 0; i--) {
        arranged_texts.splice(i, 1);
    }
    draw();
    document.getElementById("tc-content-2").innerHTML = "<p>" + submitedSentences + "</p>";
    
  }
  
  // check sentences
  document.getElementById('check').onclick = function() {  
    yello = -1;
    green = -1;
    blue = -1;
    red = -1;
    grey = -1;
    violet = -1;
   
    results = "";
    for(i = 0;i < submited_texts.length;i++){
      text = submited_texts[i];
      if (yello > -1) yello+=text.numberWords;
      if (green > -1) green+=text.numberWords;
      if (violet > -1) violet+=text.numberWords;
      if (blue > -1) blue+=text.numberWords;
      if (red > -1) red+=text.numberWords;
      if (grey > -1) grey+=text.numberWords;
      
      switch (text.colorId) {
        case 1:
          if(text.type === 1) {yello++;}
          else { text.distance = yello - text.numberWords;
          results +="<p>" + text.distance + "</p>";}
          break;
        case 2:
          if(text.type === 1)green++;
          else {text.distance = green - text.numberWords;
          results +="<p>" + text.distance + "</p>";}
          break;
        case 3:
          if(text.type === 1)violet++;
          else {text.distance = violet - text.numberWords;
          results +="<p>" + text.distance + "</p>";}
          break;
        case 4:
          if(text.type === 1)blue++;
          else {text.distance = blue - text.numberWords;
          results +="<p>" + text.distance + "</p>";}
          break;
        case 5:
          if(text.type === 1)red++;
          else { text.distance = red - text.numberWords;
          results +="<p>" + text.distance + "</p>";}
          break;
        case 6:
          if(text.type === 1)grey++;
          else { text.distance = grey - text.numberWords;
          results +="<p>" + text.distance + "</p>";}
          break;
        default:
          // code
      }
    }
    document.getElementById("tc-but-1").style.display="none";
    document.getElementById("tc-but-2").style.display="none";
    document.getElementById("tc-content-2").style.display="none";
    document.getElementById("tc-content-3").style.display="none";
    document.getElementById("scala").style.display="none";
    document.getElementById("clipart").style.display="none";
    
    
    document.getElementById("tc-but-3").style.display="block";
    document.getElementById("result-content-1").style.display="block";
    document.getElementById("result-content-1").innerHTML =  "<p>" + resultSentences + "</p>";
    document.getElementById("result-content-2").style.display="block";
    document.getElementById("result-content-2").innerHTML =  "<p>" + results + "</p>";

  }
}); // end $(function(){});
