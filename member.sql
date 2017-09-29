/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : game

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2017-09-29 13:46:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for member
-- ----------------------------
DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT '用户名',
  `password` varchar(100) NOT NULL COMMENT '密码',
  `email` varchar(100) NOT NULL COMMENT '邮箱',
  `idcard` varchar(100) NOT NULL COMMENT '身份证',
  `realname` varchar(100) NOT NULL,
  `agreement` tinyint(1) NOT NULL COMMENT '协议同意状态 0不同意 1同意',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '状态 0：无效  1：有效',
  `login_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '登录状态  0未登录 1已登录',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
