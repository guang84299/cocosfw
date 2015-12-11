/**
 * Created by yanchunguang on 15/12/3.
 */

//test

var GHttpTest = function()
{
    var task = GHttpTask.create();
    task.setUrl("http://localhost:63342/cocosfw/res/HelloWorld.png");
    task.setType(GHTTPTYPE.REQUEST);

    GHttpService.getInstance().download(task);
};
//GHttpTest();

