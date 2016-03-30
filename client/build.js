'use strict';

const fs = require('fs');
const watcher = fs.watch('./css/app.less');
const less = require('less');
const style = 'body{color: red;}';

watcher.on('change', (event, file)=> {

    fs.readFile('./css/app.less', 'utf8', (err, data) => {
        less.render(data)
            .then((css) => {
                fs.writeFile('./css/app.css', css.css, 'utf8');
            });
    });
});
