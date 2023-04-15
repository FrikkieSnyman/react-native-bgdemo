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

export const getStepCount = () => {
  return new Promise<number>((resolve, reject) => {
    /* Get step count */
    AppleHealthKit.getStepCount({}, (error, results) => {
      if (error) {
        console.error('[ERROR] Cannot get step count!');
        reject(error);
      }
      resolve(results.value);
    });
  });
};
