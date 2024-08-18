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

// Getting a list of URLs from an HTML body.
function getUrlFromHtml(htmlBody, baseUrl){

	const dom = new JSDOM(htmlBody);
	let foundUrls = Array.from(dom.window.document.querySelectorAll('a')); // Convert the NodeList to a regualr array.
	
	for (let tag in foundUrls)  // Convert Relative URLs to Absolute URLs.
	{
		if (foundUrls[tag].hostname)  // Check that found URLs don't have a domain already attached to them.
		{
			foundUrls[tag] = foundUrls[tag].toString(); // Convert Anchor Elements to strings/text.
			continue; // Continue to not concatenate the baseUrl to it.
		}

		foundUrls[tag] =  baseUrl + foundUrls[tag]; // Appending a string to the an HTMLAnchorEelemnt transforms it into a string.
	}
	//console.log("FoundURLs: " + foundUrls);
	
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
	console.log("NormalizedURL is: " + normCurrentUrl);
	
	
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
		//return dataReceived;
		return getUrlFromHtml(dataReceived, currentUrl);	
	}

	catch (err)
	{
		console.log(err.message);
	}
}

//let thisUrl = "https://wagslane.dev";

//crawlPage(thisUrl)

//urlNormalizer(getUrlFromHtml('<html><body><a href="https://goobeldegook.com">gobbrl</a> <a href="HTTPS://yahoo.com">jj</a></body></html>'))


export {urlNormalizer};
export {getUrlFromHtml};
export {crawlPage};
