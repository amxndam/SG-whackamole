var columns = 4;
var rows = 3;
var gameFrameWidth = 0;
var gameFrameHeight = 0;
var caveWidth = 0;
var caveHeight = 0;
var caveCoord = []; // Todas las coordenadas de la cueva
var caveCoordMark = [];
 var mouseOffsetX = 10; // Desplazamiento del eje X después de cambiar a un martillo
 var mouseOffsetY = 15; // desplazamiento del eje Y
 
 var mouseTimeQueue = []; // Cola de tiempo donde existe el mouse
 var nowMouseTime = []; // El ciclo de vida que ha pasado el mouse
 var bulgeQueue = []; // La cola del mouse de la sonda
 var destroyQueue = []; // La cola del mouse destruida real
 var maxMouseNum = 5; // Número máximo de ratones
 var startLoop = undefined; // Inicio del cambio
 var pauseFlag = false; // Indicador de pausa
 var minTime = 10; // El período de tiempo mínimo para la supervivencia
 var maxTime = 15; // El período de tiempo máximo de supervivencia
 var mouseFrameNum = 5; // el número de fotogramas en la imagen
var leftWidth = 0;
var topHeight = 0;
//var preTimeStamp = 0;
 
var score = 0;
 
window.onload = function() {
	init();
	mainFrameOnclick();
}
 
function init() {
//	preTimeStamp = Date.parse(new Date());
	gameFrameWidth = mainFrame.offsetWidth;
	gameFrameHeight = mainFrame.offsetHeight;
	caveWidth = Math.floor(gameFrameWidth / (columns + 2));
	caveHeight = Math.floor(gameFrameHeight / (rows + 2));
	 caveHeight = caveWidth = Math.min (caveHeight, caveWidth); // El lado más pequeño de la longitud y el ancho de la cueva calculada se usa como el ancho de la cueva
	caveCoord = drawCave();
	mouseAnimationUpdate();
	scoreAutomationChange();
}
 
function timeChange(){
	let timestamp = Date.parse(new Date());
	let time = document.getElementById("timeId");
	let m = 0;
	let s = 0;
	setInterval(()=>{
		let now = Date.parse(new Date());
		let v = (now - timestamp)/1000;
//		console.log(v);
		let str = "";
		s = v % 60;
		m = Math.floor(v/60);
		str = str + (m>9?m:"0"+m);
		str = str + ":";
		str = str + (s>9?s:"0"+s);
		time.innerText = str;
	},1000);
}
 
function scoreAutomationChange(){
	leftWidth = mainFrame.getBoundingClientRect().left;
	topHeight = mainFrame.getBoundingClientRect().top;
	mainFrame.addEventListener("click",(event)=>{
		CheckHitMouse(event.pageX,event.pageY);
//		CheckHitMouse(event.pageX - left,event.pageY - top);
	});
}
 
 
function CheckHitMouse(xx,yy) {
	 let x = xx + mouseOffsetX; // Calcular el desplazamiento del mouse
	let y = yy + mouseOffsetY;
	 // La ubicación del clic del mouse
//	let c = document.createElement("div");
//	c.style.backgroundColor = "red";
//	c.style.width = "10px";
//	c.style.height = "10px";
//	c.style.left = x-5 + "px";
//	c.style.top = y-5 + "px";
//	c.style.position = "absolute";
//	mainFrame.appendChild(c);
//	console.log("**"+x+"  "+y);
	let flag = false;
	for(let i = 0; i < bulgeQueue.length; i ++ ){
		let mouse = document.getElementById("mouseId"+bulgeQueue[i][2]);
		let left = mouse.getBoundingClientRect().left;
		let top = mouse.getBoundingClientRect().top;
		console.log(left+"  "+top);
		if(x>left&&x<left+caveWidth&&y>top&&y<top+caveHeight){
			playHitAnimation(xx-leftWidth,yy-topHeight,i);
			score+=1;
			document.getElementById("scoreId").innerText = score;
		}
	}
}
 
function playHitAnimation(x,y,index){
	let a = document.createElement("img");
	a.src = "img/4.png";
	a.width = caveWidth;
	a.hheight = caveHeight;
	a.classList.add("caveCss");
	a.style.left = x-5 +"px";
	a.style.top = y-5 + "px";
	mainFrame.appendChild(a);
	setTimeout(()=>{
		mainFrame.removeChild(a);
		let v = bulgeQueue[index];
		let element = document.getElementById("mouseId"+v[2]);
		element.src = "img/mouse0.png";
		caveCoord.push(v);
		bulgeQueue.splice(index,1);
		nowMouseTime.splice(index,1);
		mouseTimeQueue.splice(index,1);
	},100);
}
 
