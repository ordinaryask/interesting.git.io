var canvas = document.getElementById('root'),
	ctx = canvas.getContext("2d");
active = 1;
canvas.width = document.getElementById('canvas').offsetWidth;
canvas.height = document.getElementById('canvas').offsetHeight;
up = setInterval(updatePixels,20);
var h = 0,
	pixels = [],
	myImageData = ctx.createImageData(canvas.width, canvas.height),
	die = {
		"color" : 0,
		"speedY" : 0,
		"speedX" : 0,
		"posX" : 0,
		"posY" : 0,
		"lifeTime" :0,
		"time" : 0,
		"alive" : false
	};
for(let i = 0;i<1000000;i++){
	pixels.push(die) ;
}


function setPixels(posX,posY,min,max,n){
	var c = 0;
	for(let i = 0;i<pixels.length;i++){
		if(pixels[i].alive == true)continue;
		if(c>=n){
			h += c;
			break;			
		}
		var vel =  Math.random() * (max.vel - min.vel) + min.vel,
			ang = Math.random() * (max.ang - min.ang) + min.ang,
			rgba = [Math.round(Math.random() * (max.r - min.r) + min.r),Math.round(Math.random() * (max.g - min.g) + min.g),Math.round(Math.random() * (max.b - min.b) + min.b),Math.round(Math.random() * (max.a - min.a) + min.a)];
		var obj = {
				"color" : rgba,
				"speedY" : Math.sin(ang)*vel,
				"speedX" : Math.cos(ang)*vel,
				"posX" : posX,
				"posY" : posY,
				"lifeTime" : Math.round(Math.random() * (max.lifetime - min.lifetime) + min.lifetime),
				"time" : 0,
				"alive" : true
			}			
			c++;
			pixels[i] = obj;									
	}
}


function setImages(posX,posY,min,max,n){
	var c = 0,
		img = document.getElementById('img'),
		size =  Math.round(Math.random() * (1 - 3) + 3);
	img.height = size;
	img.width = size;
	for(let i = 0;i<pixels.length;i++){
		if(pixels[i].alive == true)continue;
		if(c>=n){
			h += c;
			break;			
		}
		var vel =  Math.random() * (max.vel - min.vel) + min.vel,
			ang = Math.random() * (max.ang - min.ang) + min.ang;
		var obj = {
			'img' : img,
			"speedY" : Math.sin(ang)*vel,
			"speedX" : Math.cos(ang)*vel,
			"posX" : posX,
			"posY" : posY,
			"rotate": Math.round(Math.random() * (0 - 360) + 360),
			"rotateSpeed" : Math.random() * (5 - -5) + -5,
			"size" :size,
			"sizeSpeed" : Math.random() * (0.1 - -0.1) + -0.1,
			"lifeTime" : Math.round(Math.random() * (max.lifetime - min.lifetime) + min.lifetime),
			"time" : 0,
			"alive" : true
		}
		c++;
		pixels[i] = obj;	
	}			
}


function updatePixels(){
	for(let i = 0;i<h;i++){
		if(pixels[i].alive == true){
			if(pixels[i].time > pixels[i].lifeTime)pixels[i].alive = false;
				pixels[i].posY = pixels[i].posY + pixels[i].speedY;
				pixels[i].posX = pixels[i].posX + pixels[i].speedX;
				if(active == 2){
					pixels[i].rotate += pixels[i].rotateSpeed;
					pixels[i].size += pixels[i].sizeSpeed;
				}
		pixels[i].time += 20;
		}										
	}
	drawPixels();
}


function drawPixels(){
	canvas.width = canvas.width;
	myImageData = ctx.createImageData(canvas.width, canvas.height);
	if(active == 1){
		for(let i = 0;i<h;i++){
			if(pixels[i].alive == false)continue;
				let color = pixels[i].color;    
				let x = Math.round(pixels[i].posX),
					y = Math.round(pixels[i].posY);
					
				myImageData.data[ (y*canvas.width*4)+ ((x)*4 )] = color[0];
				myImageData.data[ (y*canvas.width*4)+ ((x)*4 ) +1] = color[1];
				myImageData.data[ (y*canvas.width*4)+ ((x)*4 ) +2] = color[2];
				myImageData.data[ (y*canvas.width*4)+ ((x)*4 ) +3] = color[3];
			}
			ctx.putImageData(myImageData, 0, 0);
		}
	else{
		for(let i = 0;i<h;i++){
			if(pixels[i].alive == false)continue;
				var x = Math.round(pixels[i].posX),
					y = Math.round(pixels[i].posY);
				pixels[i].img.height = pixels[i].size;
				pixels[i].img.width = pixels[i].size;
				pixels[i].img.style.translate = 'rotate ' + pixels[i].rotate + ' deg';
				ctx.drawImage(pixels[i].img,x,y);				
		}
	}					
}


