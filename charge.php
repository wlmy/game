<?php include "header.html";?>
    <link rel="icon" type="image/icon" href="http://f.hdurl.me/web2/images/favicon.ico">
    <link rel="shortcut icon" type="image/icon" href="http://f.hdurl.me/web2/images/favicon.ico">
    <link rel="stylesheet" type="text/css" href="css\bootstrap.min.css" media="screen">
    <link rel="stylesheet" type="text/css" href="css\buttons.css" media="screen">
    <link rel="stylesheet" type="text/css" href="css\font-awesome.min.css" media="screen">
    <link rel="stylesheet" type="text/css" href="css\style.css" media="screen">
    <link rel="stylesheet" type="text/css" href="css\select2.css" media="screen">


<div class="mainbody">
    <div class="faq ng-scope" style="padding:20px" ng-controller="RechargeCtl">
        <div class="unionpay-tips">
            <div>
                <div class="tips-top">
                    您当前选择的是“网上银行”支付方式
                </div>
                <div class="tips-bottom">
                    只要您开通网上银行服务，足不出户即可实现快捷准确的账号充值。请勿在此通道中使用其他方式充值。
                </div>
            </div>
        </div>
        <div>
            <div class="faq-tips-title">
                请选择您要充值到哪里
            </div>
            <div class="faq-divider-line-one">
            </div>
            <form class="form-horizontal ng-pristine ng-valid">
                <div class="form-group">
                    <label class="col-lg-2 control-label">充值到游戏:</label>
                    <div class="col-lg-6" style="width:500px;">
                        <select class="form-control">
                            <option value="" disabled="" selected="">请选择
                            <option value="">暂无
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-lg-2 control-label">充值服务器:</label>
                    <div class="col-lg-6" style="width:500px;">
                        <select class="form-control">
                            <option value="" disabled="" selected="">请选择
                            <option value="">暂无
                        </select>
                    </div>
                </div>
            </form>
        </div>
        <div class="faq-divider-line-two">
        </div>
        <div>
            <div class="faq-tips-title">
                请填写并确认账号信息
            </div>
            <div class="faq-divider-line-one">
            </div>
            <form class="form-horizontal ng-pristine ng-valid">
                <div class="form-group">
                    <label class="col-lg-2 control-label">充值账号:</label>
                    <div class="col-lg-6" style="width:500px;">
                        <input type="text" class="form-control" id="charge_account" value="">
                    </div>
                    <div class="col-lg-2 darkred remark">
                        *必填
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-lg-2 control-label">确认账号:</label>
                    <div class="col-lg-6" style="width:500px;">
                        <input type="text" class="form-control" id="charge_confirm_account" value="">
                    </div>
                    <div class="col-lg-2 darkred remark">
                        *必填
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-lg-2 control-label">确认账号:</label>
                    <div class="col-lg-6" style="width:500px;">
                        <input type="text" class="form-control">
                    </div>
                    <div class="col-lg-2 remark">
                        *选填
                    </div>
                </div>
            </form>
        </div>
        <div class="faq-divider-line-two">
        </div>
        <div>
            <div class="faq-tips-title">
                请选择金额<span>(充值货币兑换比例提示：1元=10小伙伴游戏币)</span>
            </div>
            <div class="faq-divider-line-one">
            </div>
            <form class="form-horizontal ng-pristine ng-valid">
                <div class="form-group">
                    <label class="col-lg-2 control-label">选择充值金额:</label>
                    <div class="col-lg-6" style="width:500px;">
                        <select class="form-control">
                            <option value="" disabled="" selected="">请选择充值金额
                            <option value="">6元
                            <option value="">12元
                            <option value="">30元
                            <option value="">68元
                            <option value="">98元
                            <option value="">998元
                        </select>
                    </div>
                </div>
            </form>
        </div>
        <div class="faq-divider-line-two">
        </div>
        <div>
            <div class="faq-tips-title">
                请选择银行
            </div>
            <div class="faq-divider-line-one">
            </div>
            <form class="form-horizontal bank-list-form ng-pristine ng-valid">
                <div class="form-group ">
                    <div class="col-lg-offset-2 col-lg-10">
                        <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" value="ccb" checked>
                            <img class="bankitem ccb">
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" value="abc">
                            <img class="bankitem abc">
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" value="icbc">
                            <img class="bankitem icbc">
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" value="cmb">
                            <img class="bankitem cmb">
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-lg-offset-2 col-lg-10">
                        <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" value="spdb">
                            <img class="bankitem spdb">
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" value="cib">
                            <img class="bankitem cib">
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" value="cgb">
                            <img class="bankitem cgb">
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" value="sdb">
                            <img class="bankitem sdb">
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-lg-offset-2 col-lg-10">
                        <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" value="cmbc">
                            <img class="bankitem cmbc">
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" value="bankcomm">
                            <img class="bankitem bankcomm">
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" value="ecitic">
                            <img class="bankitem ecitic">
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" value="ceb">
                            <img class="bankitem ceb">
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-lg-offset-2 col-lg-10">
                        <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" value="bea">
                            <img class="bankitem bea">
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" value="ofbj">
                            <img class="bankitem ofbj">
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" value="boc">
                            <img class="bankitem boc">
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" value="cbhb">
                            <img class="bankitem cbhb">
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-lg-offset-2 col-lg-10">
                        <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" value="njcb">
                            <img class="bankitem njcb">
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="inlineRadioOptions" value="psbc">
                            <img class="bankitem psbc">
                        </label>
                    </div>
                </div>
                <div class="from-group" style="margin-top:30px;">
                    <div class="col-lg-offset-2 col-lg-6" style="width:400px;">
                        <div class="btn btn-default" style="padding:8px 40px;" ng-click="payTips()">
                            下一步
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="clearfix">
        </div>
        <div style="height:20px;">
        </div>
        <h1>&nbsp;</h1>
    </div>
    <a id="return-top" style="left: 1184.5px; display: none;"></a>
</div>

<script>
    $(function () {
       $('.btn-default').click(function () {
           var account = $('#charge_account').val();
           var confirm_account = $('#charge_confirm_account').val();
           if(!account){
               alert('充值账号不能为空');
               return false;
           }
           if(!confirm_account){
               alert('确认账号不能为空');
               return false;
           }
           alert('充值申请成功！');
       });
    });
</script>

<?php include "footer.html";?>