/**
 * Created by yanchunguang on 15/12/2.
 */

var GHtttpService = cc.Class.extend({


});

GHtttpService.getInstance = function()
{
    if(!this.instanceGHtttpService)
        this.instanceGHtttpService = new GHtttpService();

    return this.instanceGHtttpService;
};

var GHTTPTYPE = {REQUEST:0,DOWNLOAD:1};

var GHttpTask = cc.Class.extend({
    ctor : function()
    {
        this.type = GHTTPTYPE.REQUEST;
        this.progress = 0;
        this.speed = 0;
        this.timeout = 0;
        this.len = 0;
        this.status = false;
        this.async = false;
        this.data = null;
        this.file = null;
    },
    setUrl : function(url)
    {
        this.url = url;
    },
    getUrl : function()
    {
        return this.url;
    },

    setType : function(type)
    {
        this.type = type;
    },
    getType : function()
    {
        return this.type;
    },

    setData : function(data)
    {
        this.data = data;
    },
    getData : function()
    {
        return this.data;
    },

    setDataLen : function(len)
    {
        this.len = len;
    },
    getDataLen : function()
    {
        return this.len;
    },

    setProgress : function(progress)
    {
        this.progress = progress;
    },
    getProgress : function()
    {
        return this.progress;
    },

    setSpeed : function(speed)
    {
        this.speed = speed;
    },
    getSpeed : function()
    {
        return this.speed;
    },
    //秒
    setTimeOut : function(time)
    {
        this.timeout = time;
    },
    getTimeOut : function()
    {
        return this.timeout;
    },
    //下载文件保存路径
    setPath : function(path)
    {
        this.path = path;
    },
    getPath : function()
    {
        return this.path;
    },
    //文件
    writeFileData : function(data,size)
    {

    },
    getFile : function()
    {
        return this.file;
    },
    openFile : function()
    {

    },
    closeFile : function()
    {

    },
    //网络请求状态 true 请求成功
    setStatus : function(status)
    {
        this.status = status;
    },
    getStatus : function()
    {
        return this.status;
    },
    //是否异步
    setAsync : function(async)
    {
        this.async = async;
    },
    getAsync : function()
    {
        return this.async;
    },
    //设置回调
    setCallback : function(callback)
    {
        this.callback = callback;
    },

    write_data : function(buffer, size, nmemb)
    {

    },
    progress_callback : function(dltotal, dlnow)
    {

    },

    callback : null,

    url : "",
    type : 0,
    progress : 0,
    speed : 0,
    timeout : 0,
    data : null,
    len : 0,
    path : "",
    status : false,
    file : null,
    async : false
});

GHttpTask.create = function()
{
    return new GHttpTask();
};