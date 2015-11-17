/**
 * Created by yanchunguang on 15/10/27.
 */

if (cc.sys.isNative)
{
    cc.game.onStart = function()
    {
        var resolutionPolicy = (cc.sys.os == cc.sys.OS_WP8 || cc.sys.os == cc.sys.OS_WINRT) ? cc.ResolutionPolicy.SHOW_ALL : cc.ResolutionPolicy.FIXED_HEIGHT;
        cc.view.setDesignResolutionSize(800, 450, resolutionPolicy);
        cc.view.resizeWithBrowserSize(true);

        var searchPaths = jsb.fileUtils.getSearchPaths();
        searchPaths.push('script');
        searchPaths.push('src');
        jsb.fileUtils.setSearchPaths(searchPaths);

        require("includeFile.js");

        cc.director.runScene( new GScene());
    };
    cc.game.run();
}
else
{
    cc.director.runScene(new GScene());
}


