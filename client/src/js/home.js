'use strict';

const home = (($, http, template) => {

    const $mainListContainer = $('#main-list');

    let db = new model.Model;
    let taskTmpl;
    let taskEditFormTmpl;

    let prmData = http.get('/?data=all')
        .then((data) => {
            return JSON.parse(data);
        })
        .then((json) => {
            db.data = json;
            http.get('/client/src/html/task.html')
                .then((res) => {
                    taskTmpl = res;
                    render(db.data, taskTmpl, $mainListContainer);
                });
        });


    function render(data, tmpl, container) {
        let tmp = template.compile(tmpl, data);
        container.html(tmp);
    }

    function addItem() {
        console.log('add item');
        let taskId = parseInt($(this).parents('#task-edit-form').data('id'));
        let itemId = db.get(taskId).items.length;
        let task = db.get(taskId);

        let item = new model.Task(itemId);
        task.items.push(item);

        render(task, taskEditFormTmpl, $('#task-edit-container'));
    }

    function removeItem() {
        let taskId = parseInt($(this).parents('#task-edit-form').data('id'));
        let itemId = $(this).parents('.input-group').find('> input').data('item-id');
        let task = db.get(taskId);

        task.items = task.items.filter(el => {
            return el.id !== itemId;
        });
        render(task, taskEditFormTmpl, $('#task-edit-container'));

    }

    function addNewTask() {
        let newTaskId = db.getLastId() + 1;
        let task = new model.Task(newTaskId);
        render(task, taskTmpl, $editFormContainer);
    }

    function editTask(taskId) {
        let id = parseInt(taskId);
        let task = db.get(id);

        let tmpl = http.get('./client/src/html/task-edit.html')
            .then(data => {
                taskEditFormTmpl = data;
                render(task, data, $('#task-edit-container'));
            })
            .then(() => {
                $('#modal-id').modal('show');
            });
    }
// Project starter 
// create script for bootstrap and sass kik-start

    function closeEditForm (e) {
        e.preventDefault();
        $editFormContainer.html('');

    }
    function submitEditForm(e) {
        e.preventDefault();


        let $form = $(this),
        currentId = $form.data('id'),
        title = $form.find('input[name=task-name]').val(),
        textNote = $form.find('textarea[name=taks-text-note]').val();

        let task = new model.Task(currentId, title, textNote);


        $form.find('input[name=task-item]').each((i, el) => {
            let $el = $(el),
            itemText = $el.val(),
            done = $el.siblings('.input-group-addon').find('input[type=checkbox]').is(':checked'),
            item = new model.Item(i, itemText, done);

            task.items.push(item);
        });

        db.data.tasks[currentId] = task;
        render(db.data, taskTmpl, $mainListContainer);
        db.save();
    }

    $(document).on('submit', '#task-edit-form', submitEditForm);
    $(document).on('reset', '#task-edit-form', closeEditForm);
    $(document).on('click', '#edit-save', submitEditForm);

    $(document).on('click', '.remove-item', removeItem);


    $(document).on('click', '.task', function (e) {
        editTask($(this).data('id'));
    });

    $(document).on('click', '#add-new-task', addNewTask);

    // $(document).on('click', '#add-text-note', addTextNote);
    $(document).on('click', '#add-item', addItem);


})(jQuery, http, template);