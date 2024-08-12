import { test, expect } from "@jest/globals";
import { urlNormalizer } from "./crawl.js";
//import { url } from "node:url";

const testUrl1 = "https://www.example.com/users/user1";
const testUrl2 = "https://www.example.com/users/";
const testUrl3 = "https://example.org/abc/xyz?123";


test("testing fist URL", () => {
	expect(urlNormalizer(testUrl1)).toBe('www.example.com/users/user1');});

test("testing second URL", () => {
	expect(urlNormalizer(testUrl2)).toBe('www.example.com/users');});

test("testing Third URL", () => {
	expect(urlNormalizer(testUrl3)).toBe("example.org/abc/xyz");});