canvas.onmousedown = function(e){
	var posY = e.clientY,
		posX = e.clientX,
		n = Number(document.getElementById('n').value),
		min = {
			"r" : Number(document.getElementById('red').value.split(' - ')[0]),
			"g" : Number(document.getElementById('green').value.split(' - ')[0]),
			"b" : Number(document.getElementById('blue').value.split(' - ')[0]),
			"a" : Number(document.getElementById('a').value.split(' - ')[0]),
			"lifetime" :Number(document.getElementById('lifetime').value.split(' - ')[0]),
			"vel" : Number(document.getElementById('speedY').value.split(' - ')[0]),
			"ang" : Number(document.getElementById('speedX').value.split(' - ')[0])*Math.PI/180
		},
		max = {
			"r" : Number(document.getElementById('red').value.split(' - ')[1]),
			"g" : Number(document.getElementById('green').value.split(' - ')[1]),
			"b" : Number(document.getElementById('blue').value.split(' - ')[1]),
			"a" : Number(document.getElementById('a').value.split(' - ')[1]),
			"lifetime" : Number(document.getElementById('lifetime').value.split(' - ')[1]),
			"vel" : Number(document.getElementById('speedY').value.split(' - ')[1]),
			"ang" : Number(document.getElementById('speedX').value.split(' - ')[1])*Math.PI/180
		};	
		canvas.onmousemove = function(e){
			 posY = e.clientY;
			posX = e.clientX;
		}
		if(active == 1){	
			px = setInterval(function(){
				setPixels(posX,posY,min,max,n);	
			},20);		
			drawPixels();
		}
		else{
			images = setInterval(function(){
				setImages(posX,posY,min,max,n);	
			},20);
		}								
}


canvas.onmouseup = function(){
	if(active == 1)clearInterval(px);
	else clearInterval(images);
}

document.getElementById('check').onclick = function(e){
	posX = canvas.width/2,
	posY = canvas.height/2;
	if(e.target.checked){
		pxS = setInterval(function(){
			var	n = Number(document.getElementById('n').value),
			min = {
				"r" : Number(document.getElementById('red').value.split(' - ')[0]),
				"g" : Number(document.getElementById('green').value.split(' - ')[0]),
				"b" : Number(document.getElementById('blue').value.split(' - ')[0]),
				"a" : Number(document.getElementById('a').value.split(' - ')[0]),
				"lifetime" :Number(document.getElementById('lifetime').value.split(' - ')[0]),
				"vel" : Number(document.getElementById('speedY').value.split(' - ')[0]),
				"ang" : Number(document.getElementById('speedX').value.split(' - ')[0])*Math.PI/180
			},
			max = {
				"r" : Number(document.getElementById('red').value.split(' - ')[1]),
				"g" : Number(document.getElementById('green').value.split(' - ')[1]),
				"b" : Number(document.getElementById('blue').value.split(' - ')[1]),
				"a" : Number(document.getElementById('a').value.split(' - ')[1]),
				"lifetime" : Number(document.getElementById('lifetime').value.split(' - ')[1]),
				"vel" : Number(document.getElementById('speedY').value.split(' - ')[1]),
				"ang" : Number(document.getElementById('speedX').value.split(' - ')[1])*Math.PI/180
			},
			posX = canvas.width/2,
			posY = canvas.height/2;
			if(active == 1)setPixels(posX,posY,min,max,n);
			else setImages(posX,posY,min,max,n);	
		},20);
	}
	else{
		clearInterval(pxS);
	}
}

