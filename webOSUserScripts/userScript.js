const YOUTUBE_REGEX = /^https?:\/\/(\w*.)?youtube.com/i;
const YOUTUBE_AD_REGEX = /(doubleclick\.net)|(adservice\.google\.)|(youtube\.com\/api\/stats\/ads)|(&ad_type=)|(&adurl=)|(-pagead-id.)|(doubleclick\.com)|(\/ad_status.)|(\/api\/ads\/)|(\/googleads)|(\/pagead\/gen_)|(\/pagead\/lvz?)|(\/pubads.)|(\/pubads_)|(\/securepubads)|(=adunit&)|(googlesyndication\.com)|(innovid\.com)|(youtube\.com\/pagead\/)|(google\.com\/pagead\/)|(flashtalking\.com)|(googleadservices\.com)|(s0\.2mdn\.net\/ads)|(www\.youtube\.com\/ptracking)|(www\.youtube\.com\/pagead)|(www\.youtube\.com\/get_midroll_)/;
const YOUTUBE_ANNOTATIONS_REGEX = /^https?:\/\/(\w*.)?youtube\.com\/annotations_invideo\?/;

console.log("%cYT ADBlocker is loading...", "color: green;");

// Set these accoring to your preference
const settings = {
  disable_ads: true,
  disable_annotations: false,
};

const isRequestBlocked = (requestType, url) => {

  console.log(`[${requestType}] URL : ${url}`);

  if (settings.disable_ads && YOUTUBE_AD_REGEX.test(url)) {
    console.log("%cBLOCK AD", "color: red;", url);
    return true;
  }

  if (settings.disable_annotations && YOUTUBE_ANNOTATIONS_REGEX.test(url)) {
    console.log("%cBLOCK ANNOTATION", "color: red;", url);
    return true;
  }

  return false;

};

/**
 * Reference - https://gist.github.com/sergeimuller/a609a9df7d30e2625a177123797471e2
 * 
 * Wrapper over XHR.
 */
const origOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function (...args) {
  const requestType = "XHR";
  const url = args[1];

  if (isRequestBlocked(requestType, url)) {
    throw "Blocked";
  }

  origOpen.apply(this, args);
};

/**
 * Wrapper over Fetch.
 */
const origFetch = fetch;
fetch = (...args) => {
  const requestType = "FETCH";
  const url = args[0];

  if (isRequestBlocked(requestType, url)) {
    return;
  }
  return origFetch(...args);

};
