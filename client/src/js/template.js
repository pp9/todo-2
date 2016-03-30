'use strict';


const template = (() => {
    const derectives = {
        data: function (str, value, index, data) {
            let scopeEnd = str.indexOf('}', index);
            let scope = str.substring(index, scopeEnd + 1);

            let val = data[value];
            if(val === undefined) val = '';

            let resp = str.replace(scope, val);
            return resp;
        },
        if: function (str, value, index, data) {
            let outherScopeStart = str.indexOf('}', index) + 1;
            let outherScopeEnd = str.indexOf('}', outherScopeStart) + 1;
            let outherScope = str.substring(index, outherScopeEnd);


            let scopeStart = outherScopeStart;
            let scopeEnd = str.indexOf('{/if', scopeStart);
            let scope = str.substring(scopeStart, scopeEnd);

            // console.log(outherScope);
            // console.log(scope);
            let resp = data[value] ? str.replace(outherScope, scope): str.replace(outherScope, '');
            return resp;
        },
        each: function (str, value, index, data) {
            let outherScopeStart = index;
            let outherScopeEnd = str.lastIndexOf('{/each') + 7;
            let outherScope = str.substring(outherScopeStart, outherScopeEnd);

            let scopeStart = str.indexOf('}', outherScopeStart) + 1;
            let scopeEnd = str.lastIndexOf('{/each');
            let scope = str.substring(scopeStart, scopeEnd);

            // console.log(scope);
            // return false;

            let multipl = '';

            if(data[value]) {
                data[value].forEach((e) => {
                    let tm = tokenizer(scope, e);
                    multipl += tm;
                });
            }

            let resp = str.replace(outherScope, multipl);
            return resp;
        }
    }


    function tokenizer(st, data) {
        let reg = new RegExp('{([a-zA-Z ]+)}', 'g');

        while(1) {
            let ex = reg.exec(st);

            if(!ex) break;

            let der = ex[1].split(' ');
            let token = der[0];

            st = derectives[token](st, der[1], ex.index, data);
        }
        return st;
    }

    return {
        compile: tokenizer
    }
})();
