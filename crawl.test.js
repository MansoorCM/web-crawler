const { test, expect, describe } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawler.js')

describe("normalizeURL", () => {
    
    test("normalize url protocol", () => {
        const input = "https://blog.boot.dev/path"
        const actual = normalizeURL(input)
        const expected = "blog.boot.dev/path"
        expect(actual).toEqual(expected);
    });

    test("normalize url slash", () => {
        const input = "https://blog.boot.dev/path/"
        const actual = normalizeURL(input)
        const expected = "blog.boot.dev/path"
        expect(actual).toEqual(expected);
    });
    
    test("normalize url capitals", () => {
        const input = "https://BLOG.boot.dev/path"
        const actual = normalizeURL(input)
        const expected = "blog.boot.dev/path"
        expect(actual).toEqual(expected);
    });
    
    test("normalize url http", () => {
        const input = "http://blog.boot.dev/path"
        const actual = normalizeURL(input)
        const expected = "blog.boot.dev/path"
        expect(actual).toEqual(expected);
    });
})

describe("getURLSFromHTML", () => {
    
    test("getURLSFromHTML", () => {
        const htmlBody = `<html>
        <body>
            <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
            <a href="https://www.boot.dev/community"><span>Go to Boot.dev community</span></a>
            <a href="/leaderboard"><span>Go to Boot.dev leaderboards</span></a>
        </body>
    </html>`
        const urls = getURLsFromHTML(htmlBody, "https://blog.boot.dev")
        expect(urls.length).toEqual(3);
    });
})