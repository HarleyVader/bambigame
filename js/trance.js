let eyeCursor = document.querySelector("#eyeCursor");

let avgPoints = [];

webgazer.setRegression("threadedRidge"); //Use threaded ridge for better perfomance (mobile, etc) also, usually better performance means better accuracy
webgazer.setGazeListener((data, elapsedTime) => {//made this into an arrow function
    if (data == null) {
        return;
    }
    avgPoints.push([data.x,data.y]);
    if(avgPoints.length>20){avgPoints.pop()}
      
    let sumX = avgPoints.reduce((a, b) => a[0] + b[0], 0); // Use fancy array stuff
    let sumY = avgPoints.reduce((a, b) => a[1] + b[1], 0);
    let xPred = (sumX / avgPoints.length) || 0;
    let yPred = (sumY / avgPoints.length) || 0;
    eyeCursor.style.left = xPred;
    eyeCursor.style.top = yPred;
    console.log(`${xPred} ${yPred}`);
}).begin();

//TODO: calibration, use webgazer.pause and webgazer.resume to stop and start user interaction data collection
