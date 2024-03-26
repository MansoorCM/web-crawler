const { crawlPage } = require("./crawler")
const { printReport } = require("./report")

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
    printReport(pages)
}

main()