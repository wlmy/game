<?php
require "bootstrap.php";

class Account
{
    /**
     * 登录
     * @param $mysqli
     * @return string
     */
    public function login($mysqli)
    {
        if (!empty($_COOKIE['login_token'])) {
            return $this->print_to('0', '登录成功！', ['url' => '/']);
        }

        $name = $_POST['username'];
        $password = $_POST['password'];

        if (empty($name)) {
            return $this->print_to('1', '该用户名不能为空！');
        }
        if (empty($password)) {
            return $this->print_to('1', '密码不能为空！');
        }

        $sql_query = "SELECT `id`, `name`, `password` FROM member WHERE `name` = '$name'";
        $select_result = $mysqli->query($sql_query);
        if ($select_result->num_rows == 0) {
            return $this->print_to('1', '该用户不存在！');
        }

        $data = $select_result->fetch_row();
        if ($data[2] !== $password) {
            return $this->print_to('1', '输入密码有误！');
        }

        $sql = "UPDATE member SET login_status = 1 WHERE id = '$data[0]'";
        $up_result = $mysqli->query($sql);
        if ($up_result) {
            setcookie('login_token', json_encode(['id' => $data[0], 'name' => $data[1], 'password' => $data[2]]),
                time() + 3600 * 24);
            return $this->print_to('0', '登录成功！', ['url' => '/']);
        } else {
            return $this->print_to('1', '登录失败！');
        }


    }

    /**
     * 注册
     * @param $mysqli
     * @return string
     */
    public function register($mysqli)
    {
        $name = $_POST['username'];
        $password = $_POST['password'];
        $repassword = $_POST['repassword'];
        $email = $_POST['email'];
        $idcard = $_POST['idcard'];
        $realname = $_POST['realname'];
        $agreement = $_POST['agreement'] ? 1 : 0;

        if (empty($name)) {
            return $this->print_to('1', '该用户名不能为空！');
        }
        if (empty($password)) {
            return $this->print_to('1', '密码不能为空！');
        }
        if (empty($repassword)) {
            return $this->print_to('1', '确认密码不能为空！');
        }
        if ($password != $repassword) {
            return $this->print_to('1', '密码与确认密码不一致！');
        }
        if (empty($email)) {
            return $this->print_to('1', '邮箱不能为空！');
        }
        if (empty($idcard)) {
            return $this->print_to('1', '身份证不能为空！');
        }
        if (empty($agreement)) {
            return $this->print_to('1', '协议必须勾选！');
        }

        $status = 1; //有效状态
        $create_time = date('Y-m-d H:i:s');
        $update_time = date('Y-m-d H:i:s');

        $sql_query = "SELECT * FROM member WHERE `name` = '$name'";
        $select_result = $mysqli->query($sql_query);
        if ($select_result->num_rows) {
            return $this->print_to('1', '该用户已经注册！');
        }
        $sql = "INSERT INTO `member` (`id`, `name`, `password`, `email`, `idcard`, `realname`, `status`, `agreement`, `create_time`, `update_time`) VALUES ('', '$name', '$password', '$email', '$idcard', '$realname', '$status', '$agreement', '$create_time', '$update_time')";
        $add_result = $mysqli->query($sql);

        if ($add_result) {
            return $this->print_to('0', '该用户注册成功！', ['url' => '/login.php']);
        } else {
            return $this->print_to('1', '该用户注册失败！');
        }
    }

    /**
     * 登出
     */
    public function login_out()
    {
        setcookie('login_token', '', time() - 60);
        header("location: /");
    }

    /**
     * 输出信息
     * @param $code
     * @param $message
     * @param array $data
     * @return string
     */
    public function print_to($code, $message, $data = [])
    {
        echo json_encode(array(
            'code' => $code,
            'message' => $message,
            'data' => $data
        ));
    }
}


$act = $_GET['act'] ? $_GET['act'] : '';
if (empty($act)) {
    exit;
} else {
    //建立数据库连接
    $mysqli = new \mysqli();
    $mysqli->connect('localhost', 'root', 'root', 'game');

    $class = new Account();

    if ($_GET['act'] == 'register') {
        $class->register($mysqli);
    }

    if ($_GET['act'] == 'login') {
        $class->login($mysqli);
    }

    if ($_GET['act'] == 'login_out') {
        $class->login_out();
    }

    $mysqli->close();
    exit;
}






