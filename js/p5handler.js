var mic, fft, specBar;
var audioCtx = new AudioContext();
var mySampleRate = audioCtx.sampleRate;
var binNum=2048.;

var dF = mySampleRate/binNum;

function setup(){
    colorMode(RGB);

    var fftCanvas = createCanvas(710,400);
    fftCanvas.parent(document.getElementById('p5fft'));

    specBar = createGraphics(400,100);
    
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
    specBar.fill(255,255, 51);

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

    specBar.rect(map(maxFre,0,spectrum.length,0,500)+3,0,5,100);
    image(specBar,0,150,710,10);
    fill(255,0,0);
    document.getElementById('p5bar').innerHTML = "Dominant Frequency (Hz): " + maxFre*dF;
}


