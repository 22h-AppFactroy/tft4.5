import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Linking,
  Image,
  TouchableOpacity,
  StatusBar,
  BackHandler,
  ToastAndroid,
  Alert,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Ionicons_Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons_Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome_Icon from 'react-native-vector-icons/FontAwesome';
import FbBannerAdComponent from './FbBannerAdComponent';
import {FbAdUnits, AdUnits} from './common/Ad';

const menu = [
  {item: 'ChampionListScene'},
  {item: 'ItemListScene'},
  {item: 'SynergeListScene'},
];

const getIcon = (select, type) => {
  const iconSize = 20;
  const iconColor = {
    on: '#58CCED',
    off: 'gray',
  };
  switch (type) {
    case 'ChampionListScene':
      return select ? (
        <Ionicons_Icon
          style={styles.onClickIcon}
          name="people"
          size={iconSize}
          color={iconColor.on}
        />
      ) : (
        <Ionicons_Icon
          style={styles.unClickIcon}
          name="people"
          size={iconSize}
          color={iconColor.off}
        />
      );
    case 'ItemListScene':
      return select ? (
        <MaterialCommunityIcons_Icon
          name="sword-cross"
          style={styles.unClickIcon}
          size={iconSize}
          color={iconColor.on}
        />
      ) : (
        <MaterialCommunityIcons_Icon
          name="sword-cross"
          style={styles.unClickIcon}
          size={iconSize}
          color={iconColor.off}
        />
      );
    case 'SynergeListScene':
      return select ? (
        <FontAwesome_Icon
          name="gg-circle"
          style={styles.unClickIcon}
          size={iconSize}
          color={iconColor.on}
        />
      ) : (
        <FontAwesome_Icon
          name="gg-circle"
          style={styles.unClickIcon}
          size={iconSize}
          color={iconColor.off}
        />
      );
    default:
      break;
  }
};

const BottomItem = ({idx, item, nowScene, handleClickMenu}) => {
  var flag = nowScene === item;

  const textColor = {
    on: '#58CCED',
    off: 'gray',
  };
  return (
    <TouchableOpacity style={{flex: 1}} onPress={() => handleClickMenu(item)}>
      {getIcon(flag, item)}
    </TouchableOpacity>
  );
};

const BottomMenu = () => {
  const [nowScene, setNowScene] = useState('ChampionListScene');

  const handleClickMenu = (item) => {
    if (item === Actions.currentScene) return;
    if (item === 'ChampionListScene') {
      Actions.ChampionListScene();
      setNowScene('ChampionListScene');
      return;
    }
    if (item === 'ItemListScene') {
      Actions.ItemListScene();
      setNowScene('ItemListScene');
      return;
    }
    if (item === 'SynergeListScene') {
      Actions.SynergeListScene();
      setNowScene('SynergeListScene');
      return;
    }
  };
  const createTwoButtonAlert = () => {
    if (Actions.currentScene !== 'ChampionDetailScene') {
      Alert.alert(
        'Close App',
        'are you sure to close app?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              BackHandler.exitApp();
            },
          },
        ],
        {cancelable: false},
      );
    }
  };

  const handleBackButton = () => {
    createTwoButtonAlert();
    //  // 앱 종료
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  }, []);

  return (
    <View style={styles.bottomNavigation}>
      <FbBannerAdComponent adUnitId={FbAdUnits.banner} />

      <View style={styles.wrapper}>
        {menu.map((it, idx) => (
          <BottomItem
            idx={idx}
            key={it.item}
            item={it.item}
            handleClickMenu={handleClickMenu}
            nowScene={nowScene}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // height: 50,
    paddingTop: 15,
    backgroundColor: 'rgb(15,38,51)',
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 20,
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignContent: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  onClickIcon: {
    textAlign: 'center',
  },
  unClickIcon: {
    textAlign: 'center',
  },
});

export default BottomMenu;
