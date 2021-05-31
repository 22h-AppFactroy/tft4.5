/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import SplashScreen from 'react-native-splash-screen';

import React, {useEffect, useState} from 'react';

import AppRouter from './AppRouter';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return <AppRouter />;
};

export default App;
