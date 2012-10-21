//----------------------------------------------------------
//  easelTextFX - TextFX V1 - Animate createJS.Text objects.
//  k-lock.de - 15/09/2012
/*
 *  Updates:
 *  
 *  20-10-2012
 *  class re setup
 *  add TextFX.createTF
 *  
 *  21-10-2012
 *  add TextFX.tween
 *  add reverse playmode
 *  
 *  */
(function () {
    //------------------------------------------------------------------------------    CONSTRUCTOR
    /** TextFX Constructor
    *   @param tf    - A source createjs.text element. 
    *   @param typ   - A typ for letter splitting. Split type[ "char" , "word" ]
    *   @param delay - A timer value to wait before start the animation tween.
    *   @param reverse - Define the tween direction ( forward or backward ).*/
    var TextFX = function (tf, typ, delay, reverse) {
        if (arguments.length){
            this.initialize(tf, typ, delay, reverse);
        }
    }
    var p = TextFX.prototype = new createjs.Container();
    
    //------------------------------------------------------------------------------    STATIC METHODS
    /** Short method to create a easel Text object in one line.
    *       
    *   @param text - The text string.
    *   @param x - position x.
    *   @param y - position y.
    *   @param font - The style for the text field.
    *
    *   Returns a new createjs.Text object.*/
    TextFX.createTF = function (text, x, y, font) {
        var tf = new createjs.Text(text, (font!=undefined)?font:"20px Arial", "#000");
        tf.textBaseline = "middle";
        tf.textAlign = "center";
        tf.setTransform(x, y)
        return tf
    }
    //------------------------------------------------------------------------------    STATIC PROPERTIES
    /** Split type: words - To animate a full word.*/
    TextFX.SPLIT_WORD = "word"
    /** Split type: characters- To animate every letter for itself. */
    TextFX.SPLIT_CHAR = "char"
    //------------------------------------------------------------------------------    INITIALIZER
    p.Container_initialize = p.initialize;
    p.initialize = function (tf, typ, delay, reverse) {
       
        /** The letter animation function. Build to use with the fantastic tween
         *  class of createJS. Method can replace with an own tween command function.
         *  @param _char  - The text object to animate.
         *  @param _index - The child index in the parent object.
         *  
         *  Returns a new Tween instance. To can use the createJS.call method.*/
        this.tween = function(_char, _index){}  //return createjs.tween()
        /** Helper object - reference to this. */
        var $self = this;
        /** The source TextField that gets split.*/
        var $source = tf;
        /** Determines the way in which the source TextField is splitin -
         *  either by characters, words, or lines. <li>SPLIT_CHAR <li>SPLIT_WORD <li>SPLIT_LINE */
        var $type = typ != undefined ? typ : TextFX.SPLIT_CHAR;
        /** Playmode forward or backward. default[ reverse = false ]*/
        var $reverse = reverse != undefined ? reverse : false; 
        /** Helper value for setTimeout Interval.*/
        var interID = undefined;
        delay = delay != undefined ? delay : 0;
        if (delay != undefined)
            interID = window.setTimeout(splitCharacters, delay);
        else
            splitCharacters();
     
        //initialize and set position
        this.Container_initialize();
        this.setTransform($source.x, $source.y);
        
        //------------------------------------------------------------------------- Private Methods
        /** Split string characters to an array and create for every letter / or 
         *  word [$type] a createjs.Text instance. Finaly start to tween chars with the 
         *  current tween function.[this.tween] */
        function splitCharacters() {

            if( interID != undefined ) window.clearTimeout(interID);            
            
            var _outline  = $source.outline;      
            var _color    = $source.color;   
            var _font     = $source.font;
            
            var word      = $source.text             
            var wordWidth = 0;
            var wordList  = word.split(($type == TextFX.SPLIT_WORD) ? " " : "")

            var end = wordList.length;
            var i;
            
            if(!$reverse){
                for (i=0; i < end; i++) {
                    if (wordList[i] !== " ") {

                        var _char = TextFX.createTF(wordList[i], 0,0, _font);
                        var letterWidth = _char.getMeasuredWidth();

                        _char.setTransform( wordWidth + $source.x + (letterWidth * .5), $source.y);
                        _char.outline = _outline;
                        _char.color = _color;

                        if ($source.shadow != undefined) _char.shadow = $source.shadow.clone();

                        wordWidth += letterWidth;

                        $self.addChild(_char);
                        $self.tween(_char, i).call( cleaner, [i, wordWidth]);
                    }
                }
            }else{
                var sw = $source.getMeasuredWidth();
                for (i=wordList.length-1; i >= 0; i--) {
                    if (wordList[i] !== " ") {

                        var _char = TextFX.createTF(wordList[i], 0,0, _font);
                        var letterWidth = _char.getMeasuredWidth();

                        _char.setTransform( (sw- (letterWidth))-(wordWidth) + $source.x + (letterWidth * .5), $source.y);
                        _char.outline = _outline;
                        _char.color = _color;

                        if ($source.shadow != undefined) _char.shadow = $source.shadow.clone();

                        wordWidth += letterWidth;

                        $self.addChild(_char);
                        $self.tween(_char, end-i).call( cleaner, [i, wordWidth]);
                    }
                }
            }
        }
        /** Tween cleaner method. Called when teen has finished.
         *  To clear tween and createjs.Text object from stage. 
         *  @param _index - The child index in the parent object.
         *  @param _wordWidth - The current width in word. Helper to position the finish full text object.*/
        var cleaner = function (i, _wordWidth) {
            var n = $self.getNumChildren();
            var fine = false;
            if($reverse)
                fine = (i==0)?true:false
            else
                fine = (i==n-1)?true:false
           
            if (fine) {       
                for (var r = 0; r < n; r++){  
                    var letter = $self.getChildAt(0);
                 
                    createjs.Tween.removeTweens(letter)
                    $self.removeChild(letter)
                }
                
                // add the real textfield to finish animation process
                $source.setTransform($source.x + _wordWidth * .5, $source.y);
                $self.addChild($source);            
  
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