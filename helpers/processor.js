function toMailContent(resolve, resultsArr) {
    var html = '<html><head><style>' +
            '.good {' +
            'color: yellowgreen;' +
            '}' +
            '.bad {' +
            'color: red;' +
            '}</style></head><body>%content%</body></html>',
        entryHtml = '<div class=%class%>' +
            '<span>%title% :</span>' +
            '<span>quality: %tag%</span>' +
            '<span>seeders/leechers: %seeders%/%leechers%</span>' +
            '<span>magnet: %magnet%</span></div>',
        title, i, j, content = '', resultJson;

    for (i = 0; i < resultsArr.length; i++) {
        for (j = 0; j < resultsArr[i].length; j++) {
            resultJson = resultsArr[i][j];
            content += entryHtml.replace('%title%', resultJson.title)
                .replace('%tag%', resultJson.quality.tag)
                .replace('%seeders%', resultJson.seedersAndLeechers.seeders)
                .replace('%leechers%', resultJson.seedersAndLeechers.leechers)
                .replace('%magnet%', resultJson.magnetLink)
                .replace('%class%', resultJson.quality.status)
        }
    }
    html = html.replace('%content%', content);
    resolve(html);
}


module.exports.toMailContent = toMailContent;