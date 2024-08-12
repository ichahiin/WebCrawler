import { test, expect } from "@jest/globals";
import { urlNormalizer } from "./crawl.js";
import { getUrlFromHtml } from "./crawl.js";

//import { url } from "node:url";

const testUrl1 = "https://www.example.com/users/user1";
const testUrl2 = "https://www.example.com/users/";
const testUrl3 = "https://example.org/abc/xyz?123";


/*
test("testing fist URL", () => {
	expect(urlNormalizer(testUrl1)).toBe('www.example.com/users/user1');});

test("testing second URL", () => {
	expect(urlNormalizer(testUrl2)).toBe('www.example.com/users');});

test("testing Third URL", () => {
	expect(urlNormalizer(testUrl3)).toBe("example.org/abc/xyz");});
*/
let baseUrl1 = "grelou.com";
let testHtmlBody1 = '<html><body> <a href="/grelou">example url<a/> </body></html>';

let baseUrl2 = "microsoft.net";
let testHtmlBody2 = '<html><body> <a href="/windows">example url<a/> </body></html>';

let baseUrl3 = "yahoo.com";
let testHtmlBody3 = '<html><body> <a href="/mail">example url<a/> <a href="/search"></a> </body></html>';

test ("first test", () => {
	expect(getUrlFromHtml(testHtmlBody1, baseUrl1)).toBe("grelou.com/grelou");
})
test ("second test", () => {
	expect(getUrlFromHtml(testHtmlBody2, baseUrl2)).toBe("microsoft.net/windows");
})
test ("third test", () => {
	expect(getUrlFromHtml(testHtmlBody3, baseUrl3)).toBe("yahoo.com/mail");
})





