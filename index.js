var jsdom = require("jsdom");

jsdom.env({
    url: "http://foo.com",
    scripts: ["http://code.jquery.com/jquery.js"],
    done: function (errors, window) {
        var $ = window.$;
        $('tbody > tr').each(function() {
            var $this = $(this),
                title = getTitle($this),
                quality = getQuality(title);
            console.log(quality);
        });
    }
});

function getTitle($row) {
    return $row.find('.detName a').text()
}

function getQuality(title) {
    var badPattern = /CAM(RIP)*|HD.*TS|TELE|HD*TV|Trailer|TBS|WEBRIP/gi,
        goodPattern = /BD.*RIP|BR.*RIP|DVD.*RIP/gi,
        goodMatch = title.match(goodPattern),
        badMatch;
    if (goodMatch) {
        return {
            'status': 'good',
            'tag': goodMatch[0]
        }
    } else {
        badMatch = title.match(badPattern);
        if (badMatch) {
            return {
                'status': 'bad',
                'tag': badMatch[0]
            }
        } else {
            return {
                status: undefined,
                tag: '???'
            }
        }
    }
}