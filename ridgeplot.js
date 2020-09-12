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
    var speedSlider = createSlider(1,4,2.1);
    speedSlider.position(SliderPosXHidden, SliderPosYHidden);
    speedSlider.style('width', '80px');

    // Scale Slider
    var scaleSlider = createSlider(300,800,360);
    scaleSlider.position(SliderPosXHidden, SliderPosYHidden);
    scaleSlider.style('width', '80px');

    // Sample Rate Slider
    var ridgeSampleRateSlider = createSlider(1,5,3);
    ridgeSampleRateSlider.position(SliderPosXHidden, SliderPosYHidden);
    ridgeSampleRateSlider.style('width', '80px');

    var ridgeBandWidth = 0.75;


    this.draw = function(){
        noFill();
        strokeWeight(1);
        // Present Sliders
        speedSlider.position(SliderPosXShown, SliderPosYShown + 10);
        speed = speedSlider.value();
        stroke(255);
        text("Speed - " + speed, SliderPosXShown, SliderPosYShown)

        scaleSlider.position(SliderPosXShown, SliderPosYShown + 60);
        bigScale = scaleSlider.value();
        smallScale = bigScale / 8;
        text("Scale - " + bigScale, SliderPosXShown, SliderPosYShown + 50)

        ridgeSampleRateSlider.position(SliderPosXShown, SliderPosYShown + 110);
        ridgeSampleRate = 2**(6-ridgeSampleRateSlider.value());
        text("SampleSize - " + ridgeSampleRateSlider.value(), SliderPosXShown, SliderPosYShown + 100)


        if(frameCount % ridgeSampleRate == 0){
            addWave();
        }
        for(i = 0; i < lineArray.length; i++){
            var outputLine = lineArray[i];
            beginShape();
            for(j = 0; j < outputLine.length; j++){
                strokeWeight(2);
                stroke(outputLine[j].rColor,outputLine[j].gColor,outputLine[j].bColor);
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
            if(i % 16 == 0){
                var pointX = map(i, 0 , 1024, startX, startX + spectrumWidth);
                if (i < w.length * (1-ridgeBandWidth) || i > w.length * ridgeBandWidth){
                    var pointY = map(w[i], -1, 1, -smallScale, smallScale);
                } else {
                    var pointY = map(w[i], -1, 1, -bigScale, bigScale);
                }
                    output_slots.push({
                        x: pointX,
                        y: startY + pointY,
                        rColor: random(0,255),
                        gColor: random(0,255),
                        bColor: random(0,255)
                        });
                }
            }   

        lineArray.push(output_slots);
        }
}