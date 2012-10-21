//------------------------------------------------------------
//  kFPS ( posX, posY ) - Class to display the current fps
//  k-lock.de - 08/2012
//------------------------------------------------------------
function kFPS(x,y){
    if (arguments.length) this.starter(x, y);
}

kFPS.prototype = new createjs.Text();
kFPS.prototype.constructor = kFPS;

kFPS.prototype.starter = function (x, y) {
   
    this.font = "bold 14px Arial";
    this.shadow = new createjs.Shadow(createjs.Graphics.getRGB(17, 17, 17, 0.36), 0, 3, 2);
    this.setTransform(x, y);
    this.updateTF();
}
/** Update textfield with the current fps value.*/
kFPS.prototype.updateTF = function () {
    this.text = this.getFPS() + " fps";
}
/** Return a createjs.Ticker.getMeasuredFPS value that represent the current fps.*/
kFPS.prototype.getFPS = function () {
    return Math.round(createjs.Ticker.getMeasuredFPS());
}