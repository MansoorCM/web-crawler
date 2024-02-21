const { test, expect, describe } = require('@jest/globals')
const { normalizeURL } = require('./crawler.js')

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