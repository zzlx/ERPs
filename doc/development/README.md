Development
===========

[Table Of Contents](./TOC.md)


# 系统特性

* 数据库支持:主数据库为postgresql,支持从SQL Server、MySQL等数据库读取数据
* 未配置数据库时将数据存储在本地,并以csv格式压缩后存储
* 配置数据库后，业务数据及配置数据均存储于数据库
* ...

# 系统部署

## 数据库配置


## 服务端口配置

Node服务需要配置1023以上端口提供服务，
需同时配置apache httpd/nginx,通过80/443端口提供http静态资源主页面服务。
Node端口提供后端管理服务,后端生成静态资源后再提供给443端口.

## 防火墙配置

### 阻止特定IP地址访问


添加防火墙规则,阻止特定IP地址流量

```shell
firewall-cmd --add-rich-rule='rule family="ipv4" source address="192.168.1.100" reject'
```

# Todos

预设置常用分类,无法匹配时使用先作为其他分类，后续可通过重分类进行列示
费用归集方法，根据人员所属部门归集费用/根据费用报销部分归集费用


# TODOS

* typescript支持
* 


# redis的使用

https://download.redis.io/redis-stable.tar.gz

# 关于GIT的使用



## 指定文件夹或指定分支的所有文件打包为一个单独的压缩文件

```
git archive -o ##.zip HEAD
```

# 系统功能

* 服务器运维服务
* VPN服务: 配置VPN网络
* ERP系统服务: 提供包括OA\CRM\会计\仓储... 

# TODOS

* 在线文档编辑平台:支持多人同时编辑,实时显示编辑预览

# 系统特性

旨在提高并发处理能力、系统稳定性

# 系统配置

* 操作系统: Linux、Mac、Windows均可部署，推荐使用Linux
* 数据库: PostgreSQL，推荐使用最新版
* Node.js: A JavaScript runtime system, 推荐使用最新稳定版

## 关于模块

* ioredis Redis 客户端

## 代码习惯

* 使用IO资源后关闭它
* 不在循环里远程调用、或IO操作,优先考虑批量进行
* 考虑多线程执行情况，注意并发一致性问题
* 获取对象属性前，先判断是否为空
* SQL代码完成后，explain检查执行效率
* 调用第三方接口，考虑异常处理、安全性、超时重试
* 接口考虑幂等性
* 主从延迟问题
