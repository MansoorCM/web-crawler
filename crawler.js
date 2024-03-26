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

async function crawlPage(currentUrl, baseURL, pages){
  // check currenturl and baseurl have same domains.
  const currentUrlParsed = new URL(currentUrl)
  const baseUrlParsed = new URL(baseURL)
  if( currentUrlParsed.hostname != baseUrlParsed.hostname) {
    return
  }

  const normalizedURL = normalizeURL(currentUrl)
  if (normalizedURL in pages) {  // already crawled.
    pages[normalizedURL] += 1
    return
  }
  pages[normalizedURL] = 1
  console.log(`crawling ${currentUrl}...`)
  let jsonData = ''

  try{
    const res = await fetch(currentUrl)
    if(res.status > 399) {
      console.log(`Got http error, status code : ${res.status}`)
      return
    }
    const contentType = res.headers.get('Content-Type')
    if(! contentType.includes('text/html')){
      console.log(`invalid content type : ${contentType}`)
      return
    }
    jsonData = await res.text()
    
  }catch(error) {
    console.log(error.message)
  }
  
  const urls = getURLsFromHTML(jsonData, baseURL)
  for(const url of urls) {
    await crawlPage(url, baseURL, pages)
  }
}

module.exports = {
    normalizeURL, 
    getURLsFromHTML,
    crawlPage
} 