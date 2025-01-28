module.exports = {
normalizeUrl
,gettheUrlfromHtml,crawlpages
}
async function crawlpages( baseurl,currentUrl,pages) {
const baseurlobj = new URL(baseurl);
const currenturlobj = new URL(currentUrl);
if(baseurlobj.hostname !== currenturlobj.hostname){
    return pages;
}
const normalizedURL = normalizeUrl(currentUrl)
if (pages[normalizedURL] > 0){
  pages[normalizedURL]++
  return pages
}
pages[normalizedURL] = 1
    console.log(`actively crawling ${currentUrl}`)
try{
const resp = await fetch(currentUrl);
if(resp.status>399){
    console.log(`error is detected in crawling status code ${resp.status}and current url is ${currentUrl}`);
    return;
} 
const contentType = resp.headers.get('content-type')
if (!contentType.includes('text/html')){
  console.log(`Got non-html response: ${contentType}`)
  return pages;
}
const htmlbody = await resp.text();
const nexturls = gettheUrlfromHtml(htmlbody,currentUrl);
for (const nexturl of nexturls){
    pages = await crawlpages(baseurl,nexturl,pages); 
}
}
catch(e){
    console.log(`error in detected in creawling ${currentUrl}:${e.message}`);
}
return pages;
}





function normalizeUrl(url){
    const urlobj = new URL(url);
    let fullpath =  urlobj.host+urlobj.pathname;
    if(fullpath.length>0 && fullpath.slice(-1)==="/"){
        fullpath = fullpath.slice(0,-1);
    }
    return fullpath;
}
function gettheUrlfromHtml(htmlbody,baseurl){
const{JSDOM} = require('jsdom');
const urls = [];
const dom = new JSDOM(htmlbody);
const aelements =  dom.window.document.querySelectorAll('a');
for(const aelement of aelements){
    if(aelement.href.slice(0,1)==="/"){
        try {
        urls.push(new URL(aelement.href,baseurl).href);
    }
    catch(e){
        console.log(`Error:${e.message}:${aelement.href}`)
    }
}
else{
    try {
        urls.push(new URL(aelement.href).href)
      } catch (err){
        console.log(`${err.message}: ${aelement.href}`)
      }
}
}
return urls;}