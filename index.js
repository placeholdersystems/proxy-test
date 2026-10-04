"use strict";

/**
 * @type {HTMLFormElement | null}
 */
const form = document.getElementById("sj-form");
/**
 * @type {HTMLInputElement | null}
 */
const address = document.getElementById("sj-address");
/**
 * @type {HTMLInputElement | null}
 */
const searchEngine = document.getElementById("sj-search-engine");
/**
 * @type {HTMLParagraphElement | null}
 */
const error = document.getElementById("sj-error");

const toolbarShell = document.querySelector(".toolbar");
const toolbarLoadBar = document.getElementById("toolbar-load-bar");
const frameStage = document.getElementById("frame-stage");
const statusPanel = document.getElementById("status-panel");
const browserTabs = document.getElementById("browser-tabs");
const homeHero = document.querySelector(".home-hero");
const homeViewButtons = Array.from(
	document.querySelectorAll("[data-home-view-option]")
);
const homeViewPanels = Array.from(
	document.querySelectorAll("[data-home-view-panel]")
);
const homeThemePreview = document.getElementById("home-theme-preview");
const homePopoutButton = document.getElementById("home-popout");
const homeSearchForm = document.getElementById("home-search-form");
const homeSearchInput = document.getElementById("home-search-input");
const holySearchForm = document.getElementById("holy-search-form");
const holySearchInput = document.getElementById("holy-search-input");
const holyLaunchButtons = Array.from(
	document.querySelectorAll("[data-holy-launch-url]")
);
const holyEnginePreview = document.getElementById("holy-engine-preview");
const holyThemePreview = document.getElementById("holy-theme-preview");
const holyWireproxyInline = document.getElementById("holy-wireproxy-inline");
const holyWireproxyCard = document.getElementById("holy-wireproxy-card");
const holyWireproxyState = document.getElementById("holy-wireproxy-state");
const holyWireproxyCopy = document.getElementById("holy-wireproxy-copy");
const holyWireproxyMode = document.getElementById("holy-wireproxy-mode");
const holyWireproxyPool = document.getElementById("holy-wireproxy-pool");
const holyWireproxyRefresh = document.getElementById("holy-wireproxy-refresh");
const onboarding = {
	root: document.getElementById("nitro-onboarding"),
	panels: Array.from(document.querySelectorAll("[data-onboarding-step]")),
	indicators: Array.from(
		document.querySelectorAll("[data-onboarding-indicator]")
	),
	start: document.getElementById("onboarding-start"),
	themeBack: document.getElementById("onboarding-theme-back"),
	themePreview: document.getElementById("onboarding-theme-preview"),
	themeNext: document.getElementById("onboarding-theme-next"),
	settingsBack: document.getElementById("onboarding-settings-back"),
	finish: document.getElementById("onboarding-finish"),
	themeName: document.getElementById("onboarding-theme-name"),
	themeMode: document.getElementById("onboarding-theme-mode"),
	themePreviewCard: document.getElementById("onboarding-theme-preview-card"),
	homePage: document.getElementById("onboarding-home-page"),
	newTabPage: document.getElementById("onboarding-new-tab-page"),
	panicKey: document.getElementById("onboarding-panic-key"),
};
const themeEditorToggle = document.getElementById("theme-editor-toggle");
const customThemeEditor = document.getElementById("custom-theme-editor");
const customThemeModeInput = document.getElementById("custom-theme-mode");
const mobileSitesSetting = document.getElementById("mobile-sites-setting");
const mobileSitesDesktopOption = document.getElementById("site-mode-desktop");
const mobileSitesMobileOption = document.getElementById("site-mode-mobile");
const customThemeInputs = {
	pageBg: document.getElementById("custom-theme-page-bg"),
	surface: document.getElementById("custom-theme-surface"),
	text: document.getElementById("custom-theme-text"),
	muted: document.getElementById("custom-theme-muted"),
	accent: document.getElementById("custom-theme-accent"),
};
const enginePreview = document.getElementById("engine-preview");
const engineRefreshButton = document.getElementById("engine-refresh");
const engineOptionButtons = Array.from(
	document.querySelectorAll("[data-engine-option]")
);
const themePreviewButtons = Array.from(
	document.querySelectorAll("[data-theme-option]")
);

const toolbar = {
	newTab: document.getElementById("toolbar-new-tab"),
	minimize: document.getElementById("toolbar-minimize"),
	home: document.getElementById("toolbar-home"),
	back: document.getElementById("toolbar-back"),
	forward: document.getElementById("toolbar-forward"),
	reload: document.getElementById("toolbar-reload"),
	status: document.getElementById("toolbar-status"),
	statusText: document.getElementById("toolbar-status-text"),
	speed: document.getElementById("toolbar-speed"),
	speedText: document.getElementById("toolbar-speed-text"),
	signalBars: Array.from(document.querySelectorAll("[data-signal-bar]")),
	fullscreen: document.getElementById("toolbar-fullscreen"),
};
const statusRefreshButton = document.getElementById("status-refresh");
const statusRouteMap = document.getElementById("status-route-map");
const statusRouteTotal = document.getElementById("status-route-total");
const SPEED_TEST_ENDPOINT = "/ocean-speed-test";
const TOPBAR_SPEED_TEST_BYTES = 4 * 1024 * 1024;
const ENGINE_SPEED_TEST_BYTES = 2 * 1024 * 1024;
const SPEED_TEST_TIMEOUT_MS = 15000;
const FRAME_RELOAD_TIMEOUT_MS = 5000;
const TOOLBAR_LOAD_TIMEOUT_MS = 12000;
const TOOLBAR_LOAD_FINISH_MS = 420;
const SW_CONTROLLER_TIMEOUT_MS = 3000;
const TRANSIENT_PROXY_RETRY_DELAY_MS = 180;
const TRANSIENT_PROXY_RETRY_COOLDOWN_MS = 15000;
const CONNECTION_PROBE_CACHE_MS = 30000;
const ENGINE_BENCHMARK_WARMUP_COUNT = 0;
const ENGINE_BENCHMARK_SAMPLE_COUNT = 2;
const ENGINE_BENCHMARK_MIN_SUCCESSFUL_SAMPLES = 1;
const ENGINE_BENCHMARK_CACHE_MS = 20000;
const PROXY_STATUS_CACHE_MS = 15000;
const CONTEXT_SPEED_REFRESH_DELAY_MS = 650;
const HOMEPAGE_BENCHMARK_REFRESH_DELAY_MS = 450;
const INITIAL_HOMEPAGE_BENCHMARK_REFRESH_DELAY_MS = 10000;
const RAMMERHEAD_SESSION_CACHE_MS = 10 * 60 * 1000;
const RAMMERHEAD_SESSION_REQUEST_MAX_ATTEMPTS = 6;
const RAMMERHEAD_SESSION_RETRY_DELAY_MS = 350;
const LAUNCH_PREWARM_COOLDOWN_MS = 5000;
const TRANSPORT_CONFIG_CACHE_MS = 60 * 1000;
const DEFAULT_LIBCURL_CONNECTIONS = Object.freeze([96, 72, 12]);
const HOME_VIEW_OPTIONS = Object.freeze(["classic", "holy"]);
const DEFAULT_HOME_VIEW = "classic";
const HOLY_TRANSPORT_STATUS_CACHE_MS = 15000;
const ROUTE_PROFILE_OPTIONS = Object.freeze(["nitro", "holy"]);
const DEFAULT_ROUTE_PROFILE = "nitro";
const HOLY_LTS_ENGINE_SET = new Set(["scramjet", "ultraviolet", "rammerhead"]);
const HOLY_RAMMERHEAD_SESSION_KEY = "session-string";
const HOLY_RAMMERHEAD_SESSION_IDS_KEY = "rammerhead_sessionids";
const HOLY_RAMMERHEAD_DEFAULT_SESSION_KEY = "rammerhead_default_sessionid";
const HOLY_RAMMERHEAD_DICTS_KEY = "nitro-lts:rammerhead-dicts";
const HOLY_RAMMERHEAD_BASE_DICTIONARY =
	"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~-";
const HOLY_RAMMERHEAD_SHUFFLED_INDICATOR = "_rhs";
const HOLY_SCRAMJET_PREFIX = "/scramjet/";

const profile = {
	card: document.querySelector(".profile-card"),
	name: document.getElementById("profile-name"),
	password: document.getElementById("profile-password"),
	homePage: document.getElementById("profile-home-page"),
	newTabPage: document.getElementById("profile-new-tab-page"),
	session: document.getElementById("profile-session"),
	badge: document.getElementById("profile-badge"),
	message: document.getElementById("profile-message"),
	signup: document.getElementById("profile-signup"),
	login: document.getElementById("profile-login"),
	save: document.getElementById("profile-save"),
	logout: document.getElementById("profile-logout"),
};

const statusItems = {
	core: document.querySelector('[data-status-item="core"]'),
	worker: document.querySelector('[data-status-item="worker"]'),
	connection: document.querySelector('[data-status-item="connection"]'),
	proxy: document.querySelector('[data-status-item="proxy"]'),
	launch: document.querySelector('[data-status-item="launch"]'),
};

const STORAGE_KEYS = {
	ui: "ocean-search:ui",
	session: "ocean-search:session",
	lastProfileName: "ocean-search:last-profile-name",
	rammerheadSession: "ocean-search:rammerhead-session",
	swControllerReloaded: "ocean-search:sw-controller-reloaded",
};

const STORAGE_PREFIXES = {
	app: "ocean-search:",
};

const PROFILE_DB = {
	name: "ocean-search-vault",
	store: "profiles",
	version: 1,
};

const PROFILE_SCHEMA_VERSION = 1;
const SESSION_SCHEMA_VERSION = 1;
const DEFAULT_THEME = "harbor";
const CUSTOM_THEME_KEY = "custom";
const DEFAULT_SEARCH_TEMPLATE = "https://duckduckgo.com/?q=%s";
const DEFAULT_PANIC_KEY_COMBO = "Alt+Backquote";
const RAMMERHEAD_LOCAL_BYPASS_PATHS = new Set([
	SPEED_TEST_ENDPOINT,
	"/ocean-status",
]);
const RAMMERHEAD_SESSION_ID_PATTERN = /^[A-Za-z0-9_-]{16,128}$/;
const MOBILE_VIEWPORT_CONTENT =
	"width=device-width, initial-scale=1, viewport-fit=cover";
const MOBILE_USER_AGENT_PATTERN =
	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i;
const SAFARI_WEBKIT_USER_AGENT_EXCLUSION_PATTERN =
	/(Chrome|CriOS|Chromium|Edg|EdgiOS|OPR|OPiOS|FxiOS|Firefox|SamsungBrowser)/i;
const DEFAULT_MOBILE_USER_AGENT =
	"Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36";
const DEFAULT_DESKTOP_PROXY_USER_AGENT =
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36";
const SAFARI_WEBKIT_CONNECTIONS = Object.freeze([28, 18, 4]);
const LIBCURL_TRANSPORT_KEY = "libcurl";
const EPOXY_TRANSPORT_KEY = "epoxy";
const LIBCURL_TRANSPORT_MODULE = "/nitro-libcurl-transport.mjs";
const EPOXY_TRANSPORT_MODULE = "/epoxy/index.mjs";
const DEFAULT_TRANSPORT_ORDER = Object.freeze([
	LIBCURL_TRANSPORT_KEY,
	EPOXY_TRANSPORT_KEY,
]);
const TRANSPORT_MODULES = Object.freeze({
	[LIBCURL_TRANSPORT_KEY]: LIBCURL_TRANSPORT_MODULE,
	[EPOXY_TRANSPORT_KEY]: EPOXY_TRANSPORT_MODULE,
});
const THEME_OPTIONS = Object.freeze([
	{ key: "shore", label: "Shore", mode: "light" },
	{ key: "tide", label: "Tide", mode: "light" },
	{ key: "ember", label: "Ember", mode: "light" },
	{ key: "grove", label: "Grove", mode: "light" },
	{ key: "harbor", label: "Harbor", mode: "light" },
	{ key: "night", label: "Night", mode: "dark" },
	{ key: "midnight", label: "Midnight", mode: "dark" },
	{ key: "obsidian", label: "Obsidian", mode: "dark" },
	{ key: "eclipse", label: "Eclipse", mode: "dark" },
	{ key: "graphite", label: "Graphite", mode: "dark" },
]);
const DEFAULT_CUSTOM_THEME = Object.freeze({
	mode: "light",
	pageBg: "#e8edf3",
	surface: "#feffff",
	text: "#172230",
	muted: "#62717e",
	accent: "#345f84",
});
const CUSTOM_THEME_VARIABLE_KEYS = Object.freeze([
	"--page-bg",
	"--page-ink",
	"--muted-ink",
	"--line",
	"--panel-bg",
	"--panel-solid",
	"--panel-alt",
	"--accent",
	"--accent-strong",
	"--accent-soft",
	"--ready",
	"--issue",
	"--checking",
	"--tab-active-bg",
	"--hero-accent",
	"--hero-surface",
	"--hero-shadow",
	"--panel-shadow",
	"--toolbar-shadow",
	"--toolbar-hover",
	"--tab-muted",
	"--tab-dot-idle",
	"--tab-dot-active",
	"--tab-dot-live",
	"--signal-idle",
	"--placeholder-ink",
	"--content-stage-bg",
	"--hero-card-bg",
	"--hero-card-border",
	"--theme-outline",
]);
const THEME_LABELS = new Map(
	THEME_OPTIONS.map((themeOption) => [themeOption.key, themeOption.label])
);
const THEME_MODES = new Map(
	THEME_OPTIONS.map((themeOption) => [themeOption.key, themeOption.mode])
);
const VAULT_ITERATIONS = 250000;
const PROFILE_AUTOSAVE_DELAY = 900;
const DEFAULT_START_LABEL = "New tab";
const DEFAULT_ENGINE = "scramjet";
const INTERNAL_BOLT_ENGINES = Object.freeze(["ultraviolet", "scramjet"]);
const ENGINE_OPTIONS = Object.freeze([
	["bolt", "Bolt"],
	["scramjet", "Scramjet"],
	["ultraviolet", "Ultraviolet"],
	["rammerhead", "Rammerhead"],
]);
const COMPATIBILITY_ENGINE_RULES = Object.freeze([
	{
		engine: "ultraviolet",
		matches(hostname) {
			return (
				hostname === "spotify.com" ||
				hostname.endsWith(".spotify.com") ||
				hostname === "scdn.co" ||
				hostname.endsWith(".scdn.co")
			);
		},
	},
]);
const ENGINE_LABELS = new Map(ENGINE_OPTIONS);
const RUNTIME_ENGINE_LABELS = new Map(ENGINE_OPTIONS);

let scramjet = null;
let connection = null;
let coreInitPromise = null;
let workerReadyPromise = null;
let connectionReadyPromise = null;
let connectionProbePromise = null;
let vaultDbPromise = null;
let toolbarResizeObserver = null;
let tabs = [];
let activeTabId = null;
let speedCheckInFlight = false;
let lastMeasuredSpeedMbps = null;
let reloadCheckInFlight = false;
let toolbarLoadAnimationFrame = null;
let toolbarLoadHideTimer = null;
let engineBenchmarkPromise = null;
let engineBenchmarkAbortController = null;
let proxyStatusPromise = null;
let launchPrewarmPromise = null;
let launchPrewarmEngine = "";
let launchPrewarmStartedAt = 0;
let transportConfigPromise = null;
let cachedTransportOptions = null;
let cachedTransportOptionsAt = 0;
let currentTransportKey = LIBCURL_TRANSPORT_KEY;
let rammerheadSessionPromise = null;
let rammerheadSessionWarmupPromise = null;
let holyRammerheadSessionWarmupPromise = null;
let rammerheadSessionValidatedId = "";
let rammerheadSessionValidatedAt = 0;
let lastProxyStatusCheckedAt = 0;
let lastConnectionProbeCheckedAt = 0;
let lastConnectionProbeOk = false;
let speedRefreshTimer = null;
let homepageBenchmarkRefreshTimer = null;
let lastMeasuredSpeedContextKey = "";
let pendingSpeedRefresh = false;
let pendingSpeedRefreshForce = false;
let sessionRestoreAttempted = false;
let sessionRestoring = false;
let currentTheme = DEFAULT_THEME;
let themeOverrides = {};
let currentHomeView = DEFAULT_HOME_VIEW;
let currentHomePageInput = "";
let currentNewTabPageInput = "";
let currentPanicKeyCombo = DEFAULT_PANIC_KEY_COMBO;
let currentMobileSitesEnabled = false;
let onboardingCompleted = false;
let onboardingStep = 1;
let toolbarCollapseDirection = "down";
let currentSelectedEngine = DEFAULT_ENGINE;
let engineSelectionTouched = false;
let activeProfileName = "";
let activeProfileDisplayName = "";
let activeProfileSecret = "";
let profileAutosaveTimer = null;
let statusRefreshInFlight = false;
let initialLaunchConsumed = false;
let holyTransportStatusPromise = null;
let cachedHolyTransportStatus = null;
let cachedHolyTransportStatusAt = 0;
let holyScramjetController = null;
let currentStatus = {
	core: "checking",
	worker: "checking",
	connection: "checking",
	proxy: "checking",
	launch: "checking",
};
let currentLatency = {
	core: null,
	worker: null,
	connection: null,
	proxy: null,
	launch: null,
};
let engineBenchmarks = {
	bolt: null,
	scramjet: null,
	ultraviolet: null,
	rammerhead: null,
};

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function readInitialLaunchRequest() {
	try {
		const params = new URLSearchParams(location.search || "");
		const input =
			String(params.get("url") || "").trim() ||
			String(params.get("target") || "").trim();
		return input ? { input } : null;
	} catch {
		return null;
	}
}

const initialLaunchRequest = readInitialLaunchRequest();

function readInitialHomeViewRequest() {
	try {
		const params = new URLSearchParams(location.search || "");
		return sanitizeHomeView(params.get("view") || params.get("home") || "");
	} catch {
		return DEFAULT_HOME_VIEW;
	}
}

const initialHomeViewRequest = readInitialHomeViewRequest();

function hasInitialLaunchRequest() {
	return Boolean(initialLaunchRequest && !initialLaunchConsumed);
}

function clearInitialLaunchRequestFromLocation() {
	if (typeof history?.replaceState !== "function") {
		return;
	}

	try {
		const nextUrl = new URL(location.href);
		let changed = false;
		for (const key of ["url", "target", "dt", "df", "dp", "base"]) {
			if (!nextUrl.searchParams.has(key)) continue;
			nextUrl.searchParams.delete(key);
			changed = true;
		}
		if (!changed) {
			return;
		}
		history.replaceState(history.state, document.title, nextUrl.toString());
	} catch (err) {
		console.warn(err);
	}
}

function shouldEnableGoogleSitesPatch(urlText) {
	try {
		const parsed = new URL(String(urlText || ""));
		const host = (parsed.hostname || "").toLowerCase();
		return host === "sites.google.com" || host.endsWith(".sites.google.com");
	} catch {
		return false;
	}
}

function patchGoogleSitesCustomEmbeds(doc) {
	if (!doc || !doc.querySelectorAll) return 0;

	let patchedCount = 0;
	const containers = doc.querySelectorAll("div[jsname='jkaScf'][data-code]");
	for (const container of containers) {
		const code = container.getAttribute("data-code");
		if (!code) continue;

		const iframe = container.querySelector("iframe[jsname='WMhH6e']");
		if (!iframe || iframe.dataset.sjEmbedPatched === "1") continue;

		const src = iframe.getAttribute("src") || "";
		if (
			!src.includes("/atari/embeds/") ||
			!src.includes("intermediate-frame-minified.html")
		) {
			continue;
		}

		iframe.removeAttribute("src");
		iframe.srcdoc = '<base target="_blank">' + code;
		iframe.style.pointerEvents = "auto";
		iframe.style.overflow = "auto";
		iframe.dataset.sjEmbedPatched = "1";

		const spinner = container.querySelector(".EmVfjc");
		if (spinner) {
			spinner.style.display = "none";
		}
		patchedCount += 1;
	}

	return patchedCount;
}

function patchGoogleSitesUrlEmbeds(doc) {
	if (!doc || !doc.querySelectorAll) return 0;

	function stretchWholePageEmbed(container, iframe) {
		const win = doc.defaultView || window;
		const rect = container.getBoundingClientRect();
		const viewportHeight = win.innerHeight || 800;
		const top = Number.isFinite(rect.top) ? Math.max(0, rect.top) : 0;
		const targetHeight = Math.max(520, viewportHeight - top - 8);

		container.style.position = "relative";
		container.style.display = "block";
		container.style.width = "100%";
		container.style.height = `${targetHeight}px`;
		container.style.minHeight = `${targetHeight}px`;
		container.style.overflow = "hidden";

		iframe.style.position = "absolute";
		iframe.style.inset = "0";
		iframe.style.width = "100%";
		iframe.style.height = "100%";

		const frameRoot = container.closest(".WIdY2d");
		if (frameRoot) {
			frameRoot.style.position = "relative";
			frameRoot.style.height = `${targetHeight}px`;
			frameRoot.style.minHeight = `${targetHeight}px`;

			const ratioSpacer = frameRoot.querySelector("div[jsname='WXxXjd']");
			if (ratioSpacer) {
				ratioSpacer.style.display = "none";
				ratioSpacer.style.paddingTop = "0";
				ratioSpacer.style.height = "0";
			}

			for (const layer of frameRoot.querySelectorAll(".YMEQtf")) {
				layer.style.height = "100%";
				layer.style.minHeight = `${targetHeight}px`;
			}
		}
	}

	let patchedCount = 0;
	const containers = doc.querySelectorAll(
		"div[jsname='jkaScf'][data-url]:not([data-code])"
	);
	for (const container of containers) {
		const rawUrl = container.getAttribute("data-url");
		if (!rawUrl) continue;
		const label = (container.getAttribute("aria-label") || "").toLowerCase();
		const isWholePageEmbed = label.includes("whole page embed");

		let resolvedUrl;
		try {
			resolvedUrl = new URL(rawUrl, doc.baseURI || location.href).href;
		} catch {
			continue;
		}

		let iframe = container.querySelector("iframe[data-sj-url-embed='1']");
		if (!iframe && container.dataset.sjUrlEmbedPatched === "1") {
			container.dataset.sjUrlEmbedPatched = "0";
		}

		if (container.dataset.sjUrlEmbedPatched === "1" && iframe) {
			if (iframe.getAttribute("src") !== resolvedUrl) {
				iframe.setAttribute("src", resolvedUrl);
			}
			if (isWholePageEmbed) {
				stretchWholePageEmbed(container, iframe);
			}
			continue;
		}

		if (!iframe) {
			iframe = doc.createElement("iframe");
			iframe.dataset.sjUrlEmbed = "1";
			iframe.title = container.getAttribute("aria-label") || "Embedded content";
			iframe.setAttribute(
				"allow",
				"clipboard-read; clipboard-write; fullscreen; autoplay"
			);
			iframe.setAttribute("referrerpolicy", "no-referrer");
			iframe.setAttribute("loading", "lazy");
			iframe.style.border = "0";
			iframe.style.display = "block";
			iframe.style.width = "100%";
			iframe.style.height = "100%";
			iframe.style.background = "transparent";

			// Replace Google Sites placeholder internals with a direct iframe fallback.
			container.replaceChildren(iframe);
		}

		if (iframe.getAttribute("src") !== resolvedUrl) {
			iframe.setAttribute("src", resolvedUrl);
		}

		if (isWholePageEmbed) {
			stretchWholePageEmbed(container, iframe);
		} else {
			const rect = container.getBoundingClientRect();
			if (rect.height < 80) {
				container.style.minHeight = "80vh";
				container.style.height = "80vh";
			}
		}

		container.style.width = "100%";
		container.style.display = "block";
		container.style.overflow = "hidden";
		container.dataset.sjUrlEmbedPatched = "1";
		patchedCount += 1;
	}

	return patchedCount;
}

function walkGoogleSitesFrameTree(win, seenWindows) {
	if (!win || seenWindows.has(win)) return;
	seenWindows.add(win);

	let doc;
	try {
		doc = win.document;
	} catch {
		return;
	}
	if (!doc) return;

	patchGoogleSitesCustomEmbeds(doc);
	patchGoogleSitesUrlEmbeds(doc);

	const iframes = doc.querySelectorAll("iframe");
	for (const iframe of iframes) {
		try {
			if (iframe.contentWindow) {
				walkGoogleSitesFrameTree(iframe.contentWindow, seenWindows);
			}
		} catch {
			// Cross-origin frame access can fail; ignore and continue.
		}
	}
}

function installGoogleSitesEmbedFallback(frameHandle) {
	if (!frameHandle?.frame || frameHandle.__googleSitesPatchInstalled) {
		return;
	}

	const tick = () => {
		const seenWindows = new Set();
		try {
			if (frameHandle.frame.contentWindow) {
				walkGoogleSitesFrameTree(frameHandle.frame.contentWindow, seenWindows);
			}
		} catch {
			// Frame may not be fully initialized yet.
		}
	};

	frameHandle.__googleSitesPatchInstalled = true;
	frameHandle.__googleSitesPatchTick = tick;
	frameHandle.frame.addEventListener("load", tick);

	const intervalId = window.setInterval(() => {
		if (!document.body.contains(frameHandle.frame)) {
			window.clearInterval(intervalId);
			return;
		}
		tick();
	}, 900);
	tick();

	frameHandle.__googleSitesPatchCleanup = () => {
		window.clearInterval(intervalId);
		frameHandle.frame?.removeEventListener?.("load", tick);
		frameHandle.__googleSitesPatchInstalled = false;
	};
}

function maybeEnableGoogleSitesPatch(tab, targetUrl) {
	if (!tab?.frame || !shouldEnableGoogleSitesPatch(targetUrl)) {
		return;
	}
	installGoogleSitesEmbedFallback(tab.frame);
}

async function handleInitialLaunchRequest() {
	if (!hasInitialLaunchRequest()) {
		return false;
	}

	const request = initialLaunchRequest;
	initialLaunchConsumed = true;

	try {
		const targetUrl = search(request.input, searchEngine?.value || DEFAULT_SEARCH_TEMPLATE);
		await openTabWithUrl(targetUrl, {
			input: request.input,
			activate: true,
			engine: getPreferredUserLaunchEngine(),
		});
		clearInitialLaunchRequestFromLocation();
		return true;
	} catch (err) {
		initialLaunchConsumed = false;
		throw err;
	}
}

function clampToolbarCollapseLevel(value) {
	const numeric = Number(value);
	if (!Number.isFinite(numeric)) {
		return 0;
	}
	return Math.max(0, Math.min(2, Math.round(numeric)));
}

function sanitizeToolbarCollapseDirection(value) {
	return value === "up" ? "up" : "down";
}

function getToolbarCollapseLevel() {
	return clampToolbarCollapseLevel(document.body.dataset.toolbarState || 0);
}

function readStoredToolbarCollapseLevel(source) {
	if (isPlainObject(source) && "toolbarCollapseLevel" in source) {
		return clampToolbarCollapseLevel(source.toolbarCollapseLevel);
	}
	return Boolean(source?.toolbarMinimized) ? 1 : 0;
}

function readStoredToolbarCollapseDirection(source) {
	if (isPlainObject(source) && "toolbarCollapseDirection" in source) {
		return sanitizeToolbarCollapseDirection(source.toolbarCollapseDirection);
	}
	return readStoredToolbarCollapseLevel(source) >= 2 ? "up" : "down";
}

function safeJsonParse(raw, fallback) {
	if (!raw) return fallback;
	try {
		return JSON.parse(raw);
	} catch {
		return fallback;
	}
}

