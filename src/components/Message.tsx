import * as React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Text,
  ActivityIndicator,
} from 'react-native';
import {getBackgroundImage, getMotivationalMessage} from '../util/openAi';
import {
  getStoredImageUrl,
  getStoredMessage,
  storeImageUrl,
  storeMessage,
} from '../util/mmkv';

const mock = true;
export const Message = ({stepsToday}: {stepsToday: number}) => {
  const [message, setMessage] = React.useState<string | undefined>(
    getStoredMessage(),
  );
  const [imageUrl, setImageUrl] = React.useState<string | undefined>(
    getStoredImageUrl(),
  );

  React.useEffect(() => {
    const getAndSetMessage = async () => {
      console.log('getting a message for', stepsToday, 'steps');
      const motivationalMessage = await getMotivationalMessage(
        stepsToday,
        mock,
      );
      if (!motivationalMessage) {
        return;
      }
      setMessage(motivationalMessage);
      storeMessage(motivationalMessage);
    };
    getAndSetMessage().catch(console.error);
  }, [stepsToday]);

  React.useEffect(() => {
    const getAndSetImageUrl = async () => {
      console.log('getting an image');
      const image = await getBackgroundImage(mock);
      if (!image) {
        return;
      }
      setImageUrl(image);
      storeImageUrl(image);
    };
    getAndSetImageUrl().catch(console.error);
  }, []);
  const loading = !message || !imageUrl;
  return (
    <ImageBackground
      source={{uri: imageUrl}}
      style={styles.image}
      resizeMode="cover">
      {loading && <ActivityIndicator size="large" />}
      {!loading && <Text style={styles.text}>{message}</Text>}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    fontSize: 24,
    padding: 20,
    lineHeight: 40,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
