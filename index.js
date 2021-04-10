const CONTENT_TARGET_LAUNCH_PARAMETER = "contentTarget";
const YOUTUBE_TV_URL = "https://www.youtube.com/tv";

function extractLaunchUrlParams(launchParameters) {
    if (launchParameters === null || launchParameters === "") {
        return null;
    }
    const launchParamJson = JSON.parse(launchParameters);
    return launchParamJson[CONTENT_TARGET_LAUNCH_PARAMETER];
}

function concatenateUrlAndGetParams(ytUrl, path) {
    if (path === null) {
        return ytUrl;
    } else {
        return ytUrl + "?" + path;
    }
}

function main() {
    const launchParameters = window.PalmSystem.launchParams;
    const youtubeLaunchUrlPath = extractLaunchUrlParams(launchParameters);

    window.location = concatenateUrlAndGetParams(YOUTUBE_TV_URL, youtubeLaunchUrlPath);
}


main();