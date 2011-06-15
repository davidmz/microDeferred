/**
 * @preserve Copyright (c) 2011 David Mzareulyan
 *
 * microDeferred
 * 
 */
(function(self) {

    if (typeof self.jQuery !== "undefined" && typeof self.jQuery.Deferred !== "undefined") {
        self.Deferred = self.jQuery.Deferred;
        return;
    }

    /** @constructor */
    self.Deferred = function() {
        var     callbacks = [0, [], []],
                status = 0,
                args,
                promise = null,
                promiseMethods,
                deferred = this;

        var setStatus = function(newStatus, newArgs) {
            if (status) return;
            status = newStatus;
            args = newArgs;
            var list = callbacks[status];
            while (list.length) list.shift().apply(promise, args);
            callbacks = null;
            return deferred;
        };
        var addCallback = function(onStatus, callback) {
            if (status == onStatus) {
                callback.apply(this, args);
            } else if (!status) {
                callbacks[onStatus].push(callback);
            }
            return this;
        };

        // Deferred object methods
        deferred.promise = function(target) {
            if (!target && promise) return promise;
            promise = target ? target : promise ? promise : {};
            for (var k in promiseMethods)
                if (promiseMethods.hasOwnProperty(k))
                    promise[k] = promiseMethods[k];
            return promise;
        };
        deferred.resolve = function() { return setStatus(1, arguments); };
        deferred.reject  = function() { return setStatus(2, arguments); };

        // Promise object methods
        promiseMethods = {
            done:   function(callback) { return addCallback.call(this, 1, callback); },
            fail:   function(callback) { return addCallback.call(this, 2, callback); },

            then:   function(callbackDone, callbackFail) {
                return this.done(callbackDone).fail(callbackFail);
            },
            always: function(callback) {
                return this.then(callback, callback);
            },

            isResolved: function() { return (status == 1); },
            isRejected: function() { return (status == 2); }
        };
    };

})(this);