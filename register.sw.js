"use strict";
const stockSW = "/sw.js?v=20260323-1";
let swRegistrationPromise = null;

/**
 * List of hostnames that are allowed to run serviceworkers on http://
 */
const swAllowedHostnames = ["localhost", "127.0.0.1"];

function canAttemptServiceWorkerRegistration() {
	return Boolean(navigator.serviceWorker) && (
		location.protocol === "https:" ||
		swAllowedHostnames.includes(location.hostname)
	);
}

/**
 * Global util
 * Used in 404.html and index.html
 */
async function registerSW() {
	if (!navigator.serviceWorker) {
		if (
			location.protocol !== "https:" &&
			!swAllowedHostnames.includes(location.hostname)
		)
			throw new Error("Service workers cannot be registered without https.");

		throw new Error("Your browser doesn't support service workers.");
	}

	if (swRegistrationPromise) {
		return swRegistrationPromise;
	}

	try {
		swRegistrationPromise = navigator.serviceWorker.register(stockSW, {
			scope: "/",
			updateViaCache: "none",
		});
		const registration = await swRegistrationPromise;

		Promise.resolve(registration.update()).catch(() => {});
		return registration;
	} catch (error) {
		swRegistrationPromise = null;
		throw error;
	}
}

if (canAttemptServiceWorkerRegistration()) {
	registerSW().catch(() => {});
}
