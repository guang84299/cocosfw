/**
 * Created by yanchunguang on 15/10/27.
 *
 * 所有场景类的基类
 */

var GScene = cc.Scene.extend({
    ctor : function()
    {
        this._super();

        this.init();
    },
    init : function()
    {
        this._super();

        var colorLayer = new cc.LayerColor(cc.color(255,0,0),300,300);
        this.addChild(colorLayer);

        return true;
    }

});

