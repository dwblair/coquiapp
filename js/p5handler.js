var mic, fft, specBar;


function setup(){
    colorMode(RGB);

    var fftCanvas = createCanvas(710,400);
    fftCanvas.parent(document.getElementById('p5fft'));

    specBar = createGraphics(100,400);
    
    noFill();
    stroke(192, 57, 43);
    strokeWeight(2);

    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);
}

function draw(){
    background(26, 188, 156);
    specBar.background(52, 73, 94);
    specBar.noStroke();
    specBar.fill(211, 84, 0);

    var spectrum = fft.analyze();
    var maxSpec = -1;
    var maxFre = 0;
    
    beginShape();
    for(i=0;i<spectrum.length;i++){
	if(spectrum[i] > maxSpec){
	    maxSpec = spectrum[i];
	    maxFre = i;
	}
	vertex(i,map(spectrum[i],0,255,height,0));
    }
    endShape();

    specBar.rect(0,(255-maxFre)/255*height,100,maxFre/255*height);
    image(specBar,610,0,100,400);
    document.getElementById('p5bar').innerHTML = "Dominant Frequency: " + maxFre;
}


