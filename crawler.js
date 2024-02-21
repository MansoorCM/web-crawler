const url = require('url')

function normalizeURL(inputURL) {
    const parsedURL = url.parse(inputURL, true)
    const host = parsedURL.host.toLowerCase()
    let pathname = parsedURL.pathname
    if (pathname.length > 0 && pathname[pathname.length - 1] == '/'){
        pathname = pathname.slice(0, pathname.length - 1)
    }
    return host + pathname
}

module.exports = {
    normalizeURL
} 