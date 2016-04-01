'use strict';

const model = (($, template) =>{
    let Task = function (id, name, textNote, items) {
        this.id = id;
        this.name = name || '';
        this.textNote = textNote || '';
        this.items = items || [];
    }

    let Item = function (id, text, done) {
        this.id = id;
        this.text = text || '';
        this.done = done || false;
    }

    function Model() {
        this.data = {};
    }
    Model.prototype.add = function(task){
        this.data.tasks.push(task);
    };
    Model.prototype.remove = function(taskId) {
        // console.log(this.data);
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
        Task: Task,
        Item: Item,

    }
})(jQuery, template);
