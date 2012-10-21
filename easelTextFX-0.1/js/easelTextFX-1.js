//----------------------------------------------------------
//  easelTextFX - TextField Animation Script
//  k-lock.de - 15/09/2012
//
(function () {

    /** Init
    *   @param tf    - A source createjs.text element. 
    *   @param delay - A timer value to wait before start.*/
    var TextFX = function (tf, typ, delay) {
        if (arguments.length) this.initialize(tf, typ, delay);
    }
    var p = TextFX.prototype = new createjs.Container();

    /** Static method to create a easel Text object
    *       
    *   @param text - The text string.
    *   @param x - position x.
    *   @param y - position y.
    *   @param font - The style for the text field.
    *
    *   Returns a new createjs.Text element.*/
    TextFX.createTF = function (text, x, y, font) {

        var tf = new createjs.Text(text, (font!=undefined)?font:"20px Arial", "#000");
            tf.textBaseline = "middle";
            tf.textAlign = "center";
            tf.setTransform(x, y)
       
        return tf
    }

    /** Split type: words - To animate a full word.*/
    TextFX.SPLIT_WORD = "word"
    /** Split type: characters- To animate every letter for itself. */
    TextFX.SPLIT_CHAR = "char"

    p.Container_initialize = p.initialize;
    p.initialize = function (tf, typ, delay) {
        this.Container_initialize();

        var self = this;
        /** To offset the registration point by a certain number of pixels along its x-axis**/
        var $regX;
        /** To offset the registration point by a certain number of pixels along its y-axis**/
        var $regY;
        /** The source TextField that gets split **/
        var $source = tf;
        /** Determines the way in which the source TextField is splitin - either by characters, words, or lines. <li>SPLIT_CHAR <li>SPLIT_WORD <li>SPLIT_LINE **/
        var $type = typ = "char";

        this.setTransform($source.x, $source.y);
        //     console.log("Source Rect : ",$source.x, $source.y, $source.getMeasuredWidth(), $source.getMeasuredHeight());

        /* var g = new createjs.Graphics();
           g.beginFill(createjs.Graphics.getRGB(200, 200, 200, .8)).drawRect(0, 0, $source.getMeasuredWidth(), $source.getMeasuredHeight());
   
           this.debugShape = debugShape = new createjs.Shape(g)
         //  this.addChild(debugShape)*/

        if (delay != undefined)
            window.setTimeout(splitCharacters, delay);
        else
            splitCharacters();

        function splitCharacters() {

            var word = $source.text
            var wordWidth = 0;
            var wordList = word.split(($type == "word") ? " " : "")
            var _outline = $source.outline;
            var _color = $source.color;

            for (var i = 0; i < wordList.length; i++) {

                if (wordList[i] !== " ") {

                    var char = TextFX.createTF(wordList[i], 0,0, $source.font);
                    var letterWidth = char.getMeasuredWidth();
                   
                    char.setTransform( wordWidth + $source.x + (letterWidth * .5), $source.y);
                    char.outline = _outline;
                    char.alpha = 0;
                    char.color = _color;
                    if ($source.shadow != undefined) char.shadow = $source.shadow.clone();

                    //  debugShape.graphics.beginStroke(createjs.Graphics.getRGB(0, 0, 0)).drawRect(wordWidth + x, y-25, letterWidth, 50);

                    wordWidth += letterWidth;

                    self.addChild(char);

                    createjs.Tween.get(char)
    
                        .wait((200 * i) + 100)
                        
                        .to({ scaleX: 5, scaleY: 5, alpha: .50 }, 120)
                        .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 90)
                        .call(cleaner, [char, i])
                }
            }
            function cleaner(char, i) {

                if (i == wordList.length - 1) {

                    for (var i = 0; i < wordList.length; i++) self.removeChild(self.getChildAt(0))
                    createjs.Tween.removeTweens(char)

                    $source.setTransform($source.x + wordWidth * .5, $source.y);
                    self.addChild($source);

                }

            }
        }

    }

    window.TextFX = TextFX;
}());


/*
The keywords map to these alignment points as follows:

top         - The top of the em square
hanging     - The hanging baseline
middle      - The middle of the em square
alphabetic  - The alphabetic baseline
ideographic - The ideographic baseline
bottom      - The bottom of the em square

*/