const YT_BASE_URL = new URL('https://www.youtube.com/tv#/');
const CONTENT_INTENT_REGEX = /^.+(?=Content)/g;

export function extractLaunchParams() {
  if (window.launchParams) {
    return JSON.parse(window.launchParams);
  } else {
    return {};
  }
}

export function handleLaunch(params) {
  console.info('handleLaunch', params);

  // We use our custom "target" param, since launches with "contentTarget"
  // parameter do not respect "handlesRelaunch" appinfo option. We still
  // fallback to "contentTarget" if our custom param is not specified.
  //
  let { target, contentTarget = target } = params;
  let href;

  switch (typeof contentTarget) {
    case 'string': {
      if (contentTarget.indexOf(YT_BASE_URL.origin) === 0) {
        console.info('Launching from direct contentTarget');
        href = contentTarget;
      } else {
        // Out of app dial launch with second screen on home: { contentTarget: 'pairingCode=<UUID>&theme=cl&dialLaunch=watch' }
        console.info('Launching from partial contentTarget');
        if (contentTarget.indexOf('v=v=') === 0)
          contentTarget = contentTarget.substring(2);

        href = YT_BASE_URL.toString() + '?' + contentTarget;
      }
      break;
    }
    case 'object': {
      console.info('Voice launch');

      const { intent, intentParam } = contentTarget;
      // Ctrl+F tvhtml5LaunchUrlComponentChanged & REQUEST_ORIGIN_GOOGLE_ASSISTANT in base.js for info
      // TODO: implement google assistant
      const search = new URLSearchParams();
      // contentTarget.intent's seen so far: PlayContent, SearchContent
      const voiceContentIntent = intent
        .match(CONTENT_INTENT_REGEX)?.[0]
        ?.toLowerCase();

      search.set('inApp', true);
      search.set('vs', 9); // Voice System is VOICE_SYSTEM_LG_THINKQ
      voiceContentIntent && search.set('va', voiceContentIntent);

      // order is important
      search.append('launch', 'voice');
      voiceContentIntent === 'search' && search.append('launch', 'search');

      search.set('vq', intentParam);

      href = YT_BASE_URL + '?' + search.toString();
      break;
    }
    default: {
      console.info('Default launch');
      href = YT_BASE_URL.toString();
    }
  }

  window.location.href = href;
}

/**
 * Wait for a child element to be added that holds true for a predicate
 * @template T
 * @param {Element} parent
 * @param {(node: Node) => node is T} predicate
 * @param {AbortSignal=} abortSignal
 * @return {Promise<T>}
 */
export async function waitForChildAdd(parent, predicate, abortSignal) {
  return new Promise((resolve, reject) => {
    const obs = new MutationObserver((mutations) => {
      for (const mut of mutations) {
        switch (mut.type) {
          case 'attributes': {
            if (predicate(mut.target)) {
              obs.disconnect();
              resolve(mut.target);
              return;
            }
            break;
          }
          case 'childList': {
            for (const node of mut.addedNodes) {
              if (predicate(node)) {
                obs.disconnect();
                resolve(node);
                return;
              }
            }
            break;
          }
        }
      }
    });

    if (abortSignal) {
      abortSignal.addEventListener('abort', () => {
        obs.disconnect();
        reject(new Error('aborted'));
      });
    }

    obs.observe(parent, { subtree: true, attributes: true, childList: true });
  });
}
