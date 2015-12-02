/**
 * Created by yanchunguang on 15/10/29.
 *
 * 资源管理类
 */

var GResource = cc.Class.extend({
    ctor : function()
    {

    },
    //可写路径
    getWritePath : function()
    {
        return "";
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
        return "";
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
    _cachePath : ""
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