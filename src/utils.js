export function extractLaunchParams() {
  if (window.launchParams) {
    return JSON.parse(window.launchParams);
  } else {
    return {};
  }
}

export function handleLaunch(params) {
  // We use our custom "target" param, since launches with "contentTarget"
  // parameter do not respect "handlesRelaunch" appinfo option. We still
  // fallback to "contentTarget" if our custom param is not specified.
  //
  let { target, contentTarget = target } = params;

  if (contentTarget && typeof contentTarget === 'string') {
    if (contentTarget.indexOf('v=v=') != -1)
      contentTarget = contentTarget.replace('v=v=', 'v=');

    if (contentTarget.indexOf('https://www.youtube.com/tv?') === 0) {
      console.info('Launching from direct contentTarget:', contentTarget);
      window.location = contentTarget;
    } else {
      console.info('Launching from partial contentTarget:', contentTarget);
      window.location = 'https://www.youtube.com/tv#/?' + contentTarget;
    }
  } else {
    console.info('Default launch');
    window.location = 'https://www.youtube.com/tv#/';
  }
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
