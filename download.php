<?php

require "bootstrap.php";
require "core.php";

$game_id = $_GET['game_id'];
if (empty($game_id)) {
    echo "<script>alert('游戏ID不能为空');</script>";
    exit;
}
$core = new core();
$filePath = './downloadApk/kuaiyu.apk';
$core->download($filePath, $game_id);
exit;




