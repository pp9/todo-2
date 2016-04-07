'use strict';

const model = (() => {

    function Collection(items) {
        this.childs = items || [];
    }

    const Task = function (data) {
        this.id = data.id;
        this.name = data.name || '';
        this.textNote = data.textNote || '';
        this.items = data.items || [];
    }

    const Item = function (data) {
        this.id = data.id;
        this.text = data.text || '';
        this.done = data.done || false;
    }

    function Model() {
        this.data = {};
    }

    Collection.prototype.add = function(item) {
        this.childs.push(item);
    }


    Model.prototype.add = function(task){
        this.data.tasks.push(task);
    };
    Model.prototype.remove = function(taskId) {
        this.data.tasks = this.data.tasks.filter(el => {
            if(el.id !== taskId) return el;
        });
    };

    Model.prototype.save = function() {
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                var response = ajax.responseText;
            }
        };
        ajax.open('post', '/data', true);
        ajax.setRequestHeader("Content-type", "application/json");
        let d = JSON.stringify(this.data);

        ajax.send(d);
    };
    Model.prototype.get = function(id){
        return this.data.tasks[id];
    };
    Model.prototype.getLastId = function(){
        let tasks = this.data.tasks;
        return tasks[tasks.length - 1].id;
    };

    return {
        Model: Model,
        Collection: Collection,
        Task: Task,
        Item: Item,

    }
})();