function isPlainObject(value) {
	return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function createTabId() {
	if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") {
		return `tab-${globalThis.crypto.randomUUID()}`;
	}
	return `tab-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function hasActiveSession() {
	return Boolean(getActiveTab());
}

function getActiveTab() {
	return tabs.find((tab) => tab.id === activeTabId) || null;
}

function getTabById(tabId) {
	return tabs.find((tab) => tab.id === tabId) || null;
}

function getStartTab() {
	return tabs.find((tab) => isStartTab(tab)) || null;
}

function isStatusPanelOpen() {
	return Boolean(statusPanel && !statusPanel.hidden);
}

function focusAddress() {
	if (address && typeof address.focus === "function") {
		address.focus();
		address.select?.();
	}
}

function setAddressValue(value) {
	if (!address) return;
	address.value = String(value || "");
}

function findClosestLink(target) {
	if (!target || typeof target.closest !== "function") {
		return null;
	}
	return target.closest("a[href]");
}

function sleep(ms) {
	return new Promise((resolve) => {
		window.setTimeout(resolve, Math.max(0, Number(ms) || 0));
	});
}

function isMobileDevice() {
	const byWidth =
		typeof window.matchMedia === "function" &&
		window.matchMedia("(max-width: 900px)").matches;
	const byPointer =
		typeof window.matchMedia === "function" &&
		window.matchMedia("(pointer: coarse)").matches;
	const byUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		String(navigator.userAgent || "")
	);
	return Boolean(byWidth || byPointer || byUserAgent);
}

function isMobileUserAgent(userAgent = navigator.userAgent) {
	return MOBILE_USER_AGENT_PATTERN.test(String(userAgent || ""));
}

function isSafariWebKitUserAgent(userAgent = navigator.userAgent) {
	const safeUserAgent = String(userAgent || "").trim();
	return (
		Boolean(safeUserAgent) &&
		/Safari/i.test(safeUserAgent) &&
		/AppleWebKit/i.test(safeUserAgent) &&
		!SAFARI_WEBKIT_USER_AGENT_EXCLUSION_PATTERN.test(safeUserAgent)
	);
}

function buildPreferredMobileUserAgent(userAgent = navigator.userAgent) {
	const safeUserAgent = String(userAgent || "").trim();
	if (isMobileUserAgent(safeUserAgent)) {
		return safeUserAgent;
	}
	const chromeVersion =
		safeUserAgent.match(/Chrome\/([\d.]+)/i)?.[1] ||
		DEFAULT_MOBILE_USER_AGENT.match(/Chrome\/([\d.]+)/i)?.[1] ||
		"123.0.0.0";
	return DEFAULT_MOBILE_USER_AGENT.replace(
		/Chrome\/[\d.]+/i,
		`Chrome/${chromeVersion}`
	);
}

function buildPreferredDesktopUserAgent(userAgent = navigator.userAgent) {
	const safeUserAgent = String(userAgent || "").trim();
	const chromeVersion =
		safeUserAgent.match(/Chrome\/([\d.]+)/i)?.[1] ||
		DEFAULT_DESKTOP_PROXY_USER_AGENT.match(/Chrome\/[\d.]+/i)?.[0]?.replace(
			"Chrome/",
			""
		) ||
		"123.0.0.0";
	if (
		!safeUserAgent ||
		isMobileUserAgent(safeUserAgent) ||
		isSafariWebKitUserAgent(safeUserAgent)
	) {
		return DEFAULT_DESKTOP_PROXY_USER_AGENT.replace(
			/Chrome\/[\d.]+/i,
			`Chrome/${chromeVersion}`
		);
	}
	return safeUserAgent;
}

function buildPreferredProxyTransportUserAgent(userAgent = navigator.userAgent) {
	const safeUserAgent = String(userAgent || "").trim();
	if (!safeUserAgent) {
		return shouldRequestMobileSites()
			? DEFAULT_MOBILE_USER_AGENT
			: DEFAULT_DESKTOP_PROXY_USER_AGENT;
	}
	if (shouldRequestMobileSites()) {
		return buildPreferredMobileUserAgent(safeUserAgent);
	}
	return buildPreferredDesktopUserAgent(safeUserAgent);
}

function buildMobileUserAgentData(source = navigator.userAgentData) {
	const base =
		source && typeof source === "object" && !Array.isArray(source) ? source : null;
	const brands = Array.isArray(base?.brands)
		? base.brands
				.filter(
					(entry) =>
						entry &&
						typeof entry === "object" &&
						typeof entry.brand === "string" &&
						typeof entry.version === "string"
				)
				.map((entry) => ({
					brand: entry.brand,
					version: entry.version,
				}))
		: [];
	const platform = String(base?.platform || "Android");
	const mobileData = {
		brands,
		mobile: true,
		platform,
		toJSON() {
			return {
				brands,
				mobile: true,
				platform,
			};
		},
		getHighEntropyValues(hints = []) {
			const requestedHints = Array.isArray(hints) ? hints : [];
			const resolved = {};
			for (const hint of requestedHints) {
				if (hint === "mobile") {
					resolved.mobile = true;
					continue;
				}
				if (hint === "platform") {
					resolved.platform = platform;
					continue;
				}
				if (base && Object.prototype.hasOwnProperty.call(base, hint)) {
					resolved[hint] = base[hint];
				}
			}
			return Promise.resolve(resolved);
		},
	};
	return mobileData;
}

function buildDesktopUserAgentData(source = navigator.userAgentData) {
	const base =
		source && typeof source === "object" && !Array.isArray(source) ? source : null;
	const brands = Array.isArray(base?.brands)
		? base.brands
				.filter(
					(entry) =>
						entry &&
						typeof entry === "object" &&
						typeof entry.brand === "string" &&
						typeof entry.version === "string"
				)
				.map((entry) => ({
					brand: entry.brand,
					version: entry.version,
				}))
		: [];
	const platform = String(base?.platform || "Windows");
	const desktopData = {
		brands,
		mobile: false,
		platform,
		toJSON() {
			return {
				brands,
				mobile: false,
				platform,
			};
		},
		getHighEntropyValues(hints = []) {
			const requestedHints = Array.isArray(hints) ? hints : [];
			const resolved = {};
			for (const hint of requestedHints) {
				if (hint === "mobile") {
					resolved.mobile = false;
					continue;
				}
				if (hint === "platform") {
					resolved.platform = platform;
					continue;
				}
				if (hint === "brands") {
					resolved.brands = brands;
				}
			}
			return Promise.resolve(resolved);
		},
	};
	return desktopData;
}

function shouldRequestMobileSites() {
	return currentMobileSitesEnabled;
}

function shouldApplyMobileSitesToTab(tab = null) {
	return shouldRequestMobileSites() || Boolean(tab?.forceMobileSites);
}

function updateMobileSitesSettingVisibility() {
	const enabled = shouldRequestMobileSites();

	document.body?.setAttribute(
		"data-mobile-sites-enabled",
		enabled ? "true" : "false"
	);
	document.body?.setAttribute("data-mobile-sites-available", "true");

	if (mobileSitesSetting) {
		mobileSitesSetting.hidden = false;
		mobileSitesSetting.removeAttribute("hidden");
	}

	if (mobileSitesDesktopOption) {
		mobileSitesDesktopOption.checked = !enabled;
	}
	if (mobileSitesMobileOption) {
		mobileSitesMobileOption.checked = enabled;
	}
}

async function syncServiceWorkerMobileSitesPreference() {
	if (!("serviceWorker" in navigator)) {
		return;
	}

	const payload = {
		type: "nitro-mobile-sites",
		enabled: shouldRequestMobileSites(),
		userAgent: shouldRequestMobileSites()
			? buildPreferredMobileUserAgent()
			: buildPreferredDesktopUserAgent(),
	};

	const recipients = new Set();
	const activeController = navigator.serviceWorker.controller || null;
	if (activeController) {
		recipients.add(activeController);
	}

	let registration = null;
	try {
		registration = await navigator.serviceWorker.getRegistration();
	} catch (error) {
		console.warn(error);
	}

	for (const worker of [
		registration?.active || null,
		registration?.waiting || null,
		registration?.installing || null,
	]) {
		if (worker) {
			recipients.add(worker);
		}
	}

	for (const recipient of recipients) {
		try {
			recipient.postMessage(payload);
		} catch (error) {
			console.warn(error);
		}
	}
}

function setPatchedNavigatorProperty(target, key, getter) {
	try {
		Object.defineProperty(target, key, {
			configurable: true,
			get: getter,
		});
		return true;
	} catch {
		return false;
	}
}

function clearPatchedNavigatorProperty(target, key) {
	try {
		if (Object.prototype.hasOwnProperty.call(target, key)) {
			delete target[key];
		}
	} catch {
		// Ignore read-only navigator surfaces.
	}
}

function ensureMobileViewportMeta(doc, enabled) {
	if (!doc) {
		return;
	}

	let viewportMeta = null;
	try {
		viewportMeta = doc.querySelector('meta[name="viewport"][data-nitro-mobile-sites="true"]');
	} catch {
		viewportMeta = null;
	}

	if (!enabled) {
		viewportMeta?.remove?.();
		return;
	}

	if (!viewportMeta) {
		try {
			viewportMeta = doc.createElement("meta");
			viewportMeta.setAttribute("name", "viewport");
			viewportMeta.setAttribute("data-nitro-mobile-sites", "true");
			(doc.head || doc.documentElement || doc.body)?.appendChild(viewportMeta);
		} catch {
			return;
		}
	}

	viewportMeta.setAttribute("content", MOBILE_VIEWPORT_CONTENT);
}

function applyMobileSiteOverridesToWindow(
	frameWindow,
	{ force = false, tab = null } = {}
) {
	if (!frameWindow) {
		return;
	}

	const enabled = shouldApplyMobileSitesToTab(tab);
	const mode = enabled ? "mobile" : "desktop";
	let patchState = null;
	try {
		patchState =
			frameWindow.__nitroMobileSitesPatch &&
			typeof frameWindow.__nitroMobileSitesPatch === "object"
				? frameWindow.__nitroMobileSitesPatch
				: null;
		if (!patchState) {
			patchState = { mode: null };
			Object.defineProperty(frameWindow, "__nitroMobileSitesPatch", {
				value: patchState,
				configurable: true,
			});
		}
	} catch {
		patchState = { mode: null };
	}

	if (!force && patchState.mode === mode) {
		return;
	}

	let nav = null;
	let doc = null;
	try {
		nav = frameWindow.navigator || null;
		doc = frameWindow.document || null;
	} catch {
		return;
	}

	ensureMobileViewportMeta(doc, enabled);

	if (!nav) {
		patchState.mode = mode;
		return;
	}

	if (enabled) {
		const mobileUserAgent = buildPreferredMobileUserAgent(
			String(nav.userAgent || navigator.userAgent || "")
		);
		const mobilePlatform = /iPhone|iPad|iPod/i.test(mobileUserAgent)
			? "iPhone"
			: "Linux armv8l";
		const mobileTouchPoints = Math.max(
			5,
			Number(nav.maxTouchPoints) || 0,
			Number(navigator.maxTouchPoints) || 0
		);
		const mobileUserAgentData = buildMobileUserAgentData(
			nav.userAgentData || navigator.userAgentData || null
		);

		setPatchedNavigatorProperty(nav, "userAgent", () => mobileUserAgent);
		setPatchedNavigatorProperty(nav, "appVersion", () => mobileUserAgent);
		setPatchedNavigatorProperty(nav, "platform", () => mobilePlatform);
		setPatchedNavigatorProperty(nav, "maxTouchPoints", () => mobileTouchPoints);
		setPatchedNavigatorProperty(nav, "userAgentData", () => mobileUserAgentData);
		patchState.mode = "mobile";
		return;
	}

	const desktopUserAgent = buildPreferredDesktopUserAgent(
		String(nav.userAgent || navigator.userAgent || "")
	);
	const desktopPlatform = /Macintosh|Mac OS X/i.test(desktopUserAgent)
		? "MacIntel"
		: "Win32";
	const desktopUserAgentData = buildDesktopUserAgentData(
		nav.userAgentData || navigator.userAgentData || null
	);

	setPatchedNavigatorProperty(nav, "userAgent", () => desktopUserAgent);
	setPatchedNavigatorProperty(nav, "appVersion", () => desktopUserAgent);
	setPatchedNavigatorProperty(nav, "platform", () => desktopPlatform);
	setPatchedNavigatorProperty(nav, "maxTouchPoints", () => 0);
	setPatchedNavigatorProperty(nav, "userAgentData", () => desktopUserAgentData);
	patchState.mode = "desktop";
}

function syncOpenFrameMobileSitesPreference({ force = false } = {}) {
	for (const tab of tabs) {
		try {
			const frameWindow = tab?.frame?.frame?.contentWindow || null;
			if (frameWindow) {
				applyMobileSiteOverridesToWindow(frameWindow, { force, tab });
			}
		} catch {
			// Ignore frames that are not ready yet.
		}
	}
}

function applyMobileSitesPreference(
	enabled,
	{ persist = true, autosave = true, syncFrames = true } = {}
) {
	currentMobileSitesEnabled = Boolean(enabled);
	updateMobileSitesSettingVisibility();

	if (persist) {
		persistUiState();
	}
	if (autosave) {
		scheduleActiveProfileAutosave();
	}
	if (syncFrames) {
		syncServiceWorkerMobileSitesPreference().catch((error) =>
			console.warn(error)
		);
		syncOpenFrameMobileSitesPreference({ force: true });
	}
}

function applyDeviceMode() {
	const mode = isMobileDevice() ? "mobile" : "desktop";
	document.body?.setAttribute("data-device", mode);
	document.documentElement?.setAttribute("data-device", mode);
	updateMobileSitesSettingVisibility();
	syncServiceWorkerMobileSitesPreference().catch((error) =>
		console.warn(error)
	);
	syncOpenFrameMobileSitesPreference({ force: true });
}

function formatTabLabel(label) {
	const text = String(label || "").trim() || "Current page";
	if (text.length <= 24) {
		return text;
	}
	return `${text.slice(0, 21)}...`;
}

function formatTabLabelFromUrl(url, fallback) {
	try {
		const parsed = new URL(String(url));
		const host = parsed.hostname.replace(/^www\./i, "");
		const path = parsed.pathname && parsed.pathname !== "/" ? parsed.pathname : "";
		return formatTabLabel(path ? `${host}${path}` : host || fallback || url);
	} catch {
		return formatTabLabel(fallback || url || "Current page");
	}
}

function normalizeProfileName(raw) {
	return String(raw || "")
		.trim()
		.toLowerCase()
		.replace(/\s+/g, " ");
}

function cleanProfileDisplayName(raw) {
	return String(raw || "")
		.trim()
		.replace(/\s+/g, " ")
		.slice(0, 36);
}

function getRequestedProfileDisplayName() {
	return cleanProfileDisplayName(profile.name?.value);
}

function getRequestedProfilePassword() {
	return String(profile.password?.value || "");
}

function sanitizePagePreference(raw) {
	return String(raw || "").trim().slice(0, 512);
}

function getRequestedHomePageInput() {
	return sanitizePagePreference(profile.homePage?.value);
}

function getRequestedNewTabPageInput() {
	return sanitizePagePreference(profile.newTabPage?.value);
}

function sanitizePanicKeyCombo(raw, fallback = DEFAULT_PANIC_KEY_COMBO) {
	const source = String(raw || "")
		.trim()
		.replace(/\s+/g, "");
	if (!source) {
		return fallback;
	}

	const rawParts = source.split("+").filter(Boolean);
	const modifiers = [];
	let keyPart = "";

	for (const part of rawParts) {
		const lower = part.toLowerCase();
		if (lower === "ctrl" || lower === "control") {
			if (!modifiers.includes("Ctrl")) modifiers.push("Ctrl");
			continue;
		}
		if (lower === "alt" || lower === "option") {
			if (!modifiers.includes("Alt")) modifiers.push("Alt");
			continue;
		}
		if (lower === "shift") {
			if (!modifiers.includes("Shift")) modifiers.push("Shift");
			continue;
		}
		if (lower === "meta" || lower === "cmd" || lower === "command") {
			if (!modifiers.includes("Meta")) modifiers.push("Meta");
			continue;
		}
		if (!keyPart) {
			keyPart = part;
		}
	}

	const normalizedKey = String(keyPart || "")
		.trim()
		.replace(/\s+/g, "");
	if (!normalizedKey) {
		return fallback;
	}

	return [...modifiers, normalizedKey].join("+");
}

function formatPanicKeyCombo(combo) {
	const safeCombo = sanitizePanicKeyCombo(combo, "");
	if (!safeCombo) return "";

	return safeCombo
		.split("+")
		.map((token) => {
			if (token === "Ctrl" || token === "Alt" || token === "Shift") {
				return token;
			}
			if (token === "Meta") {
				return "Meta";
			}
			if (/^Key[A-Z]$/i.test(token)) {
				return token.slice(3).toUpperCase();
			}
			if (/^Digit[0-9]$/.test(token)) {
				return token.slice(5);
			}
			if (token === "Backquote") return "`";
			if (token === "Minus") return "-";
			if (token === "Equal") return "=";
			if (token === "Backslash") return "\\";
			if (token === "Slash") return "/";
			if (token === "Period") return ".";
			if (token === "Comma") return ",";
			if (token === "Semicolon") return ";";
			if (token === "Quote") return "'";
			if (token === "BracketLeft") return "[";
			if (token === "BracketRight") return "]";
			return token;
		})
		.join(" + ");
}

function buildPanicKeyComboFromEvent(event) {
	const code = String(event?.code || "").trim();
	if (!code) return "";
	if (["ShiftLeft", "ShiftRight", "ControlLeft", "ControlRight", "AltLeft", "AltRight", "MetaLeft", "MetaRight"].includes(code)) {
		return "";
	}

	const parts = [];
	if (event.ctrlKey) parts.push("Ctrl");
	if (event.altKey) parts.push("Alt");
	if (event.shiftKey) parts.push("Shift");
	if (event.metaKey) parts.push("Meta");
	parts.push(code);
	return sanitizePanicKeyCombo(parts.join("+"), "");
}

function sanitizeThemeMode(value) {
	return String(value || "").trim().toLowerCase() === "dark" ? "dark" : "light";
}

function sanitizeHexColor(value, fallback) {
	const raw = String(value || "").trim();
	if (/^#[0-9a-f]{6}$/i.test(raw)) {
		return raw.toLowerCase();
	}
	if (/^#[0-9a-f]{3}$/i.test(raw)) {
		return `#${raw[1]}${raw[1]}${raw[2]}${raw[2]}${raw[3]}${raw[3]}`.toLowerCase();
	}
	return fallback;
}

function sanitizeCustomTheme(raw) {
	const source = isPlainObject(raw) ? raw : {};
	return {
		mode: sanitizeThemeMode(source.mode || DEFAULT_CUSTOM_THEME.mode),
		pageBg: sanitizeHexColor(source.pageBg, DEFAULT_CUSTOM_THEME.pageBg),
		surface: sanitizeHexColor(source.surface, DEFAULT_CUSTOM_THEME.surface),
		text: sanitizeHexColor(source.text, DEFAULT_CUSTOM_THEME.text),
		muted: sanitizeHexColor(source.muted, DEFAULT_CUSTOM_THEME.muted),
		accent: sanitizeHexColor(source.accent, DEFAULT_CUSTOM_THEME.accent),
	};
}

function sanitizeThemeKey(theme, fallback = DEFAULT_THEME) {
	const nextTheme = String(theme || "").trim().toLowerCase();
	return THEME_LABELS.has(nextTheme) ? nextTheme : fallback;
}

function sanitizeThemeOverrides(raw) {
	const source = isPlainObject(raw) ? raw : {};
	const nextOverrides = {};
	for (const themeOption of THEME_OPTIONS) {
		if (!Object.prototype.hasOwnProperty.call(source, themeOption.key)) {
			continue;
		}
		nextOverrides[themeOption.key] = sanitizeCustomTheme(source[themeOption.key]);
	}
	return nextOverrides;
}

function getThemeOverride(theme) {
	const themeKey = sanitizeThemeKey(theme);
	return Object.prototype.hasOwnProperty.call(themeOverrides, themeKey)
		? themeOverrides[themeKey]
		: null;
}

function getEditableThemeSnapshot(theme = currentTheme) {
	return getThemeOverride(theme) || readThemeSnapshotFromComputedStyles();
}

function setThemeOverride(theme, override) {
	const themeKey = sanitizeThemeKey(theme);
	themeOverrides = {
		...themeOverrides,
		[themeKey]: sanitizeCustomTheme(override),
	};
}

function restoreThemeState(theme, overrides, legacyCustomTheme) {
	const requestedTheme = String(theme || "").trim().toLowerCase();
	const nextTheme =
		requestedTheme === CUSTOM_THEME_KEY
			? DEFAULT_THEME
			: sanitizeThemeKey(requestedTheme);
	const nextOverrides = sanitizeThemeOverrides(overrides);

	if (requestedTheme === CUSTOM_THEME_KEY && legacyCustomTheme) {
		nextOverrides[nextTheme] = sanitizeCustomTheme(legacyCustomTheme);
	}

	return {
		theme: nextTheme,
		themeOverrides: nextOverrides,
	};
}

function hexToRgb(hex) {
	const normalized = sanitizeHexColor(hex, DEFAULT_CUSTOM_THEME.accent);
	return {
		r: Number.parseInt(normalized.slice(1, 3), 16),
		g: Number.parseInt(normalized.slice(3, 5), 16),
		b: Number.parseInt(normalized.slice(5, 7), 16),
	};
}

function componentToHex(value) {
	return Math.max(0, Math.min(255, Math.round(value)))
		.toString(16)
		.padStart(2, "0");
}

