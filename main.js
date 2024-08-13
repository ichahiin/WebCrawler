//import {urlNormalizer} from "./crawl.js";
//import {getUrlFromHtml} from "./crawl.js";
//import {argv} from "node:process";
import {crawlPage} from './crawl.js'


let givenUrl = process.argv.slice(2);
//console.log ("Number of arguments: " + givenUrl.length)

async function main(givenUrl){
	if (givenUrl.length > 1)
	{
		console.log("Error, Too many arguments");
	}
	else if (givenUrl.length < 1)
	{
		console.log("Error, no URL Provided");
	}
	else
	{
		console.log(`Processing : ${givenUrl} \n`);
		let myVar = await crawlPage(givenUrl);
		console.log(myVar)
		//return  myVar;
	}
}

main(givenUrl);
