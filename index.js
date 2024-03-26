const { crawlPage } = require("./crawler")

async function main(){
    if (process.argv.length < 3) {
        throw new Error('baseUrl missing.')
    }
    if (process.argv.length > 3) {
        throw new Error('too many arguments.')
    } 
    
    const baseURL = process.argv[2]
    console.log(`web crawler will start at ${baseURL}...`)

    const pages = {}
    await crawlPage(baseURL, baseURL, pages)
    for ( const page of Object.keys(pages) ) {
        console.log(`${page} : ${pages[page]}`)
    }
}

main()