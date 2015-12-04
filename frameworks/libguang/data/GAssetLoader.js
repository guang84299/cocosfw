/**
 * Created by yanchunguang on 15/12/4.
 */

var GAssetLoader = cc.Class.extend({
    ctor: function() {
        this._cache = [];
    },

    /**
     * 加载：单帧图片
     * @param {String} frame
     * @returns {cc.SpriteFrame}
     */
    load_frame: function(frame) {
        // 缓存
        var display = cc.spriteFrameCache.getSpriteFrame(frame);
        if (display)
            return display;

        // 加载
        if (!this.cache(frame))
        {
            GLogE("load frame cache fail: %s",  frame);
            return null;
        }

        // 缓存
        display = cc.spriteFrameCache.getSpriteFrame(frame);
        if (!display)
            GLogE("load frame not found: %s", frame);

        return display;
    },

    /**
     * 加载：单张纹理
     * @param {String} image
     * @returns {cc.SpriteFrame}
     */
    load_image: function(image) {
        var key = GResource.getInstance().loadfile(image);
        if (!key)
            return null;

        var texture = cc.textureCache.getTextureForKey(key);

        var size = texture.getContentSize();
        return cc.SpriteFrame.create(texture, cc.rect(0, 0, size.width, size.height));
    },

    /**
     * 加载：动画特效
     * @param {String} plist
     * @param {Number} [duration]
     * @return {cc.Animation}
     */
    load_animation: function(plist, duration) {
        duration = duration || 0;

        // 准备
        var dict = pi.PlistLoader.getInstance().load_dict(plist);
        if (Object.keys(dict).length == 0)
            return null;

        // 数据
        var count = Object.keys(dict["frames"]).length;
        var name  = pi.Resource.basename_of_path(plist, false);
        var store = [];

        for (var i = 0; i < count; ++i)
        {
            var image   = name + "_" + i.toString() + ".png";
            var display = this.load_frame(plist, image);

            if (display)
                store.push(display);
            else
                PILogE("load animation can't parse plist: %s, frame: %s", plist, image);
        }

        if (store.length)
        {
            // 默认用flash的24帧每秒帧率
            var interval = duration > 0 ? duration / store.length : 1.0 / 24.0;
            return cc.Animation.create(store, interval);
        }

        return null;
    },

    /**
     * 缓存检测
     * @param {String} plist
     * @param {String} [frame]
     * @returns {Boolean}
     */
    exist: function(plist, frame) {
        frame = frame || "";

        // 如果frame有值则直接判断frame，因为这个名字是全局的
        if (frame)
            return cc.spriteFrameCache.getSpriteFrame(frame);

        // 如果frame为空则判断plist所有名字，如果有一个不存在则返回false
        var dict = pi.PlistLoader.getInstance().load_dict(plist);
        if (Object.keys(dict).length == 0)
            return false;

        var frames = dict["frames"];

        for (var key in frames)
        {
            if (!frames.hasOwnProperty(key))
                continue;

            if (!cc.spriteFrameCache.getSpriteFrame(key))
                return false;
        }

        return true;
    },

    /**
     * 缓存：图片
     * @param {String} file
     * @returns {Boolean}
     */
    cache: function(file) {

        // 纹理
        if (!GResource.getInstance().loadfile(file))
        {
            GLogE("cache image file not found: %s", file);
            return false;
        }

        cc.spriteFrameCache.addSpriteFrames(file, cc.textureCache.getTextureForKey(file));

        return true;
    },

    /**
     * 清理缓存
     * @param {String} [frame]
     */
    clear: function(frame) {
        frame = frame || "";

        if (frame)
        {
            cc.spriteFrameCache.removeSpriteFrameByName(frame);
        }
        else
        {
            // no use in html5
        }
    }

});

GAssetLoader.getInstance = function()
{
    if(!this._instanceGAssetLoader)
        this._instanceGAssetLoader = new GAssetLoader();

    return this._instanceGAssetLoader;
};