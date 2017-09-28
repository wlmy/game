<?php

require "bootstrap.php";

class core
{
    //获取登录信息
    public function get_login_info()
    {
        if (!empty($_COOKIE['login_token'])) {
            $login_token = json_decode($_COOKIE['login_token']);
            $name = $login_token->name;
            $data = array(
                'name' => $name,
                'status' => 1
            );
        } else {
            $data = array(
                'name' => '',
                'status' => 0
            );
        }
        return $data;
    }

    //下载资料
    public function download($filePath, $game_id)
    {
        $saveAsFileName = '游戏包.apk';
        if ($game_id == 1) {
            $saveAsFileName = '快快鱼.apk';
        }
        if ($game_id == 2) {
            $saveAsFileName = '捕鱼机.apk';
        }
        if ($game_id == 3) {
            $saveAsFileName = '王者荣耀.apk';
        }

        // 清空缓冲区并关闭输出缓冲
        ob_end_clean();

        //r: 以只读方式打开，b: 强制使用二进制模式
        $fileHandle = fopen($filePath, "rb");
        if ($fileHandle === false) {
            echo "Can not find file: $filePath\n";
            exit;
        }

        Header("Content-type: application/octet-stream");
        Header("Content-Transfer-Encoding: binary");
        Header("Accept-Ranges: bytes");
        Header("Content-Length: " . filesize($filePath));
        Header("Content-Disposition: attachment; filename=\"$saveAsFileName\"");

        while (!feof($fileHandle)) {

            //从文件指针 handle 读取最多 length 个字节
            echo fread($fileHandle, 32768);
        }
        fclose($fileHandle);
    }
}




