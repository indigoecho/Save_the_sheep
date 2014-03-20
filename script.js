//Drawing on the canvas
function draw() {
	var canvas = document.getElementById('sheep');
	var ctx = canvas.getContext('2d');
	var sheep1 = new Image();
	sheep1.src = "sheep1.png";
	var background = new Image();
	background.src = "grass.png";
	
	whenAllLoaded([background, sheep1], function() {
		tile(ctx, background, 400, 0, 0, 64, 64);	
		tile(ctx, sheep1, 400, 0, 0, 100, 100);
	});
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
		setTimeout(whenAllLoaded, 1000);
	};
}