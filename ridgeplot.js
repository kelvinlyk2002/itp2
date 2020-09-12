function ridgePlot() {
    this.name = "ridgeplot";
    var startX = windowWidth/5;
    var startY = windowHeight * (1/5);
    var lineArray = [];

    var spectrumWidth = startX * 3;

    var SliderPosXHidden = windowWidth * 1.2;
    var SliderPosYHidden = windowHeight * 1.2;

    var SliderPosXShown = windowWidth * 0.8;
    var SliderPosYShown = windowHeight * 0.2;

    // Speed Slider
    var speedSlider = createSlider(0.1,3,0.7);
    speedSlider.position(SliderPosXHidden, SliderPosYHidden);
    speedSlider.style('width', '80px');

    // Scale Slider
    var scaleSlider = createSlider(10,400,80);
    scaleSlider.position(SliderPosXHidden, SliderPosYHidden);
    scaleSlider.style('width', '80px');

    // Sample Rate Slider
    var ridgeSampleRateSlider = createSlider(1,1024,64,2);
    ridgeSampleRateSlider.position(SliderPosXHidden, SliderPosYHidden);
    ridgeSampleRateSlider.style('width', '80px');

    var ridgeBandWidth = 0.75;


    this.draw = function(){
        // Present Sliders
        speedSlider.position(SliderPosXShown, SliderPosYShown);
        speed = speedSlider.value();

        scaleSlider.position(SliderPosXShown, SliderPosYShown + 20);
        bigScale = scaleSlider.value();
        smallScale = bigScale / 8;

        ridgeSampleRateSlider.position(SliderPosXShown, SliderPosYShown + 40);
        ridgeSampleRate = ridgeSampleRateSlider.value();
        
        stroke(255);
        strokeWeight(2);
        if(frameCount % 24 == 0){
            addWave();
        }
        for(i = 0; i < lineArray.length; i++){
            var outputLine = lineArray[i];
            beginShape();
            for(j = 0; j < outputLine.length; j++){
                outputLine[j].y += speed;
                vertex(outputLine[j].x, outputLine[j].y);
            }
            endShape();
            if(lineArray[0].y > windowHeight){
                lineArray.splice(i, 1);
            }
        }
    }
    
    function addWave(){ 
        var w = fourier.waveform();
        var output_slots = [];
        for(i = 0; i < w.length; i++){
            if(i % ridgeSampleRate == 0){
                var pointX = map(i, 0 , 1024, startX, startX + spectrumWidth);
                if (i < w.length * (1-ridgeBandWidth) || i > w.length * ridgeBandWidth){
                    var pointY = map(w[i], -1, 1, -smallScale, smallScale);
                } else {
                    var pointY = map(w[i], -1, 1, -bigScale, bigScale);
                }
                    output_slots.push({
                        x: pointX,
                        y: startY + pointY
                        });
                }
            }   

        lineArray.push(output_slots);
        }
}