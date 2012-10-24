/**---------------------------------------------------------------------------------------
 *  TextFX V1.04 - k-lock.de - 15/09/2012
 * 
 *      Split every letter of an text field in a own text field and animated it. 
 *
 *  TODO: 
 *      Split horizontal textfields 
 *      Split textfields with space - position the letter after a space | wordwarp
 * 
 */  
 /*  Updates:
 *  
 *  20-10-2012
 *  class rebuild
 *  add TextFX.createTF
 *  
 *  21-10-2012
 *  add TextFX.tween
 *  add reverse playmode
 *  add onComplete 
 *  
 *  24-10-2012
 *  Text.clone() for create letters
 *  class rebuild
 *  
 *  -------------------------------------------------------------------------------------- */
(function () {
    //------------------------------------------------------------------------------    CONSTRUCTOR
    /** TextFX Constructor
    *   @param tf    - The source createjs.text element. 
    *   @param typ   - A typ for letter splitting. Split types[ "char" , "word" ] 
    *   @param delay - A timer value to wait before start the animation tween.
    *   @param reverse - Define the tween direction ( default is false ).*/
    var TextFX = function (tf, typ, delay, reverse) {
        if (arguments.length) {
            this.initialize(tf, typ, delay, reverse);
        }
    }
    //------------------------------------------------------------------------------    INITIALIZER
    var p = TextFX.prototype = new createjs.Container();
    p.Container_initialize = p.initialize;
    p.initialize = function (tf_, typ_, delay_, reverse_) {
        this.Container_initialize();
        /** The source TextField that gets split.*/
        this.source = tf_;
        /** Determines the way in which the source TextField is splitin - either by characters, words. <li>SPLIT_CHAR <li>SPLIT_WORD */
        this.typ = typ_;
        /** Playmode forward or backward. default[ reverse = false ]*/
        this.reverse = reverse_;
        /** A timer value to wait before start the animation.*/
        this.delay = (delay_ != undefined) ? delay_ : undefined;
        this.setTransform(this.source.x, this.source.y)
        this.setText()
    }
    //------------------------------------------------------------------------------    PRIVATE METHODS
    /** Return a offset value to position the various textAlign modes right.
      *  @param ow - ObjectWidth - The current Char getMeasuredWidth().
      *  @param sw - SourceWidth - The source textfield getMeasuredWidth().
      *  @param r  - Reverse - The animation playmode. 
      *  Returns the calculated ofset value.*/
    var getOffset = function (t, ow, sw, r) {
        var o = 0;
        switch (t) {
            case "left":
            case "top":
            case "buttom":
            case "start":
                o = ow * .5;
                break;
            case "right":
            case "end":
                if (!r)
                    o = -sw + ow * .5;
                else
                    o = sw + ow * .5;
                break;
            case "center":
                if (!r)
                    o = -sw * .5 + ow * .5;
                else
                    o = sw * .5 + ow * .5;
                break;
        }
        return o;
    }
    //------------------------------------------------------------------------------    PRIVATE METHODS
    /** Init the split process. And change the source.text .
     *   @param label - The new text to dislpay.*/
    p._startSplit = function (label) {
        if (label != undefined) this.source.text = label;
        this._splitCharacters()
    }
    /** Split string characters to an array and create for every letter / or word [$type] a createjs.Text instance. 
    *   Finaly start to tween chars with the current tween function.[this.tween] */
    p._splitCharacters = function () {
        if (this.interID != undefined) { clearTimeout(this.interID); delete this.interID; }
        var wordList = this.source.text.split((this.typ == TextFX.SPLIT_WORD) ? " " : "")
        var end = wordList.length;
        var calcWidth = 0;
        if (!this.reverse || this.reverse == undefined) {
            for (var i = 0; i < end; i++) {
                if (wordList[i] !== " ") {
                    calcWidth += this._createLetter(false, wordList[i], calcWidth)
                } else {
                    calcWidth += this.getSpaceWidth();
                }
            }
        } else {
            calcWidth = this.source.getMeasuredWidth();
            for (var i = end - 1; i >= 0; i--) {
                if (wordList[i] !== " ") {
                    calcWidth -= this._createLetter(true, wordList[i], calcWidth)
                } else {
                    calcWidth -= this.getSpaceWidth();
                }
            }
        }
        this._tweenStart();
    }
    /** Calculate the width of the letter M, to get a value in the current text format.*/
    p.getSpaceWidth = function(){
        var t = this.source.clone();
        t.text="M";
        return t.getMeasuredWidth()*.333;
    }
    /** Create a Textfield for a char.
    *   @param reverse - Animation playmode.
    *   @param letter  - Char string.
    *   @parma calcWidth - Helper to position the char correct.
    *
    *   Returns a value that reflect the width from the current char.*/
    p._createLetter = function (reverse, letter, calcWidth) {
        var sourceWidth = this.source.getMeasuredWidth();
        var _char = this.source.clone();
        _char.text = letter;
        _char.textAlign = "center";

        var letterWidth = _char.getMeasuredWidth();
        if (reverse == true) {
            _char.setTransform(calcWidth - getOffset(this.source.textAlign, letterWidth, sourceWidth, true), 0);
        } else {
            _char.setTransform(getOffset(this.source.textAlign, letterWidth, sourceWidth, false) + calcWidth, 0);
        }

        if (this.source.outline != undefined) _char.outline = this.source.outline;
        if (this.source.shadow != undefined) _char.shadow = this.source.shadow;

        this.addChild(_char);
        return letterWidth;
    }
    /** Start the main animation process. And remove source displayObject ( if on stage ). */
    p._tweenStart = function () {

        if (this.source.getStage() != null) this.parent.removeChild(this.source)
        var n = this.getNumChildren();
        for (var r = 0; r < n; r++) {

            this.tween(this.getChildAt(r), r)
            if (r == n - 1)
                this.tween(this.getChildAt(r), r).call(p._tweenReady, [r, this]);
            else
                this.tween(this.getChildAt(r), r);
        }
    }
    /** Finish the animation process. And add the source displayObject ( if not on stage ) to stage.
    *   Finally call the onComplete method to signal the finished animation to the parent class. */
    p._tweenReady = function (i, that) {

        var n = that.getNumChildren();
        for (var r = 0; r < n; r++) {
            var letter = that.getChildAt(0);

            createjs.Tween.removeTweens(letter)
            that.removeChild(letter)
        }

        // add the real textfield to finish animation process
        if (that.source.getStage() == null) that.parent.addChild(that.source)
        that.source.visible = true;
        that.onComplete();
    }
    //------------------------------------------------------------------------------    PUBLIC METHODS
    /** Returns the text string for the source text object.*/
    p.getText = function () { return this.source.text; }
    /** Set the text string for the source text object. And start the animation process.
    *   @param label - The new text to dislpay.*/
    p.setText = function (label) {
        if (this.delay != undefined || this.delay > 0) {
            this.interID = window.setTimeout(function (that, label) { that._startSplit(label); }, this.delay, this, label)
        } else
            this._startSplit(label)
    }
    /**  Letter animation function. Can override with your own animation function.*/
    p.tween = function (c, i) {
        return createjs.Tween.get(c)
                 .to({ alpha: 0 }, 1)
                 .wait((180 * i) + 100)
                 .to({
                     alpha: 1
                 }, 100)
    }
    /** To catch the moment where the tweener is ready. You can define outside a own method to handle stuff.*/
    p.onComplete = function () { }
    /** Cleaner function. */
    p.dispose = function () {
        var n = this.getNumChildren();
        for (var r = 0; r < n; r++) {
            var letter = this.getChildAt(0);
            createjs.Tween.removeTweens(letter)
            this.removeChild(letter)
        }
        this.source = this.typ = this.reverse = this.delay = this.interID = this.tween = null;
    }
    //------------------------------------------------------------------------------    STATIC PROPERTIES
    /** Split type: words - To animate a full word.*/
    TextFX.SPLIT_WORD = "word"
    /** Split type: characters- To animate every letter for itself. */
    TextFX.SPLIT_CHAR = "char"
    //------------------------------------------------------------------------------    STATIC METHOD
    /** Short method to create a easel Text object in one line.
    *       
    *   @param text  - The text string.
    *   @param font  - The style for the text field.
    *   @param color - The color for the text field.
    *   @param align - The align for the stext object. 
    *
    *   Returns a new createjs.Text object.
    *
    *   Sample : 
    *
    *       var tf = TextFX.createTF("mainer", "60px Arial", "#3366FF", "left").setTransform(350, 100);*/
    TextFX.createTF = function (text, font, color, align) {
        var tf = new createjs.Text(text, (font != undefined) ? font : "11px Arial", color != undefined ? color : "#000");
        tf.textBaseline = "middle";
        tf.textAlign = (align != undefined) ? align : "center";
        return tf
    }
    this.TextFX = TextFX;
}());