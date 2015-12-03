/**
 * Created by yanchunguang on 15/12/3.
 */

var GSprite = cc.Sprite.extend({
    setImage : function(url)
    {
        this.initWithFile(url);
    }
});