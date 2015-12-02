/**
 * Created by yanchunguang on 15/12/2.
 */
var GLogger = cc.Class.extend({
    ctor: function () {
    },

    debug : function(fmt)
    {
        console.log("[DEBUG] " + fmt);
    },

    error : function(fmt)
    {
        console.error("[ERROR] " + fmt);
    }
});


GLogger.getInstance = function()
{
    if (!this.instance_GLogger)
        this.instance_GLogger = new GLogger;

    return this.instance_GLogger;
};

var GLog = function(args)
{
    //只在debug模式下输出
    if(!GDeviceInfo.getInstance().mode_debug())
    return;
    GLogger.getInstance().debug(sprintf.apply(null, arguments));
};

var GLogE = function(args)
{
    GLogger.getInstance().error(sprintf.apply(null, arguments));
};