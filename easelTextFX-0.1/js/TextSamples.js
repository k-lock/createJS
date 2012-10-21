
var canvas, stage,c,s;

function init_TF() {


    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth - 100;
    canvas.height = window.innerHeight - 100;

    stage = new createjs.Stage(canvas);
    stage.enableMouseOver()

    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addListener(window)


    fps = new kFPS(canvas.width - 60, 20);
    fps.shadow=null
    fps.color = "#fff"
   
     //   s = new createjs.Shape(new createjs.Graphics());
    //    s.graphics.beginFill(createjs.Graphics.getRGB(0, 0, 0, .2)).drawRect(150,25,285, 50).endFill();
      
    //    stage.addChild(TextFX.createTF("easelTextFX", 150, 150));


   
    var tf1 = TextFX.createTF("easel", 150, 50, "90px Arial"); tf1.outline = true;
    var tf2 = TextFX.createTF("Text", 255, 50,"bold 90px Arial")
    var tf3 = TextFX.createTF("FX", 345, 50, "90px Arial")

    tf1.color = tf3.color = tf2.color = "#fff"
    tf1.shadow = tf3.shadow = new createjs.Shadow("#ffffff", 0, 2, 10);

    var tfx1 = new TextFX(tf1, TextFX.SPLIT_CHAR);
    var tfx2 = new TextFX(tf2, TextFX.SPLIT_CHAR, 1000);
    var tfx3 = new TextFX(tf3, TextFX.SPLIT_CHAR, 1800);

    stage.addChild(tfx1,tfx2,tfx3,fps)

    stage.update();
}
function tick() {
    fps.updateTF();
    stage.update();
}

/*
function TextFXzero(text, x, y) {
 
    var word = text
    var wordWidth = 0;
    var wordList = word.split("")
    var c = new createjs.Container(); stage.addChild(c);
    for (var i = 0; i < wordList.length; i++) {

        if (wordList[i] !== " ") {
 
            var char = TextFX.createTF(wordList[i]);
            var letterWidth = char.getMeasuredWidth();
   
            char.setTransform(wordWidth + x + (letterWidth * .5), y);
            char.alpha = 0;
            char.color = "#ff6600"

      //      s.graphics.beginStroke(createjs.Graphics.getRGB(0, 0, 0)).drawRect(wordWidth + x, y-25, letterWidth, 50);

            wordWidth += letterWidth;

            c.addChild(char);

            createjs.Tween.get(char)
                .wait((200 * i))
                .to({ scaleX: 4, scaleY: 5, alpha: .20, regY: 50 }, 200)
                .to({ scaleX: 1, scaleY: 1, alpha: 1, regY: 0 }, 120)
                .call(cleaner,[char,i])
        }
    }
    function cleaner(char, i ) {

        if (i == wordList.length - 1) {

            //    for (var i = 0; i < wordList.length; i++) c.removeChild(c.getChildAt(0))
            createjs.Tween.removeTweens(char)
            c.addChild(TextFX.createTF(text,x+wordWidth*.5,y));

        //    s.graphics.clear();
        }

    }
    return c;
}*/
