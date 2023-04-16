import AppleHealthKit, {HealthKitPermissions} from 'react-native-health';

/* Permission options */
const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.Workout,
    ],
  },
} as HealthKitPermissions;

export const initHealthKit = () => {
  return new Promise<void>((resolve, reject) => {
    /* Initialize HealthKit */
    AppleHealthKit.initHealthKit(permissions, (error: string) => {
      /* Called after we receive a response from the system */
      if (error) {
        console.error('[ERROR] Cannot grant permissions!');
        reject(error);
      }
      resolve();
    });
  });
};

export const sendStepsToServer = async (steps: number) => {
  // stub
  console.log(`Sending ${steps} steps to server`);
};

export const getAndSyncStepCount = () => {
  return new Promise<number>((resolve, reject) => {
    console.log('Retrieving step count from HealthKit');
    AppleHealthKit.getStepCount({}, (error, results) => {
      if (error) {
        reject(error);
      }
      sendStepsToServer(results.value);
      resolve(results.value);
    });
  });
};
