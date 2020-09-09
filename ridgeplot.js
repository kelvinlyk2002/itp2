function ridgePlot() {
    this.name = "ridgeplot";
    var startX = windowWidth/5;
    var startY = windowHeight * (1/5);
    var spectrumWidth = startX * 3;
    var speed = 0.7;
    var lineArray = [];
    var smallScale = 3;
    var bigScale = 48;
    var w = fourier.waveform();
    var ridgeSampleRate = 28;
    var ridgeBandWidth = 0.75;


    this.draw = function(){
        stroke(255);
        strokeWeight(2);
        if(frameCount % 30 == 0){
            addWave();
        }
        for(i = 0; i < lineArray.length; i++){
            var outputLine = lineArray[i];
            beginShape();
            for(j=0; j < outputLine.length; j++){
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
        var output_slots = [];
        for(i = 0; i < w.length; i++){
            if(i % ridgeSampleRate == 0){
                var x = map(i, 0 , 1024, startX, startX + spectrumWidth);
                if(i < 1024 * (1-ridgeBandWidth) || i > 1024 * ridgeBandWidth){
                    var y = map(w[i], -1, 1, -smallScale, smallScale);
                    output_slots.push({
                        x: x,
                        y: startY + y
                    });
                }
            } else {
                    var y = map(w[i], -1, 1, -bigScale, bigScale);
                    output_slots.push({
                        x: x,
                        y: startY + y
                    });
            }
        }   
        lineArray.push(output_slots);
    }
}



/*
    lineArray.push([
                {x: startX, y: startY},
                {x: startX + spectrumWidth, y: startY}
            ]);
*/