/**
 * Created by yanchunguang on 15/10/27.
 * include js文件解析器
 */

var include = function(file,reload)
{

};


function GParser(fn)
{
    this._files = [];
    this._tmp = [];
    this._fn = fn;

    this.title = document.title;
    this.index = 0;
};

GParser.prototype.addfile = function(file)
{
    this._tmp.push(file);
};

GParser.prototype.find = function()
{
    if(this._tmp.length == 0)
    {
        this.loadjs();
        return;
    }

    var file = this._tmp.shift();
    var dirs = file.split("/");
    var dir = "";
    if(dirs.length > 1)
    {
        for(var i=0;i<dirs.length-1;i++)
        {
            dir += dirs[i] + "/";
        }
    }

    this.http(file,function(http){

        var text = http.responseText;
        var fs = text.match(/[^//]include\("([^"]+)"/g);
        if(fs)
        {
            for(var i=0;i<fs.length;i++)
            {
                var f = fs[i].match(/"([^"]+)/);
                this._files.push({"file":f[1],"dir":dir});
            }
        }
        this.find();
    }.bind(this));
};

GParser.prototype.loadjs = function()
{
    var self = this;
    if(this.index < this._files.length)
    {
        var obj = document.createElement("script");
        obj.src = this._files[this.index].dir  + this._files[this.index].file;
        obj.addEventListener("load", function() {
            obj.removeEventListener("load", arguments.callee, false);
            self.loadjs();

        }.bind(this), false);
        document.body.appendChild(obj);
        this.index++;

        console.log("load js:"+obj.src);
    }
    else
    {
        document.title = this.title;
        if(this._fn)
            this._fn();
        return;
    }

    document.title = this.title + " (" + this.index.toString() + "/" + this._files.length + ")";
};

GParser.prototype.http = function(url, callback) {
    var http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.onload = function() {
        callback(http);
    };
    http.send(null);
};