function rgbToHex({ r = 0, g = 0, b = 0 } = {}) {
	return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

function mixHexColors(start, end, ratio = 0.5) {
	const from = hexToRgb(start);
	const to = hexToRgb(end);
	const weight = Math.max(0, Math.min(1, Number(ratio) || 0));
	return rgbToHex({
		r: from.r + (to.r - from.r) * weight,
		g: from.g + (to.g - from.g) * weight,
		b: from.b + (to.b - from.b) * weight,
	});
}

function rgbaColor(hex, alpha) {
	const { r, g, b } = hexToRgb(hex);
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function colorStringToHex(value, fallback) {
	const raw = String(value || "").trim();
	if (!raw) return fallback;
	if (/^#[0-9a-f]{3,6}$/i.test(raw)) {
		return sanitizeHexColor(raw, fallback);
	}

	const match = raw.match(/rgba?\(\s*(\d{1,3})[,\s]+(\d{1,3})[,\s]+(\d{1,3})/i);
	if (!match) {
		return fallback;
	}

	return rgbToHex({
		r: Number.parseInt(match[1], 10),
		g: Number.parseInt(match[2], 10),
		b: Number.parseInt(match[3], 10),
	});
}

function buildCustomThemeVariables(theme) {
	const safeTheme = sanitizeCustomTheme(theme);
	const darkMode = safeTheme.mode === "dark";
	const accentStrong = mixHexColors(
		safeTheme.accent,
		"#000000",
		darkMode ? 0.22 : 0.34
	);
	const accentGlow = mixHexColors(
		safeTheme.accent,
		darkMode ? "#ffffff" : "#d9e4ef",
		0.35
	);

	return {
		"--page-bg": safeTheme.pageBg,
		"--page-ink": safeTheme.text,
		"--muted-ink": safeTheme.muted,
		"--line": rgbaColor(safeTheme.text, darkMode ? 0.11 : 0.12),
		"--panel-bg": rgbaColor(safeTheme.surface, darkMode ? 0.84 : 0.8),
		"--panel-solid": rgbaColor(safeTheme.surface, darkMode ? 0.95 : 0.94),
		"--panel-alt": rgbaColor(safeTheme.text, darkMode ? 0.045 : 0.05),
		"--accent": safeTheme.accent,
		"--accent-strong": accentStrong,
		"--accent-soft": rgbaColor(safeTheme.accent, darkMode ? 0.16 : 0.15),
		"--ready": darkMode ? "#58c57a" : "#2e7d32",
		"--issue": darkMode ? "#ff846b" : "#c23b22",
		"--checking": darkMode ? "#efbb5d" : "#c48a19",
		"--tab-active-bg": rgbaColor(safeTheme.text, 0.1),
		"--hero-accent": `linear-gradient(145deg, ${rgbaColor(
			safeTheme.accent,
			0.2
		)}, ${rgbaColor(accentGlow, 0.05)})`,
		"--hero-surface": darkMode
			? `linear-gradient(160deg, ${rgbaColor(
					safeTheme.surface,
					0.96
				)}, ${rgbaColor(mixHexColors(safeTheme.surface, "#000000", 0.18), 0.84)})`
			: `linear-gradient(145deg, ${rgbaColor(
					safeTheme.surface,
					0.82
				)}, rgba(255, 255, 255, 0.42))`,
		"--hero-shadow": darkMode
			? "0 34px 96px rgba(3, 4, 7, 0.5)"
			: "0 28px 80px rgba(17, 24, 20, 0.09)",
		"--panel-shadow": darkMode
			? "0 22px 48px rgba(3, 4, 7, 0.36)"
			: "0 18px 40px rgba(17, 24, 20, 0.08)",
		"--toolbar-shadow": darkMode
			? "0 18px 38px rgba(3, 4, 7, 0.32)"
			: "0 14px 30px rgba(17, 24, 20, 0.08)",
		"--toolbar-hover": rgbaColor(safeTheme.text, darkMode ? 0.062 : 0.08),
		"--tab-muted": rgbaColor(safeTheme.text, 0.72),
		"--tab-dot-idle": rgbaColor(safeTheme.text, darkMode ? 0.2 : 0.22),
		"--tab-dot-active": rgbaColor(safeTheme.text, darkMode ? 0.92 : 0.84),
		"--tab-dot-live": rgbaColor(safeTheme.accent, darkMode ? 0.6 : 0.5),
		"--signal-idle": rgbaColor(safeTheme.text, darkMode ? 0.18 : 0.16),
		"--placeholder-ink": rgbaColor(safeTheme.text, 0.48),
		"--content-stage-bg": safeTheme.surface,
		"--hero-card-bg": darkMode
			? "rgba(255, 255, 255, 0.038)"
			: "rgba(255, 255, 255, 0.7)",
		"--hero-card-border": rgbaColor(safeTheme.accent, darkMode ? 0.12 : 0.09),
		"--theme-outline": rgbaColor(safeTheme.text, 0.08),
	};
}

function clearCustomThemeVariables() {
	if (!document.body) return;
	for (const key of CUSTOM_THEME_VARIABLE_KEYS) {
		document.body.style.removeProperty(key);
	}
}

function applyCustomThemeVariables(theme) {
	if (!document.body) return;
	const variables = buildCustomThemeVariables(theme);
	for (const key of CUSTOM_THEME_VARIABLE_KEYS) {
		document.body.style.setProperty(key, variables[key]);
	}
}

function readThemeSnapshotFromComputedStyles() {
	if (!document.body) {
		return { ...DEFAULT_CUSTOM_THEME };
	}

	const styles = getComputedStyle(document.body);
	return sanitizeCustomTheme({
		mode: document.body.dataset.themeMode || DEFAULT_CUSTOM_THEME.mode,
		pageBg: colorStringToHex(
			styles.getPropertyValue("--page-bg"),
			DEFAULT_CUSTOM_THEME.pageBg
		),
		surface: colorStringToHex(
			styles.getPropertyValue("--panel-solid"),
			DEFAULT_CUSTOM_THEME.surface
		),
		text: colorStringToHex(
			styles.getPropertyValue("--page-ink"),
			DEFAULT_CUSTOM_THEME.text
		),
		muted: colorStringToHex(
			styles.getPropertyValue("--muted-ink"),
			DEFAULT_CUSTOM_THEME.muted
		),
		accent: colorStringToHex(
			styles.getPropertyValue("--accent"),
			DEFAULT_CUSTOM_THEME.accent
		),
	});
}

function populateCustomThemeEditor(theme = getEditableThemeSnapshot()) {
	const safeTheme = sanitizeCustomTheme(theme);
	if (customThemeModeInput) {
		customThemeModeInput.value = safeTheme.mode;
	}
	for (const [key, input] of Object.entries(customThemeInputs)) {
		if (input) {
			input.value = safeTheme[key];
		}
	}
}

function readCustomThemeEditorValue() {
	const fallbackTheme = getEditableThemeSnapshot();
	return sanitizeCustomTheme({
		mode: customThemeModeInput?.value || fallbackTheme.mode,
		pageBg: customThemeInputs.pageBg?.value || fallbackTheme.pageBg,
		surface: customThemeInputs.surface?.value || fallbackTheme.surface,
		text: customThemeInputs.text?.value || fallbackTheme.text,
		muted: customThemeInputs.muted?.value || fallbackTheme.muted,
		accent: customThemeInputs.accent?.value || fallbackTheme.accent,
	});
}

function setCustomThemeEditorOpen(open) {
	const expanded = Boolean(open);
	if (customThemeEditor) {
		if (expanded) {
			customThemeEditor.removeAttribute("hidden");
		} else {
			customThemeEditor.setAttribute("hidden", "");
		}
		customThemeEditor.hidden = !expanded;
		customThemeEditor.setAttribute("aria-hidden", expanded ? "false" : "true");
	}
	if (homeHero) {
		homeHero.setAttribute("data-theme-editor-open", expanded ? "true" : "false");
	}
	if (themeEditorToggle) {
		themeEditorToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
		themeEditorToggle.dataset.active = expanded ? "true" : "false";
	}
}

function getThemeLabel(theme) {
	return THEME_LABELS.get(sanitizeThemeKey(theme)) || THEME_LABELS.get(DEFAULT_THEME);
}

function getThemeMode(theme) {
	const override = getThemeOverride(theme);
	if (override) {
		return sanitizeThemeMode(override.mode);
	}
	return THEME_MODES.get(sanitizeThemeKey(theme)) || THEME_MODES.get(DEFAULT_THEME) || "light";
}

function sanitizeHomeView(view) {
	const nextView = String(view || "").trim().toLowerCase();
	return HOME_VIEW_OPTIONS.includes(nextView) ? nextView : DEFAULT_HOME_VIEW;
}

function getBootHomeView(preferredView) {
	if (initialHomeViewRequest && initialHomeViewRequest !== DEFAULT_HOME_VIEW) {
		return initialHomeViewRequest;
	}
	return sanitizeHomeView(preferredView || DEFAULT_HOME_VIEW);
}

function sanitizeRouteProfile(profile) {
	const nextProfile = String(profile || "").trim().toLowerCase();
	return ROUTE_PROFILE_OPTIONS.includes(nextProfile)
		? nextProfile
		: DEFAULT_ROUTE_PROFILE;
}

function sanitizeEngine(engine) {
	const nextEngine = String(engine || "").trim().toLowerCase();
	return ENGINE_LABELS.has(nextEngine) ? nextEngine : DEFAULT_ENGINE;
}

function sanitizeRuntimeEngine(engine) {
	const nextEngine = String(engine || "").trim().toLowerCase();
	if (
		nextEngine === "scramjet" ||
		nextEngine === "ultraviolet" ||
		nextEngine === "rammerhead"
	) {
		return nextEngine;
	}
	return "ultraviolet";
}

function getEngineLabel(engine) {
	const nextEngine = String(engine || "").trim().toLowerCase();
	return RUNTIME_ENGINE_LABELS.get(nextEngine) || ENGINE_LABELS.get(DEFAULT_ENGINE);
}

function shouldUseHolyLtsRouting(routeProfile, engine) {
	return (
		sanitizeRouteProfile(routeProfile) === "holy" &&
		HOLY_LTS_ENGINE_SET.has(sanitizeEngine(engine))
	);
}

function getHomepageRouteProfile(engine = currentSelectedEngine) {
	return shouldUseHolyLtsRouting(
		currentHomeView === "holy" ? "holy" : DEFAULT_ROUTE_PROFILE,
		engine
	)
		? "holy"
		: DEFAULT_ROUTE_PROFILE;
}

function readStoredRammerheadSession() {
	const sessionId = String(
		localStorage.getItem(STORAGE_KEYS.rammerheadSession) || ""
	).trim();
	return isValidRammerheadSessionId(sessionId) ? sessionId : "";
}

function clearRammerheadSessionValidation() {
	rammerheadSessionValidatedId = "";
	rammerheadSessionValidatedAt = 0;
}

function markRammerheadSessionValidated(sessionId) {
	const nextValue = String(sessionId || "").trim();
	if (!nextValue) {
		clearRammerheadSessionValidation();
		return;
	}
	rammerheadSessionValidatedId = nextValue;
	rammerheadSessionValidatedAt = Date.now();
}

function hasFreshRammerheadSessionValidation(
	sessionId,
	maxAgeMs = RAMMERHEAD_SESSION_CACHE_MS
) {
	const nextValue = String(sessionId || "").trim();
	return (
		Boolean(nextValue) &&
		rammerheadSessionValidatedId === nextValue &&
		rammerheadSessionValidatedAt > 0 &&
		Date.now() - rammerheadSessionValidatedAt < maxAgeMs
	);
}

function rememberRammerheadSession(sessionId) {
	const nextValue = String(sessionId || "").trim();
	if (nextValue) {
		localStorage.setItem(STORAGE_KEYS.rammerheadSession, nextValue);
		return;
	}
	clearRammerheadSessionValidation();
	localStorage.removeItem(STORAGE_KEYS.rammerheadSession);
}

function readHolyRammerheadDictionaryStore() {
	try {
		const rawValue = localStorage.getItem(HOLY_RAMMERHEAD_DICTS_KEY);
		const parsed = rawValue ? JSON.parse(rawValue) : {};
		return parsed && typeof parsed === "object" && !Array.isArray(parsed)
			? parsed
			: {};
	} catch {
		return {};
	}
}

function writeHolyRammerheadDictionaryStore(store) {
	try {
		localStorage.setItem(HOLY_RAMMERHEAD_DICTS_KEY, JSON.stringify(store || {}));
	} catch {
		// ignored
	}
}

function readHolyRammerheadDictionary(sessionId) {
	const safeSessionId = String(sessionId || "").trim();
	if (!safeSessionId) {
		return "";
	}
	const store = readHolyRammerheadDictionaryStore();
	return typeof store[safeSessionId] === "string" ? store[safeSessionId] : "";
}

function rememberHolyRammerheadDictionary(sessionId, dictionary) {
	const safeSessionId = String(sessionId || "").trim();
	const safeDictionary = String(dictionary || "").trim();
	if (!safeSessionId || !safeDictionary) {
		return;
	}
	const store = readHolyRammerheadDictionaryStore();
	store[safeSessionId] = safeDictionary;
	writeHolyRammerheadDictionaryStore(store);
}

function createHolyRammerheadShuffler(dictionary) {
	const safeDictionary = String(dictionary || "").trim();
	const mod = (value, divisor) => ((value % divisor) + divisor) % divisor;
	return {
		shuffle(input) {
			const source = String(input || "");
			if (!safeDictionary || !source) return source;
			if (!source.indexOf(HOLY_RAMMERHEAD_SHUFFLED_INDICATOR)) {
				return source;
			}
			let output = "";
			for (let index = 0; index < source.length; index += 1) {
				const char = source[index];
				const dictionaryIndex = HOLY_RAMMERHEAD_BASE_DICTIONARY.indexOf(char);
				if (char === "%" && source.length - index >= 3) {
					output += char + source[++index] + source[++index];
				} else if (dictionaryIndex === -1) {
					output += char;
				} else {
					output += safeDictionary[
						mod(
							dictionaryIndex + index,
							HOLY_RAMMERHEAD_BASE_DICTIONARY.length
						)
					];
				}
			}
			return HOLY_RAMMERHEAD_SHUFFLED_INDICATOR + output;
		},
		unshuffle(input) {
			let source = String(input || "");
			if (!safeDictionary || !source) return source;
			if (source.indexOf(HOLY_RAMMERHEAD_SHUFFLED_INDICATOR)) {
				return source;
			}
			source = source.slice(HOLY_RAMMERHEAD_SHUFFLED_INDICATOR.length);
			let output = "";
			for (let index = 0; index < source.length; index += 1) {
				const char = source[index];
				const dictionaryIndex = safeDictionary.indexOf(char);
				if (char === "%" && source.length - index >= 3) {
					output += char + source[++index] + source[++index];
				} else if (dictionaryIndex === -1) {
					output += char;
				} else {
					output += HOLY_RAMMERHEAD_BASE_DICTIONARY[
						mod(
							dictionaryIndex - index,
							HOLY_RAMMERHEAD_BASE_DICTIONARY.length
						)
					];
				}
			}
			return output;
		},
	};
}

function rememberHolyRammerheadSessionId(sessionId) {
	const safeSessionId = String(sessionId || "").trim();
	if (!safeSessionId) {
		localStorage.removeItem(HOLY_RAMMERHEAD_SESSION_KEY);
		return;
	}

	localStorage.setItem(HOLY_RAMMERHEAD_SESSION_KEY, safeSessionId);
	localStorage.setItem(HOLY_RAMMERHEAD_DEFAULT_SESSION_KEY, safeSessionId);

	let existingSessions = [];
	try {
		const parsed = JSON.parse(
			localStorage.getItem(HOLY_RAMMERHEAD_SESSION_IDS_KEY) || "[]"
		);
		if (Array.isArray(parsed)) {
			existingSessions = parsed.filter(
				(entry) =>
					entry &&
					typeof entry === "object" &&
					typeof entry.id === "string" &&
					entry.id !== safeSessionId
			);
		}
	} catch {
		existingSessions = [];
	}

	existingSessions.unshift({
		id: safeSessionId,
		createdOn: new Date().toLocaleString(),
	});

	try {
		localStorage.setItem(
			HOLY_RAMMERHEAD_SESSION_IDS_KEY,
			JSON.stringify(existingSessions)
		);
	} catch {
		// ignored
	}
}

function getHolyUvConfig() {
	const config =
		self && self.__uv$config && typeof self.__uv$config === "object"
			? self.__uv$config
			: null;
	return config || null;
}

function getHolyScramjetController() {
	if (
		holyScramjetController &&
		typeof holyScramjetController.encodeUrl === "function" &&
		typeof holyScramjetController.decodeUrl === "function"
	) {
		return holyScramjetController;
	}
	if (typeof $scramjetLoadController !== "function") {
		return null;
	}
	try {
		const { ScramjetController } = $scramjetLoadController();
		holyScramjetController = new ScramjetController({
			prefix: HOLY_SCRAMJET_PREFIX,
			files: {
				wasm: "/scram/scramjet.wasm.wasm",
				all: "/scram/scramjet.all.js",
				sync: "/scram/scramjet.sync.js",
			},
		});
	} catch {
		holyScramjetController = null;
	}
	return holyScramjetController;
}

function getHolyScramjetEncodeUrl() {
	const controller = getHolyScramjetController();
	return controller && typeof controller.encodeUrl === "function"
		? controller.encodeUrl.bind(controller)
		: null;
}

function uvXorEncode(input) {
	const source = String(input || "");
	if (!source) return source;

	let result = "";
	for (let index = 0; index < source.length; index += 1) {
		if (index % 2 === 1) {
			result += String.fromCharCode(source.charCodeAt(index) ^ 2);
		} else {
			result += source.charAt(index);
		}
	}

	return encodeURIComponent(result);
}

function uvXorDecode(input) {
	const source = String(input || "");
	if (!source) return source;

	let [pathname, ...query] = source.split("?");
	pathname = decodeURIComponent(pathname);

	let result = "";
	for (let index = 0; index < pathname.length; index += 1) {
		if (index % 2 === 1) {
			result += String.fromCharCode(pathname.charCodeAt(index) ^ 2);
		} else {
			result += pathname.charAt(index);
		}
	}

	return result + (query.length ? `?${query.join("?")}` : "");
}

function encodeUltravioletUrl(url) {
	return `/maths/${uvXorEncode(url)}`;
}

function encodeHolyUltravioletUrl(url) {
	const safeTargetUrl = String(url || "").trim();
	const config = getHolyUvConfig();
	if (
		config &&
		typeof config.prefix === "string" &&
		typeof config.encodeUrl === "function"
	) {
		return `${location.origin}${config.prefix}${config.encodeUrl(safeTargetUrl)}`;
	}
	return `${location.origin}${encodeUltravioletUrl(safeTargetUrl)}`;
}

function encodeHolyScramjetUrl(url) {
	const safeTargetUrl = String(url || "").trim();
	const encodeUrl = getHolyScramjetEncodeUrl();
	if (typeof encodeUrl === "function") {
		return `${location.origin}${encodeUrl(safeTargetUrl)}`;
	}
	return `${location.origin}${scramjet?.encodeUrl?.(safeTargetUrl) || safeTargetUrl}`;
}

async function fetchHolyRammerheadSessionId() {
	let sessionId = String(localStorage.getItem(HOLY_RAMMERHEAD_SESSION_KEY) || "").trim();
	if (!isValidRammerheadSessionId(sessionId)) {
		sessionId = "";
	}
	if (sessionId) {
		try {
			const existing = await fetchTextResponse(
				`/sessionexists?id=${encodeURIComponent(sessionId)}`
			);
			if (existing.trim() === "exists") {
				return sessionId;
			}
		} catch (error) {
			console.warn(error);
		}
	}

	sessionId = await fetchValidRammerheadSessionId("Holy Rammerhead");
	rememberHolyRammerheadSessionId(sessionId);
	return sessionId;
}

async function fetchHolyRammerheadDictionary(sessionId) {
	const safeSessionId = String(sessionId || "").trim();
	if (!safeSessionId) {
		throw new Error("Holy Rammerhead session is missing.");
	}
	const cachedDictionary = readHolyRammerheadDictionary(safeSessionId);
	if (cachedDictionary) {
		return cachedDictionary;
	}
	const payload = await fetchTextResponse(
		`/api/shuffleDict?id=${encodeURIComponent(safeSessionId)}`
	);
	const dictionary = String(JSON.parse(payload) || "").trim();
	if (!dictionary) {
		throw new Error("Holy Rammerhead did not return an encoding dictionary.");
	}
	rememberHolyRammerheadDictionary(safeSessionId, dictionary);
	return dictionary;
}

async function encodeHolyRammerheadUrl(url) {
	const safeTargetUrl = String(url || "").trim();
	if (shouldBypassRammerheadProxy(safeTargetUrl)) {
		return new URL(safeTargetUrl, location.origin).toString();
	}
	const sessionId = await fetchHolyRammerheadSessionId();
	const dictionary = await fetchHolyRammerheadDictionary(sessionId);
	const shuffler = createHolyRammerheadShuffler(dictionary);
	return `${location.origin}/${sessionId}/${shuffler.shuffle(safeTargetUrl)}`;
}

function decodeScramjetUrl(proxiedUrl) {
	const raw = String(proxiedUrl || "");

	try {
		const parsed = new URL(raw, location.origin);
		const pathname = parsed.pathname || "";
		if (!pathname.startsWith(HOLY_SCRAMJET_PREFIX)) {
			return raw;
		}
		const holyController = getHolyScramjetController();
		if (holyController && typeof holyController.decodeUrl === "function") {
			return holyController.decodeUrl(parsed.toString()) || raw;
		}
		if (scramjet && typeof scramjet.decodeUrl === "function") {
			return scramjet.decodeUrl(parsed.toString()) || raw;
		}
		const match = pathname.match(/^\/scramjet\/(.+)$/);
		if (!match) return raw;
		return decodeURIComponent(match[1]) || raw;
	} catch {
		return raw;
	}
}

function decodeUltravioletUrl(proxiedUrl) {
	const raw = String(proxiedUrl || "");

	try {
		const parsed = new URL(raw, location.origin);
		const match = parsed.pathname.match(/^\/maths\/(.+)$/);
		if (!match) return raw;
		return uvXorDecode(match[1]) || raw;
	} catch {
		return raw;
	}
}

function decodeRammerheadUrl(proxiedUrl) {
	const raw = String(proxiedUrl || "");

	try {
		const parsed = new URL(raw, location.origin);
		const sessionMatch = parsed.pathname.match(/^\/([a-z0-9]{32})(?:![^/]+)*\/(.+)$/i);
		if (!sessionMatch) return raw;

		const [, sessionId, encodedValue] = sessionMatch;
		if (encodedValue.startsWith(HOLY_RAMMERHEAD_SHUFFLED_INDICATOR)) {
			const dictionary = readHolyRammerheadDictionary(sessionId);
			if (!dictionary) {
				return raw;
			}
			const shuffler = createHolyRammerheadShuffler(dictionary);
			return (
				shuffler.unshuffle(`${encodedValue}${parsed.search}${parsed.hash}`) || raw
			);
		}

		return decodeURIComponent(`${encodedValue}${parsed.search}${parsed.hash}`) || raw;
	} catch {
		return raw;
	}
}

function decodeVisibleUrl(engine, proxiedUrl) {
	switch (String(engine || "")) {
		case "scramjet":
			return decodeScramjetUrl(proxiedUrl);
		case "ultraviolet":
			return decodeUltravioletUrl(proxiedUrl);
		case "rammerhead":
			return decodeRammerheadUrl(proxiedUrl);
		default:
			return String(proxiedUrl || "");
	}
}

function normalizeBenchmarkResult(result) {
	if (!result || typeof result !== "object") return null;

	return {
		ok: Boolean(result.ok),
		label: String(result.label || (result.ok ? "Ready" : "Unavailable")),
		latency:
			Number.isFinite(result.latency) && result.latency >= 0
				? Math.max(1, Math.round(result.latency))
				: null,
		throughputMbps:
			Number.isFinite(result.throughputMbps) && result.throughputMbps > 0
				? result.throughputMbps
				: null,
		detail: result.detail ? String(result.detail) : "",
		runtimeEngine: result.runtimeEngine ? String(result.runtimeEngine) : "",
		checkedAt:
			Number.isFinite(result.checkedAt) && result.checkedAt > 0
				? result.checkedAt
				: Date.now(),
	};
}

function getBenchmarkResult(engine) {
	return normalizeBenchmarkResult(
		engineBenchmarks[sanitizeRuntimeEngine(engine)]
	);
}

function hasFreshBenchmarkResult(
	result,
	maxAgeMs = ENGINE_BENCHMARK_CACHE_MS
) {
	const checkedAt = Number(result?.checkedAt);
	return (
		Boolean(result) &&
		checkedAt > 0 &&
		Date.now() - checkedAt < Math.max(1000, Number(maxAgeMs) || 0)
	);
}

function hasFreshEngineBenchmarks(
	engines = ["scramjet", "ultraviolet", "rammerhead"],
	maxAgeMs = ENGINE_BENCHMARK_CACHE_MS
) {
	return engines.every((engine) =>
		hasFreshBenchmarkResult(getBenchmarkResult(engine), maxAgeMs)
	);
}

function createSpeedTestToken(scope) {
	return `${String(scope || "speed").trim().toLowerCase()}-${Date.now().toString(
		36
	)}-${Math.random().toString(16).slice(2)}`;
}

function buildSpeedTestUrl({
	bytes = TOPBAR_SPEED_TEST_BYTES,
	scope = "topbar",
	sampleIndex = 0,
	attemptIndex = sampleIndex,
	isWarmup = false,
} = {}) {
	const speedUrl = new URL(SPEED_TEST_ENDPOINT, location.origin);
	if (Number.isFinite(bytes) && bytes > 0) {
		speedUrl.searchParams.set("bytes", String(Math.round(bytes)));
	}
	speedUrl.searchParams.set("scope", String(scope || "topbar"));
	speedUrl.searchParams.set("sample", String(Math.max(0, sampleIndex)));
	speedUrl.searchParams.set("attempt", String(Math.max(0, attemptIndex)));
	if (isWarmup) {
		speedUrl.searchParams.set("warmup", "1");
	}
	speedUrl.searchParams.set("t", createSpeedTestToken(scope));
	return speedUrl.toString();
}

function getEngineBenchmarkTargetUrl({
	bytes = ENGINE_SPEED_TEST_BYTES,
	sampleIndex = 0,
	attemptIndex = sampleIndex,
	isWarmup = false,
} = {}) {
	const benchmarkUrl = new URL(
		buildSpeedTestUrl({
			bytes,
			scope: "engine-bench",
			sampleIndex,
			attemptIndex,
			isWarmup,
		})
	);
	benchmarkUrl.searchParams.set("engine-bench", createSpeedTestToken("engine"));
	return benchmarkUrl.toString();
}

function isSpeedTestProbeResponse(response) {
	const byteLength = Number(response.headers.get("x-ocean-speed-bytes"));
	const contentType = String(response.headers.get("content-type") || "");
	return Number.isFinite(byteLength) && byteLength > 0 && contentType.includes("application/octet-stream");
}

function deriveBoltBenchmark() {
	const candidates = INTERNAL_BOLT_ENGINES.map((engine) => ({
		engine,
		result: getBenchmarkResult(engine),
	})).filter((entry) => entry.result && entry.result.ok);

	if (!candidates.length) {
		const fallback = INTERNAL_BOLT_ENGINES.map((engine) => ({
			engine,
			result: getBenchmarkResult(engine),
		})).find((entry) => entry.result);
		if (!fallback) {
			return {
				ok: false,
				label: "Checking",
				latency: null,
				detail: "Adaptive route",
				runtimeEngine: "ultraviolet",
			};
		}

		return {
			...fallback.result,
			ok: false,
			label: fallback.result.label || "Unavailable",
			detail: fallback.result.detail || "Adaptive route",
			runtimeEngine: fallback.engine,
		};
	}

	const fastest = candidates.reduce((best, entry) => {
		if (!best) return entry;
		if (!Number.isFinite(best.result.latency)) return entry;
		if (!Number.isFinite(entry.result.latency)) return best;
		return entry.result.latency < best.result.latency ? entry : best;
	}, null);

	return {
		...fastest.result,
		ok: true,
		label: "Ready",
		detail: "Adaptive route",
		runtimeEngine: fastest.engine,
	};
}

function getDisplayBenchmark(engine) {
	if (String(engine || "").trim().toLowerCase() === "bolt") {
		return deriveBoltBenchmark();
	}
	return getBenchmarkResult(engine);
}

function getUrlHostname(url) {
	try {
		return new URL(String(url || ""), location.origin).hostname.toLowerCase();
	} catch {
		return "";
	}
}

function isYouTubeHostname(hostname) {
	const safeHostname = String(hostname || "").toLowerCase();
	return (
		safeHostname === "youtube.com" ||
		safeHostname.endsWith(".youtube.com") ||
		safeHostname === "youtu.be" ||
		safeHostname.endsWith(".youtu.be") ||
		safeHostname === "ytimg.com" ||
		safeHostname.endsWith(".ytimg.com") ||
		safeHostname === "googlevideo.com" ||
		safeHostname.endsWith(".googlevideo.com")
	);
}

function getForcedCompatibilityRuntimeEngine(
	engine,
	hostname,
	{ routeProfile = DEFAULT_ROUTE_PROFILE } = {}
) {
	const safeHostname = String(hostname || "").toLowerCase();
	if (!safeHostname) {
		return "";
	}

	const safariCompatibilityEngine = getSafariWebKitCompatibilityEngine(
		engine,
		safeHostname
	);
	if (!safariCompatibilityEngine) {
		return "";
	}

	if (
		shouldUseHolyLtsRouting(routeProfile, engine) &&
		!HOLY_LTS_ENGINE_SET.has(sanitizeEngine(safariCompatibilityEngine))
	) {
		return "";
	}

	return safariCompatibilityEngine;
}

function shouldForceMobileSitesForHostname(hostname) {
	return isYouTubeHostname(hostname) && isSafariWebKitMobileUserAgent();
}

function isSafariWebKitMobileUserAgent(userAgent = navigator.userAgent) {
	return (
		isSafariWebKitUserAgent(userAgent) &&
		/Mobile|iPad|iPhone|iPod/i.test(String(userAgent || ""))
	);
}

function getSafariWebKitCompatibilityEngine(engine, hostname) {
	const runtimeEngine = sanitizeRuntimeEngine(engine);
	if (!isSafariWebKitMobileUserAgent() || !hostname) {
		return "";
	}

	const safeHostname = String(hostname || "").toLowerCase();
	const isYouTubeHost = isYouTubeHostname(safeHostname);
	const isSpotifyHost =
		safeHostname === "spotify.com" ||
		safeHostname.endsWith(".spotify.com") ||
		safeHostname === "scdn.co" ||
		safeHostname.endsWith(".scdn.co");
	const isCloudflareSpeedHost =
		safeHostname === "speed.cloudflare.com" ||
		safeHostname.endsWith(".speed.cloudflare.com");
	const isCambridgeHost =
		safeHostname === "dictionary.cambridge.org" ||
		safeHostname.endsWith(".cambridge.org");

	if (
		isYouTubeHost ||
		isSpotifyHost ||
		isCloudflareSpeedHost ||
		isCambridgeHost
	) {
		return "rammerhead";
	}

	return runtimeEngine === "rammerhead" ? "rammerhead" : "";
}

function normalizeRuntimeLaunchUrl(
	runtimeEngine,
	urlText,
	{ forceMobileSites = false } = {}
) {
	const targetUrl = String(urlText || "").trim();
	if (!targetUrl) {
		return "";
	}

	try {
		const parsed = new URL(targetUrl, location.origin);
		const safeHostname = (parsed.hostname || "").toLowerCase();
		const shouldUseMobileYouTube =
			runtimeEngine === "rammerhead" &&
			(forceMobileSites || isSafariWebKitMobileUserAgent()) &&
			(safeHostname === "youtube.com" ||
				safeHostname === "www.youtube.com" ||
				safeHostname === "m.youtube.com");
		if (shouldUseMobileYouTube) {
			parsed.protocol = "https:";
			parsed.hostname = "m.youtube.com";
			return parsed.toString();
		}
		return parsed.toString();
	} catch {
		return targetUrl;
	}
}

function getCompatibilityRuntimeEngine(engine, url) {
	const requestedEngine = sanitizeEngine(engine);
	const runtimeEngine = sanitizeRuntimeEngine(requestedEngine);
	const hostname = getUrlHostname(url);
	if (!hostname) {
		return "";
	}

	const forcedCompatibilityEngine = getForcedCompatibilityRuntimeEngine(
		requestedEngine,
		hostname
	);
	if (forcedCompatibilityEngine) {
		return forcedCompatibilityEngine;
	}

	for (const rule of COMPATIBILITY_ENGINE_RULES) {
		if (!rule || typeof rule.matches !== "function") {
			continue;
		}
		if (!rule.matches(hostname)) {
			continue;
		}
		const compatibleEngine = sanitizeRuntimeEngine(rule.engine);
		if (requestedEngine === "scramjet" && compatibleEngine !== "scramjet") {
			continue;
		}
		if (
			compatibleEngine &&
			(requestedEngine === "bolt" || compatibleEngine !== runtimeEngine)
		) {
			return compatibleEngine;
		}
	}

	return "";
}

function isHomepageVisible() {
	const activeTab = getActiveTab();
	return !activeTab || isStartTab(activeTab);
}

function getActiveSpeedContext() {
	const activeTab = getActiveTab();
	if (activeTab && !isStartTab(activeTab) && activeTab.url) {
		const runtimeEngine = sanitizeRuntimeEngine(activeTab.engine);
		const domain = getUrlHostname(activeTab.url) || runtimeEngine;
		return {
			scope: "tab",
			engine: runtimeEngine,
			domain,
			key: `tab:${runtimeEngine}:${domain}`,
		};
	}

	const selectedEngine = sanitizeEngine(currentSelectedEngine);
	return {
		scope: "home",
		engine: selectedEngine,
		domain: "ocean-search",
		key: `home:${selectedEngine}`,
	};
}

function storeBenchmarkResult(engine, result) {
	const normalized = normalizeBenchmarkResult(result);
	const runtimeEngine = sanitizeRuntimeEngine(normalized?.runtimeEngine || engine);
	engineBenchmarks = {
		...engineBenchmarks,
		[runtimeEngine]: normalized,
	};
	engineBenchmarks.bolt = deriveBoltBenchmark();
	updateEnginePreviewState();
	return normalized;
}

function formatBenchmarkMbps(throughputMbps) {
	if (!Number.isFinite(throughputMbps) || throughputMbps <= 0) {
		return "";
	}
	if (throughputMbps >= 100) {
		return `${throughputMbps.toFixed(0)} Mbps`;
	}
	if (throughputMbps >= 10) {
		return `${throughputMbps.toFixed(1)} Mbps`;
	}
	return `${throughputMbps.toFixed(2).replace(/0$/, "")} Mbps`;
}

function formatEngineSpeed(result) {
	if (!result) return "Checking...";
	if (!result.ok && !Number.isFinite(result.latency)) {
		return result.label || "Unavailable";
	}
	const latencyText = Number.isFinite(result.latency) ? `${result.latency} ms` : "";
	const throughputText = formatBenchmarkMbps(result.throughputMbps);
	if (latencyText && throughputText) {
		return `${latencyText} / ${throughputText}`;
	}
	if (latencyText) {
		return latencyText;
	}
	if (throughputText) {
		return throughputText;
	}
	return result.ok ? "Ready" : result.label || "Unavailable";
}

function updateEnginePreviewState() {
	for (const button of engineOptionButtons) {
		const engine = sanitizeEngine(button.dataset.engineOption);
		const isActive = engine === currentSelectedEngine;
		const result = getDisplayBenchmark(engine);
		const state = !result
			? "checking"
			: result.ok
				? "ready"
				: result.label === "Checking"
					? "checking"
					: "issue";
		const detailText =
			engine === "bolt"
				? result?.detail || "Adaptive route"
				: result?.detail || button.querySelector("[data-engine-detail]")?.textContent || "";

		button.dataset.active = isActive ? "true" : "false";
		button.setAttribute("aria-pressed", isActive ? "true" : "false");
		button.querySelector(`[data-engine-state="${engine}"]`)?.setAttribute(
			"data-state",
			state
		);
		const stateText = button.querySelector(`[data-engine-state-text="${engine}"]`);
		if (stateText) {
			stateText.textContent = result?.label || "Checking";
		}
		const speedText = button.querySelector(`[data-engine-speed="${engine}"]`);
		if (speedText) {
			speedText.textContent = formatEngineSpeed(result);
		}
		const detail = button.querySelector(`[data-engine-detail="${engine}"]`);
		if (detail && detailText) {
			detail.textContent = detailText;
		}
	}
}

function applySelectedEngine(
	engine,
	{ persist = true, autosave = true, touched = engineSelectionTouched } = {}
) {
	const nextEngine = sanitizeEngine(engine);
	currentSelectedEngine =
		currentHomeView === "holy" && !HOLY_LTS_ENGINE_SET.has(nextEngine)
			? DEFAULT_ENGINE
			: nextEngine;
	engineSelectionTouched = Boolean(touched);
	if (enginePreview) {
		enginePreview.textContent = getEngineLabel(currentSelectedEngine);
	}
	if (holyEnginePreview) {
		holyEnginePreview.textContent = getEngineLabel(currentSelectedEngine);
	}
	updateEnginePreviewState();
	if (persist) {
		persistUiState();
	}
	if (autosave) {
		scheduleActiveProfileAutosave();
	}
	if (isHomepageVisible()) {
		const selectedResult = getDisplayBenchmark(currentSelectedEngine);
		if (
			selectedResult &&
			selectedResult.ok &&
			Number.isFinite(selectedResult.throughputMbps) &&
			selectedResult.throughputMbps > 0
		) {
			lastMeasuredSpeedContextKey = getActiveSpeedContext().key;
			lastMeasuredSpeedMbps = selectedResult.throughputMbps;
			updateSpeedBadge();
		}
	}
}

function updateThemePreviewState() {
	for (const button of themePreviewButtons) {
		const themeOption = button.dataset.themeOption || DEFAULT_THEME;
		const isActive = button.dataset.themeOption === currentTheme;
		const label = getThemeLabel(themeOption);
		const mode = getThemeMode(themeOption);
		button.dataset.active = isActive ? "true" : "false";
		button.dataset.themeMode = mode;
		button.setAttribute("aria-pressed", isActive ? "true" : "false");
		button.setAttribute("aria-label", label);
		button.setAttribute("title", `${label} ${mode} theme`);
	}
	if (themeEditorToggle) {
		themeEditorToggle.dataset.active = customThemeEditor?.hidden ? "false" : "true";
	}
}

function resolvePagePreferenceUrl(value) {
	const cleanValue = sanitizePagePreference(value);
	if (!cleanValue) {
		return "";
	}
	return search(cleanValue, searchEngine?.value || "https://duckduckgo.com/?q=%s");
}

function applyPanicKeyCombo(
	combo,
	{ persist = true, autosave = true } = {}
) {
	currentPanicKeyCombo = sanitizePanicKeyCombo(combo);
	if (onboarding.panicKey) {
		onboarding.panicKey.value = formatPanicKeyCombo(currentPanicKeyCombo);
	}
	if (persist) {
		persistUiState();
	}
	if (autosave) {
		scheduleActiveProfileAutosave();
	}
}

function hasLegacyUiUsage(uiState) {
	const state = isPlainObject(uiState) ? uiState : {};
	return Boolean(
		state.theme ||
			state.homePageInput ||
			state.newTabPageInput ||
			state.engineSelectionTouched ||
			localStorage.getItem(STORAGE_KEYS.session) ||
			localStorage.getItem(STORAGE_KEYS.lastProfileName)
	);
}

function resolveOnboardingCompleted(uiState) {
	const state = isPlainObject(uiState) ? uiState : {};
	if (Object.prototype.hasOwnProperty.call(state, "onboardingCompleted")) {
		return Boolean(state.onboardingCompleted);
	}
	return hasLegacyUiUsage(state);
}

function updateOnboardingThemePreview() {
	if (onboarding.themeName) {
		onboarding.themeName.textContent = getThemeLabel(currentTheme);
	}
	if (onboarding.themeMode) {
		const themeMode = getThemeMode(currentTheme);
		onboarding.themeMode.textContent = `${themeMode === "dark" ? "Dark" : "Light"} theme`;
	}
}

function pulseOnboardingThemePreview() {
	if (!onboarding.themePreviewCard) return;
	onboarding.themePreviewCard.dataset.previewing = "true";
	window.setTimeout(() => {
		if (onboarding.themePreviewCard) {
			delete onboarding.themePreviewCard.dataset.previewing;
		}
	}, 340);
}

function syncOnboardingPreferenceInputs() {
	if (onboarding.homePage && onboarding.homePage !== document.activeElement) {
		onboarding.homePage.value = currentHomePageInput;
	}
	if (onboarding.newTabPage && onboarding.newTabPage !== document.activeElement) {
		onboarding.newTabPage.value = currentNewTabPageInput;
	}
	if (onboarding.panicKey && onboarding.panicKey !== document.activeElement) {
		onboarding.panicKey.value = formatPanicKeyCombo(currentPanicKeyCombo);
	}
}

function setOnboardingStep(step) {
	const nextStep = Math.max(1, Math.min(3, Number(step) || 1));
	onboardingStep = nextStep;
	for (const panel of onboarding.panels) {
		const panelStep = Number(panel.dataset.onboardingStep || 0);
		panel.hidden = panelStep !== nextStep;
	}
	for (const indicator of onboarding.indicators) {
		const indicatorStep = Number(indicator.dataset.onboardingIndicator || 0);
		indicator.dataset.active = indicatorStep === nextStep ? "true" : "false";
	}
	syncOnboardingPreferenceInputs();
}

function setOnboardingActive(active) {
	onboardingCompleted = !active;
	if (document.body) {
		document.body.dataset.onboardingActive = active ? "true" : "false";
	}
	if (onboarding.root) {
		if (active) {
			onboarding.root.removeAttribute("hidden");
		} else {
			onboarding.root.setAttribute("hidden", "");
		}
		onboarding.root.hidden = !active;
	}
	if (active) {
		closeStatusPanel();
		setOnboardingStep(onboardingStep || 1);
	}
}

async function completeOnboarding() {
	const nextHomePage = sanitizePagePreference(onboarding.homePage?.value);
	const nextNewTabPage = sanitizePagePreference(onboarding.newTabPage?.value);
	applyTheme(currentTheme);
	applyPagePreferences({
		homePageInput: nextHomePage,
		newTabPageInput: nextNewTabPage,
	});
	applyPanicKeyCombo(currentPanicKeyCombo, {
		persist: false,
		autosave: true,
	});
	onboardingCompleted = true;
	persistUiState();
	setOnboardingActive(false);
	updateNavigationState();
	if (!getActiveTab()) {
		showHome({ clearAddress: true });
	}
	if (isHomepageVisible()) {
		scheduleHomepageBenchmarkRefresh();
	}
	window.requestAnimationFrame(() => {
		homeSearchInput?.focus?.({ preventScroll: true });
	});
}

function matchesPanicKeyCombo(event) {
	const expectedCombo = sanitizePanicKeyCombo(currentPanicKeyCombo, "");
	if (!expectedCombo) return false;
	return buildPanicKeyComboFromEvent(event) === expectedCombo;
}

function runPanicAction() {
	const safeTarget = resolvePagePreferenceUrl(currentHomePageInput) || "https://www.google.com/";
	closeStatusPanel();
	try {
		window.location.replace(safeTarget);
	} catch (err) {
		console.warn(err);
		location.href = safeTarget;
	}
}

function setHolyTransportStatus(status) {
	const safeStatus = status || {
		state: "checking",
		inlineLabel: "Checking",
		title: "Checking",
		copy: "Transport config loading.",
		mode: "Direct",
		pool: "--",
	};

	if (holyWireproxyInline) {
		holyWireproxyInline.textContent = safeStatus.inlineLabel;
		holyWireproxyInline.dataset.state = safeStatus.state;
	}
	if (holyWireproxyCard) {
		holyWireproxyCard.dataset.wireproxyState = safeStatus.state;
	}
	if (holyWireproxyState) {
		holyWireproxyState.textContent = safeStatus.title;
	}
	if (holyWireproxyCopy) {
		holyWireproxyCopy.textContent = safeStatus.copy;
	}
	if (holyWireproxyMode) {
		holyWireproxyMode.textContent = safeStatus.mode;
	}
	if (holyWireproxyPool) {
		holyWireproxyPool.textContent = safeStatus.pool;
	}
}

function normalizeHolyTransportStatus(payload) {
	const safePayload =
		payload && typeof payload === "object" && !Array.isArray(payload) ? payload : {};
	const transportOrder = normalizeTransportOrder(
		safePayload?.transports?.order,
		safePayload?.transports?.default || safePayload?.defaultMode || LIBCURL_TRANSPORT_KEY
	);
	const connections = Array.isArray(safePayload.connections)
		? getPreferredTransportConnections(safePayload.connections)
		: getPreferredTransportConnections();
	const proxy = typeof safePayload.proxy === "string" ? safePayload.proxy.trim() : "";
	const wireproxyActive = Boolean(safePayload.wireproxyActive);
	const wireproxyEnabled = wireproxyActive || Boolean(safePayload.wireproxyEnabled) || Boolean(proxy);
	const state = wireproxyActive
		? "active"
		: wireproxyEnabled
			? "configured"
			: "direct";

	return {
		proxy,
		connections,
		wireproxyEnabled,
		wireproxyActive,
		state,
		inlineLabel: wireproxyActive
			? "Active"
			: wireproxyEnabled
				? "Configured"
				: "Direct",
		title: wireproxyActive
			? "Wireproxy active"
			: wireproxyEnabled
				? "Configured, waiting"
				: "Direct transport",
		copy: wireproxyActive
			? "Traffic can use the configured wireproxy HTTP relay."
			: wireproxyEnabled
				? "Config exists, but Nitro is not seeing an active wireproxy process yet."
				: "No wireproxy config is active, so Nitro is using direct transport.",
		mode: transportOrder.map((mode) => getTransportLabel(mode)).join(" -> "),
		pool: connections.join(" / "),
		checkedAt: Date.now(),
	};
}

function hasFreshHolyTransportStatus(maxAgeMs = HOLY_TRANSPORT_STATUS_CACHE_MS) {
	return (
		cachedHolyTransportStatus &&
		cachedHolyTransportStatusAt > 0 &&
		Date.now() - cachedHolyTransportStatusAt < Math.max(1000, Number(maxAgeMs) || 0)
	);
}

async function fetchHolyTransportStatus({ force = false } = {}) {
	if (!force && hasFreshHolyTransportStatus()) {
		return { ...cachedHolyTransportStatus };
	}

	if (holyTransportStatusPromise && !force) {
		return { ...(await holyTransportStatusPromise) };
	}

	const requestPromise = (async () => {
		try {
			const response = await fetch("/transport-config", {
				cache: "no-store",
				credentials: "same-origin",
			});
			if (!response.ok) {
				throw new Error(`Transport config failed with ${response.status}`);
			}
			const nextStatus = normalizeHolyTransportStatus(await response.json());
			cachedHolyTransportStatus = nextStatus;
			cachedHolyTransportStatusAt = Date.now();
			return nextStatus;
		} catch (error) {
			if (cachedHolyTransportStatus) {
				return { ...cachedHolyTransportStatus };
			}
			console.warn(error);
			return normalizeHolyTransportStatus(null);
		}
	})();

	holyTransportStatusPromise = requestPromise;
	try {
		return { ...(await requestPromise) };
	} finally {
		if (holyTransportStatusPromise === requestPromise) {
			holyTransportStatusPromise = null;
		}
	}
}

async function refreshHolyTransportStatus({ force = false } = {}) {
	if (!homeViewPanels.length) {
		return;
	}
	setHolyTransportStatus();
	const nextStatus = await fetchHolyTransportStatus({ force });
	setHolyTransportStatus(nextStatus);
}

function applyHomeView(
	view,
	{ persist = true, autosave = true } = {}
) {
	currentHomeView = sanitizeHomeView(view);
	document.body?.setAttribute("data-home-view", currentHomeView);

	for (const button of homeViewButtons) {
		const isActive =
			sanitizeHomeView(button.dataset.homeViewOption) === currentHomeView;
		button.setAttribute("aria-selected", isActive ? "true" : "false");
		button.dataset.active = isActive ? "true" : "false";
		button.tabIndex = 0;
	}

	for (const panel of homeViewPanels) {
		const isActive =
			sanitizeHomeView(panel.dataset.homeViewPanel) === currentHomeView;
		panel.hidden = !isActive;
		if (isActive) {
			panel.removeAttribute("hidden");
		} else {
			panel.setAttribute("hidden", "");
		}
	}

	if (currentHomeView === "holy") {
		if (!HOLY_LTS_ENGINE_SET.has(sanitizeEngine(currentSelectedEngine))) {
			applySelectedEngine(DEFAULT_ENGINE, {
				persist,
				autosave,
				touched: true,
			});
		}
		setCustomThemeEditorOpen(false);
	}

	if (persist) {
		persistUiState();
	}
	if (autosave) {
		scheduleActiveProfileAutosave();
	}
}

function updateHomepagePreview() {
	if (homeThemePreview) {
		homeThemePreview.textContent = getThemeLabel(currentTheme);
		homeThemePreview.dataset.themeMode = getThemeMode(currentTheme);
	}
	if (holyThemePreview) {
		holyThemePreview.textContent = getThemeLabel(currentTheme);
	}
	if (enginePreview) {
		enginePreview.textContent = getEngineLabel(currentSelectedEngine);
	}
	if (holyEnginePreview) {
		holyEnginePreview.textContent = getEngineLabel(currentSelectedEngine);
	}
	updateOnboardingThemePreview();
	syncOnboardingPreferenceInputs();
	updateThemePreviewState();
	updateEnginePreviewState();
}

function updateToolbarMetrics() {
	if (!toolbarShell) return;
	const toolbarRect = toolbarShell.getBoundingClientRect();
	const collapseLevel = getToolbarCollapseLevel();
	const offset =
		collapseLevel >= 2
			? 0
			: Math.max(24, Math.ceil(toolbarRect.bottom));
	document.documentElement.style.setProperty("--toolbar-offset", `${offset}px`);
	document.documentElement.style.setProperty(
		"--toolbar-body-gap",
		"0px"
	);
	document.documentElement.style.setProperty(
		"--frame-top-gap",
		"0px"
	);
}

function getToolbarStatusInfo() {
	const importantKeys = ["core", "worker", "connection", "proxy"];

	if (importantKeys.some((key) => currentStatus[key] === "issue")) {
		return { label: "Attention", state: "issue" };
	}

	if (importantKeys.every((key) => currentStatus[key] === "ready")) {
		return {
			label: currentStatus.launch === "ready" ? "Ready" : "Working",
			state: "ready",
		};
	}

	return { label: "Starting", state: "checking" };
}

function closeStatusPanel() {
	if (!statusPanel) return;
	statusPanel.hidden = true;
	toolbar.status?.setAttribute("aria-expanded", "false");
}

function openStatusPanel() {
	if (!statusPanel) return;
	statusPanel.hidden = false;
	toolbar.status?.setAttribute("aria-expanded", "true");
}

function toggleStatusPanel() {
	if (isStatusPanelOpen()) {
		closeStatusPanel();
		return;
	}
	openStatusPanel();
}

function updateToolbarStatus() {
	if (!toolbar.status || !toolbar.statusText) return;
	const info = getToolbarStatusInfo();
	toolbar.status.dataset.state = info.state;
	toolbar.statusText.textContent = info.label;
	toolbar.status.setAttribute("aria-label", `Status: ${info.label}`);
	toolbar.status.setAttribute("title", `Status: ${info.label}`);
}

function formatStatusLatency(latency) {
	if (!Number.isFinite(latency) || latency < 0) {
		return "-- ms";
	}
	return `${Math.max(1, Math.round(latency))} ms`;
}

function getSearchTargetLabel() {
	const raw = String(searchEngine?.value || "").trim();
	if (!raw) return "Search target";
	if (raw.includes("duckduckgo.com")) return "DuckDuckGo";
	if (raw.includes("google.com")) return "Google";
	if (raw.includes("bing.com")) return "Bing";

	try {
		const parsed = new URL(raw.replace("%s", "test"));
		return parsed.hostname.replace(/^www\./, "");
	} catch {
		return "Search target";
	}
}

function getStatusRouteTotal() {
	const keys = ["core", "worker", "connection", "proxy", "launch"];
	const values = keys
		.map((key) => currentLatency[key])
		.filter((value) => Number.isFinite(value) && value >= 0);

	if (!values.length) {
		return null;
	}

	return values.reduce((sum, value) => sum + value, 0);
}

function renderStatusRoute() {
	if (!statusRouteMap || !statusRouteTotal) return;

	const routeSteps = [
		{
			key: "core",
			label: "Scramjet",
			meta: "runtime",
		},
		{
			key: "worker",
			label: "Worker",
			meta: "service worker",
		},
		{
			key: "connection",
			label: "Tunnel",
			meta: getTunnelUrl().replace(/^wss?:\/\//, ""),
		},
		{
			key: "proxy",
			label: "Proxy",
			meta:
				currentStatus.proxy === "ready"
					? `${getTransportLabel(currentTransportKey)} + ${
							cachedHolyTransportStatus?.wireproxyActive ? "wireproxy" : "direct"
						}`
					: "direct server egress",
		},
		{
			key: "launch",
			label: "Origin",
			meta: getSearchTargetLabel(),
		},
	];

	statusRouteMap.replaceChildren();

	for (const [index, step] of routeSteps.entries()) {
		const node = document.createElement("div");
		node.className = "status-route-node";
		node.dataset.state = currentStatus[step.key] || "checking";

		const label = document.createElement("span");
		label.className = "status-route-node-label";
		label.textContent = step.label;

		const meta = document.createElement("span");
		meta.className = "status-route-node-meta";
		meta.textContent = step.meta;

		const latency = document.createElement("span");
		latency.className = "status-route-node-latency";
		latency.textContent = formatStatusLatency(currentLatency[step.key]);

		node.append(label, meta, latency);
		statusRouteMap.append(node);

		if (index < routeSteps.length - 1) {
			const arrow = document.createElement("span");
			arrow.className = "status-route-arrow";
			arrow.setAttribute("aria-hidden", "true");
			arrow.textContent = "->";
			statusRouteMap.append(arrow);
		}
	}

	statusRouteTotal.textContent = `Total ${formatStatusLatency(
		getStatusRouteTotal()
	)}`;
}

function getAverageLatency(keys) {
	const values = keys
		.map((key) => currentLatency[key])
		.filter((value) => Number.isFinite(value) && value >= 0);

	if (!values.length) {
		return null;
	}

	return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function setStatusLatency(key, latency) {
	const normalized =
		Number.isFinite(latency) && latency >= 0 ? Math.max(1, Math.round(latency)) : null;
	currentLatency[key] = normalized;

	const item = statusItems[key];
	const value = item?.querySelector(".status-latency");
	if (value) {
		value.textContent = formatStatusLatency(normalized);
	}
	renderStatusRoute();
}

function setStatus(key, state, text) {
	currentStatus[key] = state;
	const item = statusItems[key];
	if (item) {
		item.dataset.state = state;
		const value = item.querySelector(".status-value");
		if (value) {
			value.textContent = text;
		}
	}
	updateToolbarStatus();
	renderStatusRoute();
}

function refreshLaunchStatus() {
	const hasIssue = ["core", "worker", "connection"].some(
		(key) => currentStatus[key] === "issue"
	);
	const allReady = ["core", "worker", "connection"].every(
		(key) => currentStatus[key] === "ready"
	);
	const derivedLatency = getAverageLatency(["core", "worker", "connection", "proxy"]);

	if (currentStatus.launch === "issue") {
		setStatusLatency("launch", derivedLatency);
		updateToolbarStatus();
		return;
	}

	if (hasIssue) {
		setStatus("launch", "issue", "Check items");
		setStatusLatency("launch", derivedLatency);
		return;
	}

	if (allReady) {
		setStatus("launch", "ready", "Ready");
		setStatusLatency("launch", derivedLatency);
		return;
	}

	setStatus("launch", "checking", "Starting");
	setStatusLatency("launch", derivedLatency);
}

function resetTabTransientRetryState(tab) {
	if (!tab) return;
	tab.proxyErrorRetryKey = "";
	tab.proxyErrorRetryAt = 0;
	tab.proxyErrorRetryPending = false;
	tab.navigationRequestedAt = Date.now();
}

function createTabModel(saved = {}) {
	const kind = saved.kind === "start" ? "start" : "page";
	const fallbackLabel = kind === "start" ? DEFAULT_START_LABEL : "Current page";
	const tab = {
		id: String(saved.id || createTabId()),
		kind,
		engine: sanitizeRuntimeEngine(saved.engine || DEFAULT_ENGINE),
		routeProfile: sanitizeRouteProfile(saved.routeProfile),
		forceMobileSites: Boolean(saved.forceMobileSites),
		input: String(saved.input || saved.url || "").trim(),
		url: kind === "start" ? "" : String(saved.url || "").trim(),
		label: formatTabLabel(
			saved.label ||
				(kind === "start"
					? saved.input || fallbackLabel
					: formatTabLabelFromUrl(saved.url, saved.input || fallbackLabel))
		),
		frame: null,
		frameBound: false,
		loading: false,
		loadKind: "navigate",
		loadToken: 0,
		loadStartedAt: 0,
		loadTimeoutId: null,
		loaded: false,
	};
	resetTabTransientRetryState(tab);
	return tab;
}

function isStartTab(tab) {
	return Boolean(tab && tab.kind === "start");
}

function isPageTab(tab) {
	return Boolean(tab && tab.kind !== "start");
}

function serializeTabs() {
	return tabs
		.map((tab) => ({
			id: tab.id,
			kind: isStartTab(tab) ? "start" : "page",
			engine: sanitizeRuntimeEngine(tab.engine || DEFAULT_ENGINE),
			routeProfile: sanitizeRouteProfile(tab.routeProfile),
			forceMobileSites: Boolean(tab.forceMobileSites),
			input: tab.input || tab.url,
			url: tab.url,
			label:
				tab.label ||
				(isStartTab(tab)
					? formatTabLabel(tab.input || DEFAULT_START_LABEL)
					: formatTabLabelFromUrl(tab.url, tab.input)),
		}));
}

function sanitizeSessionState(raw) {
	const source = isPlainObject(raw) ? raw : {};
	const rawTabs = Array.isArray(source.tabs) ? source.tabs : [];
	const nextTabs = [];

	for (const item of rawTabs) {
		if (!isPlainObject(item)) continue;
		const kind = item.kind === "start" ? "start" : "page";
		const url = kind === "start" ? "" : String(item.url || "").trim();
		if (kind !== "start" && !url) continue;
		nextTabs.push({
			id: String(item.id || createTabId()),
			kind,
			engine: sanitizeRuntimeEngine(item.engine || DEFAULT_ENGINE),
			routeProfile: sanitizeRouteProfile(item.routeProfile),
			forceMobileSites: Boolean(item.forceMobileSites),
			input: String(item.input || url).trim(),
			url,
			label: formatTabLabel(
				item.label ||
					(kind === "start"
						? item.input || DEFAULT_START_LABEL
						: formatTabLabelFromUrl(url, item.input || url))
			),
		});
	}

	const activeId =
		typeof source.activeTabId === "string" &&
		nextTabs.some((tab) => tab.id === source.activeTabId)
			? source.activeTabId
			: null;

	return {
		version: SESSION_SCHEMA_VERSION,
		addressValue: String(source.addressValue || ""),
		activeTabId: activeId,
		tabs: nextTabs,
	};
}

function readUiState() {
	return safeJsonParse(localStorage.getItem(STORAGE_KEYS.ui), {});
}

function persistUiState() {
	const toolbarCollapseLevel = getToolbarCollapseLevel();
	const state = {
		version: 1,
		theme: sanitizeThemeKey(currentTheme),
		themeOverrides: sanitizeThemeOverrides(themeOverrides),
		homeView: sanitizeHomeView(currentHomeView),
		homePageInput: currentHomePageInput,
		newTabPageInput: currentNewTabPageInput,
		panicKeyCombo: sanitizePanicKeyCombo(currentPanicKeyCombo),
		mobileSitesEnabled: currentMobileSitesEnabled,
		onboardingCompleted,
		toolbarCollapseLevel,
		toolbarCollapseDirection,
		toolbarMinimized: toolbarCollapseLevel > 0,
		selectedEngine: currentSelectedEngine,
		engineSelectionTouched,
		lastProfileName:
			getRequestedProfileDisplayName() ||
			activeProfileDisplayName ||
			localStorage.getItem(STORAGE_KEYS.lastProfileName) ||
			"",
	};
	localStorage.setItem(STORAGE_KEYS.ui, JSON.stringify(state));
}

function applyPagePreferences(
	{ homePageInput = "", newTabPageInput = "" } = {},
	{ persist = true, autosave = true } = {}
) {
	currentHomePageInput = sanitizePagePreference(homePageInput);
	currentNewTabPageInput = sanitizePagePreference(newTabPageInput);

	if (profile.homePage) {
		profile.homePage.value = currentHomePageInput;
	}
	if (profile.newTabPage) {
		profile.newTabPage.value = currentNewTabPageInput;
	}
	syncOnboardingPreferenceInputs();

	updateHomepagePreview();

	if (persist) {
		persistUiState();
	}
	if (autosave) {
		scheduleActiveProfileAutosave();
	}
}

function readStoredMobileSitesEnabled(value) {
	if (typeof value === "boolean") {
		return value;
	}
	if (typeof value === "string") {
		return value === "true";
	}
	return isMobileDevice();
}

function readSessionState() {
	return sanitizeSessionState(
		safeJsonParse(localStorage.getItem(STORAGE_KEYS.session), {})
	);
}

function persistSessionState() {
	if (sessionRestoring) return;
	const state = {
		version: SESSION_SCHEMA_VERSION,
		addressValue: address?.value || "",
		activeTabId,
		tabs: serializeTabs(),
	};
	localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(state));
	scheduleActiveProfileAutosave();
}

function shouldIgnoreRawStorageKey(key) {
	return String(key || "").startsWith(STORAGE_PREFIXES.app);
}

function collectRawLocalStorageSnapshot() {
	const entries = [];

	for (let index = 0; index < localStorage.length; index += 1) {
		const key = localStorage.key(index);
		if (!key || shouldIgnoreRawStorageKey(key)) continue;
		entries.push([key, localStorage.getItem(key)]);
	}

	return entries;
}

function restoreRawLocalStorageSnapshot(entries) {
	const nextEntries = Array.isArray(entries) ? entries : [];
	const keysToRemove = [];

	for (let index = 0; index < localStorage.length; index += 1) {
		const key = localStorage.key(index);
		if (!key || shouldIgnoreRawStorageKey(key)) continue;
		keysToRemove.push(key);
	}

	for (const key of keysToRemove) {
		localStorage.removeItem(key);
	}

	for (const entry of nextEntries) {
		if (!Array.isArray(entry) || typeof entry[0] !== "string") continue;
		localStorage.setItem(entry[0], entry[1] == null ? "" : String(entry[1]));
	}
}

function setProfileMessage(text, state = "") {
	if (!profile.message) return;
	profile.message.textContent = text || "";
	if (state) {
		profile.message.dataset.state = state;
	} else {
		delete profile.message.dataset.state;
	}
}

function updateProfileUi() {
	const active = Boolean(activeProfileName && activeProfileSecret);
	if (profile.card) {
		profile.card.dataset.auth = active ? "signed-in" : "signed-out";
	}
	if (profile.session) {
		profile.session.textContent = active
			? activeProfileDisplayName
			: "Login";
	}
	if (profile.badge) {
		profile.badge.textContent = active ? "Signed in" : "Signed out";
		profile.badge.dataset.state = active ? "active" : "idle";
	}
	if (profile.save) profile.save.disabled = !active;
	if (profile.logout) profile.logout.disabled = !active;
	if (profile.homePage) profile.homePage.value = currentHomePageInput;
	if (profile.newTabPage) profile.newTabPage.value = currentNewTabPageInput;
	updateHomepagePreview();
}

function applyTheme(theme, { persist = true, autosave = true } = {}) {
	const nextTheme = sanitizeThemeKey(theme);
	const themeOverride = getThemeOverride(nextTheme);
	const themeMode = getThemeMode(nextTheme);
	currentTheme = nextTheme;
	document.body.dataset.theme = nextTheme;
	document.body.dataset.themeMode = themeMode;
	document.documentElement.dataset.themeMode = themeMode;
	document.documentElement.style.colorScheme = themeMode;
	if (themeOverride) {
		applyCustomThemeVariables(themeOverride);
	} else {
		clearCustomThemeVariables();
	}
	if (persist) {
		persistUiState();
	}
	if (autosave) {
		scheduleActiveProfileAutosave();
	}
	updateHomepagePreview();
	scheduleActiveProxyErrorPageRefresh();
}

function getCurrentThemePalette() {
	const themeFallback =
		getThemeOverride(currentTheme) || readThemeSnapshotFromComputedStyles();
	const variableFallbacks = buildCustomThemeVariables(themeFallback);
	const themeStyles = document.body ? getComputedStyle(document.body) : null;
	const readVar = (key, fallback = "") =>
		String(themeStyles?.getPropertyValue(key) || variableFallbacks[key] || fallback).trim();
	const mode = document.body?.dataset.themeMode || getThemeMode(currentTheme);
	const accentHex = colorStringToHex(readVar("--accent"), themeFallback.accent);
	const surfaceHex = colorStringToHex(
		readVar("--panel-solid"),
		themeFallback.surface
	);
	const textHex = colorStringToHex(readVar("--page-ink"), themeFallback.text);
	const pageBgHex = colorStringToHex(readVar("--page-bg"), themeFallback.pageBg);

	return {
		mode,
		pageBg: readVar("--page-bg", themeFallback.pageBg),
		pageInk: readVar("--page-ink", themeFallback.text),
		mutedInk: readVar("--muted-ink", themeFallback.muted),
		line: readVar("--line", rgbaColor(textHex, mode === "dark" ? 0.11 : 0.12)),
		panelBg: readVar(
			"--panel-bg",
			rgbaColor(surfaceHex, mode === "dark" ? 0.84 : 0.8)
		),
		panelSolid: readVar(
			"--panel-solid",
			rgbaColor(surfaceHex, mode === "dark" ? 0.95 : 0.94)
		),
		accent: readVar("--accent", accentHex),
		accentStrong: readVar(
			"--accent-strong",
			mixHexColors(accentHex, "#000000", mode === "dark" ? 0.22 : 0.34)
		),
		accentSoft: readVar(
			"--accent-soft",
			rgbaColor(accentHex, mode === "dark" ? 0.16 : 0.15)
		),
		heroAccent: readVar(
			"--hero-accent",
			`linear-gradient(145deg, ${rgbaColor(accentHex, 0.2)}, ${rgbaColor(
				mixHexColors(accentHex, mode === "dark" ? "#ffffff" : "#d9e4ef", 0.35),
				0.05
			)})`
		),
		heroSurface: readVar(
			"--hero-surface",
			mode === "dark"
				? `linear-gradient(160deg, ${rgbaColor(
						surfaceHex,
						0.96
					)}, ${rgbaColor(mixHexColors(surfaceHex, "#000000", 0.18), 0.84)})`
				: `linear-gradient(145deg, ${rgbaColor(
						surfaceHex,
						0.82
					)}, rgba(255, 255, 255, 0.42))`
		),
		heroShadow: readVar(
			"--hero-shadow",
			mode === "dark"
				? "0 34px 96px rgba(3, 4, 7, 0.5)"
				: "0 28px 80px rgba(17, 24, 20, 0.09)"
		),
		panelShadow: readVar(
			"--panel-shadow",
			mode === "dark"
				? "0 22px 48px rgba(3, 4, 7, 0.36)"
				: "0 18px 40px rgba(17, 24, 20, 0.08)"
		),
		issue: readVar("--issue", mode === "dark" ? "#ff846b" : "#c23b22"),
		accentHex,
		surfaceHex,
		textHex,
		pageBgHex,
	};
}

function patchProxyErrorPage(frameWindow) {
	let frameDoc = null;
	try {
		frameDoc = frameWindow?.document || null;
	} catch {
		return false;
	}

	if (!frameDoc?.body) {
		return false;
	}

	const errorTitle = frameDoc.getElementById("errorTitle");
	const fetchedUrl = frameDoc.getElementById("fetchedURL");
	const traceArea = frameDoc.getElementById("errorTrace");
	const innerCard = frameDoc.getElementById("inner");
	if (!errorTitle || !fetchedUrl || !traceArea || !innerCard) {
		return false;
	}

	const palette = getCurrentThemePalette();
	const leadText = fetchedUrl.closest("p");
	const infoGrid = frameDoc.getElementById("info");
	const versionWrapper = frameDoc.getElementById("version-wrapper");
	let badge = frameDoc.getElementById("ocean-error-badge");

	if (!badge) {
		badge = frameDoc.createElement("p");
		badge.id = "ocean-error-badge";
		innerCard.insertBefore(badge, errorTitle);
	}

	badge.textContent = "Nitro";
	errorTitle.textContent = "Page load failed";
	if (leadText) {
		leadText.innerHTML =
			'Nitro could not load <b id="fetchedURL"></b> right now.';
		const nextFetchedUrl = frameDoc.getElementById("fetchedURL");
		if (nextFetchedUrl) {
			nextFetchedUrl.textContent = fetchedUrl.textContent || "";
		}
	}

	const troubleshootingParagraphs = Array.from(
		frameDoc.querySelectorAll("#troubleshooting > p")
	);
	if (troubleshootingParagraphs[0]) {
		troubleshootingParagraphs[0].textContent = "Try these next:";
	}
	if (troubleshootingParagraphs[1]) {
		troubleshootingParagraphs[1].innerHTML =
			'If you manage <b id="hostname"></b>, try:';
	}

	let themedStyle = frameDoc.getElementById("ocean-proxy-error-theme");
	if (!themedStyle) {
		themedStyle = frameDoc.createElement("style");
		themedStyle.id = "ocean-proxy-error-theme";
		(frameDoc.head || frameDoc.body).appendChild(themedStyle);
	}

	themedStyle.textContent = `
		:root {
			color-scheme: ${palette.mode};
		}

		html,
		body {
			min-height: 100%;
			margin: 0;
		}

		body {
			position: relative;
			padding: clamp(16px, 3vw, 28px);
			box-sizing: border-box;
			background:
				radial-gradient(circle at top right, ${rgbaColor(
					palette.accentHex,
					palette.mode === "dark" ? 0.18 : 0.14
				)}, transparent 34%),
				radial-gradient(circle at bottom left, ${rgbaColor(
					palette.textHex,
					palette.mode === "dark" ? 0.08 : 0.05
				)}, transparent 28%),
				${palette.pageBg};
			color: ${palette.pageInk};
			font-family: "Sora", "Space Grotesk", "Segoe UI", sans-serif;
		}

		#cover {
			position: fixed;
			inset: 0;
			background: ${palette.heroAccent};
			opacity: ${palette.mode === "dark" ? "0.58" : "0.86"};
			pointer-events: none;
		}

		#inner {
			position: relative;
			z-index: 1;
			width: min(1040px, 100%);
			margin: 0 auto;
			padding: clamp(24px, 4vw, 36px);
			border-radius: 30px;
			border: 1px solid ${palette.line};
			background: ${palette.heroSurface};
			box-shadow: ${palette.heroShadow};
			backdrop-filter: blur(16px);
		}

		#inner::before {
			content: "";
			position: absolute;
			inset: -1px;
			border-radius: inherit;
			background: linear-gradient(
				140deg,
				${rgbaColor(palette.accentHex, 0.12)},
				transparent 56%
			);
			pointer-events: none;
		}

		#inner > * {
			position: relative;
			z-index: 1;
		}

		#ocean-error-badge {
			margin: 0 0 10px;
			display: inline-flex;
			align-items: center;
			padding: 0.42rem 0.78rem;
			border-radius: 999px;
			border: 1px solid ${rgbaColor(palette.accentHex, 0.18)};
			background: ${rgbaColor(palette.accentHex, 0.1)};
			color: ${palette.mutedInk};
			font-size: 0.72rem;
			font-weight: 700;
			letter-spacing: 0.12em;
			text-transform: uppercase;
		}

		#errorTitle {
			margin: 0 0 10px;
			font-size: clamp(2rem, 5vw, 3.4rem);
			line-height: 0.94;
			letter-spacing: -0.07em;
		}

		#inner > p:first-of-type {
			margin: 0;
			max-width: 42rem;
			color: ${palette.mutedInk};
			font-size: 1rem;
			line-height: 1.62;
		}

		#fetchedURL {
			display: inline-flex;
			align-items: center;
			margin-top: 10px;
			padding: 0.38rem 0.72rem;
			border-radius: 999px;
			border: 1px solid ${rgbaColor(palette.accentHex, 0.18)};
			background: ${rgbaColor(
				palette.accentHex,
				palette.mode === "dark" ? 0.18 : 0.1
			)};
			color: ${palette.pageInk};
			font-weight: 600;
			word-break: break-all;
		}

		#info {
			display: grid;
			grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
			gap: 18px;
			margin-top: 22px;
			align-items: stretch;
		}

		#errorTrace-wrapper,
		#troubleshooting {
			position: relative;
			padding: 18px;
			border-radius: 22px;
			border: 1px solid ${palette.line};
			background: ${palette.panelBg};
			box-shadow: ${palette.panelShadow};
		}

		#errorTrace {
			display: block;
			width: 100%;
			min-height: 300px;
			box-sizing: border-box;
			padding: 16px 16px 48px;
			border-radius: 16px;
			border: 1px solid ${rgbaColor(palette.textHex, 0.1)};
			background: ${rgbaColor(
				palette.surfaceHex,
				palette.mode === "dark" ? 0.56 : 0.84
			)};
			color: ${palette.pageInk};
			font: 500 0.88rem/1.55 "Cascadia Code", "Consolas", monospace;
			resize: vertical;
			outline: none;
		}

		#errorTrace::selection {
			background: ${rgbaColor(palette.accentHex, 0.22)};
		}

		#copy-button,
		#reload {
			appearance: none;
			font: inherit;
			font-weight: 700;
			letter-spacing: 0.01em;
			cursor: pointer;
			transition:
				transform 150ms ease,
				filter 150ms ease,
				box-shadow 150ms ease,
				background 150ms ease;
		}

		#copy-button {
			top: 14px;
			right: 14px;
			opacity: 1;
			padding: 0.56rem 0.92rem;
			border-radius: 999px;
			border: 1px solid ${rgbaColor(palette.accentHex, 0.18)};
			background: ${rgbaColor(palette.accentHex, 0.14)};
			color: ${palette.pageInk};
			box-shadow: none;
		}

		#reload {
			margin-top: 18px;
			padding: 0.92rem 1.24rem;
			border: 0;
			border-radius: 16px;
			background: linear-gradient(180deg, ${palette.accentStrong}, ${palette.accent});
			color: #ffffff;
			box-shadow: 0 14px 30px ${rgbaColor(palette.accentHex, 0.18)};
		}

		#copy-button:hover,
		#reload:hover {
			transform: translateY(-1px);
			filter: saturate(1.03);
		}

		#copy-button:focus-visible,
		#reload:focus-visible {
			outline: none;
			box-shadow:
				0 0 0 4px ${rgbaColor(palette.accentHex, 0.12)},
				0 14px 30px ${rgbaColor(palette.accentHex, 0.18)};
		}

		#troubleshooting p {
			margin: 0 0 10px;
			color: ${palette.mutedInk};
			line-height: 1.55;
		}

		#troubleshooting ul {
			margin: 0;
			padding-left: 20px;
			color: ${palette.pageInk};
		}

		#troubleshooting li + li {
			margin-top: 8px;
		}

		#troubleshooting b,
		a {
			color: ${palette.accentStrong};
		}

		a {
			text-decoration-thickness: 1.5px;
			text-underline-offset: 0.18em;
		}

		#version-wrapper {
			position: relative;
			z-index: 1;
			width: min(1040px, 100%);
			margin: 14px auto 0;
			color: ${palette.mutedInk};
			font-size: 0.86rem;
			text-align: right;
		}

		@media (max-width: 860px) {
			body {
				padding: 14px;
			}

			#inner {
				padding: 22px 18px;
			}

			#info {
				grid-template-columns: 1fr;
			}

			#errorTrace {
				min-height: 240px;
			}

			#version-wrapper {
				text-align: left;
				padding-left: 4px;
			}
		}
	`;

	if (infoGrid) {
		infoGrid.dataset.oceanThemed = "true";
	}
	if (versionWrapper) {
		versionWrapper.dataset.oceanThemed = "true";
	}
	frameDoc.documentElement.dataset.oceanProxyErrorTheme = currentTheme;
	frameDoc.documentElement.dataset.oceanProxyErrorMode = palette.mode;
	return true;
}

function patchActiveProxyErrorPage() {
	const activeTab = getActiveTab();
	if (!activeTab || isStartTab(activeTab)) {
		return false;
	}

	try {
		return patchProxyErrorPage(activeTab.frame?.frame?.contentWindow || null);
	} catch {
		return false;
	}
}

function scheduleActiveProxyErrorPageRefresh() {
	window.requestAnimationFrame(() => {
		patchActiveProxyErrorPage();
	});
}

function readProxyErrorState(frameWindow) {
	let frameDoc = null;
	try {
		frameDoc = frameWindow?.document || null;
	} catch {
		return null;
	}

	if (!frameDoc?.body) {
		return null;
	}

	const errorTitle = frameDoc.getElementById("errorTitle");
	const fetchedUrl = frameDoc.getElementById("fetchedURL");
	const traceArea = frameDoc.getElementById("errorTrace");
	if (!errorTitle || !fetchedUrl || !traceArea) {
		return null;
	}

	const title = String(errorTitle.textContent || "").trim();
	const url = String(fetchedUrl.textContent || "").trim();
	const trace = String(traceArea.value || traceArea.textContent || "").trim();
	const bodyText = String(frameDoc.body.innerText || "").trim();
	if (!title && !trace && !bodyText) {
		return null;
	}

	return {
		title,
		url,
		trace,
		bodyText,
	};
}

function isTransientProxyErrorState(state) {
	if (!state) return false;
	const combined = `${state.title}\n${state.trace}\n${state.bodyText}`;
	return (
		/page load failed/i.test(combined) ||
		/could not load/i.test(combined) ||
		/ssl connect error/i.test(combined) ||
		/failed to fetch/i.test(combined) ||
		/network/i.test(combined) ||
		/timed?\s*out/i.test(combined) ||
		/internal server error/i.test(combined) ||
		/error loading/i.test(combined) ||
		/connection.*failed/i.test(combined)
	);
}

function isAbortLikeError(error) {
	if (!error) return false;
	if (typeof DOMException !== "undefined" && error instanceof DOMException) {
		return error.name === "AbortError";
	}
	const name = String(error.name || "");
	const message = String(error.message || error);
	return name === "AbortError" || /abort/i.test(message);
}

function cancelEngineBenchmarks() {
	if (!engineBenchmarkAbortController) {
		return;
	}
	engineBenchmarkAbortController.abort();
	engineBenchmarkAbortController = null;
}

function hasPendingPageNavigation() {
	if (currentStatus.launch === "checking") {
		return true;
	}

	return tabs.some((tab) => !isStartTab(tab) && tab.loading);
}

function canReuseLaunchPrewarm(runtimeEngine) {
	return (
		Boolean(launchPrewarmPromise) &&
		launchPrewarmEngine === runtimeEngine &&
		Date.now() - launchPrewarmStartedAt < LAUNCH_PREWARM_COOLDOWN_MS
	);
}

function prewarmLaunchPath(
	engine = currentSelectedEngine,
	{ routeProfile = getHomepageRouteProfile(engine) } = {}
) {
	const requestedEngine = sanitizeEngine(engine);
	const resolvedRouteProfile = sanitizeRouteProfile(routeProfile);
	const runtimeEngine =
		requestedEngine === "rammerhead"
			? "rammerhead"
			: requestedEngine === "bolt"
				? sanitizeRuntimeEngine(DEFAULT_ENGINE)
				: sanitizeRuntimeEngine(requestedEngine);

	if (!canReuseLaunchPrewarm(runtimeEngine)) {
		launchPrewarmEngine = runtimeEngine;
		launchPrewarmStartedAt = Date.now();
		launchPrewarmPromise = ensureRuntimeReady(runtimeEngine, {
			requireProxyStatus: false,
			requireConnectionProbe: false,
			backgroundConnectionProbe: false,
			backgroundProxyStatus: false,
		})
			.then(() => true)
			.catch((err) => {
				console.warn(err);
				return false;
			});
	}

	if (
		requestedEngine === "rammerhead" &&
		!shouldUseHolyLtsRouting(resolvedRouteProfile, requestedEngine) &&
		!rammerheadSessionPromise &&
		!rammerheadSessionWarmupPromise
	) {
		rammerheadSessionWarmupPromise = (async () => {
			try {
				await ensureRuntimeReady("rammerhead", {
					requireProxyStatus: false,
					backgroundProxyStatus: false,
				});
				return await ensureRammerheadSession();
			} catch (err) {
				console.warn(err);
				return "";
			} finally {
				rammerheadSessionWarmupPromise = null;
			}
		})();
	}

	if (
		requestedEngine === "rammerhead" &&
		shouldUseHolyLtsRouting(resolvedRouteProfile, requestedEngine) &&
		!holyRammerheadSessionWarmupPromise
	) {
		holyRammerheadSessionWarmupPromise = (async () => {
			try {
				const sessionId = await fetchHolyRammerheadSessionId();
				if (sessionId) {
					await fetchHolyRammerheadDictionary(sessionId);
				}
				return sessionId;
			} catch (err) {
				console.warn(err);
				return "";
			} finally {
				holyRammerheadSessionWarmupPromise = null;
			}
		})();
	}

	return launchPrewarmPromise;
}

function hasLiveSessionOrPendingLaunch() {
	if (document.body.classList.contains("session-live")) {
		return true;
	}

	if (currentStatus.launch === "checking") {
		return true;
	}

	return tabs.some((tab) => !isStartTab(tab));
}

function maybeAutoRecoverProxyError(tab) {
	if (!tab || isStartTab(tab) || tab.proxyErrorRetryPending || !tab.frame?.frame) {
		return false;
	}

	if (
		!Number.isFinite(tab.navigationRequestedAt) ||
		Date.now() - tab.navigationRequestedAt > TRANSIENT_PROXY_RETRY_COOLDOWN_MS
	) {
		return false;
	}

	const proxyErrorState = readProxyErrorState(tab.frame.frame.contentWindow || null);
	if (!proxyErrorState || !isTransientProxyErrorState(proxyErrorState)) {
		return false;
	}

	const retryKey = [
		sanitizeRuntimeEngine(tab.engine),
		tab.url || proxyErrorState.url,
		proxyErrorState.title,
		proxyErrorState.trace.slice(0, 240),
	].join("|");

	if (
		tab.proxyErrorRetryKey === retryKey &&
		Date.now() - tab.proxyErrorRetryAt < TRANSIENT_PROXY_RETRY_COOLDOWN_MS
	) {
		return false;
	}

	tab.proxyErrorRetryKey = retryKey;
	tab.proxyErrorRetryAt = Date.now();
	tab.proxyErrorRetryPending = true;

	window.setTimeout(async () => {
		if (!tab.frame?.frame || !document.body.contains(tab.frame.frame)) {
			tab.proxyErrorRetryPending = false;
			return;
		}

		const nextState = readProxyErrorState(tab.frame.frame.contentWindow || null);
		if (!nextState || !isTransientProxyErrorState(nextState)) {
			tab.proxyErrorRetryPending = false;
			return;
		}

		if (
			["scramjet", "ultraviolet"].includes(sanitizeRuntimeEngine(tab.engine)) &&
			/error code 35|error code 56|ssl connect error|failure when receiving data from the peer/i.test(
				`${nextState.title}\n${nextState.trace}\n${nextState.bodyText}`
			)
		) {
			const alternateTransportKey =
				currentTransportKey === EPOXY_TRANSPORT_KEY
					? LIBCURL_TRANSPORT_KEY
					: EPOXY_TRANSPORT_KEY;
			await resetConnectionTransport({
				preferredTransportKey: alternateTransportKey,
			}).catch((err) => console.warn(err));
		}

		const loadToken = tab.id === activeTabId ? beginTabLoad(tab, { kind: "reload" }) : 0;
		const frameLoadPromise = waitForFrameLoadOnce(tab.frame.frame);

		try {
			tab.frame.reload();
			await frameLoadPromise;
		} catch (err) {
			console.warn(err);
			if (loadToken) {
				completeTabLoad(tab, { token: loadToken, immediate: true });
			}
		} finally {
			tab.proxyErrorRetryPending = false;
			if (loadToken) {
				completeTabLoad(tab, { token: loadToken });
			}
		}
	}, TRANSIENT_PROXY_RETRY_DELAY_MS);

	return true;
}

function updateMinimizeButton() {
	if (!toolbar.minimize) return;
	const collapseLevel = getToolbarCollapseLevel();
	const expanding = collapseLevel > 0 && toolbarCollapseDirection === "up";
	const label =
		collapseLevel === 0
			? "Hide bottom row"
			: collapseLevel === 1
				? expanding
					? "Show bottom row"
					: "Hide top bar"
				: "Show tab bar";
	toolbar.minimize.setAttribute("aria-label", label);
	toolbar.minimize.setAttribute("title", label);
	toolbar.minimize.dataset.direction = expanding ? "down" : "up";
}

function setToolbarCollapseLevel(
	level,
	{ persist = true, autosave = true, direction = toolbarCollapseDirection } = {}
) {
	toolbarCollapseDirection = sanitizeToolbarCollapseDirection(direction);
	document.body.dataset.toolbarState = String(clampToolbarCollapseLevel(level));
	updateMinimizeButton();
	updateToolbarMetrics();
	if (persist) {
		persistUiState();
	}
	if (autosave) {
		scheduleActiveProfileAutosave();
	}
}

function toggleToolbarCollapseLevel() {
	const collapseLevel = getToolbarCollapseLevel();
	if (collapseLevel === 0) {
		setToolbarCollapseLevel(1, { direction: "down" });
		return;
	}
	if (collapseLevel === 1 && toolbarCollapseDirection === "down") {
		setToolbarCollapseLevel(2, { direction: "up" });
		return;
	}
	if (collapseLevel === 2) {
		setToolbarCollapseLevel(1, { direction: "up" });
		return;
	}
	setToolbarCollapseLevel(0, { direction: "down" });
}

function rememberLastProfileName(name) {
	if (name) {
		localStorage.setItem(STORAGE_KEYS.lastProfileName, name);
	} else {
		localStorage.removeItem(STORAGE_KEYS.lastProfileName);
	}
	persistUiState();
}

function renderTabButton(tab) {
	const item = document.createElement("div");
	item.className = "browser-tab-item";
	if (activeTabId === tab.id) {
		item.classList.add("browser-tab-item-active");
	}

	const button = document.createElement("button");
	button.type = "button";
	button.className = "browser-tab";
	if (activeTabId === tab.id) {
		button.classList.add("browser-tab-active");
	}

	const dot = document.createElement("span");
	dot.className = isPageTab(tab)
		? "browser-tab-dot browser-tab-dot-live"
		: "browser-tab-dot";
	dot.setAttribute("aria-hidden", "true");

	const text = document.createElement("span");
	text.className = "browser-tab-text";
	text.textContent = formatTabLabel(tab.label || tab.input || tab.url);

	const close = document.createElement("button");
	close.type = "button";
	close.className = "browser-tab-close";
	close.setAttribute(
		"aria-label",
		`Close ${formatTabLabel(tab.label || tab.input || tab.url)}`
	);
	close.setAttribute("title", "Close tab");
	close.innerHTML =
		'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10" /><path d="M17 7 7 17" /></svg>';

	button.append(dot, text);
	button.addEventListener("click", () => {
		activateTabById(tab.id).catch((err) => console.warn(err));
	});
	close.addEventListener("click", (event) => {
		event.preventDefault();
		event.stopPropagation();
		closeTabById(tab.id).catch((err) => console.warn(err));
	});

	item.append(button, close);
	return item;
}

function renderTabStrip() {
	if (!browserTabs) return;
	browserTabs.replaceChildren(...tabs.map((tab) => renderTabButton(tab)));
}

function updateNavigationState() {
	const activeTab = getActiveTab();
	const hasSession = isPageTab(activeTab);

	if (toolbar.back) toolbar.back.disabled = !hasSession;
	if (toolbar.forward) toolbar.forward.disabled = !hasSession;
	if (toolbar.reload) toolbar.reload.disabled = !hasSession;

	renderTabStrip();
	updateToolbarStatus();
	syncToolbarLoadIndicator();
	scheduleActiveProxyErrorPageRefresh();
}

function clearTabLoadTimeout(tab) {
	if (!tab || tab.loadTimeoutId === null) return;
	window.clearTimeout(tab.loadTimeoutId);
	tab.loadTimeoutId = null;
}

function setToolbarLoadProgress(progress) {
	if (!toolbarLoadBar) return;
	const safeProgress = Math.max(0, Math.min(1, Number(progress) || 0));
	toolbarLoadBar.style.setProperty(
		"--toolbar-load-progress",
		safeProgress.toFixed(4)
	);
}

function setToolbarLoadVisible(visible, kind = "navigate") {
	if (!toolbarShell) return;
	toolbarShell.dataset.loading = visible ? "true" : "false";
	toolbarShell.dataset.loadingKind = visible ? kind : "idle";
}

function stopToolbarLoadAnimation() {
	if (toolbarLoadAnimationFrame === null) return;
	window.cancelAnimationFrame(toolbarLoadAnimationFrame);
	toolbarLoadAnimationFrame = null;
}

function clearToolbarLoadHideTimer() {
	if (toolbarLoadHideTimer === null) return;
	window.clearTimeout(toolbarLoadHideTimer);
	toolbarLoadHideTimer = null;
}

function hideToolbarLoadIndicator({ immediate = false } = {}) {
	stopToolbarLoadAnimation();
	clearToolbarLoadHideTimer();

	if (immediate) {
		setToolbarLoadVisible(false);
		setToolbarLoadProgress(0);
		return;
	}

	toolbarLoadHideTimer = window.setTimeout(() => {
		setToolbarLoadVisible(false);
		setToolbarLoadProgress(0);
		toolbarLoadHideTimer = null;
	}, TOOLBAR_LOAD_FINISH_MS);
}

function getToolbarLoadProgress(elapsedMs, kind = "navigate") {
	const safeElapsed = Math.max(0, Number(elapsedMs) || 0);
	const initial = kind === "reload" ? 0.16 : 0.1;
	const ceiling = kind === "reload" ? 0.94 : 0.9;
	const pace = kind === "reload" ? 820 : 1180;
	return Math.min(
		ceiling,
		initial + (1 - Math.exp(-safeElapsed / pace)) * (ceiling - initial)
	);
}

function restartTabLoadTimeout(tab) {
	if (!tab || isStartTab(tab)) return;
	clearTabLoadTimeout(tab);
	tab.loadTimeoutId = window.setTimeout(() => {
		completeTabLoad(tab, { token: tab.loadToken });
	}, TOOLBAR_LOAD_TIMEOUT_MS);
}

function beginTabLoad(tab, { kind = "navigate" } = {}) {
	if (!tab || isStartTab(tab)) return 0;

	tab.loading = true;
	tab.loadKind = kind === "reload" ? "reload" : "navigate";
	tab.loadStartedAt = performance.now();
	tab.loadToken = Number(tab.loadToken || 0) + 1;
	restartTabLoadTimeout(tab);
	syncToolbarLoadIndicator();
	return tab.loadToken;
}

function completeTabLoad(
	tab,
	{ token = tab?.loadToken, immediate = false } = {}
) {
	if (!tab || Number(token) !== Number(tab.loadToken)) {
		return;
	}

	if (!tab.loading) {
		if (immediate && tab.id === activeTabId) {
			hideToolbarLoadIndicator({ immediate: true });
		}
		return;
	}

	const wasActive = tab.id === activeTabId;
	const kind = tab.loadKind || "navigate";

	clearTabLoadTimeout(tab);
	tab.loading = false;
	tab.loadKind = "navigate";
	tab.loadStartedAt = 0;

	if (!wasActive) {
		return;
	}

	stopToolbarLoadAnimation();
	clearToolbarLoadHideTimer();
	setToolbarLoadVisible(true, kind);
	setToolbarLoadProgress(1);

	if (immediate) {
		setToolbarLoadVisible(false);
		setToolbarLoadProgress(0);
		return;
	}

	toolbarLoadHideTimer = window.setTimeout(() => {
		const activeTab = getActiveTab();
		if (!activeTab || !activeTab.loading) {
			setToolbarLoadVisible(false);
			setToolbarLoadProgress(0);
		}
		toolbarLoadHideTimer = null;
	}, TOOLBAR_LOAD_FINISH_MS);
}

function syncToolbarLoadIndicator() {
	const activeTab = getActiveTab();
	if (!activeTab || isStartTab(activeTab)) {
		hideToolbarLoadIndicator({ immediate: true });
		return;
	}

	if (!activeTab.loading) {
		if (toolbarLoadHideTimer === null) {
			hideToolbarLoadIndicator({ immediate: true });
		}
		return;
	}

	clearToolbarLoadHideTimer();
	setToolbarLoadVisible(true, activeTab.loadKind || "navigate");
	stopToolbarLoadAnimation();

	const expectedToken = activeTab.loadToken;
	const step = () => {
		const currentTab = getActiveTab();
		if (
			!currentTab ||
			currentTab.id !== activeTab.id ||
			!currentTab.loading ||
			Number(currentTab.loadToken) !== Number(expectedToken)
		) {
			toolbarLoadAnimationFrame = null;
			return;
		}

		const elapsedMs = performance.now() - (currentTab.loadStartedAt || performance.now());
		setToolbarLoadVisible(true, currentTab.loadKind || "navigate");
		setToolbarLoadProgress(
			getToolbarLoadProgress(elapsedMs, currentTab.loadKind || "navigate")
		);
		toolbarLoadAnimationFrame = window.requestAnimationFrame(step);
	};

	setToolbarLoadProgress(
		getToolbarLoadProgress(
			performance.now() - (activeTab.loadStartedAt || performance.now()),
			activeTab.loadKind || "navigate"
		)
	);
	toolbarLoadAnimationFrame = window.requestAnimationFrame(step);
}

function removeTabFrame(tab) {
	completeTabLoad(tab, { immediate: true });
	if (!tab || !tab.frame || !tab.frame.frame) return;
	tab.frame.__googleSitesPatchCleanup?.();
	tab.frame.destroy?.();
	tab.frame.frame.remove();
	tab.frame = null;
	tab.frameBound = false;
	tab.loaded = false;
}

function removeAllTabFrames() {
	for (const tab of tabs) {
		removeTabFrame(tab);
	}
}

async function closeTabById(tabId) {
	const tabIndex = tabs.findIndex((tab) => tab.id === tabId);
	if (tabIndex < 0) return;

	const [closingTab] = tabs.splice(tabIndex, 1);
	removeTabFrame(closingTab);

	if (activeTabId !== tabId) {
		updateNavigationState();
		persistSessionState();
		return;
	}

	const fallbackTab = tabs[tabIndex] || tabs[tabIndex - 1] || null;
	if (!fallbackTab) {
		showHome();
		return;
	}

	await activateTabById(fallbackTab.id);
}

function syncFrameVisibility() {
	for (const tab of tabs) {
		if (!tab.frame || !tab.frame.frame) continue;
		const hidden = tab.id !== activeTabId;
		tab.frame.frame.hidden = hidden;
		tab.frame.frame.classList.toggle("sj-frame-hidden", hidden);
	}
}

function showHome({ clearAddress = false, skipPersist = false } = {}) {
	const previousSpeedContextKey = getActiveSpeedContext().key;
	let startTab = getStartTab();
	if (!startTab) {
		startTab = createPageTab({
			kind: "start",
			label: DEFAULT_START_LABEL,
			input: "",
			url: "",
		});
	}
	if (clearAddress) {
		startTab.input = "";
		startTab.label = formatTabLabel(DEFAULT_START_LABEL);
	}
	activeTabId = startTab.id;
	document.body.classList.remove("session-live");
	syncFrameVisibility();
	updateNavigationState();
	setAddressValue(startTab.input || "");
	if (!skipPersist) {
		persistSessionState();
	}
	if (getActiveSpeedContext().key !== previousSpeedContextKey) {
		scheduleHomepageBenchmarkRefresh();
	}
	focusAddress();
}

async function showSession() {
	const activeTab = getActiveTab();
	if (!activeTab) {
		showHome({ skipPersist: true });
		return;
	}
	if (isStartTab(activeTab)) {
		await activateTabById(activeTab.id, { skipPersist: true });
		return;
	}
	await ensureTabLoaded(activeTab);
	document.body.classList.add("session-live");
	syncFrameVisibility();
	updateNavigationState();
}

function createPageTab(saved = {}) {
	const tab = createTabModel(saved);
	tabs.push(tab);
	renderTabStrip();
	updateNavigationState();
	return tab;
}

function openStartTab({ label = DEFAULT_START_LABEL, input = "" } = {}) {
	const tab = createPageTab({
		kind: "start",
		label: label || DEFAULT_START_LABEL,
		input,
		url: "",
	});

	activeTabId = tab.id;
	document.body.classList.remove("session-live");
	setAddressValue(input || "");
	syncFrameVisibility();
	updateNavigationState();
	persistSessionState();
	focusAddress();
	return tab;
}

function resolvePopupUrl(input, baseUrl) {
	const raw = String(input || "").trim();
	if (!raw || raw === "about:blank" || raw.startsWith("javascript:")) {
		return "";
	}

	try {
		return new URL(raw, baseUrl || location.href).toString();
	} catch {
		return "";
	}
}

function getFrameVisibleBaseUrl(tab, frameWindow) {
	return decodeVisibleUrl(
		tab.engine,
		frameWindow?.location?.href || tab.url || location.href
	);
}

function decodeRequestedNavigationUrl(engine, rawUrl) {
	const value = String(rawUrl || "").trim();
	if (!value) {
		return "";
	}
	return decodeVisibleUrl(engine, value) || value;
}

function normalizeFrameNavigationTarget(target) {
	return String(target || "").trim().toLowerCase();
}

function shouldOpenNavigationInNewTab(target) {
	const normalizedTarget = normalizeFrameNavigationTarget(target);
	return (
		normalizedTarget &&
		normalizedTarget !== "_self" &&
			normalizedTarget !== "_top" &&
			normalizedTarget !== "_parent"
	);
}

function shouldInterceptTargetedNavigation(target) {
	return Boolean(normalizeFrameNavigationTarget(target));
}

function buildGetFormNavigationUrl(tab, frameWindow, form, submitter = null) {
	const actionUrl = resolvePopupUrl(
		decodeRequestedNavigationUrl(
			tab.engine,
			form.getAttribute("action") ||
				form.action ||
				frameWindow.location?.href ||
				tab.url ||
				location.href
		),
		getFrameVisibleBaseUrl(tab, frameWindow)
	);
	if (!actionUrl) {
		return "";
	}

	const nextUrl = new URL(actionUrl);
	let formData;
	try {
		formData =
			submitter && typeof frameWindow.FormData === "function"
				? new frameWindow.FormData(form, submitter)
				: new frameWindow.FormData(form);
	} catch {
		formData = new frameWindow.FormData(form);
	}

	for (const [key, value] of formData.entries()) {
		if (typeof value !== "string") continue;
		nextUrl.searchParams.append(key, value);
	}

	return nextUrl.toString();
}

function routeFrameNavigation(
	tab,
	frameWindow,
	nextUrl,
	target = "",
	{ defaultToNewTab = false } = {}
) {
	const resolvedUrl = resolvePopupUrl(
		decodeRequestedNavigationUrl(tab.engine, nextUrl),
		getFrameVisibleBaseUrl(tab, frameWindow)
	);
	if (!resolvedUrl) {
		return null;
	}

	const normalizedTarget = normalizeFrameNavigationTarget(target);
	const openInNewTab = normalizedTarget
		? shouldOpenNavigationInNewTab(normalizedTarget)
		: Boolean(defaultToNewTab);

	const navigationTask = openInNewTab
		? openTabWithUrl(resolvedUrl, {
				input: resolvedUrl,
				activate: true,
				engine: tab.engine,
				routeProfile: tab.routeProfile,
			})
		: navigateTabToUrl(tab, resolvedUrl, {
				input: resolvedUrl,
				engine: tab.engine,
				routeProfile: tab.routeProfile,
			});

	navigationTask.catch((err) => console.warn(err));
	return frameWindow;
}

function getPreferredUserLaunchEngine() {
	return sanitizeEngine(currentSelectedEngine);
}

function getPreferredRouteProfileForLaunch(activeTab, engine) {
	if (activeTab && isPageTab(activeTab)) {
		return sanitizeRouteProfile(activeTab.routeProfile);
	}
	return getHomepageRouteProfile(engine);
}

async function resolveLaunchEngine(
	engine = currentSelectedEngine,
	targetUrl = "",
	{ routeProfile = DEFAULT_ROUTE_PROFILE } = {}
) {
	const requestedEngine = sanitizeEngine(engine);
	const hostname = getUrlHostname(targetUrl);
	const resolvedRouteProfile = sanitizeRouteProfile(routeProfile);
	const buildLaunchResolution = (nextRuntimeEngine) => {
		const safeRuntimeEngine = sanitizeRuntimeEngine(nextRuntimeEngine);
		return {
			runtimeEngine: safeRuntimeEngine,
			forceMobileSites:
				safeRuntimeEngine === "rammerhead" &&
				shouldForceMobileSitesForHostname(hostname),
		};
	};
	const forcedCompatibilityEngine = getForcedCompatibilityRuntimeEngine(
		requestedEngine,
		hostname,
		{
			routeProfile: resolvedRouteProfile,
		}
	);
	if (forcedCompatibilityEngine) {
		return buildLaunchResolution(forcedCompatibilityEngine);
	}
	if (shouldUseHolyLtsRouting(resolvedRouteProfile, requestedEngine)) {
		const safariCompatibilityEngine = getSafariWebKitCompatibilityEngine(
			requestedEngine,
			hostname
		);
		if (
			safariCompatibilityEngine &&
			HOLY_LTS_ENGINE_SET.has(sanitizeEngine(safariCompatibilityEngine))
		) {
			return buildLaunchResolution(safariCompatibilityEngine);
		}
		return buildLaunchResolution(requestedEngine);
	}
	const compatibilityEngine = getCompatibilityRuntimeEngine(
		requestedEngine,
		targetUrl
	);
	if (compatibilityEngine) {
		return buildLaunchResolution(compatibilityEngine);
	}
	if (requestedEngine !== "bolt") {
		return buildLaunchResolution(requestedEngine);
	}

	const currentBolt = deriveBoltBenchmark();
	if (!currentBolt.ok) {
		return buildLaunchResolution(DEFAULT_ENGINE);
	}

	const resolvedBolt = deriveBoltBenchmark();
	return buildLaunchResolution(
		INTERNAL_BOLT_ENGINES.includes(resolvedBolt.runtimeEngine)
			? resolvedBolt.runtimeEngine
			: "ultraviolet"
	);
}

async function openTabWithUrl(
	url,
	{
		input = "",
		activate = true,
		engine = currentSelectedEngine,
		routeProfile = DEFAULT_ROUTE_PROFILE,
	} = {}
) {
	const previousSpeedContextKey = getActiveSpeedContext().key;
	const targetUrl = String(url || "").trim();
	if (!targetUrl) {
		return null;
	}

	cancelEngineBenchmarks();
	const resolvedRouteProfile = sanitizeRouteProfile(routeProfile);
	const { runtimeEngine, forceMobileSites } = await resolveLaunchEngine(
		engine,
		targetUrl,
		{
			routeProfile: resolvedRouteProfile,
		}
	);
	const launchUrl = normalizeRuntimeLaunchUrl(runtimeEngine, targetUrl, {
		forceMobileSites,
	});
	const runtimeReadyPromise = prewarmLaunchPath(runtimeEngine, {
		routeProfile: resolvedRouteProfile,
	});

	const tab = createPageTab({
		engine: runtimeEngine,
		routeProfile: resolvedRouteProfile,
		forceMobileSites,
		input: String(input || targetUrl).trim() || targetUrl,
		url: launchUrl,
		label: formatTabLabelFromUrl(launchUrl, input || targetUrl),
	});

	await ensureTabFrame(tab);
	if (activate) {
		activeTabId = tab.id;
		document.body.classList.add("session-live");
		setAddressValue(launchUrl);
	}
	const loadToken = activate ? beginTabLoad(tab, { kind: "navigate" }) : 0;
	syncFrameVisibility();
	try {
		const prewarmReady = await runtimeReadyPromise;
		if (!prewarmReady) {
			await ensureRuntimeReady(runtimeEngine, {
				requireProxyStatus: false,
				requireConnectionProbe: false,
				backgroundConnectionProbe: false,
				backgroundProxyStatus: false,
			});
		}
		maybeEnableGoogleSitesPatch(tab, launchUrl);
		await tab.frame.go(launchUrl);
		tab.loaded = true;
		if (!tab.frame?.frame) {
			await ensureTabFrame(tab);
		}
		if (tab.frame?.frame) {
			tab.frame.frame.title = tab.label || "Nitro Result";
		}
		setStatus("launch", "ready", "Working");
		updateNavigationState();
		persistSessionState();
		if (activate && getActiveSpeedContext().key !== previousSpeedContextKey) {
			scheduleContextSpeedRefresh({ force: true });
		}
	} catch (err) {
		if (loadToken) {
			completeTabLoad(tab, { token: loadToken, immediate: true });
		}
		throw err;
	}
	return tab;
}

async function navigateTabToUrl(
	tab,
	url,
	{
		input = "",
		engine = currentSelectedEngine,
		routeProfile = tab?.routeProfile || DEFAULT_ROUTE_PROFILE,
	} = {}
) {
	if (!tab) {
		return openTabWithUrl(url, {
			input,
			activate: true,
			engine,
			routeProfile,
		});
	}

	const previousSpeedContextKey = getActiveSpeedContext().key;
	const targetUrl = String(url || "").trim();
	if (!targetUrl) {
		return null;
	}

	cancelEngineBenchmarks();
	const resolvedRouteProfile = sanitizeRouteProfile(routeProfile);
	const { runtimeEngine, forceMobileSites } = await resolveLaunchEngine(
		engine,
		targetUrl,
		{
			routeProfile: resolvedRouteProfile,
		}
	);
	const launchUrl = normalizeRuntimeLaunchUrl(runtimeEngine, targetUrl, {
		forceMobileSites,
	});
	const runtimeReadyPromise = prewarmLaunchPath(runtimeEngine, {
		routeProfile: resolvedRouteProfile,
	});

	tab.kind = "page";
	if (tab.engine !== runtimeEngine) {
		removeTabFrame(tab);
		tab.engine = runtimeEngine;
	}
	resetTabTransientRetryState(tab);
	tab.routeProfile = resolvedRouteProfile;
	tab.forceMobileSites = Boolean(forceMobileSites);
	tab.input = String(input || targetUrl).trim() || targetUrl;
	tab.url = launchUrl;
	tab.label = formatTabLabelFromUrl(launchUrl, tab.input);
	tab.loaded = false;

	await ensureTabFrame(tab);
	activeTabId = tab.id;
	document.body.classList.add("session-live");
	setAddressValue(launchUrl);
	const loadToken = beginTabLoad(tab, { kind: "navigate" });
	syncFrameVisibility();
	try {
		const prewarmReady = await runtimeReadyPromise;
		if (!prewarmReady) {
			await ensureRuntimeReady(runtimeEngine, {
				requireProxyStatus: false,
				requireConnectionProbe: false,
				backgroundConnectionProbe: false,
				backgroundProxyStatus: false,
			});
		}
		maybeEnableGoogleSitesPatch(tab, launchUrl);
		await tab.frame.go(launchUrl);
		tab.loaded = true;
		if (!tab.frame?.frame) {
			await ensureTabFrame(tab);
		}
		if (tab.frame?.frame) {
			tab.frame.frame.title = tab.label || "Nitro Result";
		}
		setStatus("launch", "ready", "Working");
		updateNavigationState();
		persistSessionState();
		if (getActiveSpeedContext().key !== previousSpeedContextKey) {
			scheduleContextSpeedRefresh({ force: true });
		}
	} catch (err) {
		completeTabLoad(tab, { token: loadToken, immediate: true });
		throw err;
	}
	return tab;
}

function turnTabIntoStart(tab, { label = DEFAULT_START_LABEL, input = "" } = {}) {
	if (!tab) {
		return openStartTab({ label, input });
	}

	const previousSpeedContextKey = getActiveSpeedContext().key;
	removeTabFrame(tab);
	tab.kind = "start";
	resetTabTransientRetryState(tab);
	tab.input = String(input || "").trim();
	tab.url = "";
	completeTabLoad(tab, { immediate: true });
	tab.loaded = false;
	tab.label = formatTabLabel(label || tab.input || DEFAULT_START_LABEL);
	activeTabId = tab.id;
	document.body.classList.remove("session-live");
	setAddressValue(tab.input || "");
	syncFrameVisibility();
	updateNavigationState();
	persistSessionState();
	if (getActiveSpeedContext().key !== previousSpeedContextKey) {
		scheduleHomepageBenchmarkRefresh();
	}
	focusAddress();
	return tab;
}

function getHomePagePreference() {
	return {
		input: currentHomePageInput,
		url: resolvePagePreferenceUrl(currentHomePageInput),
	};
}

function getNewTabPagePreference() {
	return {
		input: currentNewTabPageInput,
		url: resolvePagePreferenceUrl(currentNewTabPageInput),
	};
}

function hydrateTabsFromState(sessionState) {
	const safeState = sanitizeSessionState(sessionState);

	sessionRestoring = true;
	try {
		removeAllTabFrames();
		tabs = safeState.tabs.map((tab) => createTabModel(tab));
		activeTabId = safeState.activeTabId;
		setAddressValue(safeState.addressValue || "");
		document.body.classList.remove("session-live");
		renderTabStrip();
		updateNavigationState();
	} finally {
		sessionRestoring = false;
	}
}

function updateTabMetadata(
	tab,
	url,
	fallbackLabel,
	{ previousUrl = tab?.url || "" } = {}
) {
	if (!tab) return;
	if (url) {
		tab.url = String(url);
		tab.input = String(url);
	}
	tab.label = formatTabLabelFromUrl(tab.url, fallbackLabel || tab.input || tab.url);
	if (tab.id === activeTabId) {
		setAddressValue(tab.url || tab.input);
		if (getUrlHostname(previousUrl) !== getUrlHostname(tab.url || "")) {
			scheduleContextSpeedRefresh({ force: true });
		}
	}
	if (tab.frame && tab.frame.frame) {
		tab.frame.frame.title = tab.label || "Nitro Result";
	}
	renderTabStrip();
	updateNavigationState();
	persistSessionState();
}

async function fetchTextResponse(url) {
	const response = await fetch(url, {
		cache: "no-store",
		credentials: "same-origin",
	});
	if (!response.ok) {
		throw new Error(`Request failed: ${response.status}`);
	}
	return response.text();
}

async function ensureRammerheadSession({ forceValidate = false } = {}) {
	if (rammerheadSessionPromise && !forceValidate) {
		return rammerheadSessionPromise;
	}

	rammerheadSessionPromise = (async () => {
		let sessionId = readStoredRammerheadSession();

		if (sessionId && !forceValidate && hasFreshRammerheadSessionValidation(sessionId)) {
			return sessionId;
		}

		if (sessionId) {
			try {
				const existing = await fetchTextResponse(
					`/sessionexists?id=${encodeURIComponent(sessionId)}`
				);
				if (existing.trim() === "exists") {
					markRammerheadSessionValidated(sessionId);
					return sessionId;
				}
			} catch (err) {
				console.warn(err);
			}
		}

		sessionId = await fetchValidRammerheadSessionId("Rammerhead");

		await fetchTextResponse(
			`/editsession?id=${encodeURIComponent(sessionId)}&enableShuffling=0`
		);
		rememberRammerheadSession(sessionId);
		markRammerheadSessionValidated(sessionId);
		return sessionId;
	})();

	try {
		return await rammerheadSessionPromise;
	} finally {
		rammerheadSessionPromise = null;
	}
}

function isValidRammerheadSessionId(value) {
	return RAMMERHEAD_SESSION_ID_PATTERN.test(String(value || "").trim());
}

async function fetchValidRammerheadSessionId(label = "Rammerhead") {
	let lastError = null;
	let lastResponse = "";

	for (
		let attempt = 1;
		attempt <= RAMMERHEAD_SESSION_REQUEST_MAX_ATTEMPTS;
		attempt += 1
	) {
		try {
			const nextSessionId = (await fetchTextResponse("/newsession")).trim();
			if (isValidRammerheadSessionId(nextSessionId)) {
				return nextSessionId;
			}
			lastResponse = nextSessionId;
		} catch (error) {
			lastError = error;
		}

		if (attempt < RAMMERHEAD_SESSION_REQUEST_MAX_ATTEMPTS) {
			await sleep(RAMMERHEAD_SESSION_RETRY_DELAY_MS * attempt);
		}
	}

	if (lastError) {
		throw lastError;
	}

	throw new Error(
		`${label} did not create a valid session.${
			lastResponse ? ` Last response: ${lastResponse.slice(0, 160)}` : ""
		}`
	);
}

function shouldBypassRammerheadProxy(url) {
	try {
		const targetUrl = new URL(String(url || ""), location.origin);
		return (
			targetUrl.origin === location.origin &&
			RAMMERHEAD_LOCAL_BYPASS_PATHS.has(targetUrl.pathname)
		);
	} catch {
		return false;
	}
}

async function buildEngineNavigationUrl(
	engine,
	url,
	routeProfile = DEFAULT_ROUTE_PROFILE
) {
	const targetUrl = String(url || "").trim();
	if (shouldUseHolyLtsRouting(routeProfile, engine)) {
		switch (String(engine || "")) {
			case "ultraviolet":
				return encodeHolyUltravioletUrl(targetUrl);
			case "rammerhead":
				return encodeHolyRammerheadUrl(targetUrl);
			default:
				return encodeHolyScramjetUrl(targetUrl);
		}
	}
	switch (String(engine || "")) {
		case "ultraviolet":
			return encodeUltravioletUrl(targetUrl);
		case "rammerhead": {
			if (shouldBypassRammerheadProxy(targetUrl)) {
				return new URL(targetUrl, location.origin).toString();
			}
			const sessionId = await ensureRammerheadSession();
			return `/${sessionId}!f/${encodeURI(targetUrl)}`;
		}
		default:
			return scramjet.encodeUrl(targetUrl);
	}
}

function createFrameEvent(type, detail = {}) {
	const event = new CustomEvent(type, { detail });
	for (const [key, value] of Object.entries(detail)) {
		event[key] = value;
	}
	return event;
}

function createIframeProxyFrame(tab) {
	const frame = document.createElement("iframe");
	const emitter = new EventTarget();
	let destroyed = false;
	let lastVisibleUrl = String(tab.url || "");

	function dispatch(type, detail = {}) {
		emitter.dispatchEvent(createFrameEvent(type, detail));
	}

	function readVisibleUrl() {
		try {
			const href = frame.contentWindow?.location?.href;
			if (!href) return lastVisibleUrl;
			return decodeVisibleUrl(tab.engine, href) || lastVisibleUrl;
		} catch {
			return lastVisibleUrl;
		}
	}

	function handleLoadedFrame() {
		const nextUrl = readVisibleUrl();
		if (nextUrl && nextUrl !== lastVisibleUrl) {
			lastVisibleUrl = nextUrl;
			dispatch("urlchange", { url: nextUrl });
		}
		dispatch("contextInit", { window: frame.contentWindow });
	}

	frame.addEventListener("load", handleLoadedFrame);

	const pollId = window.setInterval(() => {
		if (destroyed) return;
		const nextUrl = readVisibleUrl();
		if (nextUrl && nextUrl !== lastVisibleUrl) {
			lastVisibleUrl = nextUrl;
			dispatch("urlchange", { url: nextUrl });
		}
	}, 850);

	return {
		frame,
		addEventListener(type, listener, options) {
			emitter.addEventListener(type, listener, options);
		},
		removeEventListener(type, listener, options) {
			emitter.removeEventListener(type, listener, options);
		},
		async go(targetUrl) {
			const cleanTarget = String(targetUrl || "").trim();
			lastVisibleUrl = cleanTarget;
			applyMobileSiteOverridesToWindow(frame.contentWindow || null, {
				force: true,
				tab,
			});
			frame.src = await buildEngineNavigationUrl(
				tab.engine,
				cleanTarget,
				tab.routeProfile
			);
			dispatch("navigate", { url: cleanTarget });
		},
		back() {
			try {
				frame.contentWindow?.history.back();
			} catch (err) {
				console.warn(err);
			}
		},
		forward() {
			try {
				frame.contentWindow?.history.forward();
			} catch (err) {
				console.warn(err);
			}
		},
		reload() {
			try {
				frame.contentWindow?.location.reload();
			} catch (err) {
				console.warn(err);
			}
		},
		destroy() {
			destroyed = true;
			window.clearInterval(pollId);
		},
	};
}

async function createProxyFrame(tab) {
	if (
		String(tab.engine || "") === "scramjet" &&
		!shouldUseHolyLtsRouting(tab.routeProfile, tab.engine)
	) {
		const ready = await initCore();
		if (!ready || !scramjet) {
			throw new Error("Search core failed to load.");
		}
		return scramjet.createFrame();
	}

	return createIframeProxyFrame(tab);
}

function bindTabPopupHooks(tab, frameWindow) {
	if (!frameWindow || frameWindow.__oceanPopupHooksApplied) {
		return;
	}

	frameWindow.__oceanPopupHooksApplied = true;

	const openProxy = function popupBridge(nextUrl = "", target = "", features = "") {
		return routeFrameNavigation(tab, frameWindow, nextUrl, target, {
			defaultToNewTab: true,
		});
	};

	try {
		frameWindow.open = openProxy;
	} catch (err) {
		console.warn(err);
	}

	try {
		frameWindow.document?.addEventListener(
			"submit",
			(event) => {
				const form = event.target;
				if (
					!form ||
					String(form.tagName || "").toLowerCase() !== "form" ||
					typeof frameWindow.FormData !== "function"
				) {
					return;
				}

				const target =
					form.getAttribute?.("target") || form.target || "";
				const method = String(form.getAttribute?.("method") || form.method || "get")
					.trim()
					.toLowerCase();
				if (method !== "get") {
					return;
				}

				const resolvedUrl = buildGetFormNavigationUrl(
					tab,
					frameWindow,
					form,
					event.submitter || null
				);
				if (!resolvedUrl) return;

				event.preventDefault();
				event.stopPropagation();
				routeFrameNavigation(tab, frameWindow, resolvedUrl, target, {
					defaultToNewTab: false,
				});
			},
			true
		);

		frameWindow.document?.addEventListener(
			"click",
			(event) => {
				const link = findClosestLink(event.target);
				if (!link) return;

				const target = link.getAttribute("target") || link.target || "";
				if (!shouldInterceptTargetedNavigation(target)) return;

				event.preventDefault();
				event.stopPropagation();
				routeFrameNavigation(
					tab,
					frameWindow,
					link.getAttribute("href") || link.href,
					target
				);
			},
			true
		);
	} catch (err) {
		console.warn(err);
	}
}

function bindTabFrameEvents(tab) {
	if (!tab || !tab.frame || tab.frameBound) return;
	tab.frameBound = true;

	tab.frame.addEventListener("navigate", (event) => {
		const previousUrl = tab.url;
		const nextUrl =
			event?.detail?.url || (event && event.url ? String(event.url) : tab.url);
		if (!tab.loading) {
			beginTabLoad(tab, { kind: "navigate" });
		}
		updateTabMetadata(tab, nextUrl, nextUrl, { previousUrl });
	});

	tab.frame.addEventListener("urlchange", (event) => {
		const previousUrl = tab.url;
		const nextUrl =
			event?.detail?.url || (event && event.url ? String(event.url) : tab.url);
		const nextUrlChanged = Boolean(nextUrl && nextUrl !== previousUrl);
		if (nextUrlChanged) {
			tab.loaded = false;
			if (!tab.loading) {
				beginTabLoad(tab, { kind: "navigate" });
			} else {
				restartTabLoadTimeout(tab);
				syncToolbarLoadIndicator();
			}
		}
		updateTabMetadata(tab, nextUrl, nextUrl, { previousUrl });
	});

	tab.frame.frame?.addEventListener("load", () => {
		applyMobileSiteOverridesToWindow(tab.frame?.frame?.contentWindow || null, {
			force: true,
			tab,
		});
		tab.loaded = true;
		completeTabLoad(tab);
		maybeAutoRecoverProxyError(tab);
		if (tab.id === activeTabId) {
			scheduleActiveProxyErrorPageRefresh();
		}
	});

	tab.frame.addEventListener("contextInit", (event) => {
		const frameWindow = event?.detail?.window || event.window;
		applyMobileSiteOverridesToWindow(frameWindow, { force: true, tab });
		bindTabPopupHooks(tab, frameWindow);
	});
}

async function ensureTabFrame(tab) {
	if (!tab) return null;
	if (isStartTab(tab)) return null;
	if (tab.frame && tab.frame.frame && document.body.contains(tab.frame.frame)) {
		return tab.frame;
	}

	tab.frame = await createProxyFrame(tab);
	tab.frame.frame.id = `sj-frame-${tab.id}`;
	tab.frame.frame.title = tab.label || "Nitro Result";
	tab.frame.frame.classList.add("sj-frame", "sj-frame-hidden");
	tab.frame.frame.hidden = true;
	(frameStage || document.body).appendChild(tab.frame.frame);
	bindTabFrameEvents(tab);
	return tab.frame;
}

async function ensureTabLoaded(tab) {
	if (!tab || isStartTab(tab) || !tab.url) return;
	const loadToken =
		!tab.loaded && tab.id === activeTabId
			? beginTabLoad(tab, { kind: "navigate" })
			: 0;
	try {
		const prewarmReady = await prewarmLaunchPath(tab.engine, {
			routeProfile: tab.routeProfile,
		});
		if (!prewarmReady) {
			await ensureRuntimeReady(tab.engine, {
				requireProxyStatus: false,
				requireConnectionProbe: false,
				backgroundConnectionProbe: false,
				backgroundProxyStatus: false,
			});
		}
	} catch (err) {
		if (loadToken) {
			completeTabLoad(tab, { token: loadToken, immediate: true });
		}
		throw err;
	}
	const frame = await ensureTabFrame(tab);
	if (!tab.loaded) {
		try {
			maybeEnableGoogleSitesPatch(tab, tab.url);
			await tab.frame.go(tab.url);
			tab.loaded = true;
		} catch (err) {
			if (loadToken) {
				completeTabLoad(tab, { token: loadToken, immediate: true });
			}
			throw err;
		}
	}
	tab.frame.frame.title = tab.label || "Nitro Result";
}

async function activateTabById(tabId, { skipPersist = false } = {}) {
	const previousSpeedContextKey = getActiveSpeedContext().key;
	const tab = getTabById(tabId);
	if (!tab) return;
	if (isStartTab(tab)) {
		activeTabId = tab.id;
		document.body.classList.remove("session-live");
		setAddressValue(tab.input || "");
		syncFrameVisibility();
		updateNavigationState();
		if (!skipPersist) {
			persistSessionState();
		}
		if (getActiveSpeedContext().key !== previousSpeedContextKey) {
			scheduleHomepageBenchmarkRefresh();
		}
		focusAddress();
		return;
	}
	activeTabId = tab.id;
	await ensureTabLoaded(tab);
	document.body.classList.add("session-live");
	setAddressValue(tab.url || tab.input);
	syncFrameVisibility();
	updateNavigationState();
	if (!skipPersist) {
		persistSessionState();
	}
	setStatus("launch", "ready", "Working");
	if (getActiveSpeedContext().key !== previousSpeedContextKey) {
		scheduleContextSpeedRefresh({ force: true });
	}
}

function getTunnelUrl() {
	return (
		(location.protocol === "https:" ? "wss" : "ws") +
		"://" +
		location.host +
		"/wisp/"
	);
}

function sanitizeTransportConnections(
	connections,
	fallback = DEFAULT_LIBCURL_CONNECTIONS
) {
	const fallbackValues = Array.isArray(fallback)
		? fallback.map((value) => Math.max(1, Math.round(Number(value) || 1)))
		: [96, 72, 12];
	const rawValues = Array.isArray(connections) ? connections : fallbackValues;
	const [hardLimit, cacheLimit, hostLimit] = rawValues
		.slice(0, 3)
		.map((value, index) => {
			const fallbackValue = fallbackValues[index] || fallbackValues[0] || 1;
			const parsed = Number(value);
			return Number.isFinite(parsed) && parsed > 0
				? Math.round(parsed)
				: fallbackValue;
		});
	const safeHardLimit = Math.max(1, hardLimit);
	const safeCacheLimit = Math.max(1, Math.min(cacheLimit, safeHardLimit));
	const safeHostLimit = Math.max(1, Math.min(hostLimit, safeHardLimit));
	return [safeHardLimit, safeCacheLimit, safeHostLimit];
}

function getPreferredTransportConnections(
	connections = DEFAULT_LIBCURL_CONNECTIONS,
	userAgent = navigator.userAgent
) {
	const safeConnections = sanitizeTransportConnections(connections);
	if (!isSafariWebKitUserAgent(userAgent)) {
		return safeConnections;
	}
	const [safeHardLimit, safeCacheLimit, safeHostLimit] =
		sanitizeTransportConnections(SAFARI_WEBKIT_CONNECTIONS);
	return [
		Math.min(safeConnections[0], safeHardLimit),
		Math.min(safeConnections[1], safeCacheLimit),
		Math.min(safeConnections[2], safeHostLimit),
	];
}

function sanitizeTransportKey(mode) {
	const nextMode = String(mode || "").trim().toLowerCase();
	return DEFAULT_TRANSPORT_ORDER.includes(nextMode)
		? nextMode
		: LIBCURL_TRANSPORT_KEY;
}

function getTransportLabel(mode) {
	const safeMode = sanitizeTransportKey(mode);
	return safeMode === EPOXY_TRANSPORT_KEY ? "Epoxy" : "Libcurl";
}

function normalizeTransportOrder(
	order,
	defaultMode = LIBCURL_TRANSPORT_KEY
) {
	const safeDefaultMode = sanitizeTransportKey(defaultMode);
	const orderedModes = [];
	const seenModes = new Set();
	const sourceModes = Array.isArray(order) ? order : DEFAULT_TRANSPORT_ORDER;

	for (const candidate of [safeDefaultMode, ...sourceModes, ...DEFAULT_TRANSPORT_ORDER]) {
		const safeCandidate = sanitizeTransportKey(candidate);
		if (seenModes.has(safeCandidate)) {
			continue;
		}
		seenModes.add(safeCandidate);
		orderedModes.push(safeCandidate);
	}

	return orderedModes;
}

function getTransportModulePath(mode, payload) {
	const safeMode = sanitizeTransportKey(mode);
	const payloadModules =
		payload &&
		typeof payload === "object" &&
		payload.transports &&
		typeof payload.transports === "object" &&
		payload.transports.modules &&
		typeof payload.transports.modules === "object"
			? payload.transports.modules
			: null;
	const configuredPath =
		payloadModules && typeof payloadModules[safeMode] === "string"
			? payloadModules[safeMode].trim()
			: "";
	return configuredPath || TRANSPORT_MODULES[safeMode] || "";
}

function buildTransportStrategy(mode, payload) {
	const safeMode = sanitizeTransportKey(mode);
	const modulePath = getTransportModulePath(safeMode, payload);
	if (!modulePath) {
		return null;
	}

	const wispUrl = getTunnelUrl();
	const proxy =
		payload && typeof payload.proxy === "string" ? payload.proxy.trim() : "";
	const option =
		safeMode === EPOXY_TRANSPORT_KEY
			? {
					wisp: wispUrl,
				}
			: {
					websocket: wispUrl,
					connections: getPreferredTransportConnections(payload?.connections),
					userAgent: buildPreferredProxyTransportUserAgent(),
				};

	if (proxy) {
		option.proxy = proxy;
	}

	return {
		key: safeMode,
		module: modulePath,
		options: [option],
	};
}

function cloneTransportOptions(options) {
	if (!Array.isArray(options)) {
		return [];
	}
	return options
		.map((entry) => {
			if (!entry || typeof entry !== "object") {
				return null;
			}
			return {
				key: sanitizeTransportKey(entry.key),
				module: typeof entry.module === "string" ? entry.module : "",
				options: Array.isArray(entry.options)
					? entry.options.map((option) =>
							option && typeof option === "object" ? { ...option } : option
						)
					: [],
			};
		})
		.filter(Boolean);
}

function reorderTransportOptions(options, preferredMode = "") {
	const safeOptions = cloneTransportOptions(options);
	const safePreferredMode = preferredMode
		? sanitizeTransportKey(preferredMode)
		: "";
	if (!safePreferredMode) {
		return safeOptions;
	}
	return safeOptions.sort((left, right) => {
		const leftScore = left?.key === safePreferredMode ? 0 : 1;
		const rightScore = right?.key === safePreferredMode ? 0 : 1;
		return leftScore - rightScore;
	});
}

function hasFreshTransportOptions(maxAgeMs = TRANSPORT_CONFIG_CACHE_MS) {
	return (
		Array.isArray(cachedTransportOptions) &&
		cachedTransportOptions.length > 0 &&
		cachedTransportOptionsAt > 0 &&
		Date.now() - cachedTransportOptionsAt < Math.max(1000, Number(maxAgeMs) || 0)
	);
}

function invalidateTransportOptionsCache() {
	cachedTransportOptions = null;
	cachedTransportOptionsAt = 0;
}

async function fetchTransportOptions(
	{ force = false, preferredMode = "" } = {}
) {
	if (!force && hasFreshTransportOptions()) {
		return reorderTransportOptions(cachedTransportOptions, preferredMode);
	}

	if (transportConfigPromise && !force) {
		return reorderTransportOptions(await transportConfigPromise, preferredMode);
	}

	const requestPromise = (async () => {
		let payload = null;

		try {
			const response = await fetch("/transport-config", {
				cache: "no-store",
				credentials: "same-origin",
			});
			if (response.ok) {
				payload = await response.json();
				cachedHolyTransportStatus = normalizeHolyTransportStatus(payload);
				cachedHolyTransportStatusAt = Date.now();
			}
		} catch {
			// Keep the direct websocket transport fallback below.
		}

		const order = normalizeTransportOrder(
			payload?.transports?.order,
			payload?.transports?.default || payload?.defaultMode || LIBCURL_TRANSPORT_KEY
		);
		const options = order
			.map((mode) => buildTransportStrategy(mode, payload))
			.filter(Boolean);
		cachedTransportOptions = cloneTransportOptions(options);
		cachedTransportOptionsAt = Date.now();
		return options;
	})();

	transportConfigPromise = requestPromise;
	try {
		return reorderTransportOptions(await requestPromise, preferredMode);
	} finally {
		if (transportConfigPromise === requestPromise) {
			transportConfigPromise = null;
		}
	}
}

function hasSwControllerReloadFlag() {
	try {
		return sessionStorage.getItem(STORAGE_KEYS.swControllerReloaded) === "1";
	} catch {
		return false;
	}
}

function setSwControllerReloadFlag(enabled) {
	try {
		if (enabled) {
			sessionStorage.setItem(STORAGE_KEYS.swControllerReloaded, "1");
			return;
		}
		sessionStorage.removeItem(STORAGE_KEYS.swControllerReloaded);
	} catch {
		// ignored
	}
}

function setUiError(message, detail) {
	if (error) {
		error.textContent = message || "";
	}
	if (detail) {
		console.error(detail);
	}
}

function clearUiError() {
	setUiError("", "");
}

async function initCore() {
	if (scramjet && connection) {
		setStatus("core", "ready", "Working");
		if (!Number.isFinite(currentLatency.core)) {
			setStatusLatency("core", 1);
		}
		return true;
	}
	if (coreInitPromise) {
		return coreInitPromise;
	}

	coreInitPromise = (async () => {
		const startedAt = performance.now();
		try {
			if (typeof $scramjetLoadController !== "function") {
				throw new Error("Search core script did not load.");
			}

			if (
				typeof BareMux === "undefined" ||
				typeof BareMux.BareMuxConnection !== "function"
			) {
				throw new Error("Connection layer did not load.");
			}

			const { ScramjetController } = $scramjetLoadController();
			scramjet = new ScramjetController({
				files: {
					wasm: "/scram/scramjet.wasm.wasm",
					all: "/scram/scramjet.all.js",
					sync: "/scram/scramjet.sync.js",
				},
			});

			await scramjet.init();
			connection = new BareMux.BareMuxConnection("/baremux/worker.js");
			setStatus("core", "ready", "Working");
			setStatusLatency("core", performance.now() - startedAt);
			return true;
		} catch (err) {
			setStatus("core", "issue", "Unavailable");
			setStatusLatency("core", performance.now() - startedAt);
			setUiError("Nitro is not ready right now.", err);
			return false;
		} finally {
			coreInitPromise = null;
			refreshLaunchStatus();
		}
	})();

	return coreInitPromise;
}

async function ensureServiceWorker() {
	if (workerReadyPromise) {
		return workerReadyPromise;
	}

	workerReadyPromise = (async () => {
		const startedAt = performance.now();
		setStatus("worker", "checking", "Checking");

		try {
			await registerSW();
			await navigator.serviceWorker.ready;
			if (!navigator.serviceWorker.controller) {
				const controllerReady = await new Promise((resolve) => {
					let settled = false;
					const timeoutId = window.setTimeout(() => finish(false), SW_CONTROLLER_TIMEOUT_MS);

					function finish(value) {
						if (settled) return;
						settled = true;
						window.clearTimeout(timeoutId);
						navigator.serviceWorker.removeEventListener("controllerchange", handleControllerChange);
						resolve(value);
					}

					function handleControllerChange() {
						finish(Boolean(navigator.serviceWorker.controller));
					}

					navigator.serviceWorker.addEventListener(
						"controllerchange",
						handleControllerChange
					);

					if (navigator.serviceWorker.controller) {
						finish(true);
					}
				});

				if (!controllerReady) {
					if (!hasSwControllerReloadFlag()) {
						setSwControllerReloadFlag(true);
						location.reload();
						await new Promise(() => {});
					}
					throw new Error("Service worker did not take control of the page.");
				}
			}

			setSwControllerReloadFlag(false);
			await syncServiceWorkerMobileSitesPreference();
			setStatus("worker", "ready", "Working");
			setStatusLatency("worker", performance.now() - startedAt);
		} catch (err) {
			setStatus("worker", "issue", "Unavailable");
			setStatusLatency("worker", performance.now() - startedAt);
			workerReadyPromise = null;
			throw err;
		} finally {
			refreshLaunchStatus();
		}
	})();

	return workerReadyPromise;
}

function probeTunnel() {
	return new Promise((resolve) => {
		let settled = false;
		let socket;
		let timeoutId;
		const startedAt = performance.now();

		function finish(ok, text) {
			if (settled) return;
			settled = true;
			clearTimeout(timeoutId);
			try {
				if (socket) socket.close();
			} catch {
				// ignored
			}
			resolve({
				ok,
				text,
				latency: performance.now() - startedAt,
			});
		}

		try {
			socket = new WebSocket(getTunnelUrl());
			timeoutId = setTimeout(() => finish(false, "Unavailable"), 2500);
			socket.addEventListener("open", () => finish(true, "Working"), {
				once: true,
			});
			socket.addEventListener("error", () => finish(false, "Unavailable"), {
				once: true,
			});
			socket.addEventListener(
				"close",
				() => {
					if (!settled) finish(false, "Unavailable");
				},
				{ once: true }
			);
		} catch {
			finish(false, "Blocked");
		}
	});
}

async function applyTransportOptions(transportOptions) {
	let lastError = null;

	for (const strategy of transportOptions) {
		if (!strategy || typeof strategy !== "object") {
			continue;
		}
		try {
			await connection.setTransport(strategy.module, strategy.options);
			currentTransportKey = sanitizeTransportKey(strategy.key);
			return strategy;
		} catch (error) {
			lastError = error;
		}
	}

	currentTransportKey = LIBCURL_TRANSPORT_KEY;
	throw lastError || new Error("Nitro could not initialize a proxy transport.");
}

async function ensureConnection(
	{
		requireProbe = false,
		backgroundProbe = !requireProbe,
		preferredTransportKey = "",
	} = {}
) {
	if (!connectionReadyPromise) {
		connectionReadyPromise = (async () => {
			const startedAt = performance.now();
			setStatus("connection", "checking", "Checking");

			try {
				let transportOptions = await fetchTransportOptions({
					preferredMode: preferredTransportKey,
				});
				try {
					await applyTransportOptions(transportOptions);
				} catch {
					invalidateTransportOptionsCache();
					transportOptions = await fetchTransportOptions({
						force: true,
						preferredMode: preferredTransportKey,
					});
					await applyTransportOptions(transportOptions);
				}

				setStatus("connection", "ready", "Working");
				setStatusLatency("connection", performance.now() - startedAt);
			} catch (err) {
				setStatus("connection", "issue", "Unavailable");
				setStatusLatency("connection", performance.now() - startedAt);
				invalidateTransportOptionsCache();
				connectionReadyPromise = null;
				throw err;
			} finally {
				refreshLaunchStatus();
			}
		})();
	}

	await connectionReadyPromise;
	if (requireProbe) {
		const probe = await verifyConnection({ force: true });
		if (!probe.ok) {
			throw new Error("Connection check failed.");
		}
	} else if (backgroundProbe) {
		verifyConnection().catch((err) => console.warn(err));
	}
}

async function resetConnectionTransport({ preferredTransportKey = "" } = {}) {
	if (!connection) {
		return;
	}
	invalidateTransportOptionsCache();
	currentTransportKey = sanitizeTransportKey(
		preferredTransportKey || LIBCURL_TRANSPORT_KEY
	);
	connectionReadyPromise = null;
	await ensureConnection({
		requireProbe: false,
		backgroundProbe: false,
		preferredTransportKey,
	});
}

function hasFreshConnectionProbe(maxAgeMs = CONNECTION_PROBE_CACHE_MS) {
	return (
		lastConnectionProbeCheckedAt > 0 &&
		Date.now() - lastConnectionProbeCheckedAt < maxAgeMs
	);
}

async function verifyConnection({ force = false } = {}) {
	if (!force && hasFreshConnectionProbe()) {
		return {
			ok: lastConnectionProbeOk,
			text: lastConnectionProbeOk ? "Working" : "Unavailable",
			cached: true,
		};
	}

	if (connectionProbePromise) {
		return connectionProbePromise;
	}

	connectionProbePromise = (async () => {
		const probe = await probeTunnel();
		lastConnectionProbeCheckedAt = Date.now();
		lastConnectionProbeOk = probe.ok;

		if (probe.ok) {
			setStatus("connection", "ready", "Working");
			setStatusLatency("connection", probe.latency);
			return {
				ok: true,
				text: "Working",
				latency: probe.latency,
				cached: false,
			};
		}

		setStatus("connection", "issue", probe.text);
		setStatusLatency("connection", probe.latency);
		return {
			ok: false,
			text: probe.text,
			latency: probe.latency,
			cached: false,
		};
	})();

	try {
		return await connectionProbePromise;
	} finally {
		connectionProbePromise = null;
		refreshLaunchStatus();
	}
}

async function ensureRuntimeReady(
	engine = currentSelectedEngine,
	{
		requireProxyStatus = true,
		requireConnectionProbe = requireProxyStatus,
		backgroundConnectionProbe = !requireConnectionProbe,
		backgroundProxyStatus = !requireProxyStatus,
	} = {}
) {
	const runtimeEngine = sanitizeRuntimeEngine(engine);

	if (runtimeEngine === "rammerhead") {
		if (requireProxyStatus) {
			await refreshProxyStatus();
		} else if (backgroundProxyStatus) {
			refreshProxyStatus().catch((err) => console.warn(err));
		}
		return;
	}

	const coreReadyPromise = initCore();
	const workerReadyPromise = ensureServiceWorker().then(
		() => null,
		(error) => error
	);

	const ready = await coreReadyPromise;
	if (!ready) {
		throw new Error("Search core failed to load.");
	}

	const connectionReadyResultPromise = ensureConnection({
		requireProbe: requireConnectionProbe,
		backgroundProbe: backgroundConnectionProbe,
	}).then(
		() => null,
		(error) => error
	);
	const workerError = await workerReadyPromise;
	if (workerError) {
		throw workerError;
	}

	const connectionError = await connectionReadyResultPromise;
	if (connectionError) {
		throw connectionError;
	}
	if (requireProxyStatus) {
		await refreshProxyStatus();
	} else if (backgroundProxyStatus) {
		refreshProxyStatus().catch((err) => console.warn(err));
	}
}

function primeRuntimeWarmup(
	{
		requireProxyStatus = false,
		requireConnectionProbe = false,
		backgroundConnectionProbe = !requireConnectionProbe,
		backgroundProxyStatus = requireProxyStatus,
	} = {}
) {
	fetchTransportOptions().catch((err) => console.warn(err));
	ensureServiceWorker().catch((err) => console.warn(err));
	initCore()
		.then((ready) => {
			if (!ready) {
				return;
			}
			ensureConnection({
				requireProbe: requireConnectionProbe,
				backgroundProbe: backgroundConnectionProbe,
			}).catch((err) => console.warn(err));
			if (requireProxyStatus || backgroundProxyStatus) {
				refreshProxyStatus().catch((err) => console.warn(err));
			}
		})
		.catch((err) => console.warn(err));
}

function hasFreshProxyStatus(maxAgeMs = PROXY_STATUS_CACHE_MS) {
	return (
		currentStatus.proxy === "ready" &&
		lastProxyStatusCheckedAt > 0 &&
		Date.now() - lastProxyStatusCheckedAt < maxAgeMs
	);
}

async function refreshProxyStatus({ force = false } = {}) {
	if (!force && hasFreshProxyStatus()) {
		return {
			ok: true,
			state: currentStatus.proxy,
			text: "Working",
			cached: true,
		};
	}

	if (proxyStatusPromise) {
		return proxyStatusPromise;
	}

	setStatus("proxy", "checking", "Checking");
	const startedAt = performance.now();

	proxyStatusPromise = (async () => {
		try {
			const response = await fetch("/ocean-status", {
				cache: "no-store",
				credentials: "same-origin",
			});
			if (!response.ok) {
				throw new Error("Proxy status request failed");
			}

			const data = await response.json();
			const proxyState = data && typeof data === "object" ? data.proxy : null;
			if (!proxyState || typeof proxyState !== "object") {
				throw new Error("Proxy status payload was invalid");
			}

			const state = proxyState.state === "ready" ? "ready" : "issue";
			const text = proxyState.text ? String(proxyState.text) : "Unavailable";
			setStatus("proxy", state, text);
			setStatusLatency("proxy", performance.now() - startedAt);
			lastProxyStatusCheckedAt = Date.now();
			return {
				ok: state === "ready",
				state,
				text,
				cached: false,
			};
		} catch (err) {
			console.warn(err);
			setStatus("proxy", "issue", "Unknown");
			setStatusLatency("proxy", performance.now() - startedAt);
			lastProxyStatusCheckedAt = Date.now();
			return {
				ok: false,
				state: "issue",
				text: "Unknown",
				cached: false,
			};
		} finally {
			proxyStatusPromise = null;
			refreshLaunchStatus();
		}
	})();

	return proxyStatusPromise;
}

async function benchmarkRuntimeEngine(engine, { signal, force = false } = {}) {
	const runtimeEngine = sanitizeRuntimeEngine(engine);
	const startedAt = performance.now();
	const cachedResult = !force ? getBenchmarkResult(runtimeEngine) : null;

	if (cachedResult && hasFreshBenchmarkResult(cachedResult)) {
		return cachedResult;
	}

	try {
		if (signal?.aborted) {
			throw new DOMException("Benchmark aborted", "AbortError");
		}
		await ensureRuntimeReady(runtimeEngine, {
			requireProxyStatus: false,
			requireConnectionProbe: true,
			backgroundProxyStatus: true,
		});
		const metrics = await collectMeasuredSpeedSamples({
			bytes: ENGINE_SPEED_TEST_BYTES,
			warmupCount: ENGINE_BENCHMARK_WARMUP_COUNT,
			sampleCount: ENGINE_BENCHMARK_SAMPLE_COUNT,
			minimumSuccessfulSamples: ENGINE_BENCHMARK_MIN_SUCCESSFUL_SAMPLES,
			buildRequestUrl: async ({ bytes, sampleIndex, attemptIndex, isWarmup }) => {
				const targetUrl = getEngineBenchmarkTargetUrl({
					bytes,
					sampleIndex,
					attemptIndex,
					isWarmup,
				});
				return buildEngineNavigationUrl(
					runtimeEngine,
					targetUrl,
					getHomepageRouteProfile(runtimeEngine)
				);
			},
			signal,
		});

		return {
			ok: true,
			label: "Ready",
			latency: metrics.latencyMs,
			throughputMbps: metrics.throughputMbps,
			checkedAt: Date.now(),
			detail:
				runtimeEngine === "scramjet"
					? "Native route"
					: runtimeEngine === "rammerhead"
						? "Session proxy"
						: "Direct UV route",
			runtimeEngine,
		};
	} catch (err) {
		if (isAbortLikeError(err) || signal?.aborted) {
			throw err;
		}
		return {
			ok: false,
			label: "Unavailable",
			latency: performance.now() - startedAt,
			throughputMbps: null,
			checkedAt: Date.now(),
			detail:
				err && err.message ? String(err.message) : "Probe did not complete.",
			runtimeEngine,
		};
	}
}

async function runEngineBenchmarks({ force = false, silent = false } = {}) {
	if (engineBenchmarkPromise && !force) {
		return engineBenchmarkPromise;
	}

	if (
		!force &&
		hasFreshEngineBenchmarks(["scramjet", "ultraviolet", "rammerhead"])
	) {
		engineBenchmarks = {
			...engineBenchmarks,
			bolt: deriveBoltBenchmark(),
		};
		updateEnginePreviewState();
		return engineBenchmarks;
	}

	if (force) {
		cancelEngineBenchmarks();
	}

	const benchmarkAbortController =
		typeof AbortController === "function" ? new AbortController() : null;
	engineBenchmarkAbortController = benchmarkAbortController;
	engineBenchmarkPromise = (async () => {
		if (engineRefreshButton) {
			engineRefreshButton.disabled = true;
			engineRefreshButton.textContent = "Checking...";
		}

		try {
			const benchmarkEngines = ["scramjet", "ultraviolet", "rammerhead"];

			await Promise.all(
				benchmarkEngines.map(async (engine) => {
					const result = await benchmarkRuntimeEngine(engine, {
						signal: benchmarkAbortController?.signal,
						force,
					}).catch((error) => {
						if (
							isAbortLikeError(error) ||
							benchmarkAbortController?.signal?.aborted
						) {
							return null;
						}
						throw error;
					});
					if (!result) {
						return null;
					}
					engineBenchmarks = {
						...engineBenchmarks,
						[engine]: result,
					};
					engineBenchmarks.bolt = deriveBoltBenchmark();
					updateEnginePreviewState();
					return result;
				})
			);

			return engineBenchmarks;
		} catch (err) {
			if (
				isAbortLikeError(err) ||
				benchmarkAbortController?.signal?.aborted
			) {
				return engineBenchmarks;
			}
			if (!silent) {
				console.warn(err);
			}
			throw err;
		} finally {
			if (engineRefreshButton) {
				engineRefreshButton.disabled = false;
				engineRefreshButton.textContent = "Refresh speeds";
			}
			if (engineBenchmarkAbortController === benchmarkAbortController) {
				engineBenchmarkAbortController = null;
			}
			engineBenchmarkPromise = null;
		}
	})();

	return engineBenchmarkPromise;
}

async function reloadActiveFrame() {
	const activeTab = getActiveTab();
	if (!activeTab) return;
	await ensureTabLoaded(activeTab);
	if (!activeTab.frame || reloadCheckInFlight) return;

	reloadCheckInFlight = true;
	setReloadChecking(true);
	const loadToken = beginTabLoad(activeTab, { kind: "reload" });

	try {
		const frameLoadPromise = waitForFrameLoadOnce(activeTab.frame.frame);
		activeTab.frame.reload();
		await frameLoadPromise;
	} finally {
		completeTabLoad(activeTab, { token: loadToken });
		setReloadChecking(false);
		reloadCheckInFlight = false;
	}
}

function backActiveFrame() {
	const activeTab = getActiveTab();
	if (!activeTab || !activeTab.frame) return;
	beginTabLoad(activeTab, { kind: "navigate" });
	activeTab.frame.back();
}

function forwardActiveFrame() {
	const activeTab = getActiveTab();
	if (!activeTab || !activeTab.frame) return;
	beginTabLoad(activeTab, { kind: "navigate" });
	activeTab.frame.forward();
}

function updateFullscreenButton() {
	if (!toolbar.fullscreen) return;
	const label = document.fullscreenElement ? "Exit fullscreen" : "Fullscreen";
	toolbar.fullscreen.setAttribute("aria-label", label);
	toolbar.fullscreen.setAttribute("title", label);
}

async function toggleFullscreen() {
	if (!document.fullscreenElement) {
		await document.documentElement.requestFullscreen?.();
		return;
	}

	await document.exitFullscreen?.();
}

function setSignalBars(level) {
	toolbar.signalBars.forEach((bar, index) => {
		bar.dataset.active = index < level ? "true" : "false";
	});
}

function setSpeedChecking(checking) {
	if (!toolbar.speed) return;
	toolbar.speed.dataset.checking = checking ? "true" : "false";
}

function setReloadChecking(checking) {
	if (!toolbar.reload) return;
	toolbar.reload.dataset.checking = checking ? "true" : "false";
	const label = checking ? "Reloading" : "Reload";
	toolbar.reload.setAttribute("aria-label", label);
	toolbar.reload.setAttribute("title", label);
}

function waitForFrameLoadOnce(frameElement) {
	if (!frameElement || typeof frameElement.addEventListener !== "function") {
		return Promise.resolve();
	}

	return new Promise((resolve) => {
		let settled = false;
		let timeoutId = null;

		const finish = () => {
			if (settled) return;
			settled = true;
			frameElement.removeEventListener("load", handleLoad);
			if (timeoutId !== null) {
				window.clearTimeout(timeoutId);
			}
			resolve();
		};

		const handleLoad = () => {
			finish();
		};

		timeoutId = window.setTimeout(finish, FRAME_RELOAD_TIMEOUT_MS);
		frameElement.addEventListener("load", handleLoad, { once: true });
	});
}

function getSignalLevelFromSpeed(speedMbps) {
	if (!Number.isFinite(speedMbps) || speedMbps <= 0) {
		return 1;
	}
	if (speedMbps < 2) return 1;
	if (speedMbps < 8) return 2;
	if (speedMbps < 25) return 3;
	return 4;
}

function getSignalLevelFromEffectiveType(effectiveType) {
	const value = String(effectiveType || "").toLowerCase();
	if (value === "slow-2g" || value === "2g") return 1;
	if (value === "3g") return 2;
	if (value === "4g") return 4;
	return 3;
}

function formatSpeedLabel(speedMbps) {
	if (!Number.isFinite(speedMbps) || speedMbps <= 0) {
		return "-- Mbps";
	}
	if (speedMbps >= 100) {
		return `${Math.round(speedMbps)} Mbps`;
	}
	if (speedMbps >= 10) {
		return `${speedMbps.toFixed(1)} Mbps`;
	}
	return `${speedMbps.toFixed(2).replace(/0$/, "")} Mbps`;
}

function readResponseByteLength(response, measuredBytes = 0) {
	const headerValue =
		Number(response.headers.get("x-ocean-speed-bytes")) ||
		Number(response.headers.get("content-length"));

	if (Number.isFinite(headerValue) && headerValue > 0) {
		return headerValue;
	}

	return measuredBytes;
}

async function measureResponseTransfer(response, startedAt) {
	const headersAt = performance.now();
	let measuredBytes = 0;

	if (response.body && typeof response.body.getReader === "function") {
		const reader = response.body.getReader();
		try {
			while (true) {
				const { value, done } = await reader.read();
				if (done) break;
				measuredBytes += value?.byteLength || value?.length || 0;
			}
		} finally {
			reader.releaseLock?.();
		}
	} else {
		const payload = await response.arrayBuffer();
		measuredBytes = payload.byteLength;
	}

	const completedAt = performance.now();
	const declaredByteLength = readResponseByteLength(response, 0);
	const byteLength =
		Number.isFinite(measuredBytes) && measuredBytes > 0
			? measuredBytes
			: declaredByteLength;
	const totalDurationMs = Math.max(completedAt - startedAt, 1);
	const transferDurationMs = Math.max(completedAt - headersAt, 1);

	return {
		byteLength,
		measuredBytes,
		declaredByteLength,
		latencyMs: Math.max(headersAt - startedAt, 1),
		totalDurationMs,
		transferDurationMs,
		throughputMbps:
			byteLength > 0
				? (byteLength * 8) / (totalDurationMs / 1000) / 1_000_000
				: null,
	};
}

function getMedianNumber(values) {
	const sorted = values
		.filter((value) => Number.isFinite(value) && value > 0)
		.sort((left, right) => left - right);

	if (!sorted.length) {
		return null;
	}

	const middle = Math.floor(sorted.length / 2);
	if (sorted.length % 2 === 1) {
		return sorted[middle];
	}

	return (sorted[middle - 1] + sorted[middle]) / 2;
}

function summarizeMeasuredSamples(samples) {
	const successfulSamples = Array.isArray(samples)
		? samples.filter(
				(sample) =>
					sample &&
					Number.isFinite(sample.byteLength) &&
					sample.byteLength > 0 &&
					Number.isFinite(sample.totalDurationMs) &&
					sample.totalDurationMs > 0
			)
		: [];

	if (!successfulSamples.length) {
		return null;
	}

	const totalBytes = successfulSamples.reduce(
		(total, sample) => total + sample.byteLength,
		0
	);
	const totalDurationMs = successfulSamples.reduce(
		(total, sample) => total + sample.totalDurationMs,
		0
	);
	const transferDurationMs = successfulSamples.reduce(
		(total, sample) => total + sample.transferDurationMs,
		0
	);

	return {
		sampleCount: successfulSamples.length,
		byteLength: totalBytes,
		latencyMs: getMedianNumber(
			successfulSamples.map((sample) => sample.latencyMs)
		),
		totalDurationMs,
		transferDurationMs,
		throughputMbps:
			totalBytes > 0 && totalDurationMs > 0
				? (totalBytes * 8) / (totalDurationMs / 1000) / 1_000_000
				: null,
	};
}

async function fetchMeasuredSpeedSample({
	url,
	expectedBytes = 0,
	credentials = "same-origin",
	signal,
} = {}) {
	if (signal?.aborted) {
		throw new DOMException("Benchmark aborted", "AbortError");
	}
	const startedAt = performance.now();
	const response = await fetch(url, {
		cache: "no-store",
		credentials,
		signal,
	});

	if (!response.ok) {
		throw new Error(`Probe failed with ${response.status}`);
	}
	if (!isSpeedTestProbeResponse(response)) {
		throw new Error("Probe did not reach the live speed test.");
	}

	const metrics = await measureResponseTransfer(response, startedAt);
	if (
		Number.isFinite(expectedBytes) &&
		expectedBytes > 0 &&
		metrics.byteLength !== expectedBytes
	) {
		throw new Error(
			`Probe returned ${metrics.byteLength} bytes instead of ${expectedBytes}.`
		);
	}

	return metrics;
}

async function collectMeasuredSpeedSamples({
	bytes,
	warmupCount = 0,
	sampleCount = 1,
	minimumSuccessfulSamples = 1,
	buildRequestUrl,
	credentials = "same-origin",
	signal,
} = {}) {
	const successfulSamples = [];
	let lastError = null;
	const totalAttempts = Math.max(0, warmupCount) + Math.max(0, sampleCount);

	for (let attemptIndex = 0; attemptIndex < totalAttempts; attemptIndex += 1) {
		if (signal?.aborted) {
			throw new DOMException("Benchmark aborted", "AbortError");
		}
		const isWarmup = attemptIndex < warmupCount;
		const sampleIndex = isWarmup ? attemptIndex : attemptIndex - warmupCount;
		const controller =
			typeof AbortController === "function" ? new AbortController() : null;
		let timeoutId = null;
		let abortListener = null;

		if (controller) {
			timeoutId = window.setTimeout(() => controller.abort(), SPEED_TEST_TIMEOUT_MS);
			if (signal) {
				abortListener = () => controller.abort();
				signal.addEventListener("abort", abortListener, { once: true });
				if (signal.aborted) {
					controller.abort();
				}
			}
		}

		try {
			const requestUrl = await buildRequestUrl({
				bytes,
				sampleIndex,
				attemptIndex,
				isWarmup,
			});
			const metrics = await fetchMeasuredSpeedSample({
				url: requestUrl,
				expectedBytes: bytes,
				credentials,
				signal: controller?.signal || signal,
			});
			if (!isWarmup) {
				successfulSamples.push(metrics);
			}
		} catch (error) {
			lastError = error;
			if (isAbortLikeError(error) || signal?.aborted) {
				throw error;
			}
		} finally {
			if (timeoutId !== null) {
				window.clearTimeout(timeoutId);
			}
			if (signal && abortListener) {
				signal.removeEventListener("abort", abortListener);
			}
		}
	}

	if (successfulSamples.length < minimumSuccessfulSamples) {
		throw lastError || new Error("speed-test-empty");
	}

	const summary = summarizeMeasuredSamples(successfulSamples);
	if (!summary || !Number.isFinite(summary.throughputMbps) || summary.throughputMbps <= 0) {
		throw lastError || new Error("speed-test-empty");
	}

	return summary;
}

function updateSpeedBadge() {
	if (!toolbar.speedText) return;

	if (navigator.onLine === false) {
		setSignalBars(0);
		toolbar.speedText.textContent = "Offline";
		return;
	}

	if (
		speedCheckInFlight &&
		(!Number.isFinite(lastMeasuredSpeedMbps) || lastMeasuredSpeedMbps <= 0)
	) {
		setSignalBars(2);
		toolbar.speedText.textContent = "Checking";
		return;
	}

	if (Number.isFinite(lastMeasuredSpeedMbps) && lastMeasuredSpeedMbps > 0) {
		setSignalBars(getSignalLevelFromSpeed(lastMeasuredSpeedMbps));
		toolbar.speedText.textContent = formatSpeedLabel(lastMeasuredSpeedMbps);
		return;
	}

	const networkInfo =
		navigator.connection || navigator.mozConnection || navigator.webkitConnection;
	if (
		networkInfo &&
		typeof networkInfo.downlink === "number" &&
		Number.isFinite(networkInfo.downlink)
	) {
		const downlink = networkInfo.downlink;
		setSignalBars(getSignalLevelFromSpeed(downlink));
		toolbar.speedText.textContent = `~${formatSpeedLabel(downlink)}`;
		return;
	}

	if (networkInfo && networkInfo.effectiveType) {
		setSignalBars(getSignalLevelFromEffectiveType(networkInfo.effectiveType));
		toolbar.speedText.textContent = String(networkInfo.effectiveType).toUpperCase();
		return;
	}

	setSignalBars(2);
	toolbar.speedText.textContent = "Online";
}

async function measureContextSpeedMbps(
	context = getActiveSpeedContext(),
	{ force = false } = {}
) {
	if (context.scope === "home") {
		if (hasPendingPageNavigation()) {
			throw new Error("speed-test-paused");
		}
		await runEngineBenchmarks({ force, silent: true });
		const selectedResult = getDisplayBenchmark(context.engine);
		if (
			!selectedResult ||
			!selectedResult.ok ||
			!Number.isFinite(selectedResult.throughputMbps) ||
			selectedResult.throughputMbps <= 0
		) {
			throw new Error("speed-test-empty");
		}
		return {
			throughputMbps: selectedResult.throughputMbps,
			key: context.key,
		};
	}

	const cachedResult = getBenchmarkResult(context.engine);
	const result = !force && hasFreshBenchmarkResult(cachedResult)
		? cachedResult
		: storeBenchmarkResult(
				context.engine,
				await benchmarkRuntimeEngine(context.engine, { force: true })
			);
	if (
		!result ||
		!result.ok ||
		!Number.isFinite(result.throughputMbps) ||
		result.throughputMbps <= 0
	) {
		throw new Error("speed-test-empty");
	}

	return {
		throughputMbps: result.throughputMbps,
		key: context.key,
	};
}

async function refreshSpeedBadge({ passive = false, force = false } = {}) {
	const context = getActiveSpeedContext();
	if (
		!force &&
		context.key === lastMeasuredSpeedContextKey &&
		Number.isFinite(lastMeasuredSpeedMbps) &&
		lastMeasuredSpeedMbps > 0
	) {
		updateSpeedBadge();
		return;
	}

	if (speedCheckInFlight) {
		pendingSpeedRefresh = true;
		pendingSpeedRefreshForce = pendingSpeedRefreshForce || force;
		return;
	}
	speedCheckInFlight = true;
	setSpeedChecking(true);
	if (!passive || !toolbar.speedText.textContent) {
		toolbar.speedText.textContent = "Checking";
	}

	try {
		if (navigator.onLine === false) {
			lastMeasuredSpeedMbps = null;
			lastMeasuredSpeedContextKey = "";
			updateSpeedBadge();
			return;
		}
		const speedResult = await measureContextSpeedMbps(context, { force });
		lastMeasuredSpeedMbps = speedResult.throughputMbps;
		lastMeasuredSpeedContextKey = speedResult.key;
		updateSpeedBadge();
	} catch (error) {
		lastMeasuredSpeedMbps = null;
		lastMeasuredSpeedContextKey = "";
		updateSpeedBadge();
	} finally {
		setSpeedChecking(false);
		speedCheckInFlight = false;
		if (pendingSpeedRefresh) {
			const nextForce = pendingSpeedRefreshForce;
			pendingSpeedRefresh = false;
			pendingSpeedRefreshForce = false;
			queueMicrotask(() => {
				refreshSpeedBadge({ passive: true, force: nextForce }).catch((err) =>
					console.warn(err)
				);
			});
		}
	}
}

function buildOceanSearchWindowUrl() {
	try {
		const appUrl = new URL(location.pathname || "/", location.origin);
		appUrl.search = location.search || "";
		appUrl.hash = "";
		return appUrl.toString();
	} catch {
		return location.href;
	}
}

function openOceanSearchWindow() {
	const targetUrl = buildOceanSearchWindowUrl();
	const popup = window.open(targetUrl, "_blank", "noopener,noreferrer");
	if (popup) {
		popup.focus?.();
		return;
	}
	location.assign(targetUrl);
}

function clearScheduledSpeedRefreshes() {
	if (speedRefreshTimer !== null) {
		window.clearTimeout(speedRefreshTimer);
		speedRefreshTimer = null;
	}
	if (homepageBenchmarkRefreshTimer !== null) {
		window.clearTimeout(homepageBenchmarkRefreshTimer);
		homepageBenchmarkRefreshTimer = null;
	}
	pendingSpeedRefresh = false;
	pendingSpeedRefreshForce = false;
	cancelEngineBenchmarks();
}

async function launchTarget(input) {
	clearScheduledSpeedRefreshes();
	clearUiError();
	setStatus("launch", "checking", "Opening");
	const startedAt = performance.now();
	const requestedEngine = getPreferredUserLaunchEngine();

	try {
		const cleanInput = String(input || "").trim() || "Current page";
		const targetUrl = search(cleanInput, searchEngine.value);
		await openTabWithUrl(targetUrl, {
			input: cleanInput,
			activate: true,
			engine: requestedEngine,
		});
		setStatusLatency("launch", performance.now() - startedAt);
	} catch (err) {
		setStatus("launch", "issue", "Unavailable");
		setStatusLatency("launch", performance.now() - startedAt);
		updateNavigationState();
		setUiError("Nitro could not open that just yet.", err);
		throw err;
	}
}

async function submitAddressBar(input) {
	const cleanInput = String(input || "").trim() || "Current page";
	const targetUrl = search(cleanInput, searchEngine.value);
	const activeTab = getActiveTab();
	const requestedEngine = getPreferredUserLaunchEngine();
	const routeProfile = getPreferredRouteProfileForLaunch(
		activeTab,
		requestedEngine
	);

	clearScheduledSpeedRefreshes();
	clearUiError();
	setStatus("launch", "checking", "Opening");
	const startedAt = performance.now();

	try {
		if (activeTab && !isStartTab(activeTab)) {
			await navigateTabToUrl(activeTab, targetUrl, {
				input: cleanInput,
				engine: requestedEngine,
				routeProfile,
			});
		} else {
			await openTabWithUrl(targetUrl, {
				input: cleanInput,
				activate: true,
				engine: requestedEngine,
				routeProfile,
			});
		}
		setStatusLatency("launch", performance.now() - startedAt);
	} catch (err) {
		setStatus("launch", "issue", "Unavailable");
		setStatusLatency("launch", performance.now() - startedAt);
		updateNavigationState();
		setUiError("Nitro could not open that just yet.", err);
		throw err;
	}
}

function requestToPromise(request) {
	return new Promise((resolve, reject) => {
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error || new Error("Request failed"));
	});
}

function transactionToPromise(transaction) {
	return new Promise((resolve, reject) => {
		transaction.oncomplete = () => resolve();
		transaction.onerror = () =>
			reject(transaction.error || new Error("Transaction failed"));
		transaction.onabort = () =>
			reject(transaction.error || new Error("Transaction aborted"));
	});
}

function openVaultDb() {
	if (vaultDbPromise) {
		return vaultDbPromise;
	}

	vaultDbPromise = new Promise((resolve, reject) => {
		const request = indexedDB.open(PROFILE_DB.name, PROFILE_DB.version);

		request.onupgradeneeded = () => {
			const database = request.result;
			if (!database.objectStoreNames.contains(PROFILE_DB.store)) {
				database.createObjectStore(PROFILE_DB.store, { keyPath: "name" });
			}
		};

		request.onsuccess = () => resolve(request.result);
		request.onerror = () =>
			reject(request.error || new Error("Vault database failed to open"));
	});

	return vaultDbPromise;
}

async function getStoredProfileRecord(displayName) {
	const normalizedName = normalizeProfileName(displayName);
	if (!normalizedName) return null;
	const database = await openVaultDb();
	const transaction = database.transaction(PROFILE_DB.store, "readonly");
	const store = transaction.objectStore(PROFILE_DB.store);
	const request = store.get(normalizedName);
	const record = await requestToPromise(request);
	await transactionToPromise(transaction);
	return record || null;
}

async function putStoredProfileRecord(record) {
	const database = await openVaultDb();
	const transaction = database.transaction(PROFILE_DB.store, "readwrite");
	transaction.objectStore(PROFILE_DB.store).put(record);
	await transactionToPromise(transaction);
}

function bytesToBase64(bytes) {
	let binary = "";
	for (const byte of bytes) {
		binary += String.fromCharCode(byte);
	}
	return btoa(binary);
}

function base64ToBytes(base64) {
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let index = 0; index < binary.length; index += 1) {
		bytes[index] = binary.charCodeAt(index);
	}
	return bytes;
}

async function deriveVaultKey(password, saltBytes) {
	const passwordBytes = textEncoder.encode(String(password || ""));
	const keyMaterial = await crypto.subtle.importKey(
		"raw",
		passwordBytes,
		{ name: "PBKDF2" },
		false,
		["deriveKey"]
	);

	return crypto.subtle.deriveKey(
		{
			name: "PBKDF2",
			salt: saltBytes,
			iterations: VAULT_ITERATIONS,
			hash: "SHA-256",
		},
		keyMaterial,
		{ name: "AES-GCM", length: 256 },
		false,
		["encrypt", "decrypt"]
	);
}

async function encryptProfileSnapshot(snapshot, password) {
	const salt = crypto.getRandomValues(new Uint8Array(16));
	const iv = crypto.getRandomValues(new Uint8Array(12));
	const key = await deriveVaultKey(password, salt);
	const plaintext = textEncoder.encode(JSON.stringify(snapshot));
	const ciphertext = new Uint8Array(
		await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plaintext)
	);

	return {
		salt: bytesToBase64(salt),
		iv: bytesToBase64(iv),
		payload: bytesToBase64(ciphertext),
	};
}

async function decryptProfileSnapshot(record, password) {
	const key = await deriveVaultKey(password, base64ToBytes(record.salt));
	const decrypted = await crypto.subtle.decrypt(
		{ name: "AES-GCM", iv: base64ToBytes(record.iv) },
		key,
		base64ToBytes(record.payload)
	);

	return safeJsonParse(textDecoder.decode(new Uint8Array(decrypted)), null);
}

async function readScramjetCookieSnapshot() {
	if (!scramjet || typeof scramjet.openIDB !== "function") {
		return [];
	}

	try {
		const database = await scramjet.openIDB();
		const transaction = database.transaction("cookies", "readonly");
		const store = transaction.objectStore("cookies");
		const keys = await store.getAllKeys();
		const values = await store.getAll();
		await transaction.done;
		return keys.map((key, index) => ({
			key,
			value: values[index],
		}));
	} catch (err) {
		console.warn(err);
		return [];
	}
}

async function restoreScramjetCookieSnapshot(entries) {
	if (!scramjet || typeof scramjet.openIDB !== "function") {
		return;
	}

	try {
		const database = await scramjet.openIDB();
		const transaction = database.transaction("cookies", "readwrite");
		const store = transaction.objectStore("cookies");
		await store.clear();
		for (const entry of Array.isArray(entries) ? entries : []) {
			if (!isPlainObject(entry) || !("key" in entry) || !("value" in entry)) {
				continue;
			}
			await store.put(entry.value, entry.key);
		}
		await transaction.done;
	} catch (err) {
		console.warn(err);
	}
}

async function ensureVaultReady() {
	const ready = await initCore();
	if (!ready) {
		throw new Error("Search core is unavailable.");
	}
	try {
		await ensureServiceWorker();
	} catch {
		// Local profile save can still continue without cookie access.
	}
}

async function buildProfileSnapshot() {
	await ensureVaultReady();
	const toolbarCollapseLevel = getToolbarCollapseLevel();
	return {
		version: PROFILE_SCHEMA_VERSION,
		savedAt: new Date().toISOString(),
		theme: sanitizeThemeKey(currentTheme),
		themeOverrides: sanitizeThemeOverrides(themeOverrides),
		homeView: sanitizeHomeView(currentHomeView),
		homePageInput: currentHomePageInput,
		newTabPageInput: currentNewTabPageInput,
		panicKeyCombo: sanitizePanicKeyCombo(currentPanicKeyCombo),
		mobileSitesEnabled: currentMobileSitesEnabled,
		onboardingCompleted,
		toolbarCollapseLevel,
		toolbarCollapseDirection,
		toolbarMinimized: toolbarCollapseLevel > 0,
		selectedEngine: currentSelectedEngine,
		addressValue: address?.value || "",
		activeTabId,
		tabs: serializeTabs(),
		localStorageEntries: collectRawLocalStorageSnapshot(),
		cookieEntries: await readScramjetCookieSnapshot(),
	};
}

async function saveCurrentProfile({ quiet = false } = {}) {
	if (!activeProfileName || !activeProfileSecret) {
		throw new Error("Log in or sign up first.");
	}

	const snapshot = await buildProfileSnapshot();
	const encrypted = await encryptProfileSnapshot(snapshot, activeProfileSecret);
	const existingRecord = await getStoredProfileRecord(activeProfileName);
	const nowIso = new Date().toISOString();

	await putStoredProfileRecord({
		name: activeProfileName,
		displayName: activeProfileDisplayName,
		version: PROFILE_SCHEMA_VERSION,
		createdAt: existingRecord?.createdAt || nowIso,
		updatedAt: nowIso,
		...encrypted,
	});

	rememberLastProfileName(activeProfileDisplayName);
	updateProfileUi();
	if (!quiet) {
		setProfileMessage("Profile saved.", "success");
	}
}

function scheduleActiveProfileAutosave() {
	if (!activeProfileName || !activeProfileSecret || sessionRestoring) {
		return;
	}

	window.clearTimeout(profileAutosaveTimer);
	profileAutosaveTimer = window.setTimeout(() => {
		saveCurrentProfile({ quiet: true }).catch((err) => console.warn(err));
	}, PROFILE_AUTOSAVE_DELAY);
}

async function applyProfileSnapshot(snapshot) {
	const safeSnapshot = isPlainObject(snapshot) ? snapshot : {};
	const sessionState = sanitizeSessionState({
		tabs: safeSnapshot.tabs,
		activeTabId: safeSnapshot.activeTabId,
		addressValue: safeSnapshot.addressValue,
	});

	sessionRestoring = true;
	try {
		removeAllTabFrames();
		restoreRawLocalStorageSnapshot(safeSnapshot.localStorageEntries);
		await restoreScramjetCookieSnapshot(safeSnapshot.cookieEntries);
		const restoredThemeState = restoreThemeState(
			safeSnapshot.theme,
			safeSnapshot.themeOverrides,
			safeSnapshot.customTheme
		);
		themeOverrides = restoredThemeState.themeOverrides;
		applyTheme(restoredThemeState.theme, {
			persist: false,
			autosave: false,
		});
		populateCustomThemeEditor(getEditableThemeSnapshot(restoredThemeState.theme));
		setCustomThemeEditorOpen(false);
		applyHomeView(getBootHomeView(safeSnapshot.homeView || DEFAULT_HOME_VIEW), {
			persist: false,
			autosave: false,
		});
		applySelectedEngine(safeSnapshot.selectedEngine || DEFAULT_ENGINE, {
			persist: false,
			autosave: false,
			touched: true,
		});
		applyPagePreferences(
			{
				homePageInput: safeSnapshot.homePageInput || "",
				newTabPageInput: safeSnapshot.newTabPageInput || "",
			},
			{
				persist: false,
				autosave: false,
			}
		);
		applyMobileSitesPreference(
			readStoredMobileSitesEnabled(safeSnapshot.mobileSitesEnabled),
			{
			persist: false,
			autosave: false,
			syncFrames: false,
			}
		);
		onboardingCompleted = safeSnapshot.onboardingCompleted !== false;
		applyPanicKeyCombo(
			safeSnapshot.panicKeyCombo || DEFAULT_PANIC_KEY_COMBO,
			{
				persist: false,
				autosave: false,
			}
		);
		setOnboardingStep(1);
		setOnboardingActive(!onboardingCompleted);
		setToolbarCollapseLevel(readStoredToolbarCollapseLevel(safeSnapshot), {
			persist: false,
			autosave: false,
			direction: readStoredToolbarCollapseDirection(safeSnapshot),
		});
		localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(sessionState));
		persistUiState();
		hydrateTabsFromState(sessionState);
		if (sessionState.activeTabId) {
			await activateTabById(sessionState.activeTabId, { skipPersist: true });
		} else {
			showHome({ skipPersist: true });
		}
	} finally {
		sessionRestoring = false;
	}
}

