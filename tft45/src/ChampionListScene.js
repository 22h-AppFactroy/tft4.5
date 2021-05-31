import React, {useState, useEffect} from 'react';
import {Color} from './common/Color';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
//icons
import FontAwesome5_Icon from 'react-native-vector-icons/FontAwesome5';
import EvilIcons_Icon from 'react-native-vector-icons/EvilIcons';
import Fontisto_Icon from 'react-native-vector-icons/Fontisto';
import Entypo_Icon from 'react-native-vector-icons/Entypo';

//commons
import SceneContainer from './common/SceneContainer';
import champ_list from './data/eng_champion_detail_list.json';
import ChampionListItem from './ChampionListItem';

//datas
import origin_data from './data/eng_origin_list.json';
import classes_data from './data/eng_classes_list.json';

//imgjsons
import {SynergeImages} from './images/synerge/SynergeImage';
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
const ModalView = ({
  header,
  header_label,
  header_icon,
  children,
  closeModal,
}) => {
  return (
    <View style={styles.modal_view}>
      <View style={styles.modal_header_view}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View
            style={{
              flexDirection: 'row',
              height: 35,
            }}>
            {header_icon}
            <Text style={styles.modal_header_text}>{header}</Text>
          </View>
          <TouchableOpacity onPress={() => closeModal()}>
            <EvilIcons_Icon
              name="close"
              style={{color: Color.label, fontSize: 20}}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.modal_header_label}>{header_label}</Text>
      </View>
      <ScrollView>{children}</ScrollView>
    </View>
  );
};

const ModalSelectItem = ({label, data, icon, onClick}) => {
  return (
    <View style={styles.modal_select_item_view}>
      <TouchableOpacity onPress={() => onClick(data)}>
        <View style={styles.modal_select_item_inner}>
          {icon}
          <Text style={styles.modal_select_item_label}>{label}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const CostFilterItem = ({value, setValue}) => {
  const [isOpen, setIsOpen] = useState(false);
  const costItem = [
    {
      label: 'all',
      data: 'all',
      icon: <FontAwesome5_Icon style={styles.modal_item_icon} name="coins" />,
    },
    {
      label: '1 cost',
      data: '1',
      icon: <FontAwesome5_Icon style={styles.modal_item_icon} name="coins" />,
    },
    {
      label: '2 cost',
      data: '2',
      icon: <FontAwesome5_Icon style={styles.modal_item_icon} name="coins" />,
    },
    {
      label: '3 cost',
      data: '3',
      icon: <FontAwesome5_Icon style={styles.modal_item_icon} name="coins" />,
    },
    {
      label: '4 cost',
      data: '4',
      icon: <FontAwesome5_Icon style={styles.modal_item_icon} name="coins" />,
    },
    {
      label: '5 cost',
      data: '5',
      icon: <FontAwesome5_Icon style={styles.modal_item_icon} name="coins" />,
    },
  ];
  const handleClickFilterItem = async (data) => {
    await setIsOpen(false);
    setValue(data);
  };
  return (
    <TouchableOpacity
      style={styles.filter_item_view}
      onPress={() => {
        setIsOpen(!isOpen);
      }}>
      <View
        style={{flexDirection: 'row', height: 15, justifyContent: 'center'}}>
        <FontAwesome5_Icon style={styles.filter_icon} name="coins" size={12} />
        <Text style={styles.filter_text}>Cost</Text>
      </View>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.pciked_text}>{value}</Text>
      </View>
      <Modal
        backdropColor={'black'}
        backdropOpacity={0.6}
        coverScreen={true}
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {}}>
        <ModalView
          closeModal={() => setIsOpen(false)}
          header_icon={
            <FontAwesome5_Icon style={styles.modal_header_icon} name="coins" />
          }
          header={'Cost Filter'}
          header_label={'Please select a Cost to search for'}>
          {costItem.map((it) => (
            <ModalSelectItem
              onClick={handleClickFilterItem}
              key={it.data}
              {...it}
            />
          ))}
        </ModalView>
      </Modal>
    </TouchableOpacity>
  );
};
const OriginFilterItem = ({value, setValue}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  var originItem = origin_data.map((it) => {
    var syn_img = SynergeImages.filter(
      (s_it) => s_it.name === regExp(it.name.replace(/ /gi, '').toLowerCase()),
    )[0].uri;
    return {
      label: it.name,
      data: it.name,
      icon: <Image source={syn_img} style={styles.modal_item_image} />,
    };
  });
  originItem.unshift({
    data: 'all',
    label: 'all',
    icon: <Fontisto_Icon style={styles.modal_item_icon} name="origin" />,
  });
  const handleClickFilterItem = async (data) => {
    await setIsOpen(false);
    setValue(data);
  };
  return (
    <TouchableOpacity
      style={styles.filter_item_view}
      onPress={() => {
        setIsOpen(!isOpen);
      }}>
      <View
        style={{flexDirection: 'row', height: 15, justifyContent: 'center'}}>
        <Fontisto_Icon style={styles.filter_icon} name="origin" size={12} />
        <Text style={styles.filter_text}>Origin</Text>
      </View>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.pciked_text}>{value}</Text>
      </View>
      <Modal
        backdropColor={'black'}
        backdropOpacity={0.6}
        coverScreen={true}
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {}}>
        <ModalView
          closeModal={toggleModal}
          header_icon={
            <Fontisto_Icon style={styles.modal_header_icon} name="origin" />
          }
          header={'Origin Filter'}
          header_label={'Please select a Origin to search for'}>
          {originItem.map((it) => (
            <ModalSelectItem
              onClick={handleClickFilterItem}
              key={it.data}
              {...it}
            />
          ))}
        </ModalView>
      </Modal>
    </TouchableOpacity>
  );
};
const ClassesFilterItem = ({value, setValue}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  var classesItem = classes_data.map((it) => {
    var syn_img = SynergeImages.filter(
      (s_it) => s_it.name === regExp(it.name.replace(/ /gi, '').toLowerCase()),
    )[0].uri;
    return {
      label: it.name,
      data: it.name,
      icon: <Image source={syn_img} style={styles.modal_item_image} />,
    };
  });
  classesItem.unshift({
    data: 'all',
    label: 'all',
    icon: <Entypo_Icon style={styles.modal_item_icon} name="colours" />,
  });
  const handleClickFilterItem = async (data) => {
    await setIsOpen(false);
    setValue(data);
  };
  return (
    <TouchableOpacity
      style={styles.filter_item_view}
      onPress={() => {
        setIsOpen(!isOpen);
      }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          height: 15,
          justifyContent: 'center',
        }}>
        <Entypo_Icon style={styles.filter_icon} name="colours" size={12} />
        <Text style={styles.filter_text}>Classes</Text>
      </View>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.pciked_text}>{value}</Text>
      </View>
      <Modal
        backdropColor={'black'}
        backdropOpacity={0.6}
        coverScreen={true}
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {}}>
        <ModalView
          closeModal={toggleModal}
          header_icon={
            <Entypo_Icon style={styles.modal_header_icon} name="colours" />
          }
          header={'Classes Filter'}
          header_label={'Please select a classes to search for'}>
          {classesItem.map((it) => (
            <ModalSelectItem
              onClick={handleClickFilterItem}
              key={it.data}
              {...it}
            />
          ))}
        </ModalView>
      </Modal>
    </TouchableOpacity>
  );
};

