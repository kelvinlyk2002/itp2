function ObjectSky(){
    this.name = "Object sky";
    var bassEnergyObjectCanvas = createGraphics(window.width/4 - 25,window.height - 100,WEBGL);
    var lowMidObjectCanvas = createGraphics(window.width/4 - 25,window.height - 100,WEBGL);
    var highMidObjectCanvas = createGraphics(window.width/4 - 25,window.height - 100,WEBGL);
    var trebleObjectCanvas = createGraphics(window.width/4 - 25,window.height - 100,WEBGL);

	this.draw = function(){
        bassEnergyObjectCanvas.background(0);
        lowMidObjectCanvas.background(0);
        highMidObjectCanvas.background(0);
        trebleObjectCanvas.background(0);

        var spectrum = fourier.analyze();
        var bassEnergy = fourier.getEnergy("bass");
        var lowMidEnergy = fourier.getEnergy("lowMid");
        var highMidEnergy = fourier.getEnergy("highMid");
        var trebleEnergy = fourier.getEnergy("treble");
        
        bassEnergyObjectCanvas.push();
        bassEnergyObjectCanvas.rotateZ(frameCount * 0.01);
        bassEnergyObjectCanvas.rotateX(frameCount * 0.01);
        bassEnergyObjectCanvas.rotateY(frameCount * 0.01);
        var bassEnergyRadius = map(bassEnergy, 0, 255, 0, width);
        bassEnergyObjectCanvas.sphere(bassEnergyRadius);
        bassEnergyObjectCanvas.pop();

        lowMidObjectCanvas.push();
        lowMidObjectCanvas.rotateZ(frameCount * 0.01);
        lowMidObjectCanvas.rotateX(frameCount * 0.01);
        lowMidObjectCanvas.rotateY(frameCount * 0.01);
        var lowMidEnergyRadius = map(lowMidEnergy, 0, 255, 0, width);
        lowMidObjectCanvas.sphere(lowMidEnergyRadius);
        lowMidObjectCanvas.pop();

        highMidObjectCanvas.push();
        highMidObjectCanvas.rotateZ(frameCount * 0.01);
        highMidObjectCanvas.rotateX(frameCount * 0.01);
        highMidObjectCanvas.rotateY(frameCount * 0.01);
        var highMidEnergyRadius = map(highMidEnergy, 0, 255, 0, width);
        highMidObjectCanvas.sphere(highMidEnergyRadius);
        highMidObjectCanvas.pop();

        trebleObjectCanvas.push();
        trebleObjectCanvas.rotateZ(frameCount * 0.01);
        trebleObjectCanvas.rotateX(frameCount * 0.01);
        trebleObjectCanvas.rotateY(frameCount * 0.01);
        var trebleEnergyRadius = map(trebleEnergy, 0, 255, 0, width);
        trebleObjectCanvas.sphere(trebleEnergyRadius);
        trebleObjectCanvas.pop();

        image(bassEnergyObjectCanvas, 50, 50);
        image(lowMidObjectCanvas, window.width/4 + 25, 50);
        image(highMidObjectCanvas, window.width/2, 50);
        image(trebleObjectCanvas, window.width*3/4 - 25, 50);
	};
}