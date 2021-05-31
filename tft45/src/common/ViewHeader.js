import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
const ViewHeader = ({text}) => {
  return (
    <View style={styles.view_header_view}>
      <Text style={styles.view_header_text}>{text}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  view_header_view: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(50,50,50)',
  },
  view_header_text: {
    color: 'white',
    fontSize: 18,
    paddingBottom: 5,
    borderBottomWidth: 5,
    borderBottomColor: 'rgb(200,100,202)',
    fontWeight: 'bold',
  },
});

export default ViewHeader;
