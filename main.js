const {crawlpages} = require('./crawl.js');
async function main(){
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
const pages= await crawlpages(baseurl,baseurl,{});
for(const page of Object.entries(pages)){
    console.log(page);
}
}

main();