const ChampionListScene = () => {
  const [data, setData] = useState();
  const [filter, setFilter] = useState({
    cost: 'all',
    origin: 'all',
    classes: 'all',
  });
  const setCost = (cost) => {
    setFilter({
      ...filter,
      cost: cost,
    });
  };
  const setOrigin = (origin) => {
    setFilter({
      ...filter,
      origin: origin,
    });
  };
  const setClasses = (classes) => {
    setFilter({
      ...filter,
      classes: classes,
    });
  };
  useEffect(() => {
    async function fetchData() {
      let response = await champ_list;
      setData(response);
    }
    fetchData();
  });
  const getFilterdData = () => {
    var init = data.slice();
    var cost_filtered_data =
      filter.cost === 'all'
        ? init
        : init.filter((it) => it.cost === filter.cost);
    var origin_filtered_data =
      filter.origin === 'all'
        ? cost_filtered_data
        : cost_filtered_data.filter((it) => it.origin.includes(filter.origin));
    var classes_filtered_data =
      filter.classes === 'all'
        ? origin_filtered_data
        : origin_filtered_data.filter((it) =>
            it.classes.includes(filter.classes),
          );
    return classes_filtered_data;
  };
  return (
    <SceneContainer>
      <View style={styles.filter_view}>
        <CostFilterItem value={filter.cost} setValue={setCost} />
        <OriginFilterItem value={filter.origin} setValue={setOrigin} />
        <ClassesFilterItem value={filter.classes} setValue={setClasses} />
      </View>
      <ScrollView>
        <View style={styles.champion_list_container}>
          {data ? (
            <>
              {getFilterdData()?.map((it) => (
                <ChampionListItem key={it.name} {...it} />
              ))}
            </>
          ) : (
            <Text>Loading</Text>
          )}
        </View>
      </ScrollView>
    </SceneContainer>
  );
};
const styles = StyleSheet.create({
  filter_view: {
    // height: 50,
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
  },
  champion_list_container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  filter_text: {
    color: Color.label,
    textAlign: 'center',
    lineHeight: 15,
  },
  filter_icon: {
    color: Color.label,
    textAlign: 'center',
    marginRight: 5,
    lineHeight: 15,
  },
  filter_item_view: {
    padding: 10,
    flex: 1,
    borderWidth: 0.5,
    borderColor: 'rgb(35,58,51)',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  pciked_text: {
    marginTop: 5,
    color: Color.value,
    textAlign: 'center',
    fontSize: 15,
  },
  modal_view: {
    maxHeight: '80%',

    borderRadius: 10,
    // flex: 1,
    backgroundColor: 'rgb(15,38,51)',
    padding: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 2,
  },
  modal_header_view: {
    paddingBottom: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  modal_header_icon: {
    color: Color.value,
    fontSize: 20,
    marginRight: 10,
    lineHeight: 35,
  },
  modal_header_text: {
    color: Color.value,
    fontSize: 25,
    lineHeight: 35,
  },
  modal_header_label: {
    color: Color.label,
    fontSize: 15,
  },
  modal_select_item_view: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(30,48,61)',
  },
  modal_select_item_inner: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  modal_select_item_label: {
    color: Color.value,
    fontSize: 20,
    lineHeight: 40,
  },
  modal_item_icon: {
    color: Color.label,
    fontSize: 20,
    lineHeight: 40,
    marginRight: 10,
  },
  modal_item_image: {
    width: undefined,
    height: 20,
    aspectRatio: 1,
    marginRight: 10,
  },
});
export default ChampionListScene;
