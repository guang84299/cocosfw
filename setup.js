/**
 * Created by yanchunguang on 15/10/27.
 * 初始化配置
 */

//加载js
var d = document;
var c = {
    project_type : "javascript",
    debugMode    : 1,
    showFPS      : true,
    frameRate    : 60,
    id           : "gameCanvas",  // the dom element to run cocos2d on
    renderMode   : 2,                 // choose of RenderMode: 0(default), 1(Canvas only), 2(WebGL only)
    engineDir    : "frameworks/cocos2d-html5/",
    modules      : ["cocos2d", "extensions", "chipmunk", "spine"],
    jsList       : []
};

var s = d.createElement("script");
s.src = c.engineDir + "CCBoot.js";

d.ccConfig = c;
s.id = "cocos2d-html5";
s.addEventListener("load", function() {
    s.removeEventListener("load", arguments.callee, false);

    cc.game.onStart = function() {

        cc.view.enableRetina(false);
        cc.view.adjustViewPort(true);
        //cc.view.setDesignResolutionSize(960, 640, cc.ResolutionPolicy.SHOW_ALL);
        //cc.view.resizeWithBrowserSize(true);

        var parser = new GParser();
        parser.addfile("includeFile.js");
        parser.find();

    }.bind(s);
    cc.game.run();

}.bind(s), false);
d.body.appendChild(s);


