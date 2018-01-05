# model-pattern

用以规范模型层逻辑。
模型层即MVC中的“M”。对于一些纯后端的脚本，可能会没有“C”或“V”，但模型层逻辑很重，有必要划分清晰的业务层级。

分层参考了百度内部框架ODP。

当前只实现最简单的功能，待实践充分后补充更多的功能。

## 模型层业务逻辑分层

以`demo/model`目录结构为例。

* `model/pub` model层通用类库，可同层调用。
    * 在`model/*`调用。
    * 可在此层实例化`ModelUtil`、`getModelContext`。
* `model/dao` 无业务逻辑原子操作，**不可同层调用**。
    * 可调用`model/pub`。
    * 在`model/data-service`调用。
    * 需继承基类`ModelDao`。
* `model/data-service` 主体业务逻辑封装。
    * 可调用`model/pub`、`model/dao`。
    * 在`model/page-service`调用。
    * 需继承基类`ModelDataService`。
* `model/page-service` 由外部调用的业务逻辑封装。
    * 可调用`model/pub`、`model/data-service`。
    * 由外部逻辑调用。

`model/dao` > `model/data-service` > `model/page-service` >> _for-outer-call-logic_ **不可跨层调用**。

### ModelContext

`ModelContext`是跨层的上下文对象。通常在`page-service`实例化，透传至`dao`。
典型的场景是在`page-service`创建数据库连接，这个连接全流程复用，最后在`page-service`销毁。

`ModelContext`.`mysql`是封装后的MySQL连接池对象（用法参考[mysql](https://www.npmjs.com/package/mysql#pooling-connections)）。
封装逻辑从[mysql2/promise](https://www.npmjs.com/package/mysql2#using-promise-wrapper)改造而来。
