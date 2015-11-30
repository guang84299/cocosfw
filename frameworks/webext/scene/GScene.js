/**
 * Created by yanchunguang on 15/10/27.
 *
 * 所有场景类的基类
 */

var GScene = cc.Scene.extend({
    _layerStats : null,
    ctor : function()
    {
        this._super();
        this.init();
    },
    init : function()
    {
        this._super();

        this._layerStats = new GLayerStats();
        this._layerStats.setAnchorPoint(cc.p(0,0));

        this.addChild(this._layerStats);
        return true;
    }


});

