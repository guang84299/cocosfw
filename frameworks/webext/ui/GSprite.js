/**
 * Created by yanchunguang on 15/12/3.
 */

var GSprite = cc.Sprite.extend({

    setImage : function(image)
    {
        var frame = null;

        // 加载图片
        if (image)
            frame = GSprite.loadFrame(image);

        if (frame)
        {
            this.setSpriteFrame(frame);
            this.setContentSize(this.getContentSize());

            return true;
        }
        else
        {
            //this.clearImage();
            return false;
        }
    }
});

/**
 * 加载SpriteFrame
 * @param {String} image
 */
GSprite.loadFrame = function(image) {

    return GAssetLoader.getInstance().load_image(image);

};