function startGame() {
	pauseFlag = false;
	window.clearInterval();
	timeChange();
	startLoop = setInterval(()=>{
		if(pauseFlag) return;
		for(let i = 0; i < bulgeQueue.length; i ++ ){
			if(nowMouseTime[i] >= mouseFrameNum && nowMouseTime[i] <= mouseTimeQueue[i]){
				nowMouseTime[i]+=1;
			}
		}
		 if (bulgeQueue.length <maxMouseNum) {// el número de ratones es inferior a 5
			let index = getRandom(caveCoord.length);
			bulgeQueue.push(caveCoord[index]);
			caveCoord.splice(index,1);
			mouseTimeQueue.push(getRandomTime());
			nowMouseTime.push(0);
		}
	},500);
}
 
function mouseAnimationUpdate(){
	setInterval(()=>{
		if(pauseFlag) return;
		for(let i = 0; i < bulgeQueue.length; i ++ ){
			if(nowMouseTime[i]<mouseFrameNum){
				nowMouseTime[i]+=1;
				let mouse = bulgeQueue[i];
				let element = document.getElementById("mouseId"+mouse[2]);
				element.src = "img/mouse"+nowMouseTime[i]+".png";
			}
			else if(nowMouseTime[i]>mouseTimeQueue[i]){
				let mouse = bulgeQueue[i];
				let element = document.getElementById("mouseId"+mouse[2]);
				if(nowMouseTime[i]-mouseTimeQueue[i] >= mouseFrameNum+1){
					caveCoord.push(bulgeQueue[i]);
					bulgeQueue.splice(i,1);
					nowMouseTime.splice(i,1);
					mouseTimeQueue.splice(i,1);
					break;
				}
				element.src = "img/mouse"+(mouseFrameNum-nowMouseTime[i]+mouseTimeQueue[i])+".png";
				nowMouseTime[i]+=1;
			}
		}
	},200);
}
 
function pauseGame() {
	pauseFlag = pauseFlag ? false : true;
}
 
function stopGame() {
	location.reload();
}
 
function getRandomTime(){
	return minTime + getRandom(maxTime - minTime);
}
 
 
function mainFrameOnclick() {
	let mf = document.getElementById("mainFrame");
	mf.onclick = function(e) {
		mf.style.cursor = "url(img/01.ico),auto";
		setTimeout(() => {
			mf.style.cursor = "url(img/21.ico),auto";
		}, 200);
		setTimeout(() => {
			mf.style.cursor = "url(img/11.ico),auto";
		}, 400);
	}
}
 
function drawCave() {
	let coord = getAxialCoord();
	let count = getRandom(2) + 1;
	let mark = [];
	let newCoord = [];
	for(let i = 0; i < count; i++) {
		mark[getRandom(columns * rows)] = true;
	}
	for(let i = 0; i < coord.length; i++)
		if(mark[i] == undefined) {
			coord[i].push(i);
			newCoord.push(coord[i]);
			CreateCaveElement(coord[i][0], coord[i][1],i);
		}
	return newCoord;
}
 
function CreateCaveElement(axialX, axialY,index) {
	let createImg = document.createElement("img");
	createImg.width = caveWidth;
	createImg.height = caveHeight;
	createImg.style.left = axialX + "px";
	createImg.style.top = axialY + "px";
	createImg.classList.add("caveCss");
	createImg.id = "mouseId"+index;
	createImg.src = "img/mouse0.png";
	mainFrame.appendChild(createImg);
}
 
function getAxialCoord() {
	let location = [];
	let xWidth = Math.floor(gameFrameWidth / columns);
	let xRange = xWidth - caveWidth;
	let yHeight = Math.floor(gameFrameHeight / rows);
	let yRange = yHeight - caveHeight;
	for(let i = 0; i < rows; i++) {
		for(let j = 0; j < columns; j++) {
			let coord = [];
			coord.push(j * xWidth + getRandom(xRange));
			coord.push(i * yHeight + getRandom(yRange));
			location.push(coord);
		}
	}
	return location;
}
 
function getRandom(max) {
	let a = Math.random();
	return Math.floor(a * max);
}