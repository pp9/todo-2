'use strict';

const taskView = {
    addEvents() {
        this.$container.on('click', '.task', homeCntr.editTask);
    },
    init() {
        this.$container = $('#main-list');

        this.template = function() {
            return http.get('/client/src/html/task.html')
        }
        this.addEvents();
        this.render();
    },
    render() {
        homeCntr.getData()
            .then(data => {
                this.template()
                    .then(tmpl => {
                        let tmp = template.compile(tmpl, data);
                        this.$container.html(tmp);
                    })
            })
    }
}

const editItemView = {
    addEvents() {
        this.$container.on('click', '.remove-item', homeCntr.removeItem);
    },
    init(task) {
        this.$container = $('#edit-item-list');
        this.template = function() {
            return http.get('./client/src/html/task-edit-item.html');
        }
        this.addEvents();
        this.render(task);
    },
    render(task) {
        let items = {
            items: task.items
        }
        this.template().then(tmpl => {
            let tmp = template.compile(tmpl, items);
            this.$container.html(tmp);
        })
    }
}

const editTaskView = {
    addEvents() {
        this.$container.on('click', '#add-item', homeCntr.addItem);
    },
    init(task) {
        this.$container = $('#task-edit-container');
        this.template = function() {
            return http.get('./client/src/html/task-edit.html');
        }

        this.addEvents();
        this.render(task);
    },
    render(task) {
        this.task = task;
        this.template().then(tmpl => {
            let tmp = template.compile(tmpl, this.task);
            this.$container.html(tmp);
            return tmp;
        })
        .then(tmp => {
            this.subViews.init(this.task);
        })
        .then(() => {
            $('#modal-id').modal('show');
        })
    },
    subViews: editItemView
}