function validateProfileFields() {
	const displayName = getRequestedProfileDisplayName();
	const password = getRequestedProfilePassword();

	if (!displayName) {
		throw new Error("Enter a profile name.");
	}

	if (password.length < 4) {
		throw new Error("Use a password with at least 4 characters.");
	}

	return {
		displayName,
		normalizedName: normalizeProfileName(displayName),
		password,
	};
}

async function handleProfileSignUp() {
	setProfileMessage("Creating profile...");

	const { displayName, normalizedName, password } = validateProfileFields();
	const existing = await getStoredProfileRecord(normalizedName);
	if (existing) {
		throw new Error("That profile already exists.");
	}

	activeProfileName = normalizedName;
	activeProfileDisplayName = displayName;
	activeProfileSecret = password;
	await saveCurrentProfile({ quiet: true });
	if (profile.password) {
		profile.password.value = "";
	}
	updateProfileUi();
	setProfileMessage("Profile created and saved.", "success");
}

async function handleProfileLogin() {
	setProfileMessage("Unlocking profile...");

	const { displayName, normalizedName, password } = validateProfileFields();
	const record = await getStoredProfileRecord(normalizedName);
	if (!record) {
		throw new Error("That profile does not exist.");
	}

	let snapshot = null;
	try {
		snapshot = await decryptProfileSnapshot(record, password);
	} catch {
		throw new Error("Password was incorrect.");
	}

	if (!isPlainObject(snapshot)) {
		throw new Error("Saved profile data was invalid.");
	}

	await ensureVaultReady();
	await applyProfileSnapshot(snapshot);
	activeProfileName = normalizedName;
	activeProfileDisplayName = record.displayName || displayName;
	activeProfileSecret = password;
	rememberLastProfileName(activeProfileDisplayName);
	if (profile.name) {
		profile.name.value = activeProfileDisplayName;
	}
	if (profile.password) {
		profile.password.value = "";
	}
	updateProfileUi();
	setProfileMessage("Profile restored.", "success");
}

