import Toast from 'react-native-root-toast';
import { SCREEN_WIDTH, isIOS } from './constant';
import Colors from './color';

export const CustomToast = (
  message,
  delay = 0,
  type = 'default',
  duration = Toast.durations.LONG,
) => {
  Toast.show(message, {
    containerStyle: {
      width: SCREEN_WIDTH - 32,
      marginBottom: isIOS && 72,
      padding: 12,
      paddingVertical: 8,
      borderRadius: 6,
      bottom: 0,
    },
    opacity: 1,
    delay: delay,
    shadow: isIOS ? false : true,
    duration: duration,
    keyboardAvoiding: true,
    textStyle: { fontFamily: 'Inconsolata-Regular', textAlign: 'left' },
    backgroundColor: colorBasedOnType(type),
  });
};

const colorBasedOnType = (type) => {
  if (type === 'error') {
    return Colors['primary-5'];
  } else if (type === 'success') {
    return Colors['green-1'];
  } else {
    return Colors['black-1'];
  }
};
