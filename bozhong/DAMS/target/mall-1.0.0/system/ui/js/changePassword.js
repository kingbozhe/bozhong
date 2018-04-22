/**
 * Created by Octopus on 2017/8/22.
 */
function updatePassword() {
    console.log(1111);
    var formDom = $('<form class="coverpopup" method="POST"></form>');
    formDom.append('<div class="iline col-sm-12"><em>旧密码</em><div class="sinput"><input id="oldpassword" class="itext" placeholder="请输入" aria-describedby="basic-addon1" type="text" required="required" onKeyUp="value=value.replace(/[\u4e00-\u9fa5]/g,\'\')"></div></div>');
    formDom.append('<div class="iline col-sm-12"><em>新密码</em><div class="sinput"><input id="newpassword" class="itext" placeholder="请输入" aria-describedby="basic-addon1" type="password" required="required"></div></div>');
    formDom.append('<div class="iline col-sm-12"><em>重复密码</em><div class="sinput"><input id="newpassword1" class="itext" placeholder="请输入" aria-describedby="basic-addon1" type="password" required="required"><div id="validateTips" class="wrong"></div></div></div>');
    BootstrapDialog.show({
        title: '修改密码',
        message: function (dialog) {
            return formDom;
        },
        data: {},
        buttons: [{
            label: '确认',
            cssClass: 'btn-primary',
            action: function (dialog) {
                var bValid = true;
                var oldpassword = $("#oldpassword"),
                    newpassword = $("#newpassword"),
                    newpassword1 = $("#newpassword1"),
                    alltexts = $([]).add(oldpassword).add(newpassword).add(newpassword1);
                $("#validateTips").html("");
                // bValid = bValid && checkLength(oldpassword, 6, 6);
                bValid = bValid && checkLength(newpassword, 6, 6);
                bValid = bValid && checkRegexp(newpassword, /\d[a-zA-Z][0-9a-zA-Z]+|[a-zA-Z]\d[0-9a-zA-Z]+|\d\d[a-zA-Z][0-9a-zA-Z]+|[a-zA-Z][a-zA-Z]\d[0-9a-zA-Z]+|\d\d\d[a-zA-Z][0-9a-zA-Z]+|[a-zA-Z][a-zA-Z][a-zA-Z]\d[0-9a-zA-Z]+|\d\d\d\d[a-zA-Z][0-9]|\d\d\d\d[0-9][a-zA-Z]|[a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z]\d[a-zA-Z]|[a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z]\d|000000/, "密码允许字符： 数字和字母组合");
                bValid = bValid && checkLength(newpassword1, 6, 6);
                bValid = bValid && checkRegexp(newpassword1, /\d[a-zA-Z][0-9a-zA-Z]+|[a-zA-Z]\d[0-9a-zA-Z]+|\d\d[a-zA-Z][0-9a-zA-Z]+|[a-zA-Z][a-zA-Z]\d[0-9a-zA-Z]+|\d\d\d[a-zA-Z][0-9a-zA-Z]+|[a-zA-Z][a-zA-Z][a-zA-Z]\d[0-9a-zA-Z]+|\d\d\d\d[a-zA-Z][0-9]|\d\d\d\d[0-9][a-zA-Z]|[a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z]\d[a-zA-Z]|[a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z]\d|000000/, "密码允许字符： 数字和字母组合");
                if (bValid && newpassword.val() != newpassword1.val()) {
                    updateTips("两次输入的密码不一致！");
                    bValid = false;
                }
                console.log(bValid);
                if (bValid) {
                    $.ajax({
                        url: '/DAMS/auth/updatePassword',
                        type: "POST",
                        data: {
                            oldpassword: oldpassword.val(),
                            newpassword: newpassword.val()
                        },
                        success: function (data) {    //成功执行的方法
                            if (data.success) {
                                //成功则关闭form窗口
                                dialog.close();
                                showAlertDialog("操作成功!");
                            } else {
                                if (data.errorCode == 1) {
                                    updateTips("用户密码错误!");
                                } else if (data.errorCode == 3) {
                                    updateTips("新密码中含有中文!");
                                } else {
                                    showAlertDialog("操作失败!");
                                }
                            }
                        },
                        error: function (e) {
                            showAlertDialog("服务器出错!");
                        }
                    });
                }
            }
        }, {
            label: '取消',
            cssClass: 'btn-default',
            action: function (dialog) {
                dialog.close();
            }
        }],
        closable: false,
        autodestroy: true
    });
}

function checkRegexp(o, regexp, n) {
    if (!( regexp.test(o.val()) )) {
        updateTips(n);
        return false;
    } else {
        return true;
    }
}

function checkLength(o, min, max) {
    if (o.val().length > max || o.val().length < min) {
        updateTips("密码长度：" +
            min + "位！");
        return false;
    } else {
        return true;
    }
}

function updateTips(t) {
    $("#validateTips").show()
        .text(t)
        .addClass("ui-state-highlight");
    setTimeout(function () {
        $("#validateTips").removeClass("ui-state-highlight", 1500);
    }, 500);
}

