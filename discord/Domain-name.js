function domain_from_url(url) {
    var result
    var match
    if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
        result = match[1]
        if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
            result = match[1]
        }
    }
    return result
}


console.log(domain_from_url("https://www.google.com"))
console.log(domain_from_url("http://yahoo.com/something"))
console.log(domain_from_url("http://freds.meatmarket.co.uk?someparameter"))
console.log(domain_from_url("https://www.something.intersite.mall.co.uk"))
console.log(domain_from_url("http://video.facebook.com/id?=12324214124&&concacne"))
console.log(domain_from_url("www.app.cc.ee.aa.facebook"))