function handleProfileLogout() {
	activeProfileName = "";
	activeProfileDisplayName = "";
	activeProfileSecret = "";
	window.clearTimeout(profileAutosaveTimer);
	updateProfileUi();
	setProfileMessage(
		"Signed out. Saved browser data stays on this device until you load another profile.",
		""
	);
}

async function handleProfileSave() {
	if (!activeProfileName || !activeProfileSecret) {
		throw new Error("Log in or sign up first.");
	}
	await saveCurrentProfile();
}

async function tryQuickProfileLogin() {
	try {
		await handleProfileLogin();
	} catch (err) {
		setProfileMessage(err.message || "Could not load profile.", "error");
	}
}

async function restorePersistedSession() {
	if (sessionRestoreAttempted) {
		return;
	}
	sessionRestoreAttempted = true;

	if (hasLiveSessionOrPendingLaunch()) {
		return;
	}

	if (hasInitialLaunchRequest()) {
		showHome({ clearAddress: false, skipPersist: true });
		return;
	}

	hydrateTabsFromState(readSessionState());

	const activeTab = getActiveTab();
	if (activeTab) {
		try {
			await activateTabById(activeTab.id, { skipPersist: true });
			return;
		} catch (err) {
			console.warn(err);
		}
	}

	showHome({ clearAddress: false, skipPersist: true });
}

