function Spectrum(){
	this.name = "Spectrum";

	this.draw = function(){
	push();
		translate(window.width/2, window.height/2);
		fill(255);
		textAlign(CENTER, CENTER);
		text("Slide up for bigger circle \n Slide right for thicker bars", 0, 0);
		var radius = map(mouseY, 0, window.height, 50, 250);
		var width = map(mouseX, 0, window.width, 1, 20);
		var spectrum = fourier.analyze();
		noStroke();

		for(var i = 0; i< spectrum.length; i++){
			// fade the colour of the bin from green to red
			var g = map(spectrum[i], 0, 255, 255, 0);
			fill(spectrum[i], g, 0);

			//draw each bin as a rectangle from the left of the screen
			//across
			var degree = map(i,0,spectrum.length,0,360);
			var rectlength = spectrum[i];
			angleMode(DEGREES);
			rotate(degree);
			rect(
				 + radius,
				 - radius - rectlength,
				width,
				rectlength
				);
			angleMode(RADIANS);
			}
		pop();
	};
}
