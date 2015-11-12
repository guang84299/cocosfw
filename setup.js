/**
 * Created by yanchunguang on 15/10/27.
 * 初始化配置
 */

//加载js
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
var s = document.createElement("script");
s.src = c.engineDir + "CCBoot.js";
document.ccConfig = c;
s.id = "cocos2d-html5";

var loadCocos = function()
{

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
    document.body.appendChild(s);
};

var parser = document.createElement("script");
parser.src = "frameworks/webext/includeParser.js";
parser.addEventListener("load", function() {
    parser.removeEventListener("load", arguments.callee, false);

    loadCocos();

}.bind(parser), false);
document.body.appendChild(parser);





