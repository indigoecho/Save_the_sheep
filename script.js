//Drawing on the canvas
function draw() {
	var canvas = document.getElementById('sheep');
	var ctx = canvas.getContext('2d');
	var imageObj = new Image();
	imageObj.src = "sheep1.png";
	
	imageObj.onload = function(){
		var xs=[0,100,200,300];
		var ys=[0,100,200,300]
		xs.forEach(function (x) {
			ys.forEach(function(y){
				ctx.drawImage(imageObj, x, y);
			});
		});
	};
}