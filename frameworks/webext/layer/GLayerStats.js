/**
 * Created by yanchunguang on 15/11/30.
 */

var GLayerStats = cc.Layer.extend({
    _frames : 0,
    ctor : function()
    {
        this._super();

        this._text = new cc.LabelTTF("fps:","",22);
        this._text.setAnchorPoint(cc.p(0,0));
        this._text.setFontFillColor(cc.color(255, 255, 255, 255));
        this._text.setOpacity(150);
        this.addChild(this._text);

        this._text2 = new cc.LabelTTF("net:","",22);
        this._text2.setAnchorPoint(cc.p(0,0));
        this._text2.setFontFillColor(cc.color(255, 255, 255, 255));
        this._text2.setOpacity(150);
        this._text2.setPosition(cc.p(0,23));
        this.addChild(this._text2);


        this.schedule(this.updateFps);
        this.schedule(this.updateStats,0.5);
    },

    updateFps : function(dt)
    {
        ++this._frames;
    },

    updateStats : function(dt)
    {
        if(dt <= 0)
        return;
        var info = GDeviceInfo.getInstance();
        var fps = "fps:" + (this._frames/dt).toFixed(1) + " call:"+cc.g_NumberOfDraws + " cpu:"+info.cpu_usage();
        var net = info.device_hardware() + "/" + info.device_network() + "/" + cc.winSize.width + "x" + cc.winSize.height;
        this._text.setString(fps);
        this._text.setString(net);

        this._frames = 0;
    }


});