import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const MESSAGE_KEY = 'message';
const IMAGE_URL_KEY = 'image_url';

export const getStoredMessage = () => {
  return storage.getString(MESSAGE_KEY);
};

export const getStoredImageUrl = () => {
  return storage.getString(IMAGE_URL_KEY);
};

export const storeMessage = (message: string) => {
  storage.set(MESSAGE_KEY, message);
};

export const storeImageUrl = (imageUrl: string) => {
  storage.set(IMAGE_URL_KEY, imageUrl);
};
