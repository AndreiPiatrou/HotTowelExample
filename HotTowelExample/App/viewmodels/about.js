define(['services/logger'], function (logger) {

    function Task(data) {
        this.Id = ko.observable(data.Id);
        this.IsDone = ko.observable(data.IsDone);
        this.Name = ko.observable(data.Name);
    }

    function AboutViewModel() {
        var self = this;
        self.title = "About";
        self.incompleteTasks = ko.observableArray([]);
        self.activate = function () {
            logger.log('Tasks View Activated', null, 'tasks', true);
            loadData(self);
            return true;
        };
    }

    function loadData(self) {
        self.incompleteTasks.removeAll();
        $.getJSON("/Tasks/GetTasks", function (allData) {
            var mappedTasks = ko.utils.arrayMap(allData.tasks, function (item) {
                return new Task(item);
            });
            for (var i = 0; i < mappedTasks.length; ++i) {
                if (!mappedTasks[i].IsDone()) {
                    self.incompleteTasks.push(mappedTasks[i]);
                }
            }

            logger.log('Incomplete Tasks Loaded', null, 'tasks', true);
        });
    }

    var vm = new AboutViewModel();

    return vm;
});
