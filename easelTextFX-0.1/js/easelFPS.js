//------------------------------------------------------------
//  kFPS ( posX, posY ) - Class to display the current fps
//  k-lock.de - 08/2012
//------------------------------------------------------------
function easelFPS(x, y) {
    if (arguments.length) this.starter(x, y);
}

easelFPS.prototype = new createjs.Text();
easelFPS.prototype.constructor = easelFPS;
easelFPS.prototype.starter = function (x, y) {

    this.font = "bold 14px Arial";
    this.shadow = new createjs.Shadow(createjs.Graphics.getRGB(17, 17, 17, 0.36), 0, 3, 2);
    this.setTransform(x, y);
    this.updateTF();
}
/** Update textfield with the current fps value.*/
easelFPS.prototype.updateTF = function () {
    this.text = this.getFPS() + " fps";
}
/** Return a createjs.Ticker.getMeasuredFPS value that represent the current fps.*/
easelFPS.prototype.getFPS = function () {
    return Math.round(createjs.Ticker.getMeasuredFPS());
}