import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'
import Card from './Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';

const Deliverypoint = ({ navigation }) => {

  const [ticketid, setticketid] = useState();
  const [Item, setItem] = useState([]);

  useEffect(() => {
    get_data()
  }, []);

  async function get_data() {
    let id = await AsyncStorage.getItem('@dataloginId');
    await axios
      .get('http://10.0.2.2:3001/driver/driver_getpoint_down/' + id)
      .then(res => setItem(res.data));
  }
  console.log(Item);
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF", alignItems: "center" }}>
      <View style={{ margin: 10, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', backgroundColor: 'rgba(86, 96, 179, 1' }}></View>
        <Text style={{ color: '#8998DB', fontSize: 20, }}>16 มกราคม 2564</Text>
      </View>
      <View>
        <FlatList
          data={Item}
          renderItem={({ item }) => (

            <Card>
              <View>
                <Text style={{ fontSize: 18, }}> จุดส่งผู้โดยสาร : {item.point}</Text>
                <Text style={{ fontSize: 18, }}> จำนวน : {item.amount_all} คน</Text>
              </View>
            </Card>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#8998DB'
  },
  btndelivery: {
    marginTop: 50,
    backgroundColor: '#E8F3F3',
    borderRadius: 5,
    height: 60,
    width: 380,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  btndeliverypoint: {
    margin: 10,
    backgroundColor: '#E8F3F3',
    borderRadius: 5,
    height: 60,
    width: 380,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
});

export default Deliverypoint;