'use strict';

const fs = require('fs');
const http = require('http');
const url = require('url');
const mime = require('mime');
const path = require('path');

const clientPath = path.resolve(__dirname, '../client');
const canonical = path.resolve(__dirname, '../');
// console.log(canonical);
const db = path.resolve(__dirname, '../db/app.json');

const server = http.createServer(function(req, res) {
    if(req.method === 'GET') {
        const rUrl = url.parse(req.url, true);
        if(rUrl.query !== null) {
            switch(rUrl.query.data) {
                case 'all':
                    fs.readFile(db, 'utf8', function(err, data) {
                        if(err) return console.log(err);
                        res.writeHeader(200);
                        res.end(data);
                    })
                    break;
            }
        }
        let requistPatch = rUrl.path;
        console.log(requistPatch);
        let indexPatch = path.resolve(canonical, 'index.html');
        switch (requistPatch) {
            case '/':
                fs.readFile(indexPatch, function(err, data) {
                    if(err) return console.log(err);
                    res.writeHeader(200);
                    res.end(data);
                });
                break;
            case '/favicon.ico':
                res.writeHeader(200);
                res.end(null);
                break;
            default:
                let pth = canonical + requistPatch;
                pth = path.resolve(pth);
                // console.log(pth);
                var mm = mime.lookup(pth);
                fs.readFile(pth, 'utf8', function(err, data) {
                    if(err) return;
                    res.writeHeader(200, {'Content-Type': mm});
                    res.end(data);
                });
                break;
        }
    }else {
        let rUrl = url.parse(req.url, true);
        let body = '';
        req.on('data', (d) => {
            body += d;
            // console.log(body);
            fs.writeFile(db, body);
        })
        // if(rUrl.query !== null) {
        //     console.log();
        // }
        // res.writeHeader(403);
        // res.end('Only GET allowed');
    }
});

server.listen(8000);
console.log('listen 8000');
