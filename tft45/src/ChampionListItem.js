import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ChampionImages} from './images/champion/championImage';
import {Color, getCostColor} from './common/Color';

const ChampionListItem = (props) => {
  const [state, setState] = useState();
  useEffect(() => {
    if (props) {
      var filterdName = props.name.replace(/ /gi, '').toLowerCase();
      var imgContainer = ChampionImages.filter(
        (it) => it.name === filterdName,
      )[0];
      setState({
        ...props,
        imgSrc: imgContainer.uri,
      });
    }
  }, [props]);
  return (
    <TouchableOpacity
      onPress={() =>
        Actions.ChampionDetailScene({
          champion: props.name,
        })
      }>
      <View style={styles.container}>
        {state ? (
          <Image
            source={state.imgSrc}
            style={{
              width: 50,
              height: undefined,
              aspectRatio: 1,
              borderWidth: 2,
              borderColor: getCostColor(state.cost),
            }}
          />
        ) : (
          <Image
            source={require(`./images/champion/aatrox.png`)}
            style={styles.portrait}
          />
        )}
        <Text style={styles.whiteText}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    // borderWidth: 1,
    // borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  portrait: {
    // flex: 1,
    width: 50,
    height: undefined,
    aspectRatio: 1,
  },
  whiteText: {
    marginTop: 5,
    width: '100%',
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
  },
});

export default ChampionListItem;
