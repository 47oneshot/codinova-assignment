import 'react-native-gesture-handler';
import * as React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

import {
  AddEmployeeScreen,
  EmployeeFormScreen,
  EmployeeListScreen,
} from './pages';
import {colors, screen_height, screen_width, size} from './constant/theme';
import {addAllEmployee} from './store/userSlice';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const employee = useSelector(state => state.user);

  const favorite = employee.filter(item => item.fav == true)?.length;

  return (
    <SafeAreaView
      style={{flex: 1, paddingVertical: size.appSpacing}}
      {...props}>
      <DrawerItem
        label={`Total Employee : ${employee?.length}`}
        labelStyle={{
          color: colors.buttonbg,
          fontWeight: 'bold',
          fontSize: size.smallTextFontSize,
        }}
      />
      <DrawerItem
        label={`Total Favorite : ${favorite}`}
        labelStyle={{
          color: colors.buttonbg,
          fontWeight: 'bold',
          fontSize: size.smallTextFontSize,
        }}
      />
    </SafeAreaView>
  );
}
function AppDrawer() {
  const employee = useSelector(state => state.user);

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {employee?.length ? (
        <Drawer.Screen
          name="AppScreenStack"
          options={{
            headerShown: false,
          }}
          component={AppScreenStack}
        />
      ) : (
        <Drawer.Screen
          name="InitScreenStack"
          options={{
            headerShown: false,
          }}
          component={InitScreenStack}
        />
      )}
    </Drawer.Navigator>
  );
}
const NavigationDrawerStructure = props => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row', paddingLeft: size.appSpacing}}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        <Image
          source={{
            uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{
            width: screen_width(10),
            height: screen_width(10),
            tintColor: colors.black,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
const NavigationDrawerStructureRight = props => {
  return (
    <View style={{flexDirection: 'row', paddingHorizontal: size.appSpacing}}>
      <TouchableOpacity>
        <Icon
          name="dots-three-vertical"
          size={screen_width(6)}
          color={colors.black}
        />
      </TouchableOpacity>
    </View>
  );
};

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
      }}>
      <LottieView source={require('./assets/loading.json')} autoPlay loop />
    </View>
  );
};

function InitScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName={'AddEmployee'}>
      <Stack.Screen
        name="AddEmployee"
        component={AddEmployeeScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="EmployeeForm"
        component={EmployeeFormScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function AppScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName={'EmployeeList'}>
      <Stack.Screen
        name="AddEmployee"
        component={AddEmployeeScreen}
        options={{
          headerShown: false,
          swipeEnabled: false,
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="EmployeeForm"
        component={EmployeeFormScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        options={{
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerRight: () => (
            <NavigationDrawerStructureRight navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: colors.primary,
            height: screen_height(15),
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: size.textFontSize,
            color: colors.black,
          },
          headerTitleAlign: 'center',
          title: 'Inbox',
        }}
        name="EmployeeList"
        component={EmployeeListScreen}
      />
    </Stack.Navigator>
  );
}

function App() {
  const dispatch = useDispatch();
  const [screenRender, setScreenRender] = React.useState(false);

  React.useEffect(() => {
    let isSubscribe = true;

    if (isSubscribe) {
      const getEmployee = async () => {
        await AsyncStorage.getItem('employee').then(res => {
          if (res != null) {
            //console.log(res);
            dispatch(addAllEmployee(JSON.parse(res)));
            setScreenRender(true);
          } else setScreenRender(true);
        });
      };
      getEmployee();
    }

    return () => {
      isSubscribe = false;
    };
  }, []);
  return (
    <NavigationContainer>
      {screenRender && <AppDrawer />}
      {!screenRender && <SplashScreen />}
    </NavigationContainer>
  );
}

export default App;
