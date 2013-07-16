define(['services/logger', 'durandal/app'], function (logger, app) {
    function Task(data) {
        this.Id = ko.observable(data.Id);
        this.IsDone = ko.observable(data.IsDone);
        this.Name = ko.observable(data.Name);
    }

    function removeTask(task, vm) {
        app.showMessage("Do you realy want to delete this task?", "Delete", ['Yes', 'No']).then(function (confirm) {
            if (confirm === 'No') {
                return;
            }

            var self = vm;
            var url = "/Tasks/RemoveTask?taskId=" + task.Id();
            $.getJSON(url, function(result) {
                if (result) {
                    self.tasks.remove(task);
                    logger.log('Task Removed', null, 'tasks', true);
                } else {
                    logger.logError('Task Was Not Removed', null, 'tasks', true);
                }
            });
        });
    }

    function addTask(vm) {
        var self = vm;
        var url = "/Tasks/AddTask?name=" + self.newName() + "&description=description";
        $.getJSON(url, function (data) {
            if (data.error != null) {
                logger.logError(data.error, null, 'tasks', true);
            } else {
                self.tasks.push(new Task(data.createdTask));
                logger.log('Task Added', null, 'tasks', true);
                self.newName("");
            }
        });
    }

    function invertIsDone(task) {
        var url = "/Tasks/InvertIsDone?id=" + task.Id() + "&value=" + task.IsDone();
        $.getJSON(url, function(data) {
            if (data.success) {
                logger.log(data.message, null, 'tasks', true);
            } else {
                logger.logError(data.message, null, "tasks", true);
                task.IsDone = ko.observable(!task.IsDone);
            }
        });
    }

    function TasksModel() {
        var self = this;
        self.title = "Tasks list";
        self.tasks = ko.observableArray([]);
        self.newName = ko.observable();

        self.removeTask = function (task) {
            removeTask(task, self);
        };
        self.addTask = function () {
            addTask(self);
        };
        self.invertIsDone = function(task) {
            invertIsDone(task);
            return true;
        };

        self.activate = function () {
            logger.log('Tasks View Activated', null, 'tasks', true);
            $.getJSON("/Tasks/GetTasks", function (allData) {
                var mappedTasks = ko.utils.arrayMap(allData.tasks, function (item) { return new Task(item); });
                self.tasks(mappedTasks);
                logger.log('Tasks Loaded', null, 'tasks', true);
            });
            return true;
        };
    }

    var tasks = new TasksModel();

    return tasks;
});