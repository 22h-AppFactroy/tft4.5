import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Collapsible from 'react-native-collapsible';

// commons
import {Color, getCostColor} from './common/Color';
import ViewHeader from './common/ViewHeader';

import {ChampionImages} from './images/champion/championImage';
import {CombinedItemImages} from './images/item/combinedItemImage';
import {SkillImages} from './images/skill/SkillImage';

import champDetailData from './data/eng_champion_detail_list.json';

import SynergeItem from './SynergeItem';
import CombinedItem from './CombinedItem';

import BannerAdComponent from './BannerAdComponent';
import {AdUnits} from './common/Ad';

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

const CollapsibleItemList = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <View>
      <Collapsible collapsed={!isOpen}>
        <View>
          {props.items.map((it) => (
            <CombinedItem key={it} {...it} name={it} />
          ))}
        </View>
      </Collapsible>

      <TouchableOpacity onPress={() => toggle()}>
        {isOpen ? (
          <View>
            <Text style={{color: Color.value, textAlign: 'center'}}>CLOSE</Text>
            <Icon
              style={{color: Color.value, textAlign: 'center'}}
              name="expand-less"
              size={30}
              color="white"
            />
          </View>
        ) : (
          <View>
            <Text style={{color: Color.value, textAlign: 'center'}}>
              OPEN ITEM RECIPE
            </Text>
            <Icon
              style={{color: Color.value, textAlign: 'center'}}
              name="expand-more"
              size={30}
              color="white"
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const ChampionDetailScene = (props) => {
  const [state, setState] = useState();
  useEffect(() => {
    if (props) {
      var nowChampion = champDetailData.filter(
        (it) => it.name === props.champion,
      )[0];
      var filterdName = nowChampion.name.replace(/ /gi, '').toLowerCase();
      var imgContainer = ChampionImages.filter(
        (it) => it.name === filterdName,
      )[0];

      var nowItemUriList = nowChampion.item.map((fit) => {
        var nowItemName = regExp(fit.replace(/ /gi, '').toLowerCase());
        return CombinedItemImages.filter((sit) => sit.name === nowItemName)[0]
          .uri;
      });

      var aiblity_name = regExp(
        nowChampion.ability.name.replace(/ /gi, '').toLowerCase(),
      );

      var nowSkillImgSrc = SkillImages.filter(
        (it) => it.name === aiblity_name,
      )[0];

      setState({
        ...nowChampion,
        imgSrc: imgContainer.uri,
        itemUriList: nowItemUriList,
        skillImgSrc: nowSkillImgSrc.uri,
      });
    }
  }, [props]);
  return (
    <View
      style={{flex: 1, backgroundColor: 'rgb(13,32,43)', paddingBottom: 60}}>
      <ScrollView>
        <>
          {state ? (
            <>
              <View style={{paddingVertical: 20, paddingHorizontal: 20}}>
                <View style={styles.header_view}>
                  <Image
                    source={state.imgSrc}
                    style={
                      (styles.champ_portrait,
                      {
                        borderWidth: 2,
                        borderColor: getCostColor(state.cost),
                      })
                    }
                  />
                  <Text style={styles.champ_name_text}>{props.champion}</Text>
                  <View
                    style={{
                      backgroundColor: getCostColor(state.cost),
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                    }}>
                    <Text style={{fontSize: 15, color: Color.value}}>
                      {state.cost}{' '}
                    </Text>
                    <Text style={{fontSize: 15, color: Color.value}}>Cost</Text>
                  </View>
                </View>
              </View>

              <BannerAdComponent adUnitId={AdUnits.page_banner1} />

              <View style={{paddingVertical: 20, paddingHorizontal: 20}}>
                <View style={styles.detail_item_view}>
                  <ViewHeader text={'Item Recommend'} />
                  <View style={styles.item_build_inventory}>
                    {state.itemUriList.map((it) => (
                      <Image key={it} source={it} style={styles.item_image} />
                    ))}
                  </View>
                  <CollapsibleItemList items={state.item} />
                </View>

                <View style={styles.detail_item_view}>
                  <ViewHeader text={'Stats'} />
                  {state.stats?.map((it) => (
                    <View key={it.label} style={styles.stats_view}>
                      <Text style={styles.stat_label}>
                        {it.label}
                        {'   '}
                      </Text>
                      <Text style={styles.stat_value}>
                        {it.value.split(':')[1]}
                      </Text>
                    </View>
                  ))}
                </View>

                <View style={styles.detail_item_view}>
                  <ViewHeader text={'Skill'} />
                  <View style={styles.skill_view}>
                    <View style={styles.skill_header_view}>
                      <Image
                        style={styles.skillImg}
                        source={state.skillImgSrc}
                      />
                      <View style={styles.skill_descript}>
                        <Text style={{color: Color.value, fontSize: 18}}>
                          {state.ability.name}
                        </Text>
                        <Text style={{color: Color.label, fontSize: 15}}>
                          {state.ability.type}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={{color: Color.label, fontSize: 15}}>
                            {state.ability.ability_list.label}
                          </Text>
                          <Text style={{color: Color.value, fontSize: 15}}>
                            {state.ability.ability_list.value.split(':')[1]}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <Text style={{color: Color.value, fontSize: 15}}>
                      {state.ability.bonus}
                    </Text>
                  </View>
                </View>
              </View>
              <BannerAdComponent adUnitId={AdUnits.page_banner2} />
              <View style={{paddingVertical: 20, paddingHorizontal: 20}}>
                <View style={styles.detail_item_view}>
                  <ViewHeader text={'Origin'} />
                  <View style={styles.skill_view}>
                    {state.origin?.map((it) => (
                      <SynergeItem key={it} synerge={it} type={'origin'} />
                    ))}
                  </View>
                </View>
                <View style={styles.detail_item_view}>
                  <ViewHeader text={'Classes'} />
                  <View style={styles.skill_view}>
                    {state.classes?.map((it) => (
                      <SynergeItem key={it} synerge={it} type={'classes'} />
                    ))}
                  </View>
                </View>
              </View>
            </>
          ) : (
            <Text>Loaidng</Text>
          )}
        </>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    height: 40,
    borderBottomColor: 'white',
    borderWidth: 1,
  },

  header_view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  champ_portrait: {
    width: 150,
    height: undefined,
    aspectRatio: 1,
  },
  champ_name_text: {
    marginTop: 15,
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  detail_item_view: {
    marginBottom: 20,
  },
  item_build_inventory: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: 'rgb(16,37,49)',
    borderWidth: 1,
    borderColor: 'rgb(21,41,56)',
  },
  item_image: {
    borderRadius: 10,
    width: 50,
    height: undefined,
    aspectRatio: 1,
  },
  stats_view: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
  },
  stat_label: {
    fontSize: 15,
    color: Color.label,
  },
  stat_value: {
    fontSize: 15,
    color: Color.value,
  },
  skill_view: {
    marginTop: 10,
  },
  skill_header_view: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  skillImg: {
    width: 70,
    height: undefined,
    aspectRatio: 1,
    marginRight: 10,
  },
  skill_descript: {},
});

export default ChampionDetailScene;
