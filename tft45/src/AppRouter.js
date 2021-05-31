import React, {useState, useEffect} from 'react';
import {Router, Scene, Tabs} from 'react-native-router-flux';
import {SafeAreaView, Text} from 'react-native';
import BottomMenu from './BottomMenu';
import ChampionListScene from './ChampionListScene';
import ChampionDetailScene from './ChampionDetailScene';
import SynergeListScene from './SynergeListScene';
import ItemListScene from './ItemListScene';
import {AdUnits} from './common/Ad';

import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from '@react-native-firebase/admob';
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

const interstitialAd = InterstitialAd.createForAdRequest(AdUnits.interstitial);
interstitialAd.onAdEvent((type, error) => {
  console.log(error);
  console.log('New advert event: ', type);
  if (type === AdEventType.LOADED) {
    // interstitialAd.show();
    interstitialAd.show();
    console.log('show');
  }
});
const AppRouter = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Router>
        <Scene key="root" hideNavBar={true}>
          <Scene
            initial="true"
            type="reset"
            key="ChampionListScene"
            component={ChampionListScene}
            title="Champion"
            hideNavBar={true}
          />
          <Scene
            key="ChampionDetailScene"
            // type="reset"
            component={ChampionDetailScene}
            title="ChampionDetailScene"
            hideNavBar={true}
            onEnter={() => {
              var random_number = getRandomInt(1, 12);
              console.log(random_number);
              if (random_number === 3) {
                interstitialAd.load();
              }
            }}
          />
          <Scene
            key="ItemListScene"
            type="reset"
            component={ItemListScene}
            title="ItemListScene"
            hideNavBar={true}
          />
          <Scene
            key="SynergeListScene"
            component={SynergeListScene}
            title="SynergeListScene"
            hideNavBar={true}
          />
        </Scene>
      </Router>
      <BottomMenu />
    </SafeAreaView>
  );
};

export default AppRouter;
