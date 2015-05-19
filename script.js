window.SheepSprites = []

function start() {
	var canvas = document.getElementById('sheep');
	var ctx = canvas.getContext('2d');
	var background = loadImage("grass.png");
	var banner = loadImage("banner.png");
	
	for (var i = 1; i <= 4; i++) {
		var str = 'sheep' + i +'.png'
		SheepSprites.push(loadImage(str))
	}
	
	var sheepArray = []
	for (var x=0; x < canvas.width; x+=100){
		for(var y=0; y < canvas.height; y+=100){
			sheepArray.push(makeSheep(x,y))
		}
	}

	whenAllLoaded([background, banner], function() {
		draw(ctx, background);
		ctx.drawImage(banner, 0, 140);
	});

	var started = false
	canvas.addEventListener("click", function(){
		if(!started){
			startGame(ctx, background, sheepArray)
			started = true
		}
	})
}	
function startGame(ctx, background, sheepArray){
	setInterval(function(){
		draw(ctx, background);
		sheepArray.forEach(function(sheep) {
			drawSheep(ctx, sheep)
		})
	}, 33);
	
	sheepArray.forEach(function(sheep){
		var time = timeUntilTrans()
		setTimeout(function(){
			sheep.status += 1
			setTimeout(function(){
				sheep.status +=1
				setTimeout(function(){
					sheep.status +=1
				}, timeUntilTrans())
			}, timeUntilTrans())
		}, time)
	})
}

//Get the coordinates of an event relative to a certain element on the page
function relMouseCoords(event, element){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = element;

    do{
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {x:canvasX, y:canvasY}
}

function draw(ctx, background){
		tile(ctx, background, 400, 64, 64);	
}

function drawSheep (ctx, sheep){
	ctx.drawImage(SheepSprites[sheep.status], sheep.x, sheep.y)
}

function loadImage(src){
	var image = new Image;
	image.src = src;
	return image;
}
function tile(ctx, image, canvasSize, deltax, deltay){
	for(var x=0; x < canvasSize; x+=deltax){
		for(var y=0; y < canvasSize; y+=deltay){
			ctx.drawImage(image, x, y);
		};
	};
}

function whenAllLoaded(images, callback){
	function isLoaded(image){
		return image.complete;
	};
	if (images.every(isLoaded)) {
		callback();
	} else {
		setTimeout(whenAllLoaded, 1000, images, callback);
	};
}

function makeSheep(x,y){
	return {
		status: STATUS_GOOD,
		x:x,
		y:y
	};
}

function timeUntilTrans() {
	return (Math.random() + 2) * 1000
}

//function setOff ()

var STATUS_GOOD = 0,
	STATUS_OK   = 1,
	STATUS_BAD  = 2,
	STATUS_GONE = 3;