'use strict';

const homeCntr = (() => {

    let db = new model.Model;
    let taskTmpl;
    let taskEditFormTmpl;

    http.get('/?data=all')
        .then((data) => {
            return JSON.parse(data);
        })
        .then((json) => {
            db.data = json;
            taskView.init();
        });


    function render(data, tmpl, container) {
        let tmp = template.compile(tmpl, data);
        container.html(tmp);
    }
    function removeTask() {
        const $this = $(this);
        let taskId = parseInt($this.parents('.task').data('id'));

        db.remove(taskId);
        render(db.data, taskTmpl, $mainListContainer);
        db.save();
    }

    function addItem() {
        let taskId = parseInt($(this).parents('#task-edit-form').data('id'));
        let itemId = db.get(taskId).items.length;
        let task = db.get(taskId);

        let item = new model.Task(itemId);
        task.items.push(item);
        itemView.init(item);

        // render(task, taskEditFormTmpl, $('#task-edit-container'));
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
    function itemDoneToggle(a, b) {
        const $this = $(this);

        let taskId = parseInt($this.parents('#task-edit-form').data('id'));
        let itemId = $this.parents('.input-group').find('> input').data('item-id');
        let task = db.get(taskId);

        task.items = task.items.map(el => {
            if(el.id === itemId) el.done = !el.done;
            return el;
        });
        render(task, taskEditFormTmpl, $('#task-edit-container'));
    }

    function addNewTask() {
        let newTaskId = db.getLastId() + 1;
        let task = new model.Task(newTaskId);
        editTaskView.init(task);
    }

    function editTask() {
        let id = parseInt($(this).data('id'));
        let task = db.get(id);
        editTaskView.init(task);
    }

    // function closeEditForm (e) {
    //     e.preventDefault();
    //     $editFormContainer.html('');
    // }
    function submitEditForm(e) {
        e.preventDefault();


        let $form = $('#task-edit-form'),
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
        // console.log(task);
        db.data.tasks[currentId] = task;


        render(db.data, taskTmpl, $mainListContainer);
        db.save();
        $('#modal-id').modal('hide');
    }
    $(document).on('submit', '#task-edit-form', submitEditForm);
    // $(document).on('reset', '#task-edit-form', closeEditForm);
    $(document).on('click', '#edit-save', submitEditForm);

    $(document).on('click', '.remove-item', removeItem);


    // $(document).on('click', '.task', function (e) {
    //     if($(e.target).hasClass('close') || $(e.target).is('input')) return false;

    //     editTask($(this).data('id'));
    // });

    $(document).on('click', '#add-new-task', addNewTask);

    // $(document).on('click', '#add-text-note', addTextNote);
    // $(document).on('click', '#add-item', addItem);
    $(document).on('change', '.done-checkbox', itemDoneToggle);
    $(document).on('click', '.task__remove-task', removeTask);


    function getData() {
        return http.get('/?data=all')
                .then((data) => {
                    return JSON.parse(data);
                });
    }

    return {
        getData: getData,
        editTask: editTask,
        addItem: addItem
    }


})();