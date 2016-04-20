'use strict';

const fs = require('fs');
const http = require('http');
const url = require('url');
const mime = require('mime');
const path = require('path');
const crypto = require('crypto');

const clientPath = path.resolve(__dirname, '../client');
const canonical = path.resolve(__dirname, '../');
// console.log(canonical);
const db = path.resolve(__dirname, '../db/app.json');
const pass = path.resolve(__dirname, '../db/pass.txt');

const server = http.createServer(function(req, res) {
    if(req.method === 'GET') {
        // console.log('get');
        const rUrl = url.parse(req.url, true);
        // console.log(rUrl);
        // if(rUrl.query !== null) {
        //     switch(rUrl.query.data) {
        //         case 'all':
        //             // console.log('all');
        //             fs.readFile(db, 'utf8', function(err, data) {
        //                 if(err) return console.log(err);
        //                 res.writeHeader(200);
        //                 res.end(data);
        //             })
        //             break;
        //     }
        // }
        let requistPatch = rUrl.path;
        // console.log(requistPatch);
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
                var mm = mime.lookup(pth);
                fs.readFile(pth, 'utf8', function(err, data) {
                    if(err) return;
                    res.writeHeader(200, {'Content-Type': mm});
                    res.end(data);
                });
        }
    }else {
        // POST
        console.log('post');

        let rUrl = url.parse(req.url, true);

        switch(rUrl.path) {
            case '/data':
                let body = '';
                req.on('data', (d) => {
                    body += d;
                    fs.writeFile(db, body);
                });
                break;
            case '/password':
                req.on('data', data => {
                    var pass_shasum = crypto.createHash('sha256').update(data).digest('hex');
                    // fs.writeFile(pass, pass_shasum);
                    fs.readFile(pass, function(err, data) {
                        let resp = 'false'
                        if(data + '' === pass_shasum) {
                            resp = 'true';
                        }
                        res.writeHeader(200);
                        res.end(resp);
                    })
                })
                break;
            default:
                res.writeHeader(200);
                res.end();
        }




        // if(rUrl.query !== null) {
        //     console.log();
        // }
        // res.writeHeader(403);
        // res.end('Only GET allowed');
    }
});

server.listen(8000);
console.log('listen 8000');
