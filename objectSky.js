function ObjectSky(){
    this.name = "Object sky";

    var canvasArray = [];
    var margin = 50;

    // build a 4x4 canvas
    for (var i = 0; i < 16; i++){
        var canvas = {
            graphics: createGraphics(window.width/4 - 25,window.height/4 - 25,WEBGL),
            xpos: margin + (i % 4) * (window.width/4 - margin/2),
            ypos: margin + Math.floor(i / 4) * (window.height/4 - margin/2)
        };
        canvasArray.push(canvas);
    }

	this.draw = function(){
        var spectrum = fourier.waveform(16);
        for (var i = 0; i < 16; i++){
            renderObject(
                canvasArray[i].graphics,
                spectrum[i],
                canvasArray[i].xpos,
                canvasArray[i].ypos
            );
        }
	};
}

function renderObject(canvas, energy, canvas_xpos, canvas_y_pos){
    // transparent background for all Graphics canvas
        canvas.background('rgba(128,128,128,1)');
        canvas.push();
        // rotating object
        canvas.rotateY(frameCount * 0.1);
        // rendering the object
        canvas.translate(energy*10, energy*10);
        canvas.normalMaterial();
        var objectRadius = map(energy,-1,1, canvas.height/6, canvas.height/3);
        canvas.torus(objectRadius,5);
    canvas.pop();
    // moving the canvas into position on screen
    image(canvas, canvas_xpos, canvas_y_pos);
}