async function openConfiguredNewTab() {
	const preference = getNewTabPagePreference();
	if (preference.url) {
		await openTabWithUrl(preference.url, {
			input: preference.input,
			activate: true,
		});
		return;
	}

	openStartTab({
		label: DEFAULT_START_LABEL,
		input: "",
	});
}

function setStatusRefreshChecking(checking) {
	if (!statusRefreshButton) return;
	statusRefreshButton.dataset.checking = checking ? "true" : "false";
}

async function refreshStatusChecks() {
	if (statusRefreshInFlight) return;
	statusRefreshInFlight = true;
	setStatusRefreshChecking(true);
	try {
		await initCore();
		try {
			await ensureServiceWorker();
		} catch {
			// handled in status state
		}
		connectionReadyPromise = null;
		try {
			await ensureConnection();
		} catch {
			// handled in status state
		}
		await refreshProxyStatus({ force: true });
		refreshLaunchStatus();
		updateNavigationState();
	} finally {
		setStatusRefreshChecking(false);
		statusRefreshInFlight = false;
	}
}

async function openConfiguredHome() {
	const activeTab = getActiveTab();
	const preference = getHomePagePreference();
	const requestedEngine = getPreferredUserLaunchEngine();

	if (preference.url) {
		if (activeTab) {
			await navigateTabToUrl(activeTab, preference.url, {
				input: preference.input,
				engine: requestedEngine,
			});
			return;
		}

		await openTabWithUrl(preference.url, {
			input: preference.input,
			activate: true,
			engine: requestedEngine,
		});
		return;
	}

	if (activeTab) {
		turnTabIntoStart(activeTab, {
			label: "Home",
			input: "",
		});
		return;
	}

	showHome({ clearAddress: true });
}

