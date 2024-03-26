const { crawlPage } = require("./crawler")

function main(){
    if (process.argv.length < 3) {
        throw new Error('baseUrl missing.')
    }
    if (process.argv.length > 3) {
        throw new Error('too many arguments.')
    } 
    
    const baseURL = process.argv[2]
    console.log(`web crawler will start at ${baseURL}...`)

    crawlPage(baseURL)
}

main()