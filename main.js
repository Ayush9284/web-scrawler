const {crawlpages} = require('./crawl.js');
function main(){
 if (process.argv.length<3){
    console.log("no website url provided");
    process.exit(1);
 }
 if(process.argv.length>3){
    console.log("too many arguments");
    process.exit(1);
 }
 const baseurl = process.argv[2];
 console.log(`start crawling ${baseurl} `);
 crawlpages(baseurl);
}
main();