async function bootStatusPanel() {
	clearUiError();
	setStatus("proxy", "checking", "Checking");
	const initialRequestRuntimePromise = hasInitialLaunchRequest()
		? resolveLaunchEngine(
				getPreferredUserLaunchEngine(),
				search(
					initialLaunchRequest?.input || "",
					searchEngine?.value || DEFAULT_SEARCH_TEMPLATE
				),
				{
					routeProfile: getHomepageRouteProfile(getPreferredUserLaunchEngine()),
				}
			).catch(() => null)
		: Promise.resolve(null);

	const coreReadyPromise = initCore();
	const workerReadyPromise = ensureServiceWorker().then(
		() => null,
		(err) => err
	);

	const ready = await coreReadyPromise;
	if (!ready) {
		refreshLaunchStatus();
		await refreshProxyStatus({ force: true });
		if (isHomepageVisible()) {
			scheduleHomepageBenchmarkRefresh(INITIAL_HOMEPAGE_BENCHMARK_REFRESH_DELAY_MS);
		}
		await restorePersistedSession().catch((err) => console.warn(err));
		updateNavigationState();
		return;
	}

	refreshLaunchStatus();

	const connectionReadyResultPromise = ensureConnection().then(
		() => null,
		(err) => err
	);
	const workerError = await workerReadyPromise;
	if (workerError) {
		setUiError("Some parts are still getting ready.", workerError);
	}

	const connectionError = await connectionReadyResultPromise;
	if (connectionError && (!error || !error.textContent)) {
			setUiError("Nitro is waiting on the connection.", connectionError);
	}

	const initialRequestRuntime = await initialRequestRuntimePromise;
	if (initialRequestRuntime?.runtimeEngine === "rammerhead") {
		prewarmLaunchPath("rammerhead", {
			routeProfile: getHomepageRouteProfile("rammerhead"),
		}).catch((err) => console.warn(err));
		refreshProxyStatus({ force: true }).catch((err) => console.warn(err));
	} else {
		await refreshProxyStatus({ force: true });
	}
	try {
		const launchedFromRequest = await handleInitialLaunchRequest();
		if (!launchedFromRequest) {
			await restorePersistedSession();
		}
	} catch (err) {
		setUiError("Nitro could not open the requested page.", err);
		await restorePersistedSession();
	}
	updateNavigationState();
	if (isHomepageVisible()) {
		scheduleHomepageBenchmarkRefresh(INITIAL_HOMEPAGE_BENCHMARK_REFRESH_DELAY_MS);
	} else {
		scheduleContextSpeedRefresh({ force: true });
	}
}

