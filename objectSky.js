function ObjectSky(){
    this.name = "Object sky";
    var objectCanvas = createGraphics(window.width - 100,window.height - 100,WEBGL);

	this.draw = function(){
        objectCanvas.background(255);
        var spectrum = fourier.analyze();
        var bassEnergy = fourier.getEnergy("bass");
        var lowMidEnergy = fourier.getEnergy("lowMid");
        var highMidEnergy = fourier.getEnergy("highMid");
        var trebleEnergy = fourier.getEnergy("treble");

        objectCanvas.translate(-1,-1);
        objectCanvas.ellipsoid(20);


        image(objectCanvas, 50, 50);
	};
}