import {memo, useCallback} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {useSelector} from 'react-redux';
import {ActivityIndicator, DataTable, Text} from 'react-native-paper';
import {useAppDispatch} from '@/shared/lib/hooks';
import {ErrorFormApiSlice} from '@/shared/ui/ErrorFromApiSlice/ErrorFormApiSlice';
import {styles} from './styles';
import {useGetCircuitsByRacer} from '@/entities/Circuit';
import {racerCircuitsTableActions} from '../../model/slices/racerCircuitsTable.slice';
import {
  getLimit,
  getPage,
  getTotalItems,
  getTotalPages,
} from '../../model/selectors/racerCircuitsTable';
import {numberOfItemsPerPageList} from '../../model/constants/racersTable';
import {ScrollView} from 'react-native-gesture-handler';
import {getPaginationLabel} from '@/shared/lib/helpers/table/pagintion';

interface RacerCircuitsTableProps {
  style?: StyleProp<ViewStyle>;
  racerId: string;
}

export const RacerCircuitsTable = memo((props: RacerCircuitsTableProps) => {
  const {style, racerId} = props;

  const dispatch = useAppDispatch();

  const page = useSelector(getPage);
  const limit = useSelector(getLimit);
  const totalItems = useSelector(getTotalItems);
  const totalPages = useSelector(getTotalPages);

  const {data, isLoading, isFetching, error, refetch} = useGetCircuitsByRacer({
    racerId,
    limit,
    page,
  });

  const onChangeLimit = useCallback(
    (page: number) => {
      dispatch(racerCircuitsTableActions.setLimit(page));
    },
    [dispatch],
  );

  const onChangePage = useCallback(
    (page: number) => {
      dispatch(racerCircuitsTableActions.setPage(page));
    },
    [dispatch],
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
        fallbackMessage={'Can not fetch circuits. Try again.'}
        onRetryPress={refetch}
      />
    );
  }

  return (
    <ScrollView style={style}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title>Race Name</DataTable.Title>
          <DataTable.Title>Circuit Name</DataTable.Title>
          <DataTable.Title>Country</DataTable.Title>
        </DataTable.Header>

        {data?.circuits.length ? (
          data.circuits?.map((item, index) => (
            <DataTable.Row key={item.Circuit.circuitId + index}>
              <DataTable.Cell>{item.date}</DataTable.Cell>
              <DataTable.Cell>{item.raceName}</DataTable.Cell>
              <DataTable.Cell>{item.Circuit.circuitName}</DataTable.Cell>
              <DataTable.Cell>{item.Circuit.Location.country}</DataTable.Cell>
            </DataTable.Row>
          ))
        ) : (
          <Text>There are no races</Text>
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
