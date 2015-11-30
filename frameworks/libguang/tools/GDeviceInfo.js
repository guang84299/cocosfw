/**
 * Created by yanchunguang on 15/11/30.
 */

var GDeviceInfo = cc.Class.extend({
    ctor: function() {

    },

    /**
     * 模式
     */
    mode_debug: function() {
        return true;
    },

    mode_release: function() {
        return !this.mode_debug();
    },

    /**
     * 内存
     */
    memory_all: function() {
        try
        {
            return window.performance.memory.totalJSHeapSize;
        }
        catch (e)
        {
            return 0;
        }
    },

    memory_used: function() {
        try
        {
            return window.performance.memory.usedJSHeapSize;
        }
        catch (e)
        {
            return 0;
        }
    },

    memory_free: function() {
        return this.memory_all() - this.memory_used();
    },

    /**
     * SD卡
     */
    getSDPath: function() {
        return "";
    },

    isSDEnable: function() {
        return false;
    },

    /**
     * 系统类型
     */
    os_is_wp: function() {
        return false;
    },

    os_is_ios: function() {
        return false;
    },

    os_is_html5: function() {
        return true;
    },

    os_is_android: function() {
        return false;
    },

    /**
     * CPU内核数
     */
    cpu_core: function() {
        return navigator.hardwareConcurrency || 1;
    },

    cpu_usage: function() {
        return 0;
    },

    /**
     * 版本号
     */
    version_js: function() {
        return 0;
    },

    version_resource: function() {
        return 0;
    },


    /**
     * 硬件、运营商
     */
    device_uuid: function() {
        var unique = cc.sys.localStorage.getItem("unique_id");

        if (!unique)
        {
            unique = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                var r = Math.floor(Math.random() * 16) | 0;
                var v = c == "x" ? r : ((r & 0x3) | 0x8);
                return v.toString(16).toUpperCase();
            });
            cc.sys.localStorage.setItem("unique_id", unique);
        }

        return unique;
    },

    device_telecom: function() {
        return "";
    },

    device_hardware: function() {
        return "HTML5";
    },

    device_network: function() {
        return "WiFi";
    },

    /**
     * 打开浏览器
     */
    open_browser: function(url) {
        window.open(url);
    },

    /**
     * 浏览器属性
     */
    browser_useragent: function() {
        return navigator.userAgent;
    },

    /**
     * 振动
     */
    vibrate: function() {

    },

    /**
     * 唤醒
     */
    keep_awake: function(keep) {

    }
});

GDeviceInfo.getInstance = function() {
    if (!this.instance_device_info)
        this.instance_device_info = new GDeviceInfo;

    return this.instance_device_info;
};