import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Splash,
  GetStarted,
  SignUp,
  Login,
  UploadPhoto,
  Doctor,
  Messages,
  Hospitals, ChooseDoctor, Chatting, UserProfile, UpdateProfile, DoctorProfile,
} from '../pages';
import { BottomNavigator } from '../component';

const NavStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MainApp = () => (
  <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
    <Tab.Screen name="Doctor" component={Doctor} />
    <Tab.Screen name="Messages" component={Messages} />
    <Tab.Screen name="Hospitals" component={Hospitals} />
  </Tab.Navigator>
);
const Router = () => (
  <NavStack.Navigator initialRouteName="Splash">
    <NavStack.Screen
      name="Splash"
      component={Splash}
      options={{ headerShown: false }}
    />
    <NavStack.Screen
      name="GetStarted"
      component={GetStarted}
      options={{ headerShown: false }}
    />
    <NavStack.Screen
      name="SignUp"
      component={SignUp}
      options={{ headerShown: false }}
    />
    <NavStack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
    <NavStack.Screen
      name="UploadPhoto"
      component={UploadPhoto}
      options={{ headerShown: false }}
    />
    <NavStack.Screen
      name="MainApp"
      component={MainApp}
      options={{ headerShown: false }}
    />
    <NavStack.Screen
      name="ChooseDoctor"
      component={ChooseDoctor}
      options={{ headerShown: false }}
    />
    <NavStack.Screen
      name="Chatting"
      component={Chatting}
      options={{ headerShown: false }}
    />
    <NavStack.Screen
      name="UserProfile"
      component={UserProfile}
      options={{ headerShown: false }}
    />
    <NavStack.Screen
      name="UpdateProfile"
      component={UpdateProfile}
      options={{ headerShown: false }}
    />
    <NavStack.Screen
      name="DoctorProfile"
      component={DoctorProfile}
      options={{ headerShown: false }}
    />
  </NavStack.Navigator>
);
export default Router;
