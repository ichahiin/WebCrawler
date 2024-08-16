import {JSDOM} from 'jsdom';
import { tsConstructSignatureDeclaration } from '@babel/types';


function urlNormalizer(anyUrl)
{
	const myUrl = new URL (anyUrl);
	console.log("Received url: " + myUrl)

	if (myUrl.pathname.endsWith("/"))
	{
		myUrl.pathname = myUrl.pathname.slice(0, -1);
	}

	return (myUrl.hostname + myUrl.pathname);
}
// Getting a URL from HTML,
function getUrlFromHtml(htmlBody, baseUrl){

	const dom = new JSDOM(htmlBody);
	let foundUrls = dom.window.document.querySelectorAll('a');
	
	return foundUrls;
}

async function crawlPage(baseUrl, currentUrl, pages = {}) {
	
	if (currentUrl.hostname !== baseUrl.hostname )
	{
		return pages;
	}

	
	
	try {
		const response = await fetch(currentUrl,{
			headers: {
			"Content-Type": "text/html"
			}
		});

		const dataReceived = await response.text();
		const contentType = await response.headers.get("content-type");

		if (!response.ok)
		{
			throw new Error ("Error: Response Status: " + response.status);
		}

		else if (!contentType || !contentType.includes("text/html"))
		{
			throw new TypeError ("Error: Not Html");
		}		

		//console.log(dataReceived);
		//return dataReceived
		return getUrlFromHtml(dataReceived, currentUrl);	
	}

	catch (err)
	{
		console.log(err.message);
	}
}

//let thisUrl = "https://wagslane.dev";

//crawlPage(thisUrl)

















/*console.log("This function takes a URL and normalizes it");

const url1 = "http://example.com/path/";
const url2 = "http://example.com/path";
const url3 = "https://example.com/path/";
const url4 = "https://example.com/path";

//const urlList = [url1, url2, url3, url4];
function urlNormalizer(anyUrl){
	let normalizedUrl = anyUrl.toLowerCase().trim();
	
	if ((anyUrl.startsWith("http")) || (anyUrl.endsWith("/")))
		{
			if (anyUrl.startsWith("https://")){
				normalizedUrl = anyUrl.slice(8);
			}
			
			else if (anyUrl.startsWith("http://")){
				normalizedUrl = anyUrl.slice(7);
			}

			if (anyUrl.endsWith('/')){ 
				normalizedUrl = normalizedUrl.slice(0,-1);
			}
		}
	 
	return normalizedUrl;
}

/*console.log("Here is a list of our URLs\n");
console.log(`URL1 = ${url1}`);
console.log(`URL2 = ${url2}`);
console.log(`URL3 = ${url3}`);
console.log(`URL4 = ${url4}`);

console.log("\nAnd here is the list of normalized URLs\n");


console.log(`URL1 = ${urlNormalizer(url1)}`);
console.log(`URL2 = ${urlNormalizer(url2)}`);
console.log(`URL3 = ${urlNormalizer(url3)}`);
console.log(`URL4 = ${urlNormalizer(url4)}`);
*/
export {urlNormalizer};
export {getUrlFromHtml};
export {crawlPage};
