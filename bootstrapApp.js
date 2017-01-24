/**
 * Created by wWX318801 on 2017/1/23.
 */
(function () {

    var scripts = [];
    var modules = [];
    (function () {
        scripts = document.getElementsByTagName('script');
        if (scripts) {
            for (var i = 0; i < scripts.length; i++) {
                var module = scripts[i].getAttribute('module');
                if (module) {
                    modules.push(module);
                }
            }
        }
    })();

    (function () {
        angular.module('eg.app', modules || []);
        angular.bootstrap(document, ["eg.app"]);
    })();
})();
