/**
 * Created by yanchunguang on 15/12/2.
 */

var GHttpService = cc.Class.extend({

    //http 请求
    request : function(task)
    {
        var handle = this.getHandle(task);
        task.timer = GTime.nowTime();
        handle.send(null);
        GLog("load file:"+task.getUrl());
    },
    //单个文件下载
    download : function(task)
    {
        task.setType(GHTTPTYPE.DOWNLOAD);
        task.setAsync(false);
        this.request(task);
    },
    //异步下载
    asyncDownload : function(task)
    {
        task.setType(GHTTPTYPE.DOWNLOAD);
        this.request(task);
    },

    getHandle : function(task)
    {
        var xmlhttp = null;
        if (window.XMLHttpRequest)
        {   // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else
        {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = task.callback.bind(task,xmlhttp);

        xmlhttp.open("GET",task.getUrl(),task.getAsync());

        if(task.getAsync())
        {
            xmlhttp.onprogress = task.progress_callback.bind(task);
            if(task.getType() == GHTTPTYPE.DOWNLOAD)
            {
                xmlhttp.responseType = "arraybuffer";
            }
        }
        else
        {
            xmlhttp.overrideMimeType("text\/plain; charset=x-user-defined");
        }

        //使用post方式发送数据
        //xmlhttp.open("POST","xhr.php",true);
        //post需要自己设置http的请求头
        //xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        return xmlhttp;
    }
});

GHttpService.getInstance = function()
{
    if(!this.instanceGHttpService)
        this.instanceGHttpService = new GHttpService();

    return this.instanceGHttpService;
};

/**
 * 对ajax返回的二进制文本进行base64编码
 * 将二进制数据用字符串传输的原理是：字符串两个字节，高位是一个随机非0的，这样保证整个字符串不是\0，从而不会被截断
 * 但是还原成二进制时要和0xFF做位运算去掉高位的字节
 */
GHttpService.binaryText2Base64 = function(binary_text) {
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var outputStr = "";
    var i = 0;

    while (i < binary_text.length)
    {
        // all three "& 0xff" added below are there to fix a known bug
        // with bytes returned by xhr.responseText
        var byte1 = binary_text.charCodeAt(i++) & 0xff;
        var byte2 = binary_text.charCodeAt(i++) & 0xff;
        var byte3 = binary_text.charCodeAt(i++) & 0xff;

        var enc1 = byte1 >> 2;
        var enc2 = ((byte1 & 3) << 4) | (byte2 >> 4);

        var enc3, enc4;
        if (isNaN(byte2))
        {
            enc3 = enc4 = 64;
        }
        else
        {
            enc3 = ((byte2 & 15) << 2) | (byte3 >> 6);
            if (isNaN(byte3))
            {
                enc4 = 64;
            }
            else
            {
                enc4 = byte3 & 63;
            }
        }

        outputStr +=  b64.charAt(enc1) + b64.charAt(enc2) + b64.charAt(enc3) + b64.charAt(enc4);
    }

    return outputStr;
};


/**
 * 对字节数组或字符串进行base64编码
 * @param {String|Array|ArrayBuffer} mixed
 */
GHttpService.byteArray2Base64 = function(mixed) {
    var byte_array = (mixed instanceof ArrayBuffer) ? new Uint8Array(mixed) : mixed;
    var count      = (mixed instanceof ArrayBuffer) ? mixed.byteLength : mixed.length;
    var b64        = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var outputStr  = "";
    var i = 0;

    while (i < count)
    {
        // all three "& 0xff" added below are there to fix a known bug
        // with bytes returned by xhr.responseText
        var byte1 = byte_array[i++] & 0xff;
        var byte2 = byte_array[i++] & 0xff;
        var byte3 = byte_array[i++] & 0xff;

        var enc1 = byte1 >> 2;
        var enc2 = ((byte1 & 3) << 4) | (byte2 >> 4);

        var enc3, enc4;
        if (isNaN(byte2))
        {
            enc3 = enc4 = 64;
        }
        else
        {
            enc3 = ((byte2 & 15) << 2) | (byte3 >> 6);
            if (isNaN(byte3))
            {
                enc4 = 64;
            }
            else
            {
                enc4 = byte3 & 63;
            }
        }

        outputStr +=  b64.charAt(enc1) + b64.charAt(enc2) + b64.charAt(enc3) + b64.charAt(enc4);
    }
    return outputStr;
};

// 将二进制数据用字符串传输的原理是：字符串两个字节，高位是一个随机非0的，这样保证整个字符串不是\0，从而不会被截断
// 但是还原成二进制时要和0xFF做位运算去掉高位的字节
GHttpService.binary2Array = function(binary_str) {
    var array = [];

    for (var i = 0, len = binary_str.length; i < len; ++i)
        array.push(binary_str.charCodeAt(i) & 0xFF);

    return array;
};

GHttpService.arraybuffer2Array = function(arraybuffer) {
    var buffer = new Uint8Array(arraybuffer);
    var bytes  = [];

    for (var i = 0, len = buffer.byteLength; i < len; ++i)
        bytes.push(buffer[i]);

    return bytes;
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
        this.timer = 0;
    },
    setUrl : function(url)
    {
        this.url = url;
        this.setPath(url);
    },
    getUrl : function()
    {
        return this.url;
    },

    setType : function(type)
    {
        this.type = type;
        if(type == GHTTPTYPE.REQUEST)
            this.async = false;
        else
            this.async = true;
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
        var m = this.url.match(/res\/.+$/);
        if(m && m[0])
        {
            this.path = m[0];
        }
        else
        {
            GLogE("can't match res:%s",path);
        }
    },
    getPath : function()
    {
        return this.path;
    },
    //文件
    writeFileData : function(data)
    {
        this.write_data(data);
        this.file = data;
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
        if(this.type == GHTTPTYPE.REQUEST)
        {
            this.async = false;
            return;
        }
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

    write_data : function(buffer)
    {
        this.setData(buffer);
        var len = (buffer instanceof ArrayBuffer) ? buffer.byteLength : buffer.length;
        this.setDataLen(buffer.length);
        this.setProgress(1);

        GResource.getInstance().write_local(this.path,buffer);

        var dt = GTime.nowTime() - this.timer;
        if(dt > 0)
        {
            dt = dt / 1000.0;
            this.speed = (len /1024.0 / dt).toFixed(0);
        }
    },
    progress_callback : function(event)
    {
        if (event.lengthComputable)
        {
            var total = event.total;
            var now = event.loaded;

            if(!total || !now)
            return;

            var progress = (now/total).toFixed(2);
            this.setProgress(progress);
        }
    },
    callback : function(xmlhttp)
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            this.setStatus(true);
            if(this.getType() == GHTTPTYPE.REQUEST)
            {
                //纯文本的数据
                this.write_data(xmlhttp.responseText);
            }
            else
            {
                if (xmlhttp.response)
                {
                    if (xmlhttp.response instanceof ArrayBuffer)
                    {
                        // 异步过来的都是ArrayBuffer
                        this.writeFileData(GHttpService.arraybuffer2Array(xmlhttp.response));
                    }
                    else
                    {
                        // 同步过来的都是二进制字符串
                        this.writeFileData(GHttpService.binary2Array(xmlhttp.response));
                    }
                }
            }
        }
        else
        {
            this.setStatus(false);
        }
    },

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
    async : false,
    timer : 0
});

GHttpTask.create = function()
{
    return new GHttpTask();
};


