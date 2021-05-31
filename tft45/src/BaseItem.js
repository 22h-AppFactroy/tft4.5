import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {Color} from './common/Color';
import {CombinedItemImages} from './images/item/combinedItemImage';
import {BaseItemImages} from './images/item/baseItem';
import item_data from './data/eng_item_list.json';
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
const BaseItem = (props) => {
  const [state, setState] = useState();
  useEffect(() => {
    var now_item_data = item_data.filter((it) => it.name === props.name)[0];
    var now_item_name = regExp(props.name.replace(/ /gi, '').toLowerCase());

    var now_item_img_uri = BaseItemImages.filter(
      (it) => it.name === now_item_name,
    )[0].uri;

    var now_item_combine_info_list = now_item_data.combine_info.map(
      (combined_item) => {
        var filtered_combined_item = regExp(
          combined_item.replace(/ /gi, '').toLowerCase(),
        );
        return {
          name: combined_item,
          uri: CombinedItemImages.filter(
            (it) => it.name === filtered_combined_item,
          )[0].uri,
        };
      },
    );
    setState({
      ...now_item_data,
      now_item_img_uri: now_item_img_uri,
      now_item_combine_info_list: now_item_combine_info_list,
    });
  }, [props]);
  return (
    <View style={styles.container}>
      {state ? (
        <View>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Image source={state.now_item_img_uri} style={styles.item_img} />
            <View>
              <Text style={{color: Color.value, fontSize: 15, lineHeight: 40}}>
                {state.name}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {state.now_item_combine_info_list?.map((it, idx) => (
              <View key={`${state.name}${it.name}${idx}`}>
                <Image
                  style={{
                    width: 30,
                    height: undefined,
                    aspectRatio: 1,
                    marginRight: 10,
                    marginBottom: 10,
                  }}
                  source={it.uri}
                />
              </View>
            ))}
          </View>
          <Text style={{color: Color.value, fontSize: 15}}>{state.bonus}</Text>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: 'rgb(16,37,49)',
    borderWidth: 1,
    borderColor: 'rgb(21,41,56)',
  },
  item_img: {
    width: 40,
    height: undefined,
    aspectRatio: 1,
    marginRight: 10,
  },
});

export default BaseItem;
