import {isErrorWithMessage} from '@/shared/lib/helpers/rtkQuery/rtkQuery';
import {SerializedError} from '@reduxjs/toolkit';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {memo, useMemo} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {styles} from './styles';

interface ErrorFormApiSliceProps {
  style?: StyleProp<ViewStyle>;
  error?: FetchBaseQueryError | SerializedError | string;
  fallbackMessage?: string;
  fill?: boolean;
  testID?: string;
  onRetryPress?: () => void;
}

export const ErrorFormApiSlice = memo((props: ErrorFormApiSliceProps) => {
  const {style, error, fallbackMessage, fill = true, onRetryPress} = props;

  const message = useMemo(() => {
    if (typeof error === 'string') {
      return error;
    }

    return isErrorWithMessage(error) ? error.data : fallbackMessage;
  }, [error, fallbackMessage]);

  const containerStyle = useMemo(() => ({flex: fill ? 1 : undefined}), [fill]);

  return (
    <View style={[styles.container, containerStyle, style]}>
      <Text style={styles.text} variant="bodySmall">
        {message}
      </Text>

      {onRetryPress ? (
        <Button style={styles.button} mode="contained" onPress={onRetryPress}>
          Retry
        </Button>
      ) : null}
    </View>
  );
});
