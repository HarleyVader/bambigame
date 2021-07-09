let eyeCursor = document.querySelector("#eyeCursor");

let avgPoints = [];

webgazer.showVideo(false);
webgazer.showPredictionPoints(false)
// webgazer.setRegression("threadedRidge"); //Use threaded ridge for better perfomance (mobile, etc) also, usually better performance means better accuracy
webgazer.setGazeListener((data, elapsedTime) => {//made this into an arrow function
    if (data == null) { 
        return;
    }
    avgPoints.push([data.x,data.y]);
    if(avgPoints.length>20){avgPoints.pop()}
      
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
    console.log(xPred,yPred);
}).begin();

//TODO: calibration, use webgazer.pause and webgazer.resume to stop and start user interaction data collection
