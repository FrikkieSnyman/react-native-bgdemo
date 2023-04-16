import React, {useEffect} from 'react';
import 'react-native-url-polyfill/auto';
import {
  NativeEventEmitter,
  NativeModules,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Message} from './src/components/Message';
import {getAndSyncStepCount, initHealthKit} from './src/util/healthkit';
import {AppStateWrapper} from './src/components/AppStateWrapper';
console.log('registering listeners');

new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
  'healthKit:StepCount:new',
  async () => {
    await getAndSyncStepCount();
  },
);

new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
  'healthKit:StepCount:setup:success',
  async () => {
    console.log('--> StepCount: observer success');
  },
);

function App(): JSX.Element {
  const [stepsToday, setStepsToday] = React.useState<number>();
  useEffect(() => {
    const getAndSetStepCounts = async () => {
      await initHealthKit();
      const steps = await getAndSyncStepCount();
      setStepsToday(steps);
    };
    getAndSetStepCounts().catch(console.error);
  }, []);

  return (
    <AppStateWrapper>
      <SafeAreaView
        style={[styles.backgroundStyle, styles.fullscreen, styles.center]}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={styles.backgroundStyle.backgroundColor}
        />
        {stepsToday !== undefined && <Message stepsToday={stepsToday} />}
      </SafeAreaView>
    </AppStateWrapper>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
  backgroundStyle: {
    backgroundColor: Colors.darker,
  },
  fullscreen: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;
