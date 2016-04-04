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
        })
        .then(() => {
            $('#modal-id').modal('show');
        })
    }
}
const itemView = {
    addEvents() {

    },
    init(item) {
        this.addEvents();
        this.render();
    },
    render() {

    }
}