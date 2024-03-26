const url = require('url')
const { JSDOM } = require('jsdom')

function normalizeURL(inputURL) {
    const parsedURL = url.parse(inputURL, true)
    const host = parsedURL.host.toLowerCase()
    let pathname = parsedURL.pathname
    if (pathname.length > 0 && pathname[pathname.length - 1] == '/'){
        pathname = pathname.slice(0, pathname.length - 1)
    }
    return host + pathname
}

function getURLsFromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const aElements = dom.window.document.querySelectorAll('a')
    for (const aElement of aElements){
      if (aElement.href.slice(0,1) === '/'){
        try {
          urls.push(new URL(aElement.href, baseURL).href)
        } catch (err){
          console.log(`${err.message}: ${aElement.href}`)
        }
      } else {
        try {
          urls.push(new URL(aElement.href).href)
        } catch (err){
          console.log(`${err.message}: ${aElement.href}`)
        }
      }
    }
    return urls
  }

function crawlPage(url){
  fetch(url)
  .then((res) => {
    if(res.status > 399) {
      console.log(`Got http error, status code : ${res.status}`)
      return
    }
    const contentType = res.headers.get('Content-Type')
    if(! contentType.includes('text/html')){
      console.log(`invalid content type : ${contentType}`)
      return
    }
    return res.text()
  })
  .then((jsonData) => console.log(jsonData))
  .catch((error) => {
    console.log(error.message)
  })
}

module.exports = {
    normalizeURL, 
    getURLsFromHTML,
    crawlPage
} 