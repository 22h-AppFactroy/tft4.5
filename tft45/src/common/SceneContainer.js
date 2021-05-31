import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, Text, StyleSheet} from 'react-native';
import BannerAdComponent from './../BannerAdComponent';
import FbBannerAdComponent from './../FbBannerAdComponent';

import {FbAdUnits, AdUnits} from './Ad';

const SceneContainer = ({children}) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(13,32,43)',
    paddingBottom: 60,
  },
});
export default SceneContainer;
