<?php

error_reporting(E_ERROR);
date_default_timezone_set('PRC');

if (version_compare(PHP_VERSION, '5.3.0', '<')) {
    die ('Your PHP Version is ' . PHP_VERSION . ', But WeiPHP require PHP > 5.3.0 !');
}





