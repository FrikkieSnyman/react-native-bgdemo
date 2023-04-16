import * as React from 'react';
import {AppState, AppStateStatus} from 'react-native';

// this is a HOC that will mount/unmount based on whether the app is launched from the background or not.
// if the app is launched from the bg (such as via Healthkit), it returns null, thereby preventing the children from being mounted
// however, by keeping state of whether the app has been in the foreground or not, we are able to render the children once the app is in the foreground.

export const AppStateWrapper = (props: React.PropsWithChildren<{}>) => {
  const [appStateHasBeenActive, setAppStateHasBeenActive] = React.useState(
    AppState.currentState === 'active',
  );

  const appstateChangeHandler = React.useCallback(
    (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        // app has come to the foreground
        // keep state that the app has now been in the foreground, and from here on forward we need to keep the app mounted
        console.log('app has come to the foreground, set app has been active');
        setAppStateHasBeenActive(true);
      }
    },
    [setAppStateHasBeenActive],
  );

  React.useEffect(() => {
    const AppStateChangeListener = AppState.addEventListener(
      'change',
      appstateChangeHandler,
    );

    return () => {
      AppStateChangeListener.remove();
    };
  }, [appstateChangeHandler]);

  if (!appStateHasBeenActive && AppState.currentState !== 'active') {
    // app is not active and it hasn't been active before, return null
    console.log('app has not been active yet, return null');
    return null;
  }
  return <React.Fragment>{props.children}</React.Fragment>;
};
