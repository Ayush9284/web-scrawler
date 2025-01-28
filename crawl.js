module.exports = {
normalizeUrl
,gettheUrlfromHtml
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
        urls.push(new URL(aElement.href).href)
      } catch (err){
        console.log(`${err.message}: ${aElement.href}`)
      }
}
}
return urls;}