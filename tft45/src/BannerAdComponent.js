import React from 'react';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-firebase/admob';
import {View} from 'react-native';

const BannerAdComponent = ({adUnitId}) => {
  return (
    <BannerAd
      // unitId={__DEV__ ? TestIds.BANNER : adUnitId}
      unitId={adUnitId}
      size={BannerAdSize.SMART_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  );
};
export default BannerAdComponent;
