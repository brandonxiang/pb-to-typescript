var e,n=(e=require("protobufjs"))&&"object"==typeof e&&"default"in e?e.default:e,r={double:"number",float:"number",int32:"number",int64:"number",uint32:"number",uint64:"number",sint32:"number",sint64:"number",fixed32:"number",fixed64:"number",sfixed32:"number",sfixed64:"number",bool:"boolean",string:"string",bytes:"string"},t="google.protobuf.Empty";function o(e){var n=e.nested;return n?Object.keys(n).map(function(e){var u=n[e];return Object.keys(u).map(function(n){return"fields"===n?function(e,n){var t=function(e,n){return{category:"fields",name:e,params:Object.keys(n).map(function(e){var t=n[e];return{type:r[t.type]||t.type,name:e,rule:t.rule,id:t.id}}).sort(function(e,n){return e.id-n.id})}}(e,n.fields),o=t.params.map(function(e){return"repeated"===e.rule?"  "+e.name+": "+e.type+"[];\n":"  "+e.name+": "+e.type+";\n"});return n.nested&&Object.keys(n.nested).forEach(function(e){o.push("  "+e+": "+e+";\n")}),"interface "+t.name+" {\n"+o.join("")+"}\n\n"}(e,u):"methods"===n?function(e,n){return""+function(e,n){return{category:"methods",name:e,params:Object.keys(n).map(function(e){return Object.assign({},{name:e},n[e])})}}(e,u.methods).params.map(function(e){return"interface "+e.name+" {\n  ("+(e.requestType===t?"":"params: "+e.requestType)+"): Promise<"+(e.responseType===t?"{}":e.responseType)+">;\n}\n\n"}).join("")}(e):"values"===n?function(e,n){var r=u.values;return"enum "+e+" {\n"+Object.keys(r).map(function(e){return{name:e,id:r[e]}}).sort(function(e,n){return e.id-n.id}).map(function(e){return"  "+e.name+" = "+e.id+",\n"}).join("")+"}\n\n"}(e):"nested"===n?o(u):void 0})}).reduce(function(e,n){return e.concat(n)},[]).join(""):""}function u(e){var r=n.parse(e,{keepCase:!0});return o(r.package?r.root.lookup(r.package).toJSON():r.root.toJSON())}var a={parseProto:u,parseJson:o};u('\nsyntax = "proto3";\nmessage CheckKycInfoMatchResp {\n}\n'),exports.parseJson=o,exports.parseProto=u,exports.default=a;
//# sourceMappingURL=index.js.map
