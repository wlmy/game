<?php include "header.html";?>
  <!-- /头部 -->
  <!-- 主体 -->        
<div class="routea register-routea">
  <div class="register-bg">
    <div class="container ">
      <div class="login-title">注册账户</div>
      </div>
    </div>
  </div>
  <div class="register-box">
    <form class="register-form" action="/account.php?act=register" method="post">
      <div class="register-form-main"> 
        <div class="form-group">      
          <label  for="inputusername">用户名</label>
          <input type="text" id="inputusername" value="" class="form-control" placeholder="请输入用户名" ajaxurl="/member/checkUserNameUnique.html" errormsg="请填写1-16位用户名" nullmsg="请填写用户名" datatype="*1-16" value="" name="username">
          <div class="controls ">
            <div class="controls Validform_checktip text-warning">      
            </div>
          </div>
        </div>
        <div class="form-group">
          <label  for="inputPassword">密码</label>    
            <input type="password" id="inputPassword" value="" class="form-control" placeholder="请输入密码" errormsg="密码为6-20位" nullmsg="请填写密码" datatype="*6-20" name="password">  
          <div class="controls ">
            <div class="controls Validform_checktip text-warning">      
            </div>
          </div>
        </div>
        <div class="form-group">
          <label  for="inputPassword">确认密码</label> 
            <input type="password" id="repeatpass" value="" class="form-control" placeholder="请再次输入密码" recheck="password" errormsg="您两次输入的密码不一致" nullmsg="请填确认密码" datatype="*" name="repassword">
          <div class="controls ">
            <div class="controls Validform_checktip text-warning">      
            </div>
          </div>
        </div>
        <div class="form-group">
          <label  for="inputEmail">邮箱</label>   
           <input type="text" id="inputEmail" value="" class="form-control" placeholder="请输入电子邮件" ajaxurl="/member/checkUserEmailUnique.html" errormsg="请填写正确格式的邮箱" nullmsg="请填写邮箱" datatype="e" value="" name="email">
          <div class="controls ">
            <div class="controls Validform_checktip text-warning">      
            </div>
          </div>
        </div>
        <div class="form-group">
          <label  for="realname">真实姓名</label>    
           <input type="text" id="realname" class="form-control" value="" placeholder="请输入您的姓名" errormsg="请输入您的姓名" nullmsg="请输入您的姓名" name="realname">   
          <div class="controls ">
            <div class="text-warning" id="w_realname"></div>
          </div>
        </div>
        <div class="form-group">
          <label for="idcard">身份证</label>    
          <input type="text" id="idcard" class="form-control" placeholder="请输入身份证号码 如：440106198101010155" errormsg="请输入正确身份证号码" nullmsg="请输入身份证" value="" name="idcard"> 
          <div class="controls ">
           <div class="text-warning" id="w_idcard"></div>
          </div>
        </div>
        <div class=" form-group">
          <label>
          <input type="checkbox" value="agree" name="agreement" id="agree" checked=""> 我已阅读并接受 <a href="#" target="_blank"> 《用户协议》</a>
          </label>
        </div>
         <div class=" form-group text-right">
          <label>
            <a href="login.php" class="login-btn">有账号了，去登录！</a>
          </label>
        </div>
      </div>     
      <div class="login-btn-group">
        <button type="submit" class="btn login-btn">注册</button>
      </div>
    </form>
  </div>

<!-- Modal -->
<div class="modal " id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">注册成功</h4>
      </div>
      <div class="modal-body">
        正在为您转到首页..
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">确认</button>
        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
      </div>
    </div>
  </div>
</div>

<script type="text/javascript">
    $(function(){
        $(window).resize(function(){
            $("#main-container").css("min-height", $(window).height() - 343);
        }).resize();
    })
</script>

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

    $.post(url, query,  function callback(data){
       var res = jQuery.parseJSON(data);
        if(parseInt(res.code) === 0){
            alert("注册成功");
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