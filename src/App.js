import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { Provider, useSelector } from 'react-redux';
import Router from './router';
import { Loading } from './component';
import store from './redux/store';

const MainApp = () => {
  const stateGlobal = useSelector((state) => state);
  LogBox.ignoreLogs(['Setting a timer']);
  LogBox.ignoreAllLogs();

  return (
    <>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <FlashMessage position="center" />
      {stateGlobal.loading && <Loading />}
    </>
  );
};
const App = () => (

  <Provider store={store}>
    <MainApp />
  </Provider>
);
export default App;
