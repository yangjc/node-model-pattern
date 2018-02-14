# @yjc/model-pattern

用以规范模型层逻辑。\
模型层即MVC中的“M”。对于一些纯后端的脚本，可能会没有“C”或“V”，但模型层逻辑很重，有必要划分清晰的业务层级。

分层参考了百度内部框架ODP。

当前只实现简单的功能，待实践充分后补充更多的功能。

## 用例1：使用数据库

[`src/demo/script/use-mysql.ts`](https://github.com/yangjc/node-model-pattern/blob/master/src/demo/script/use-mysql.ts)

## 用例2：扩展基类

[`src/demo/script/extend-base.ts`](https://github.com/yangjc/node-model-pattern/blob/master/src/demo/script/extend-base.ts)

## 用例3：使用全局错误码

[`src/demo/script/use-error-codes.ts`](https://github.com/yangjc/node-model-pattern/blob/master/src/demo/script/use-error-codes.ts)

## 模型层业务逻辑分层

以`src/demo/use-mysql`目录结构为例。

* `pub` model层通用类库，可同层调用。
* `dao` 无业务逻辑原子操作，**不可同层调用**。
    * 可调用`pub`。
    * 由`data-service`调用。
    * 需继承基类`ModelDao`。
* `data-service` 主体业务逻辑封装。
    * 可调用`pub`、`dao`。
    * 由`page-service`调用。
    * 需继承基类`ModelDataService`。
* `page-service` 由外部调用的业务逻辑封装。
    * 可调用`pub`、`data-service`。
    * 由外部逻辑调用。
    * 需继承基类`ModelPageService`。

调用路径： `dao` > `data-service` > `page-service` >> _External-Logic_ **不可跨层调用**。

### 目录结构生成脚本

    cd @yjc/model-pattern
    npm run mkdirs your-model-dir

## ModelPageService.context

`ModelPageService.context`是跨层的上下文对象，在`page-service`实例化，透传至`dao`。\
典型的场景是在`page-service`创建数据库连接，这个连接全流程复用，最后在`page-service`销毁。

### ModelDao.mysql

`ModelDao`.`mysql`是封装后的MySQL连接池对象（用法参考[mysql](https://www.npmjs.com/package/mysql#pooling-connections)）。

引用的模块[@yjc/mysql](https://www.npmjs.com/package/@yjc/mysql)，从[mysql2/promise](https://www.npmjs.com/package/mysql2#using-promise-wrapper)改造而来。

## ErrorCodes, ExternalError

* `defineErrorCodes` 定义全局错误码。
* `assert` 断言函数，抛出的错误对象包含`ExternalError.eCode`、`ExternalError.eTip`，用于隐藏出错细节、对用户提供友好提示。
