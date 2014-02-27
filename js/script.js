
var myCanvas;
var ctx;

myCanvas=document.getElementById("mycanvas");
//now we'll obtain the rendering context and its drawing function. Here, we will focus on the 2D rendering context
ctx=myCanvas.getContext("2d");
//invoke the draw to make a particle every so often
setInterval(function(){draw();},33);

//starting point for one particle
//var x=100;
//var y=100;

var particles=[];
for(var i=0; i<50; i++){
	//make a partcile and add it to the array
	particles.push(new create_particle());
}//end for loop

//this function makes a new particle with its own x,y,velocity,color,etc
function create_particle(){
	//random x, y position for each particle
	this.x=Math.random()*500;
	this.y=Math.random()*500;
	//random velocity x and y for each particoe
	//suntracting 10 should make half of them get negative numbers. they will move the opposite way
	this.vx=Math.random()*20-10;
	this.vy=Math.random()*20-10;
	//random colorfor each particle
	var r=Math.random()*255>>0;
	var g=Math.random()*255>>0;
	var b=Math.random()*255>>0;
	this.color="rgba("+r+","+g+","+b+",.5)";
	//random size radius berween 20 and 40
	this.radius=Math.random()*20+20;
}
function draw(){
	ctx.globalCompositeOperation="source-over";
	//paint the canvas with a black rectangle
	ctx.fillStyle="rgba(0,0,0,.5)";
	ctx.fillRect(0,0,500,500);
	//now blend the particles with bg
	ctx.globalCompositeOperation="lighter";
	//loop through each of the 50 partciles in our array and move each one
	for(var t=0; t<particles.length; t++){
		//var to refer to the current particle the loop is working on
		var p=particles[t];
		//lets draw a circular partcile
		ctx.beginPath();
		//specify a gradient fill
		var gradient= ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.radius);
		gradient.addColorStop(0,"#dff35a");
		gradient.addColorStop(0.4,"orange");
		//gradient.addColorStop(0.4,"yellow");
		gradient.addColorStop(0.4,p.color);
		gradient.addColorStop(1,"white");
		
		
		ctx.fillStyle=gradient;
		//ctx.fillStyle="#dff35a";
		//make a circle
		ctx.arc(p.x,p.y,p.radius,Math.PI*2,false);
		ctx.fill();
		
		//moe this particle a little
		p.x+=p.vx;
		p.y+=p.vy;
		
		//if particle is off edge of canvas, reset x or y to just off the opposite edge
		if(p.x<-50)p.x=550;
		if(p.y<-50)p.y=550;
		if(p.x>550)p.x=-50;
		if(p.y>550)p.y=-50;
	}
	
	
}