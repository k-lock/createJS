function tweenTest(stage) {

    // ROTATION 

    var s = new createjs.Shape();
    s.graphics.beginStroke(createjs.Graphics.getRGB(0, 0, 0)).beginFill(createjs.Graphics.getRGB(250, 150, 0)).drawRect(0, 0, 50, 50);
    s.setTransform(150, 100);
    s.rotation = 45
    stage.addChild(s)
    createjs.Tween.get(s, { loop: true }).to({ rotation: 360 }, 1000)

    var s2 = new createjs.Shape();
    s2.graphics.beginStroke(createjs.Graphics.getRGB(0, 0, 0)).beginFill(createjs.Graphics.getRGB(250, 150, 0)).drawRect(0, 0, 50, 50);
    s2.setTransform(300, 100);
    s2.regX = 25
    s2.regY = 25
    s2.rotation = 45
    stage.addChild(s2)
    createjs.Tween.get(s2, { loop: true }).to({ rotation: 360 }, 1000)

    // SCALING

    var s3 = new createjs.Shape();
    s3.graphics.beginStroke(createjs.Graphics.getRGB(0, 0, 0)).beginFill(createjs.Graphics.getRGB(250, 150, 0)).drawRect(0, 0, 50, 50);
    s3.setTransform(150, 200);

    stage.addChild(s3)
    createjs.Tween.get(s3, { loop: true }).to({ scaleX: 2, scaleY: 1 }, 1000)

    var s4 = new createjs.Shape();
    s4.graphics.beginStroke(createjs.Graphics.getRGB(0, 0, 0)).beginFill(createjs.Graphics.getRGB(250, 150, 0)).drawRect(0, 0, 50, 50);
    s4.setTransform(300, 200);
    s4.regX = 25
    s4.regY = 25

    stage.addChild(s4)
    createjs.Tween.get(s4, { loop: true }).to({ scaleX: 1, scaleY: 2, }, 1000)

    var t1 = TextFX.createTF("create", 150, 300)
    t1.textBaseline = "top";
    t1.textAlign = "left";
    stage.addChild(t1)
    createjs.Tween.get(t1, { loop: true }).to({ scaleX: .2, scaleY: .2, rotation: 360 }, 1000)

    var t2 = TextFX.createTF("create", 300, 300) // tf with center reg point
    stage.addChild(t2)
    createjs.Tween.get(t2, { loop: true }).to({ scaleX: .2, scaleY: .2, rotation: 360 }, 1000)



}