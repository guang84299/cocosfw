/**
 * Created by yanchunguang on 15/10/27.
 * 需要加载的文件都放在此文件包含进来
 */

if (cc.sys.isNative) {
    var include = require;
}

//scene
include("scene/GScene.js");

//最后加载
if (!cc.sys.isNative)
include("main.js");