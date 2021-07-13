let eyeCursor = document.querySelector("#eyeCursor");

let avgPoints = [];
let first = true;
 
webgazer.showVideo(false);
webgazer.showPredictionPoints(false)
webgazer.setRegression("weightedRidge"); //Prioritizes new user interactions!
webgazer.applyKalmanFilter(true); // Apply a kalman filter to better track eyes 
webgazer.setGazeListener((data, elapsedTime) => {//made this into an arrow function
    if(first){
      first = false;
      alertBox("Model Loaded! Click To Start");
      setTimeout(startSession,3000);
    }
    if (data == null) { 
        return;
    }
    avgPoints.push([data.x,data.y]);
    if(avgPoints.length>10){avgPoints.shift()} // Get the average prediction
      
    let sumX = 0;
    for(let i=0;i<avgPoints.length;i++){
      sumX+=avgPoints[i][0];
    }
    let sumY = 0;
    for(let j=0;j<avgPoints.length;j++){
      sumY+=avgPoints[j][1];
    }
    let xPred = (sumX / avgPoints.length);
    let yPred = (sumY / avgPoints.length);
    eyeCursor.style.left = xPred+"px";
    eyeCursor.style.top = yPred+"px";
//     console.log(xPred,yPred);
}).begin();

//TODO: calibration, use webgazer.pause and webgazer.resume to stop and start user interaction data collection

// Trance code
function startSession() {
  message("Hello Bambi");
  setTimeout(()=>{message("Can Bambi click all the lovely girly crosses?");},3000);
  
}

//==============================================
//==============================================
// SPIRAL CODE!!

function setup() {
  createCanvas(window.innerWidth, window.innerHeight-document.querySelector("#navbar").clientHeight*1.6);
  textSize(50);
  textAlign(CENTER);
}

function draw() {
  background(0,0,0);
  translate(width/2,height/2);
  text("x",-200,-200);
  text("x",-200,200);
  text("x",200,-200);
  text("x",200,200);
  rotate(frameCount/10);
  a=map(sin(frameCount/20),-1,1,0.5,1.5);
  b=map(cos(frameCount/20),-1,1,1,1.5);
  spiral(a,1,[199, 0, 199]);
  spiral(b,0.3,[255, 130, 255]);
}

function mouseClicked() {
 if(true){
   
 }
}

function spiral(a,x,d) {
  fill(d[0],d[1],d[2]); stroke(d[0],d[1],d[2]);
  var r1 = 0,r2 = 1, step=a,spiralwidth=10.0,dw=spiralwidth/250;
  beginShape(TRIANGLE_STRIP);
  for ( var i = 0 ; i < 250 ; i++ ){
    r1 += step;
    spiralwidth -= dw;
    r2 = r1 + spiralwidth;
    var ang = x;
    var r1x = r1*sin(ang*i);
    var r1y = r1*cos(ang*i);
    var r2x = r2*sin(ang*i);
    var r2y = r2*cos(ang*i);
    vertex(r1x,r1y);
    vertex(r2x,r2y);
     }
  endShape();
}
//==============================================
//==============================================



//UTILITIES
function message(msg) {
    zz = document.createElement("div");
    zz.className = "message";
    zz.innerHTML = msg;
    document.querySelector("#messages").appendChild(zz);
    
    setTimeout(function (that) {
        var div = that;
        div.style.opacity = "0";
        setTimeout(function () {
            div.style.display = "none";
        }, 1000);
    }, 3000, zz);
}

function alertBox(msg) {
    zz = document.createElement("div");
    zz.className = "alert";
    zz.innerHTML = `<span class="closebtn">&times;</span>` + msg + ``;
    document.querySelector("#alertBoxs").appendChild(zz);

    zz.onclick = function () {
        div = zz;
        div.style.opacity = "0";
        setTimeout(function () {
            div.style.display = "none";
        }, 600);
    }
    
  setTimeout(function (that) {
        var div = that;
        div.style.opacity = "0";
        setTimeout(function () {
            div.style.display = "none";
        }, 600);
    }, 3000, zz);
}
