/**
 * Created by yanchunguang on 15/10/27.
 * 需要加载的文件都放在此文件包含进来
 */

//scene
include("frameworks/webext/scene/GScene.js");

//layer
include("frameworks/webext/layer/GLayerStats.js");

//tools
include("frameworks/webext/tools/GTime.js");
include("frameworks/webext/tools/sprintf.js");
include("frameworks/webext/tools/utf8.js");

//ui
include("frameworks/webext/ui/GSprite.js");

include("frameworks/webext/test/GTest.js");

//最后加载
include("main.js");