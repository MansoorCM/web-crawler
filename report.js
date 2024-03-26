function printReport(pages){
    console.log()
    console.log('starting the report...')

    let urls = []
    for ( const url of Object.keys(pages)) {
        urls.push([pages[url], url])
    }
    urls = sortReport(urls)
    for ( let i = 0; i < urls.length; i++ ) {
        console.log(`Found ${urls[i][0]} internal links to ${urls[i][1]}`)
    }
}

function sortReport(urls){
    urls.sort()
    urls.reverse()
    return urls
}

module.exports = {printReport}