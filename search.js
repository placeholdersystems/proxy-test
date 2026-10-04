"use strict";

function shouldPreferHttpForHostname(hostname) {
	const normalized = String(hostname || "").trim().toLowerCase();
	return (
		normalized === "localhost" ||
		normalized.endsWith(".localhost") ||
		/^\d{1,3}(?:\.\d{1,3}){3}$/.test(normalized)
	);
}

function isDirectNavigableProtocol(protocol) {
	return (
		protocol === "http:" ||
		protocol === "https:" ||
		protocol === "about:" ||
		protocol === "data:" ||
		protocol === "file:"
	);
}

function normalizeKnownUrl(targetUrl) {
	if (!(targetUrl instanceof URL)) {
		return targetUrl;
	}

	const normalized = new URL(targetUrl.toString());
	if (normalized.hostname === "google.com") {
		normalized.protocol = "https:";
		normalized.hostname = "www.google.com";
	}
	if (normalized.hostname === "youtube.com") {
		normalized.protocol = "https:";
		normalized.hostname = "www.youtube.com";
	}
	return normalized;
}
/**
 *
 * @param {string} input
 * @param {string} template Template for a search query.
 * @returns {string} Fully qualified URL
 */
function search(input, template) {
	try {
		// input is a valid URL:
		// eg: https://example.com, https://example.com/test?q=param
		const directUrl = normalizeKnownUrl(new URL(input));
		if (isDirectNavigableProtocol(directUrl.protocol)) {
			return directUrl.toString();
		}
	} catch (err) {
		// input was not a valid URL
	}

	try {
		// input is a valid URL when a protocol is added to the start:
		// eg: example.com, https://example.com/test?q=param
		const secureUrl = new URL(`https://${input}`);
		const preferHttp = shouldPreferHttpForHostname(secureUrl.hostname);
		// only if the hostname has a TLD/subdomain or is a local/dev host
		if (secureUrl.hostname.includes(".") || preferHttp) {
			const scheme = preferHttp ? "http" : "https";
			return normalizeKnownUrl(new URL(`${scheme}://${input}`)).toString();
		}
	} catch (err) {
		// input was not valid URL
	}

	// input may have been a valid URL, however the hostname was invalid

	// Attempts to convert the input to a fully qualified URL have failed
	// Treat the input as a search query
	return template.replace("%s", encodeURIComponent(input));
}
