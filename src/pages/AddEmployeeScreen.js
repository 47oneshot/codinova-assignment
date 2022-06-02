import * as React from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors, screen_height, screen_width, size} from '../constant/theme';

const AddEmployeeScreen = ({navigation}) => {

  const navigateToEmployeeFormScreen = () =>
    navigation.navigate('EmployeeForm');

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        backgroundColor={colors.buttonbg}
        translucent
        barStyle="light-content"
        animated
      />
      <View style={styles.container}>
        <TouchableOpacity
         activeOpacity={0.8}
          onPress={navigateToEmployeeFormScreen}
          style={styles.button}>
          <Text style={styles.buttonText}>ADD EMPLOYEE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddEmployeeScreen;

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: colors.primary},
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  button: {
    height: screen_height(6),
    width: screen_width(100) - 2 * size.appSpacing,
    backgroundColor: colors.buttonbg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: size.smallTextFontSize,
    fontWeight: 'bold',
    color: colors.white,
  },
});
