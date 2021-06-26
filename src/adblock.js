import {configRead} from './config';

const YOUTUBE_REGEX = /^https?:\/\/(\w*.)?youtube.com/i;
const YOUTUBE_AD_REGEX = /(doubleclick\.net)|(adservice\.google\.)|(youtube\.com\/api\/stats\/ads)|(&ad_type=)|(&adurl=)|(-pagead-id.)|(doubleclick\.com)|(\/ad_status.)|(\/api\/ads\/)|(\/googleads)|(\/pagead\/gen_)|(\/pagead\/lvz?)|(\/pubads.)|(\/pubads_)|(\/securepubads)|(=adunit&)|(googlesyndication\.com)|(innovid\.com)|(youtube\.com\/pagead\/)|(google\.com\/pagead\/)|(flashtalking\.com)|(googleadservices\.com)|(s0\.2mdn\.net\/ads)|(www\.youtube\.com\/ptracking)|(www\.youtube\.com\/pagead)|(www\.youtube\.com\/get_midroll_)/;
const YOUTUBE_ANNOTATIONS_REGEX = /^https?:\/\/(\w*.)?youtube\.com\/annotations_invideo\?/;

console.log("%cYT ADBlocker is loading...", "color: green;");

// Set these accoring to your preference
const settings = {
  disable_ads: true,
  disable_annotations: false,
};

function isRequestBlocked(requestType, url) {
  console.log("[" + requestType + "] URL : " + url);

  if (!configRead('enableAdBlock')) {
    return false;
  }

  if (settings.disable_ads && YOUTUBE_AD_REGEX.test(url)) {
    console.log("%cBLOCK AD", "color: red;", url);
    return true;
  }

  if (settings.disable_annotations && YOUTUBE_ANNOTATIONS_REGEX.test(url)) {
    console.log("%cBLOCK ANNOTATION", "color: red;", url);
    return true;
  }

  return false;
}

/**
 * Reference - https://gist.github.com/sergeimuller/a609a9df7d30e2625a177123797471e2
 *
 * Wrapper over XHR.
 */
const origOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function () {
  const requestType = "XHR";
  const url = arguments[1];

  if (isRequestBlocked(requestType, url)) {
    throw "Blocked";
  }

  origOpen.apply(this, arguments);
};

/**
 * Wrapper over Fetch.
 */
const origFetch = window.fetch;
fetch = function () {
  const requestType = "FETCH";
  const url = arguments[0];

  if (isRequestBlocked(requestType, url)) {
    return;
  }
  return origFetch.apply(this, arguments);
};

/**
 * This is a minimal reimplementation of the following uBlock Origin rule:
 * https://github.com/uBlockOrigin/uAssets/blob/3497eebd440f4871830b9b45af0afc406c6eb593/filters/filters.txt#L116
 *
 * This in turn calls the following snippet:
 * https://github.com/gorhill/uBlock/blob/bfdc81e9e400f7b78b2abc97576c3d7bf3a11a0b/assets/resources/scriptlets.js#L365-L470
 *
 * Seems like for now dropping just the adPlacements is enough for YouTube TV
 */
const origParse = JSON.parse;
JSON.parse = function () {
  const r = origParse.apply(this, arguments);
  if (r.adPlacements && configRead('enableAdBlock')) {
    r.adPlacements = [];
  }

  // Drop "masthead" ad from home screen
  if (r?.contents?.tvBrowseRenderer?.content?.tvSurfaceContentRenderer?.content?.sectionListRenderer?.contents && configRead('enableAdBlock')) {
    r.contents.tvBrowseRenderer.content.tvSurfaceContentRenderer.content.sectionListRenderer.contents =
      r.contents.tvBrowseRenderer.content.tvSurfaceContentRenderer.content.sectionListRenderer.contents.filter(elm => !elm.tvMastheadRenderer);
  }

  return r;
};