function loadInitialUi() {
	const uiState = readUiState();
	const lastProfileName =
		String(uiState.lastProfileName || "") ||
		localStorage.getItem(STORAGE_KEYS.lastProfileName) ||
		"";
	onboardingCompleted = resolveOnboardingCompleted(uiState);
	const restoredThemeState = restoreThemeState(
		uiState.theme,
		uiState.themeOverrides,
		uiState.customTheme
	);
	themeOverrides = restoredThemeState.themeOverrides;
	setCustomThemeEditorOpen(false);

	applyTheme(restoredThemeState.theme, {
		persist: false,
		autosave: false,
	});
	populateCustomThemeEditor(getEditableThemeSnapshot(restoredThemeState.theme));
	applyHomeView(getBootHomeView(uiState.homeView || DEFAULT_HOME_VIEW), {
		persist: false,
		autosave: false,
	});
	const hasExplicitEngineSelection = Boolean(uiState.engineSelectionTouched);
	applySelectedEngine(
		hasExplicitEngineSelection ? uiState.selectedEngine || DEFAULT_ENGINE : DEFAULT_ENGINE,
		{
			persist: false,
			autosave: false,
			touched: hasExplicitEngineSelection,
		}
	);
	applyPagePreferences(
		{
			homePageInput: uiState.homePageInput || "",
			newTabPageInput: uiState.newTabPageInput || "",
		},
		{
			persist: false,
			autosave: false,
		}
	);
	applyMobileSitesPreference(readStoredMobileSitesEnabled(uiState.mobileSitesEnabled), {
		persist: false,
		autosave: false,
		syncFrames: false,
	});
	applyPanicKeyCombo(uiState.panicKeyCombo || DEFAULT_PANIC_KEY_COMBO, {
		persist: false,
		autosave: false,
	});
	setToolbarCollapseLevel(0, {
		persist: false,
		autosave: false,
		direction: "down",
	});
	if (profile.name && lastProfileName) {
		profile.name.value = lastProfileName;
	}
	updateProfileUi();
	setOnboardingStep(1);
	setOnboardingActive(!onboardingCompleted);
}

function syncHomepageLaunchInputs(value) {
	const nextValue = String(value || "");
	if (homeSearchInput) {
		homeSearchInput.value = nextValue;
	}
	if (holySearchInput) {
		holySearchInput.value = nextValue;
	}
	if (address) {
		address.value = nextValue;
	}
}

async function submitHomepageLaunch(input) {
	const nextValue = String(input || "").trim();
	syncHomepageLaunchInputs(nextValue);
	if (!nextValue) {
		const preferredInput =
			currentHomeView === "holy"
				? holySearchInput || homeSearchInput || address
				: homeSearchInput || holySearchInput || address;
		preferredInput?.focus?.({
			preventScroll: true,
		});
		return;
	}
	try {
		await submitAddressBar(nextValue);
	} catch {
		// handled in submitAddressBar
	}
}

if (form) {
	form.addEventListener("submit", async (event) => {
		event.preventDefault();
		event.stopPropagation();
		try {
			await submitAddressBar(address?.value || "");
		} catch {
			// handled above
		}
	});
}

if (homeSearchForm) {
	homeSearchForm.addEventListener("submit", async (event) => {
		event.preventDefault();
		event.stopPropagation();
		await submitHomepageLaunch(homeSearchInput?.value || "");
	});
}

if (holySearchForm) {
	holySearchForm.addEventListener("submit", async (event) => {
		event.preventDefault();
		event.stopPropagation();
		await submitHomepageLaunch(holySearchInput?.value || "");
	});
}

for (const input of [address, homeSearchInput, holySearchInput]) {
	input?.addEventListener("focus", () => {
		prewarmLaunchPath();
	});
	input?.addEventListener("pointerdown", () => {
		prewarmLaunchPath();
	});
	input?.addEventListener("input", () => {
		prewarmLaunchPath();
	});
}

for (const button of homeViewButtons) {
	button.addEventListener("click", () => {
		const nextView = sanitizeHomeView(button.dataset.homeViewOption);
		applyHomeView(nextView);
		window.requestAnimationFrame(() => {
			(
				nextView === "holy"
					? holySearchInput || homeSearchInput
					: homeSearchInput || holySearchInput
			)?.focus?.({ preventScroll: true });
		});
	});
	button.addEventListener("keydown", (event) => {
		if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
			return;
		}
		event.preventDefault();
		const currentIndex = homeViewButtons.indexOf(button);
		let nextIndex = currentIndex;
		if (event.key === "ArrowRight") {
			nextIndex = (currentIndex + 1) % homeViewButtons.length;
		} else if (event.key === "ArrowLeft") {
			nextIndex =
				(currentIndex - 1 + homeViewButtons.length) % homeViewButtons.length;
		} else if (event.key === "Home") {
			nextIndex = 0;
		} else if (event.key === "End") {
			nextIndex = homeViewButtons.length - 1;
		}
		const nextButton = homeViewButtons[nextIndex];
		nextButton?.focus?.({ preventScroll: true });
		nextButton?.click();
	});
}

for (const button of holyLaunchButtons) {
	button.addEventListener("click", async () => {
		await submitHomepageLaunch(button.dataset.holyLaunchUrl || "");
	});
	button.addEventListener("pointerdown", () => {
		prewarmLaunchPath();
	});
	button.addEventListener("pointerenter", () => {
		prewarmLaunchPath();
	});
}

onboarding.start?.addEventListener("click", () => {
	setOnboardingStep(2);
});

onboarding.themeBack?.addEventListener("click", () => {
	setOnboardingStep(1);
});

onboarding.themePreview?.addEventListener("click", () => {
	applyTheme(currentTheme);
	pulseOnboardingThemePreview();
});

onboarding.themeNext?.addEventListener("click", () => {
	setOnboardingStep(3);
	window.requestAnimationFrame(() => {
		onboarding.homePage?.focus?.({ preventScroll: true });
	});
});

onboarding.settingsBack?.addEventListener("click", () => {
	setOnboardingStep(2);
});

onboarding.finish?.addEventListener("click", async () => {
	try {
		await completeOnboarding();
	} catch (err) {
		setUiError("Nitro could not finish setup.", err);
	}
});

onboarding.panicKey?.addEventListener("keydown", (event) => {
	if (event.key === "Tab") return;
	event.preventDefault();
	event.stopPropagation();

	if (event.key === "Backspace" || event.key === "Delete") {
		applyPanicKeyCombo(DEFAULT_PANIC_KEY_COMBO);
		return;
	}

	const combo = buildPanicKeyComboFromEvent(event);
	if (!combo) {
		return;
	}
	applyPanicKeyCombo(combo);
});

toolbar.newTab?.addEventListener("click", () => {
	openConfiguredNewTab().catch((err) => {
		setUiError("Nitro could not open a new tab.", err);
	});
});

toolbar.minimize?.addEventListener("click", () => {
	toggleToolbarCollapseLevel();
});

toolbar.home?.addEventListener("click", () => {
	openConfiguredHome().catch((err) => {
		setUiError("Nitro could not open the home page.", err);
	});
});

toolbar.back?.addEventListener("click", () => {
	backActiveFrame();
});

toolbar.forward?.addEventListener("click", () => {
	forwardActiveFrame();
});

toolbar.reload?.addEventListener("click", async () => {
	await reloadActiveFrame();
});

toolbar.status?.addEventListener("click", () => {
	toggleStatusPanel();
});

homePopoutButton?.addEventListener("click", () => {
	openOceanSearchWindow();
});

toolbar.speed?.addEventListener("click", async () => {
	await refreshSpeedBadge({ force: true });
});

toolbar.fullscreen?.addEventListener("click", async () => {
	await toggleFullscreen();
});

statusRefreshButton?.addEventListener("click", async () => {
	await refreshStatusChecks();
});

for (const button of themePreviewButtons) {
	button.addEventListener("click", () => {
		const nextTheme = button.dataset.themeOption || DEFAULT_THEME;
		applyTheme(nextTheme);
		if (onboarding.root && !onboarding.root.hidden) {
			pulseOnboardingThemePreview();
		}
		if (!customThemeEditor?.hidden) {
			populateCustomThemeEditor(getEditableThemeSnapshot(nextTheme));
		}
	});
}

themeEditorToggle?.addEventListener("click", () => {
	const opening = Boolean(customThemeEditor?.hidden);
	if (opening) {
		populateCustomThemeEditor(getEditableThemeSnapshot(currentTheme));
	}
	setCustomThemeEditorOpen(opening);
	if (opening) {
		const firstEditorField =
			customThemeModeInput ||
			Object.values(customThemeInputs).find((input) => Boolean(input)) ||
			null;
		window.requestAnimationFrame(() => {
			customThemeEditor?.scrollIntoView?.({
				block: "nearest",
				inline: "nearest",
				behavior: "smooth",
			});
			firstEditorField?.focus?.({ preventScroll: true });
		});
	}
});

mobileSitesDesktopOption?.addEventListener("change", () => {
	if (!mobileSitesDesktopOption.checked) {
		return;
	}
	applyMobileSitesPreference(false);
});

mobileSitesMobileOption?.addEventListener("change", () => {
	if (!mobileSitesMobileOption.checked) {
		return;
	}
	applyMobileSitesPreference(true);
});

holyWireproxyRefresh?.addEventListener("click", async () => {
	try {
		await refreshHolyTransportStatus({ force: true });
	} catch (error) {
		console.warn(error);
	}
});

function handleCustomThemeChange() {
	const nextThemeOverride = readCustomThemeEditorValue();
	setThemeOverride(currentTheme, nextThemeOverride);
	populateCustomThemeEditor(nextThemeOverride);
	applyTheme(currentTheme);
}

customThemeModeInput?.addEventListener("change", handleCustomThemeChange);

for (const input of Object.values(customThemeInputs)) {
	input?.addEventListener("input", handleCustomThemeChange);
}

for (const button of engineOptionButtons) {
	button.addEventListener("click", () => {
		applySelectedEngine(button.dataset.engineOption || DEFAULT_ENGINE, {
			touched: true,
		});
		prewarmLaunchPath(button.dataset.engineOption || DEFAULT_ENGINE);
	});
}

engineRefreshButton?.addEventListener("click", async () => {
	try {
		await runEngineBenchmarks({ force: true });
		if (isHomepageVisible()) {
			const selectedResult = getDisplayBenchmark(currentSelectedEngine);
			lastMeasuredSpeedContextKey = getActiveSpeedContext().key;
			lastMeasuredSpeedMbps =
				selectedResult &&
				selectedResult.ok &&
				Number.isFinite(selectedResult.throughputMbps) &&
				selectedResult.throughputMbps > 0
					? selectedResult.throughputMbps
					: null;
			updateSpeedBadge();
		}
	} catch (err) {
		console.warn(err);
	}
});

profile.homePage?.addEventListener("input", () => {
	applyPagePreferences(
		{
			homePageInput: getRequestedHomePageInput(),
			newTabPageInput: currentNewTabPageInput,
		},
		{
			persist: true,
			autosave: true,
		}
	);
});

profile.newTabPage?.addEventListener("input", () => {
	applyPagePreferences(
		{
			homePageInput: currentHomePageInput,
			newTabPageInput: getRequestedNewTabPageInput(),
		},
		{
			persist: true,
			autosave: true,
		}
	);
});

profile.name?.addEventListener("input", () => {
	rememberLastProfileName(getRequestedProfileDisplayName());
});

profile.name?.addEventListener("keydown", async (event) => {
	if (event.key !== "Enter") return;
	event.preventDefault();
	await tryQuickProfileLogin();
});

profile.password?.addEventListener("keydown", async (event) => {
	if (event.key !== "Enter") return;
	event.preventDefault();
	await tryQuickProfileLogin();
});

profile.signup?.addEventListener("click", async () => {
	try {
		await handleProfileSignUp();
	} catch (err) {
		setProfileMessage(err.message || "Could not create profile.", "error");
	}
});

profile.login?.addEventListener("click", async () => {
	try {
		await handleProfileLogin();
	} catch (err) {
		setProfileMessage(err.message || "Could not load profile.", "error");
	}
});

profile.save?.addEventListener("click", async () => {
	try {
		await handleProfileSave();
	} catch (err) {
		setProfileMessage(err.message || "Could not save profile.", "error");
	}
});

profile.logout?.addEventListener("click", () => {
	handleProfileLogout();
});

document.addEventListener("fullscreenchange", () => {
	updateFullscreenButton();
});

document.addEventListener("click", (event) => {
	if (!isStatusPanelOpen()) return;
	const target = event.target;
	if (
		(statusPanel && statusPanel.contains(target)) ||
		(toolbar.status && toolbar.status.contains(target))
	) {
		return;
	}
	closeStatusPanel();
});

document.addEventListener("keydown", (event) => {
	if (
		onboarding.root &&
		!onboarding.root.hidden &&
		onboarding.panicKey &&
		event.target === onboarding.panicKey
	) {
		return;
	}
	if (onboarding.root && !onboarding.root.hidden) {
		if (event.key === "Escape") {
			closeStatusPanel();
		}
		return;
	}
	if (matchesPanicKeyCombo(event)) {
		event.preventDefault();
		event.stopPropagation();
		runPanicAction();
		return;
	}
	if (event.key === "Escape") {
		closeStatusPanel();
	}
});

window.addEventListener("orientationchange", applyDeviceMode);
window.addEventListener("resize", updateToolbarMetrics);
window.addEventListener("resize", applyDeviceMode);
window.addEventListener("pagehide", () => {
	persistUiState();
	persistSessionState();
	if (activeProfileName && activeProfileSecret) {
		saveCurrentProfile({ quiet: true }).catch(() => {});
	}
});

const networkInfo =
	navigator.connection || navigator.mozConnection || navigator.webkitConnection;

function handleSpeedEnvironmentChange() {
	lastMeasuredSpeedMbps = null;
	lastMeasuredSpeedContextKey = "";
	updateSpeedBadge();
	refreshContextualSpeed();
}

function scheduleContextSpeedRefresh(
	{ force = false, delayMs = CONTEXT_SPEED_REFRESH_DELAY_MS } = {}
) {
	if (speedRefreshTimer !== null) {
		window.clearTimeout(speedRefreshTimer);
	}

	speedRefreshTimer = window.setTimeout(() => {
		speedRefreshTimer = null;
		if (document.visibilityState === "hidden") {
			return;
		}
		if (isHomepageVisible()) {
			scheduleHomepageBenchmarkRefresh();
			return;
		}
		const activeTab = getActiveTab();
		if (activeTab && !isStartTab(activeTab) && activeTab.loading) {
			scheduleContextSpeedRefresh({ force, delayMs: 350 });
			return;
		}
		refreshSpeedBadge({ passive: true, force }).catch((err) =>
			console.warn(err)
		);
	}, Math.max(0, delayMs));
}

function scheduleHomepageBenchmarkRefresh(
	delayMs = HOMEPAGE_BENCHMARK_REFRESH_DELAY_MS
) {
	if (homepageBenchmarkRefreshTimer !== null) {
		window.clearTimeout(homepageBenchmarkRefreshTimer);
	}

	homepageBenchmarkRefreshTimer = window.setTimeout(() => {
		homepageBenchmarkRefreshTimer = null;
		if (
			document.visibilityState === "hidden" ||
			!isHomepageVisible() ||
			hasPendingPageNavigation()
		) {
			return;
		}
		refreshSpeedBadge({ passive: true, force: true }).catch((err) =>
			console.warn(err)
		);
	}, Math.max(0, delayMs));
}

function refreshContextualSpeed() {
	if (isHomepageVisible()) {
		scheduleHomepageBenchmarkRefresh();
		return;
	}
	scheduleContextSpeedRefresh({ force: true, delayMs: 250 });
}

window.addEventListener("online", handleSpeedEnvironmentChange);
window.addEventListener("offline", handleSpeedEnvironmentChange);
networkInfo?.addEventListener?.("change", handleSpeedEnvironmentChange);
document.addEventListener("visibilitychange", () => {
	if (
		document.visibilityState === "visible" &&
		(!Number.isFinite(lastMeasuredSpeedMbps) || lastMeasuredSpeedMbps <= 0)
	) {
		refreshContextualSpeed();
	}
});
setInterval(() => {
	refreshProxyStatus().catch((err) => console.warn(err));
}, 60000);

loadInitialUi();
applyDeviceMode();
updateMinimizeButton();
updateFullscreenButton();
updateSpeedBadge();
hydrateTabsFromState(hasInitialLaunchRequest() ? null : readSessionState());
updateNavigationState();
updateToolbarMetrics();
renderStatusRoute();
primeRuntimeWarmup();

if (typeof ResizeObserver === "function" && toolbarShell) {
	toolbarResizeObserver = new ResizeObserver(() => {
		updateToolbarMetrics();
	});
	toolbarResizeObserver.observe(toolbarShell);
}

bootStatusPanel().catch((err) => {
	setUiError("Nitro hit a startup problem.", err);
});
