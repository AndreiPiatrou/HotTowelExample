﻿define(['durandal/system', 'durandal/plugins/router', 'services/logger'],
    function (system, router, logger) {
        var shell = {
            activate: activate,
            router: router
        };

        return shell;

        function activate() {
            return boot();
        }

        function boot() {
            router.mapNav('tasks');
            router.mapNav('about');
            log('Hot Towel SPA Loaded!', null, false);
            return router.activate('tasks');
        }

        function log(msg, data, showToast) {
            logger.log(msg, data, system.getModuleId(shell), showToast);
        }
    });