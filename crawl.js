import {JSDOM} from 'jsdom';


function urlNormalizer(anyUrl)
{
	const myUrl = new URL (anyUrl);

	if (myUrl.pathname.endsWith("/"))
	{
		myUrl.pathname = myUrl.pathname.slice(0, -1);
	}

	return (myUrl.hostname + myUrl.pathname);
}

function getUrlFromHtml(htmlBody, baseUrl){

	const dom = new JSDOM(htmlBody);
	let foundUrls = dom.window.document.querySelectorAll('a');
	return baseUrl + foundUrls[0];
}




















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
