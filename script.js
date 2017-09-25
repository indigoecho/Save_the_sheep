window.SheepSprites = []

//Sets up game so that when you click the game starts
function start() {
	var canvas = document.getElementById('sheep');
	var ctx = canvas.getContext('2d');
	
	//Load sprites
	var background = loadImage("grass.png");
	var banner = loadImage("banner.png");
	for (var i = 1; i <= 4; i++) {
		var str = 'sheep' + i +'.png'
		SheepSprites.push(loadImage(str))
	}
	//Initialise game data
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
	//Add event listener so that the next click starts the game
	var started = false
	canvas.addEventListener("click", function(){
		if(!started){
			startGame(ctx, background, sheepArray)
			started = true
		}
	})
}	

// Start of the game loop
function startGame(ctx, background, sheepArray){
	setInterval(function(){
		draw(ctx, background);
		sheepArray.forEach(function(sheep) {
			drawSheep(ctx, sheep)
		})
	}, 33);
	function go(){
		console.log ("hi")
		var time = timeUntilTrans()
		setTimeout(function (){
			var index = selectSheep(sheepArray)
			handleEvent({type: "transition", data: index}, sheepArray)
			go()
		}, time)
	} 
	go()
}

//
function handleEvent(event, state){
	if (event.type == "transition"){
		var sheep = state[event.data]
		sheep.status +=1
	}
	
}

//Select a sheep (which has not already gone) to transition
function selectSheep(sheepArray){
	var candidates = []
	sheepArray.forEach(function(sheep, index){
		if (sheep.status != STATUS_GONE){
			candidates.push(index)
		}
	})
	return randomElement(candidates)
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

//Draws the background
function draw(ctx, background){
		tile(ctx, background, 400, 64, 64);	
}

//Draws a single sheep sprite
function drawSheep (ctx, sheep){
	ctx.drawImage(SheepSprites[sheep.status], sheep.x, sheep.y)
}

//Loads an image object from URL
function loadImage(src){
	var image = new Image;
	image.src = src;
	return image;
}

//Tiles the given image over canvas
function tile(ctx, image, canvasSize, deltax, deltay){
	for(var x=0; x < canvasSize; x+=deltax){
		for(var y=0; y < canvasSize; y+=deltay){
			ctx.drawImage(image, x, y);
		};
	};
}

//Waits for images to finish loading and then calls the supplied callback
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

//Creates an object to represent a sheep with the given co-ordinates
function makeSheep(x,y){
	return {
		status: STATUS_GOOD,
		x:x,
		y:y
	};
}

//Time until status change
function timeUntilTrans() {
	return ((Math.random() * 1000))
}

//function setOff ()

var STATUS_GOOD = 0,
	STATUS_OK   = 1,
	STATUS_BAD  = 2,
	STATUS_GONE = 3;
	
function randomElement(array){
	return array[Math.floor (Math.random() * array.length)] 
}