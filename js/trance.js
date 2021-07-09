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


//UTILITIES
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
