import {memo} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {Racer} from '../../types/racer';
import {Button, Card, Text} from 'react-native-paper';

interface RacerCardProps {
  style?: StyleProp<ViewStyle>;
  item?: Racer;
  onViewRacesPress?: () => void;
}

export const RacerCard = memo((props: RacerCardProps) => {
  const {style, item, onViewRacesPress} = props;

  if (!item) {
    return null;
  }

  return (
    <Card style={style}>
      <Card.Content>
        <Text variant="titleLarge">
          {item.givenName + ' ' + item.familyName}
        </Text>
        <Text variant="bodyMedium">{item.nationality}</Text>
        <Text variant="bodySmall">{item.dateOfBirth}</Text>
      </Card.Content>

      {onViewRacesPress ? (
        <Card.Actions>
          <Button onPress={onViewRacesPress}>View races</Button>
        </Card.Actions>
      ) : null}
    </Card>
  );
});
