/**
 * Created by yanchunguang on 15/10/29.
 *
 * 资源管理类
 */

var GResource = cc.Class.extend({
    ctor : function()
    {
        this._sound = [];
        this._plist = [];
    },

    loadfile : function(url)
    {
        if(!url)
            return "";
        url = this.getWriteResPath() + url;
        // 本地
        var path = this.loadLocal(url);
        if (path)
            return path;

        //下载
        var task = GHttpTask.create();
        task.setUrl(url);
        GHttpService.getInstance().download(task);

        if(this.file_exist(task.getPath()))
        {
            return task.getPath();
        }
        GLogE("load file not found: %s", task.getPath());
        return "";
    },
    //加载本地文件
    loadLocal : function(file)
    {
        if(this.file_exist(file))
        {
            GLog("load local file : %s",file);
            return file;
        }
        return "";
    },
    file_exist : function(path)
    {
        var type = GFileType.type(path);

        switch (type)
        {
            case GFileType.Image:
                return cc.textureCache.getTextureForKey(path) ? true : false;

            case GFileType.Sound:
                return this._sound[path] ? true : false;

            case GFileType.XML:
                return this._plist[path] ? true : false;

            case GFileType.Binary:
            case GFileType.Text:
                return cc.loader.getRes(path) ? true : false;

            default:
                GLogE("%s : unknown file type!!!",path);
                break;
        }
    },
    write_local: function(path, byte_array) {
        var type = GFileType.type(path);

        switch (type)
        {
            case GFileType.Image:
                var png = new Image();
                png.src = "data:image/png;base64," + GHttpService.byteArray2Base64(byte_array);
                cc.textureCache.cacheImage(path, png);
                break;

            case GFileType.Sound:
                this._sound[path] = byte_array;
                break;

            case GFileType.XML:
                this._plist[path]     = utf8.bytesToString(byte_array);
                cc.loader.cache[path] = this._plist[path];
                break;

            case GFileType.Binary:
                // 这里直接存二进制array
                cc.loader.cache[path] = byte_array;
                break;

            case GFileType.Text:
                cc.loader.cache[path] = utf8.bytesToString(byte_array);
                break;

            default:
                GLogE("can't write local : %s",path);
                break;
        }
    },
    //可写路径
    getWritePath : function()
    {
        this._writePath = cc.fileUtils.getWritablePath();
        return this._writePath;
    },
    //代码URL
    getCodeUrl : function()
    {
        return "";
    },
    //资源URL
    getResUrl : function()
    {
        return "";
    },
    //可写代码路径
    getWriteCodePath : function()
    {
        return "";
    },
    //可写资源路径
    getWriteResPath : function()
    {
        this._writeResPath = "http://localhost:63342/cocosfw/";
        return this._writeResPath;
    },
    //临时路径
    getTempPath : function()
    {
        return "";
    },
    //缓存路径
    getCachePath : function()
    {
        return "";
    },
    //根据下载文件创建文件夹
    createDirForUrlFile : function(file,isCode)
    {

    },
    //返回一个文件的根目录
    baseDir : function(file)
    {

    },

    _writePath : "",
    _codeUrl : "",
    _resUrl : "",
    _writeCodePath : "",
    _writeResPath : "",
    _tempPath : "",
    _cachePath : "",
    _plist : null,
    _sound : null
});

GResource.getInstance = function()
{
    if(!this._instanceGResource)
        this._instanceGResource = new GResource();

    return this._instanceGResource;
};

//返回一个文件的文件名
GResource.baseFileName = function(file)
{

};
//判断一个字符串是否为文件
GResource.isFile = function(path)
{

};
//拷贝一个文件
GResource.copyFile = function(file, target)
{

};
//删除
GResource.removeFile = function(file)
{

};

// 读取、写入磁盘
GResource.read_file = function(path)
{

};
GResource.write_file = function(path, data, size)
{

};
GResource.append_file = function(path,data, size)
{

};