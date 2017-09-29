<?php include "header.html";?>
<!-- 主体 -->
<div class="routea">
    <div class="login-bg">
        <div class="container ">
            <div class="login-title">用户登录</div>
        </div>
    </div>
</div>
<div class="login-box">
    <form class="login-form" action="/account.php?act=login" method="post">
        <div class="login-form-main">
            <div class="form-group">
                <label  for="inputUsername">用户名</label>
                <input type="text" id="inputUsername" class="form-control" placeholder="请输入用户名" ajaxurl="/member/checkUserNameUnique.html"  datatype="*1-9" value="" name="username">
                <div class="controls ">
                    <div class="controls Validform_checktip text-warning">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label  for="inputPassword">密码</label>
                <input type="password" id="inputPassword" class="form-control" placeholder="请输入密码" errormsg="密码为6-20位" nullmsg="请填写密码" datatype="*6-20" name="password">
                <div class="controls ">
                    <div class="controls Validform_checktip text-warning">
                    </div>
                </div>
            </div>
            <div class="row form-group">
                <div class="col-md-6 "> <img src="images/forget.png" alt="" / style="margin-right: 5px;"><label>
                        <a href="register.php" class="forget-btn">忘记密码</a></label></div>
                <div class="col-md-6 text-right"><label><a href="register.php" class="register-btn">注册</a> </label></div>
            </div>
        </div>
        <div class="login-btn-group">
            <button type="submit" class="btn login-btn">登 陆</button>
        </div>
    </form>
</div>
<script type="text/javascript">
    $(function(){
        $(window).resize(function(){
            $("#main-container").css("min-height", $(window).height() - 343);
        }).resize();
    })
</script>
<!-- /主体 -->

<script type="text/javascript">

    $(document)
        .ajaxStart(function(){
            $("button:submit").addClass("log-in").attr("disabled", true);
        })
        .ajaxStop(function(){
            $("button:submit").removeClass("log-in").attr("disabled", false);
        });


    $("form").submit(function(){
        var self = $(this);
        var url = self.attr("action");
        var query = self.serialize();

        $.post(url, query, function callback(data){
            var res = jQuery.parseJSON(data);
            if(parseInt(res.code) === 0){
                alert("登录成功");
                window.location.href = res.data.url;
            } else {
                alert(res.message);
                //self.find(".Validform_checktip").text(res.message);
            }
        });
        return false;

    });

    $(function(){
        var verifyimg = $(".verifyimg").attr("src");
        $(".reloadverify").click(function(){
            if( verifyimg.indexOf('?')>0){
                $(".verifyimg").attr("src", verifyimg+'&random='+Math.random());
            }else{
                $(".verifyimg").attr("src", verifyimg.replace(/\?.*$/,'')+'?'+Math.random());
            }
        });
    });
</script>

<?php include "footer.html";?>