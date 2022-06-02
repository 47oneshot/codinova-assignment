import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  BackHandler
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FAB} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {colors, screen_height, screen_width, size} from '../constant/theme';
import {updateEmployee} from '../store/userSlice';

const EmployeeListScreen = ({navigation, route}) => {
  const navigateToEmployeeFormScreen = props => navigation.push('EmployeeForm');

  const employee = useSelector(state => state.user);
  const dispatch = useDispatch();

  function sortFirstName(a, b) {
    if (a.firstName + a.lastName < b.firstName + b.lastName) {
      return -1;
    } else if (a.firstName + a.lastName > b.firstName + b.firstName) {
      return 1;
    } else {
      return 0;
    }
  }


  const renderItem = ({item, index}) => {
    return (
      <View style={styles.card}>
        <View style={styles.content}>
          <View style={styles.circle}>
            <Text style={styles.circleText}>
              {item.firstName?.[0]}
              {item.lastName?.[0]}
            </Text>
          </View>
          <View style={styles.contentTitle}>
            <Text style={styles.title}>
              {item.firstName} {item.lastName}
            </Text>
            <Text style={styles.jobTitle}>{item.jobTitle}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() =>
              dispatch(
                updateEmployee({
                  id: item?.id,
                  fav: !item.fav,
                }),
              )
            }>
            <AntDesign
              name={!item?.fav ? 'staro' : 'star'}
              size={40}
              color={!item?.fav ? '#000000' : 'yellow'}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.root}>
     <StatusBar
        backgroundColor={colors.primary}
        translucent
        barStyle="light-content"
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={employee?.slice().sort(sortFirstName)}
        renderItem={renderItem}
        keyExtractor={item => item?.id}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
      />
      <FAB
        style={styles.fab}
        large
        icon="plus"
        color={colors.white}
        onPress={navigateToEmployeeFormScreen}
      />
    </SafeAreaView>
  );
};

export default EmployeeListScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.grey,
    paddingHorizontal: size.appSpacing,
  },
  fab: {
    position: 'absolute',
    margin: size.appSpacing,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
  },
  card: {
    width: screen_width(100) - 2 * size.appSpacing,
    height: screen_height(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: size.appSpacing,
    marginTop: size.appSpacing,
    borderRadius: size.appSpacing,
  },
  title: {
    fontSize: size.appSpacing,
    color: '#000000',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  content: {
    flexDirection: 'row',
  },
  contentTitle: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  circle: {
    backgroundColor: colors.primary,
    marginRight: size.appSpacing,
    justifyContent: 'center',
    alignItems: 'center',
    padding: size.appSpacing,
    borderRadius: 999,
  },
  circleText: {
    fontSize: size.smallTextFontSize,
    color: colors.black,
    fontWeight: 'bold',
  },
  jobTitle: {
    color: colors.deepGrey,
  },
});
