import React, {useState, useEffect, useRef} from 'react';
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
import CombinedItem from './CombinedItem';
import BaseItem from './BaseItem';
import ViewHeader from './common/ViewHeader';

//datas
import item_data from './data/eng_item_list.json';

const ItemFilterView = ({filter, setFilter}) => {
  const filter_item = ['ALL', 'BASE', 'COMBINED'];
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

const ItemListScene = () => {
  const styles = StyleSheet.create({
    wrapper: {
      marginHorizontal: 20,
    },
  });
  const scrollRef = useRef();
  const [data, setData] = useState();
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    setData({
      base: item_data.filter((it) => it.type === 'BASE'),
      combined: item_data.filter((it) => it.type === 'COMBINED'),
    });
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }, [filter]);

  const setFilterHandler = (value) => {
    filter !== value ? setFilter(value) : null;
  };
  return (
    <SceneContainer>
      <ItemFilterView filter={filter} setFilter={setFilterHandler} />
      <ScrollView ref={scrollRef} style={styles.wrapper}>
        <View>
          {filter === 'ALL' || filter === 'BASE' ? (
            <>
              <ViewHeader text={'BASE ITEMS'} />
              {data?.base.map((it) => (
                <BaseItem key={it.name} {...it} />
              ))}
            </>
          ) : (
            <></>
          )}
        </View>
        <View>
          {filter === 'ALL' || filter === 'COMBINED' ? (
            <>
              <ViewHeader text={'COMBINED ITEMS'} />
              {data?.combined.map((it) => (
                <CombinedItem key={it.name} {...it} name={it.name} />
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
export default ItemListScene;
