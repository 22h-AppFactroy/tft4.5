import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {Color, getCostColor} from './common/Color';
import {SynergeImages} from './images/synerge/SynergeImage';
import {ChampionImages} from './images/champion/championImage';
import {Actions} from 'react-native-router-flux';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/MaterialIcons';

function regExp(str) {
  var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
  //특수문자 검증
  if (reg.test(str)) {
    //특수문자 제거후 리턴
    return str.replace(reg, '');
  } else {
    //특수문자가 없으므로 본래 문자 리턴
    return str;
  }
}

const CollapsibleItem = ({state}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <View>
      <Collapsible collapsed={!isOpen}>
        <View>
          {state.bonus.bonus_items?.map((it) => (
            <View style={styles.bonus_item_view} key={it.value}>
              <Text
                style={{
                  color: Color.label,
                  borderWidth: 1,
                  borderColor: 'rgb(100,100,100)',
                  textAlign: 'center',

                  lineHeight: 25,
                  width: 25,
                  height: 25,
                  borderRadius: 25 / 2,
                  marginRight: 10,
                }}>
                {it.count}
              </Text>
              <Text style={{color: Color.value, lineHeight: 25}}>
                {it.value}
              </Text>
            </View>
          ))}
          <View style={{flexDirection: 'row', marginTop: 20, flexWrap: 'wrap'}}>
            {state.synerge_unit_uri_list?.map((it) => (
              <View key={it.name}>
                <TouchableOpacity
                  onPress={() =>
                    Actions.ChampionDetailScene({champion: it.name})
                  }>
                  <Image style={styles.synerge_unit_img} source={it.uri} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </Collapsible>

      <TouchableOpacity onPress={() => toggle()}>
        {isOpen ? (
          <View style={{marginTop: 10, flexDirection: 'row', height: 20}}>
            <Text
              style={{color: Color.label, textAlign: 'center', lineHeight: 20}}>
              CLOSE
            </Text>
            <Icon
              style={{
                color: Color.label,
                textAlign: 'center',
                lineHeight: 20,
                fontSize: 20,
              }}
              name="expand-less"
              color="white"
            />
          </View>
        ) : (
          <View style={{marginTop: 10, flexDirection: 'row', height: 20}}>
            <Text
              style={{color: Color.label, textAlign: 'center', lineHeight: 20}}>
              OPEN DETAIL INFO
            </Text>
            <Icon
              style={{
                color: Color.label,
                textAlign: 'center',
                lineHeight: 20,
                fontSize: 20,
              }}
              name="expand-more"
              color="white"
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const SynergeItem = (props) => {
  const [state, setState] = useState();
  useEffect(() => {
    if (props) {
      var synerge_text = regExp(props.synerge.replace(/ /gi, '').toLowerCase());
      var synerge_img_uri = SynergeImages.filter(
        (it) => it.name === synerge_text,
      )[0].uri;
      var synerge_db =
        props.type === 'origin'
          ? require('./data/eng_origin_list.json')
          : require('./data/eng_classes_list.json');
      var now_synerge_data = synerge_db.filter(
        (it) => it.name === props.synerge,
      )[0];
      var now_units_uri_list = now_synerge_data.units
        ?.filter((it) => it !== props.synerge)
        ?.map((unit) => {
          var filtered_unit_name = regExp(
            unit.replace(/ /gi, '').toLowerCase(),
          );
          return {
            name: unit,
            uri: ChampionImages.filter(
              (champ) => champ.name === filtered_unit_name,
            )[0].uri,
          };
        });
      setState({
        ...now_synerge_data,
        type: props.type,
        synerge_img_uri: synerge_img_uri,
        synerge_unit_uri_list: now_units_uri_list,
      });
    }
  }, [props]);
  return (
    <View style={styles.container}>
      {state ? (
        <>
          <View style={styles.synerge_header_view}>
            <Image source={state.synerge_img_uri} style={styles.synerge_img} />
            <View style={{marginLeft: 10, marginBottom: 10}}>
              <Text style={{color: Color.value, fontSize: 18}}>
                {state.name}
              </Text>
              <Text style={{color: Color.label, fontSize: 15}}>
                {state.type}
              </Text>
            </View>
          </View>
          <Text style={{color: Color.value, fontSize: 15}}>
            {state.bonus.header}
          </Text>
          <CollapsibleItem state={state} />
        </>
      ) : (
        <Text></Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: 'rgb(16,37,49)',
    borderWidth: 1,
    borderColor: 'rgb(21,41,56)',
  },
  synerge_img: {
    width: 35,
    height: undefined,
    aspectRatio: 1,
  },
  synerge_header_view: {
    flexDirection: 'row',
  },
  bonus_item_view: {
    marginTop: 10,
    flexDirection: 'row',
  },
  synerge_unit_img: {
    width: 35,
    height: undefined,
    aspectRatio: 1,
    marginRight: 20,
    marginBottom: 10,
  },
});
export default SynergeItem;
