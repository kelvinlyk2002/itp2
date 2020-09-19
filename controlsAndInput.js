//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput(){
	
	this.menuDisplayed = true;
	
	//playback button displayed in the top left of the screen
	this.playbackButton = new PlaybackButton();

	//make the window fullscreen or revert to windowed
	this.mousePressed = function(){
		if(!this.playbackButton.hitCheck()){
			// var fs = fullscreen();
			// fullscreen(!fs);
		}
	};

	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function(keycode){
		if(keycode == 32){
			this.menuDisplayed = !this.menuDisplayed;
		}

		if(keycode == 83){
			sliderDisplayed = !sliderDisplayed;
		}
        
		if(keycode > 48 && keycode < 58){
			var visNumber = keycode - 49;
            // hide slider if it is in open state before changing to another visualisations
            if(sliderDisplayed){
                vis.selectedVisual.hideSliders();
                sliderDisplayed =!sliderDisplayed;
            }
			vis.selectVisual(vis.visuals[visNumber].name);

		}
	};

	//draws the playback button and potentially the menu
	this.draw = function(){
		push();
		fill("white");
		stroke("black");
		strokeWeight(2);
		textSize(34);
        
		//playback button 
		this.playbackButton.draw();
		//only draw the menu if menu displayed is set to true.
		if(this.menuDisplayed){
            text("Press space to hide menu", 100, 30);
			text("Select a visualisation:", 100, 70);
			this.menu();
		}		
		pop();

	};

	this.menu = function(){
		//draw out menu items for each visualisation
		for(var i = 0; i < vis.visuals.length; i++){
			var yLoc = 110 + i*40;
			text((i+1) + ":  " +vis.visuals[i].name, 100, yLoc);
		}
	};

}


