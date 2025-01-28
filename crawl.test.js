const {test,expect} = require('@jest/globals');
const {normalizeUrl}  = require('./crawl.js');
const {gettheUrlfromHtml} = require('./crawl.js');
test('normalizeUrl',()=>{
    const input = "https://github.com/bootdotdev/fcc-learn-http-assets/blob/main/project/3-normalize_urls/src/";
    const actual = normalizeUrl(input);
    const expected = "github.com/bootdotdev/fcc-learn-http-assets/blob/main/project/3-normalize_urls/src";
    expect(actual).toEqual(expected)
})
test('gettheUrlfromHtml',()=>{
    const baseurl = "https://boot.dev"
    const input =
    '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>'
   
    const actual = gettheUrlfromHtml(input);
    const expected = ['https://boot.dev/path/one'];
})