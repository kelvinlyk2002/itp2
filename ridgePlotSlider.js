//displays and handles clicks on the playback button.
function RidgePlotSlider(){
    
    this.SliderPosXHidden = windowWidth * 1.2;
    this.SliderPosYHidden = windowHeight * 1.2;
    this.SliderPosXShown = windowWidth * 0.8;
    this.SliderPosYShown = windowHeight * 0.2;


    // Speed Slider
    this.speedSlider = createSlider(1,4,2.1);

    // Scale Slider
    this.scaleSlider = createSlider(300,800,360);

    // Sample Rate Slider
    this.ridgeSampleRateSlider = createSlider(1,5,3);
    
    // Ridge Bandwidth Slider
    this.ridgeBandWidthSlider = createSlider(0,1,0.5,0.05);
    
	//flag to determine whether to play or pause after button click and
	//to determine which icon to draw
	this.isRidgePlot = false;

	this.draw = function(){
		if(this.isRidgePlot){
            strokeWeight(1);
            // Present Sliders
            this.speedSlider.position(SliderPosXShown, SliderPosYShown + 10);
            speed = speedSlider.value();
            stroke(255);
            text("Speed - " + speed, SliderPosXShown, SliderPosYShown)
    
            this.scaleSlider.position(SliderPosXShown, SliderPosYShown + 60);
            bigScale = scaleSlider.value();
            smallScale = bigScale / 8;
            text("Scale - " + bigScale, SliderPosXShown, SliderPosYShown + 50)
    
            this.ridgeSampleRateSlider.position(SliderPosXShown, SliderPosYShown + 110);
            this.ridgeSampleRate = 2**(6-ridgeSampleRateSlider.value());
            text("SampleSize - " + ridgeSampleRateSlider.value(), SliderPosXShown, SliderPosYShown + 100)
    
            this.ridgeBandWidthSlider.position(SliderPosXShown, SliderPosYShown + 160);
            this.ridgeBandWidth = map(ridgeBandWidthSlider.value(),0,1,0.5,1);
            text("Ridge Band Width - " + ridgeBandWidthSlider.value(), SliderPosXShown, SliderPosYShown + 150)    
		}
		else{	
            this.speedSlider.position(this.SliderPosXHidden, this.SliderPosYHidden);
            this.scaleSlider.position(this.SliderPosXHidden, this.SliderPosYHidden);
            this.ridgeSampleRateSlider.position(this.SliderPosXHidden, this.SliderPosYHidden);
            this.ridgeBandWidthSlider.position(this.SliderPosXHidden, this.SliderPosYHidden);
		}
	};
}