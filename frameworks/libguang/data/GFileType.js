/**
 * Created by yanchunguang on 15/12/4.
 */

var GFileType = {
    type : function(file)
    {
        this._typeMap = [
            [GFileType.Image,["png","jpg","jpeg","bmp"]],
            [GFileType.Sound,["mp3", "ogg", "wav", "mp4", "m4a"]],
            [GFileType.XML,["plist", "xml", "fnt", "tmx", "tsx"]],
            [GFileType.Binary,["ccbi", "sqlite", "dat"]],
            [GFileType.Font, ["font"]],
            [GFileType.Text, ["txt", "vsh", "fsh", "json", "atlas", "log", "js"]]
        ];

        var fix = this.postfix(file);

        for(var key in this._typeMap)
        {
            if(!this._typeMap.hasOwnProperty(key))
                continue;

            var item = this._typeMap[key];
            var type = item[0];
            var arr = item[1];

            if (arr.indexOf(fix) != -1)
                return type;
        }
        return fix ? GFileType.Binary : GFileType.Unknown;
    },
    //取得文件后缀
    postfix : function(file)
    {
        var arr = file.match(/\.[^.]+$/);
        return (arr && arr.length > 0) ? arr[0].substr(1,arr[0].length) : "";
    }
};

GFileType.Unknown = 0;
GFileType.Image   = 1;
GFileType.Sound   = 2;
GFileType.XML     = 3;
GFileType.Binary  = 4;
GFileType.Font    = 5;
GFileType.Text    = 6;