document.getElementById('ch').onclick = function(e){
	if(e.target.id == active){}
	else {
		pixels = [];
		var die = {
			"color" : 0,
			"speedY" : 0,
			"speedX" : 0,
			"posX" : 0,
			"posY" : 0,
			"lifeTime" :0,
			"time" : 0,
			"alive" : false
		};
		for(let i = 0;i<1000000;i++){
			pixels.push(die) ;
		}
		h = 0;
		if(active == 1){
			document.getElementById('2').style.background = 'red';
			document.getElementById('2').style.color = 'white';
			document.getElementById('1').style.background = 'white';
			document.getElementById('1').style.color = 'red';
			active = 2;
		}
		else {
			document.getElementById('1').style.background = 'red';
			document.getElementById('1').style.color = 'white';
			document.getElementById('2').style.background = 'white';
			document.getElementById('2').style.color = 'red';
			active = 1;
		}
	}
}





//Слайдеры -->

//0
$( function() {
    $( "#slider-range0" ).slider({
      min: 1,
      max:200,
      step : 5,
      values: [ 30],
      slide: function( event, ui ) {
        $( "#n" ).val( + ui.values[ 0 ] );
      }
    });
    $( "#n" ).val( "" + $( "#slider-range0" ).slider( "values", 0 ) );
  } );

//1

$( function() {
    $( "#slider-range1" ).slider({
      range: true,
      min: -5,
      max:5,
      step : 0.1,
      values: [ -2, 0.1 ],
      slide: function( event, ui ) {
        $( "#speedY" ).val( "" + ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      }
    });
    $( "#speedY" ).val( "" + $( "#slider-range1" ).slider( "values", 0 ) +
      " - " + $( "#slider-range1" ).slider( "values", 1 ) );
  } );

//2

$( function() {
    $( "#slider-range2" ).slider({
      range: true,
      min: 0,
      max: 360,
      step : 0.1,
      values: [ 45, 105 ],
      slide: function( event, ui ) {
        $( "#speedX" ).val( "" + ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      }
    });
    $( "#speedX" ).val( "" + $( "#slider-range2" ).slider( "values", 0 ) +
      " - " + $( "#slider-range2" ).slider( "values", 1 ) );
  } );

//3

$( function() {
    $( "#slider-range3" ).slider({
      range: true,
      min: 500,
      max: 8000,
      step : 10,
      values: [ 1500, 3000 ],
      slide: function( event, ui ) {
        $( "#lifetime" ).val( "" + ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      }
    });
    $( "#lifetime" ).val( "" + $( "#slider-range3" ).slider( "values", 0 ) +
      " - " + $( "#slider-range3" ).slider( "values", 1 ) );
  } );

//4

$( function() {
    $( "#slider-range4" ).slider({
      range: true,
      min: 0,
      max:255,
      step : 1,
      values: [ 0,255 ],
      slide: function( event, ui ) {
        $( "#red" ).val( "" + ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      }
    });
    $( "#red" ).val( "" + $( "#slider-range4" ).slider( "values", 0 ) +
      " - " + $( "#slider-range4" ).slider( "values", 1 ) );
  } );

//5

$( function() {
    $( "#slider-range5" ).slider({
      range: true,
      min: 0,
      max:255,
      step : 1,
      values: [ 0, 255 ],
      slide: function( event, ui ) {
        $( "#green" ).val( "" + ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      }
    });
    $( "#green" ).val( "" + $( "#slider-range5" ).slider( "values", 0 ) +
      " - " + $( "#slider-range5" ).slider( "values", 1 ) );
  } );

//6

$( function() {
    $( "#slider-range6" ).slider({
      range: true,
      min: 0,
      max:255,
      step : 1,
      values: [ 0, 255 ],
      slide: function( event, ui ) {
        $( "#blue" ).val( "" + ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      }
    });
    $( "#blue" ).val( "" + $( "#slider-range6" ).slider( "values", 0 ) +
      " - " + $( "#slider-range6" ).slider( "values", 1 ) );
  } );

//7

$( function() {
    $( "#slider-range7" ).slider({
      range: true,
      min: 0,
      max:255,
      step : 1,
      values: [ 0, 255 ],
      slide: function( event, ui ) {
        $( "#a" ).val( "" + ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      }
    });
    $( "#a" ).val( "" + $( "#slider-range7" ).slider( "values", 0 ) +
      " - " + $( "#slider-range7" ).slider( "values", 1 ) );
  } );