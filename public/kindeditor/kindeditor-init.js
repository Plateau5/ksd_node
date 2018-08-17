/**
 * Created by Arley Joe on 2018年8月8日15:16:52
 * @description KINDEDITOR INIT FILE
 * @copyright arleyjoe@163.com
 * Just use this file to init a rich text editor with kindEditor.
 * Thanks for all the contributors of the kindEditor. With them kindly that anyone can use so good editor free.
 *
 */
var config = {
    width : '100%',
    height : 400,
    resizeType : 1,
    items : [
        'source', '|', 'undo', 'redo', '|', 'preview', 'cut', 'copy', 'paste',
        'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
        'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
        'superscript', 'clearhtml', 'quickformat', 'selectall', '|',
        'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
        'italic', 'strikethrough', 'removeformat', '|', 'image',
        'insertfile', 'pagebreak', 'link', 'unlink'
    ],
    uploadJson : '/api/rich/txt/upload',
    // filePostName : 'file',
    allowImageRemote : false,
    allowFileManager : true
};

function initKindEditor (selector, options) {
    KindEditor.ready(function(K) {
        window.kindEditorObject = K;
        window.kindEditor = K.create(selector, config);
        defaultData(kindEditorObject);
    });

    function defaultData (kindEditorObject) {
        var str = '<a href="javascript:;" class="go_apply_list crumbs_item">GPS仓库</a>';
        str = kindEditorObject.escape(str);
        console.log(str);
        var html = kindEditorObject.unescape(str);
        console.log('------------------------------');
        console.log(html);
    }

}