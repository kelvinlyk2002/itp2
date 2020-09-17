//draw the waveform to the screen
function colourRipple() {
	//vis name
	this.name = "Colour ripple";
    var ellipseDataArray = [];

	//draw the mirrorballs to the screen
	this.draw = function() {
        // sample sound
        var spectrum = fourier.analyze(1024);
        currentSample = new ellipseData(
            fourier.getEnergy("highMid"),
            fourier.getEnergy("mid"),
            fourier.getEnergy("lowMid"),
            fourier.getEnergy("bass") + frameCount
        );
        

        
        //print the sampled sound
        ellipseDataArray.push(currentSample);
        for(i = 0; i < ellipseDataArray.length; i++){
        if (frameCount % 10 == 0){
            shakiness = 0;
        }
            noFill();
            strokeWeight(4);
            stroke(
                ellipseDataArray[i].colourR,
                ellipseDataArray[i].colourG,
                ellipseDataArray[i].colourB
            );
            ellipse(
                windowWidth/2,
                windowHeight/2,
                ellipseDataArray[i].size - frameCount
            );
        }
        
        // remove old ellipse to improve performance
        if(ellipseDataArray.length > 2000){
             ellipseDataArray.shift(currentSample);
        }
	};
}

function ellipseData (r, g, b, size){
    this.colourR = r;
    this.colourG = g;
    this.colourB = b;
    this.size = map(random(0,255), 0, 255, 0, size);
}
