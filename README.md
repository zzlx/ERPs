ERPs
=====

一款ERP管理软件，致力于实现企业级管理信息化解决方案,
提供流程审批、财务会计、CRM、仓库管理等管理系统.

> **系统特性**
>
> * 支持多种前端设备:支持手机、PC、平板等,B/S架构设计;
> * 支持API接口: 提供API交互服务，方便系统集成, 可集成至钉钉、企业微信等第三方平台.
> * 支持多种数据库: postgresql\SQL Server\Mongodb...
> * 支持自定义报表: 根据业务需求，自定义各类数据报表.

# 项目文档 

* [用户文档](./doc/manual/README.md):帮助用户使用系统
* [开发文档](./doc/development/README.md): 帮助开发者开发应用程序
* [术语表](./doc/development/Glossary.md): 开发文档术语表
* [许可文件](./LICENSE.md): 软件使用许可

# 快速使用

* Install

```
cd erps && npm install
```

* Start services

```
./bin/erpctl --start
```
