module.exports = function (template, json) {
    const fs = require('fs');
    let htmlTemplate=template;
    var output = htmlTemplate.replace(/{%PRODUCTNAME%}/g, json.productName);
    output = output.replace(/{%IMAGE%}/g, json["image"]);
    output = output.replace(/{%FROM%}/g, json["from"]);
    output = output.replace(/{%NUTRIENTS%}/g, json["nutrients"]);
    output = output.replace(/{%PRICE%}/g, json["price"]);
    output = output.replace(/{%QUANTITY%}/g, json["quantity"]);
    output=output.replace(/{%ID%}/g,json["id"]);
    output = output.replace(/{%DESCRIPTION%}/g, json["description"]);
    if (json["organic"] === false) {
        output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
    }
    return output;
}
// console.log(output);
// module.exports = output;