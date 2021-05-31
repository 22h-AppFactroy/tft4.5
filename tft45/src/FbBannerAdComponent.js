import React from 'react';
import {View} from 'react-native';
import {BannerView} from 'react-native-fbads';

const FbBannerAdComponent = ({adUnitId}) => {
  return (
    <View>
      <BannerView
        placementId={adUnitId}
        type="standard"
        onPress={() => console.log('click')}
        onLoad={() => console.log('loaded')}
        onError={(err) => console.log('error', err)}
      />
    </View>
  );
};

export default FbBannerAdComponent;
