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
	console.log(myUrl.hostname + myUrl.pathname);
	return (myUrl.hostname + myUrl.pathname);
}

// Getting a URL from HTML,
function getUrlFromHtml(htmlBody, baseUrl){

	const dom = new JSDOM(htmlBody);
	let foundUrls = Array.from(dom.window.document.querySelectorAll('a')); // transform the NodeList to a regualr array.
	console.log("FoundURLs" + foundUrls)
	
	return foundUrls;	  
}

// CrawlPage
async function crawlPage(baseUrl, currentUrl, pages = {}) {
	
	if (currentUrl.hostname !== baseUrl.hostname )
	{
		console.log ("Reached outer hostname")
		return pages;
	}
	let normCurrentUrl = urlNormalizer(currentUrl);
	Console.log("NormalizedURL is: " + normCurrentUrl);
	
	
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
		return dataReceived;
		//return getUrlFromHtml(dataReceived, currentUrl);	
	}

	catch (err)
	{
		console.log(err.message);
	}
}

//let thisUrl = "https://wagslane.dev";

//crawlPage(thisUrl)

urlNormalizer(getUrlFromHtml('<html><body><a href="https://goobeldegook.com">gobbrl</a> <a href="HTTPS://yahoo.com">jj</a></body></html>'))


export {urlNormalizer};
export {getUrlFromHtml};
export {crawlPage};
