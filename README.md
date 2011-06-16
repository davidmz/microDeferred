μDeferred
=========

μDeferred или микро-Deferred — компактная реализация deferred и promise объектов.
Повторяет [интерфейс](http://api.jquery.com/category/deferred-object/) соотв.
объектов jQuery, а если jQuery присутствует в системе, то использует её объекты.

Предназначена для написания единообразного кода, если jQuery может как присутствовать
так и отсутствовать.

API
----

Создаёт глобальую функцию-конструктор `Deferred`. Вызов `Deferred()` или `new Deferred()`
возвращает deferred-объект со следующими методами:

 * promise
 * resolve
 * reject
 * resolveWith
 * rejectWith

`promise()` возвращает promise-объект со следующими методами:

 * done
 * fail
 * then
 * always
 * isResolved
 * isRejected

Функционал всех методов повторяет [функционал](http://api.jquery.com/category/deferred-object/) соотв.
объектов jQuery.