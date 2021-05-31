import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Color} from './common/Color';

// commons
import SceneContainer from './common/SceneContainer';
import SynergeItem from './SynergeItem';
import BaseItem from './BaseItem';
import ViewHeader from './common/ViewHeader';

//datas
import origin_item_data from './data/eng_origin_list.json';
import classes_item_data from './data/eng_classes_list.json';

const ItemFilterView = ({filter, setFilter}) => {
  const filter_item = ['ALL', 'ORIGIN', 'CLASSES'];
  const styles = StyleSheet.create({
    item_filter_view: {
      backgroundColor: 'rgb(15,38,51)',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.51,
      shadowRadius: 13.16,
      elevation: 2,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    filter_item: {
      paddingVertical: 20,
      flex: 1,
      borderWidth: 0.5,
      borderColor: 'rgb(35,58,51)',
    },
    filter_item_text: {
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });
  const FilterItem = ({value, setValue, isClicked}) => {
    return (
      <TouchableOpacity
        style={[styles.filter_item]}
        onPress={() => setFilter(value)}>
        <Text
          style={[
            styles.filter_item_text,
            isClicked ? {color: Color.on_accent} : {color: Color.fade_text},
          ]}>
          {value}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.item_filter_view}>
      {filter_item?.map((it) => (
        <FilterItem
          key={it}
          value={it}
          isClicked={filter === it ? true : false}
        />
      ))}
    </View>
  );
};

const SynergeListScene = () => {
  const styles = StyleSheet.create({
    wrapper: {
      marginHorizontal: 20,
    },
  });
  const [data, setData] = useState();
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    setData({
      origin: origin_item_data,
      classes: classes_item_data,
    });
  }, []);

  const setFilterHandler = (value) => {
    filter !== value ? setFilter(value) : null;
  };
  return (
    <SceneContainer>
      <ItemFilterView filter={filter} setFilter={setFilterHandler} />
      <ScrollView style={styles.wrapper}>
        <View>
          {filter === 'ALL' || filter === 'ORIGIN' ? (
            <>
              <ViewHeader text={'ORIGINS'} />
              {data?.origin?.map((it) => (
                <SynergeItem
                  key={it.name}
                  {...it}
                  synerge={it.name}
                  type={'origin'}
                />
              ))}
            </>
          ) : (
            <></>
          )}
        </View>
        <View>
          {filter === 'ALL' || filter === 'CLASSES' ? (
            <>
              <ViewHeader text={'CLASSES'} />
              {data?.classes?.map((it) => (
                <SynergeItem
                  key={it.name}
                  {...it}
                  synerge={it.name}
                  name={it.name}
                />
              ))}
            </>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </SceneContainer>
  );
};
export default SynergeListScene;
