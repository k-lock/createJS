# easelTextFX V1

TextFX splits a TextField in its string chars -
created for every char an TextField instance and 
added it to the display list.

Code Example

				// setup source textfields with position, style, color and shadow
                var tf1 = TextFX.createTF("easel", 150, 50, "90px Arial");      
                var tf2 = TextFX.createTF("Text", 255, 50,"bold 90px Arial")
                var tf3 = TextFX.createTF("FX", 345, 50, "90px Arial")
    
                tf1.outline = true;
                tf1.color = tf3.color = tf2.color = "#fff"
                tf1.shadow = tf3.shadow = new createjs.Shadow("#ffffff", 0, 2, 10);

                // create new TextFX instance with textfield, splitModeType, delay
                var tfx1 = new TextFX(tf1 );
                var tfx2 = new TextFX(tf2, TextFX.SPLIT_WORD, 1000);
                var tfx3 = new TextFX(tf3, TextFX.SPLIT_CHAR, 1400, true);
    
                // create a tween command method and set to the TextFX instance
                tfx1.tween = tfx3.tween = function(_char,index){
                    return createjs.Tween.get(_char)   
                    .to({alpha:0},1)
                    .wait((200 * index) + 100)   
                    .to({
                        scaleX: 5, 
                        scaleY: 5, 
                        alpha: .50
                    }, 120)
                    .to({
                        scaleX: 1, 
                        scaleY: 1, 
                        alpha: 1
                    }, 90)             
                }

                tfx2.tween = function(_char,index){
                    return createjs.Tween.get(_char)  
        
                    .wait((200 * index) + 100)    
                    .to({alpha:0, rotation:360},0)
                    .to({
                        //       rotation:0,
                        scaleX: 5, 
                        scaleY: 5, 
                        alpha: .50
                    }, 120)
                    .to({
                        rotation:0,
                        scaleX: .1, 
                        scaleY: .1, 
                        alpha: 1
                    }, 200)    
                    .to({
                        //        rotation:0,
                        scaleX: 1, 
                        scaleY: 1, 
                        alpha: 1
                    }, 100)  
                }
                // adding object to stage
                stage.addChild(tfx1,tfx2,tfx3,fps)