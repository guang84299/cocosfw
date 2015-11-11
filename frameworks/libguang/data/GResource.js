/**
 * Created by yanchunguang on 15/10/29.
 *
 * 所有资源管理的基类
 */

var GResource = cc.Class.extend({



});

GResource.getInstance = function()
{
    if(!this._instance)
        this._instance = new GResource();

    return this._instance;
};