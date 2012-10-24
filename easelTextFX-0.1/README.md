# easel TextFX V1

TextFX splits a TextField in its string chars - created
for every char an TextField instance and animated it.

#TODO: 
       Split horizontal textfields 
       Split textfields with space
  
#Updates:
   
	   20-10-2012
	   class rebuild
	   add TextFX.createTF
	   
	   21-10-2012
	   add TextFX.tween
	   add reverse playmode
	   add onComplete 
	   
	   24-10-2012
	   Text.clone() for create letters
	   class rebuild
   
#Code Example:

			// Using TextFX ----------------------------------------------------------------------------------
            // I.   Create a text instance - and pass your own properties. - createTF( label, font, color, textAlign )
            //      Build a createjs.Text object on the normal way - or use the static method TextFX.createTF to create a text object in one line.;
            var tf = TextFX.createTF("easel", "60px Arial", "#fff", "left").setTransform(50, 100);
                tf.shadow = new createjs.Shadow("#ffffff", 0, 2, 10);
            // II.  Create a TextFX instance  - TextFX( source, splitMode, delay, reverse )
            //  source      - The source createjs.text element. 
            //  splitMode   - A typ for letter splitting. Split types[ "char" , "word" ] 
            //  delay       - A timer value to wait before start the animation tween.
            //  reverse     - Define the tween direction ( default is false ).
            var t = new TextFX(tf, "char", 1000, false);
            // III. Create a letter animation function. And override the standart TextFX.tween function. Or use the default.
            //  char        - The current letter.   (createjs.Text)
            //  index       - The child Index.      (int)
				t.tween = function (char, index) {
					return createjs.Tween.get(char)
					.to({ alpha: 0 }, 1)
					.wait((250 * index) + 100)
					.to({
						scaleX: 5,
						scaleY: 5,
						alpha: .50
					}, 150)
					.to({
						scaleX: 1,
						scaleY: 1,
						alpha: 1
					}, 110)
				}
            // III. Create a function to handle stuff if the animation has finished.
				t.onComplete = function () {
					// Turn the play mode.
					t.reverse = !t.reverse;
					//  Set the text string for the source text object. And start the animation process. - setText( label )
					//  label - The new text to dislpay.
					t.setText((t.getText() == "easel" ? "TEXT" : (t.getText() == "TEXT" ? "FX" : "easel")) + "")
				}
            // IV.  Add the created TextFX instance to the stage.
            stage.addChild(t, fps)