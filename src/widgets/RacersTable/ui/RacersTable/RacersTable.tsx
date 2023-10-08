import {Racer, useGetRacers} from '@/entities/Racer';
import {memo, useCallback} from 'react';
import {GestureResponderEvent, StyleProp, View, ViewStyle} from 'react-native';
import {useSelector} from 'react-redux';
import {
  getLimit,
  getPage,
  getTotalItems,
  getTotalPages,
} from '../../model/selectors/racersTable';
import {ActivityIndicator, DataTable, Text} from 'react-native-paper';
import {useAppDispatch} from '@/shared/lib/hooks';
import {racersTableActions} from '../../model/slices/racersTable.slice';
import {numberOfItemsPerPageList} from '../../model/constants/racersTable';
import {ErrorFormApiSlice} from '@/shared/ui/ErrorFromApiSlice/ErrorFormApiSlice';
import {styles} from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {RootNavigationProps} from '@/app/providers/navigation';
import {useNavigation} from '@react-navigation/native';
import {getPaginationLabel} from '@/shared/lib/helpers/table/pagintion';

interface RacersTableProps {
  style?: StyleProp<ViewStyle>;
}

export const RacersTable = memo((props: RacersTableProps) => {
  const {style} = props;

  const dispatch = useAppDispatch();
  const navigation = useNavigation<RootNavigationProps>();

  const page = useSelector(getPage);
  const limit = useSelector(getLimit);
  const totalItems = useSelector(getTotalItems);
  const totalPages = useSelector(getTotalPages);

  const {data, isLoading, isFetching, error, refetch} = useGetRacers({
    page,
    limit,
  });

  const onChangeLimit = useCallback(
    (page: number) => {
      dispatch(racersTableActions.setLimit(page));
    },
    [dispatch],
  );

  const onChangePage = useCallback(
    (page: number) => {
      dispatch(racersTableActions.setPage(page));
    },
    [dispatch],
  );

  const onNamePress = useCallback(
    (racer: Racer) => () => {
      navigation.navigate('RacerNavigator', {
        screen: 'RacerInfo',
        params: {
          racerId: racer.driverId,
        },
      });
    },
    [navigation],
  );

  const onRacesPress = useCallback(
    (racer: Racer) => () => {
      navigation.navigate('RacerNavigator', {
        screen: 'RacerCircuits',
        params: {
          racerId: racer.driverId,
        },
      });
    },
    [navigation],
  );

  const loading = isLoading || isFetching;

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator animating />
      </View>
    );
  }

  if (error) {
    return (
      <ErrorFormApiSlice
        error={error}
        fallbackMessage={'Can not fetch drivers. Try again.'}
        onRetryPress={refetch}
      />
    );
  }

  return (
    <ScrollView style={style}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Date Of Birth</DataTable.Title>
          <DataTable.Title>Nationality</DataTable.Title>
          <DataTable.Title> </DataTable.Title>
        </DataTable.Header>

        {data?.racers ? (
          data.racers?.map(item => (
            <DataTable.Row key={item.driverId}>
              <DataTable.Cell onPress={onNamePress(item) as any}>
                {item.givenName + ' ' + item.familyName}
              </DataTable.Cell>
              <DataTable.Cell>{item.dateOfBirth}</DataTable.Cell>
              <DataTable.Cell>{item.nationality}</DataTable.Cell>
              <DataTable.Cell onPress={onRacesPress(item) as any}>
                Races
              </DataTable.Cell>
            </DataTable.Row>
          ))
        ) : (
          <Text>There are no drivers</Text>
        )}

        <DataTable.Pagination
          page={page}
          numberOfPages={totalPages + 1}
          onPageChange={onChangePage}
          label={getPaginationLabel(page, limit, totalItems)}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={limit}
          onItemsPerPageChange={onChangeLimit}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>
    </ScrollView>
  );
});
