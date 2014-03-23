function start() {
	var canvas = document.getElementById('sheep');
	var ctx = canvas.getContext('2d');
	var sheep1 = loadImage("sheep1.png");
	var background = loadImage("grass.png");
	var banner = loadImage("banner.png");
	
	whenAllLoaded([background, sheep1, banner], function() {
		draw(ctx, background, sheep1);
		ctx.drawImage(banner, 0, 140);
	});
	
	canvas.addEventListener("click", function(event) {
		draw(ctx, background, sheep1);
		var coords = relMouseCoords(event, canvas)
		ctx.fillRect(coords.x, coords.y, 1,1)
	});
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

function draw(ctx, background, sheep1){
		tile(ctx, background, 400, 0, 0, 64, 64);	
		tile(ctx, sheep1, 400, 0, 0, 100, 100);
}

function loadImage(src){
	var image = new Image;
	image.src = src;
	return image;
}
function tile(ctx, image, canvasSize, startx, starty, deltax, deltay){
	for(var x=0; x<canvasSize; x+=deltax){
		for(var y=0; y<canvasSize; y+=deltay){
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
		time:0,
		x:x,
		y:y
	};
}

var STATUS_GOOD = 0,
	STATUS_OK   = 1,
	STATUS_BAD  = 2,
	STATUS_GONE = 3;