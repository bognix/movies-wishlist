var Promise = require("bluebird"),
    fs = require("fs"),
    Handlebars = require("handlebars");

function createMailContent(resultsArr) {
    return new Promise(function(resolve, reject) {
        getTemplate()
            .then(function(template) {
                data = prepareData(resultsArr);
                console.log(data);
                resolve(template(data))
            })
    });
}

function getTemplate() {
    return new Promise(function(resolve, reject) {
        fs.readFile('./templates/email.hbs', 'utf-8', function(err, source) {
            var template = Handlebars.compile(source);
            resolve(template);
        });
    });
}

function prepareData(resultsArr) {
    var titles = [], foundGood, resultJson, i, j;
    for (i = 0; i < resultsArr.length; i++) {
        foundGood = false;
        for (j = 0; j < resultsArr[i].length; j++) {
            resultJson = resultsArr[i][j];
            if (resultJson.isGood) {
                titles.push({
                    good: true,
                    title: resultJson.title,
                    quality: resultJson.quality.tag,
                    magnet: resultJson.magnet
                });
                foundGood = true;
                break;
            }
        }
        if (!foundGood) {
            resultJson = resultsArr[i][0];
            titles.push({
                good: false,
                title: resultJson.title,
                quality: resultJson.quality.tag,
                magnet: resultJson.magnet
            });
        }
    }
    return {
        "titles": titles
    };
}

module.exports.createMailContent = createMailContent;