import {
  Text,
  TouchableHighlight,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native'
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from './Card';
import Card_changeColor from './Card_changeColor';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const Homedriver = ({ navigation }) => {
  useEffect(() => {
    checkAsyncStorage();
  }, []);

  async function checkAsyncStorage() {
    // console.log('AsyncFunc');
    try {
      const email = await AsyncStorage.getItem('@datalogin');
      if (email === undefined || email === '' || email === null) {
        navigation.navigate('Login');
      }
    } catch (err) { }
  }

  const [Item, setItem] = useState([{ point: "", amount_all: "", id: "" }]);
  const [Ticketid, setTicketid] = useState([{
    point: "0",
    amount_all: "",
  }]);
  const [isPress, setIsPress] = useState();

  useEffect(() => {
    get_data()
  }, []);

  async function get_data() {
    let id = await AsyncStorage.getItem('@dataloginId');
    await axios
      .get('http://10.0.2.2:3001/driver/driver_getpoint_up/' + id)
      .then(res => setItem(res.data));
    await axios
      .get('http://10.0.2.2:3001/driver/driver_getpoint_down/' + id)
      .then(res => setTicketid(res.data));

  }

  const touchProps = {
    activeOpacity: 1,
    underlayColor: '#7CBE65',
    style: isPress ? styles.btnPress : styles.btnNormal, // <-- ใช้รูปแบบอื่นได้
    onPress: () => console.log(''),                 // <-- "onPress" ต้องมี
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF", alignItems: "center" }}>
      <Text style={{ color: '#140000', fontSize: 21, margin: 10 }}>16 มกราคม 2564</Text>
      <View style={styles.btnNormal}>
        <TouchableHighlight  {...touchProps}>
          <Text style={{ color: '#140000', fontWeight: 'bold', fontSize: 16, }}>กดเพื่อเริ่มเดินทาง</Text>
        </TouchableHighlight>
      </View>

      <ScrollView>
        {Item.map(item => {
          return (
            <TouchableOpacity
              onPress={() =>
                alert(JSON.stringify(item))
              }>
              <Card key={item.id}>
                <View>
                  <Text style={{ fontSize: 20, color: '#140000' }}> จุดรับผู้โดยสาร : {item.point}</Text>
                  <Text style={{ fontSize: 20, color: '#140000' }}> จำนวน : {item.amount_all} คน</Text>
                  <Text style={{ fontSize: 20, color: '#140000' }}> เลขตั๋ว : {item.id}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          )
        })}
        {Ticketid.map(item => {
          return (
            <TouchableOpacity
              onPress={() =>
                alert(JSON.stringify(item))
              }>
              <Card_changeColor key={item.point}>
                <View>
                  <Text style={{ fontSize: 20, color: '#140000' }}> จุดส่งผู้โดยสาร : {item.point}</Text>
                  <Text style={{ fontSize: 20, color: '#140000' }}> จำนวน : {item.amount_all} คน</Text>
                </View>
              </Card_changeColor>
            </TouchableOpacity>
          )
        })}
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnNormal: {
    backgroundColor: '#b0e0e6',
    borderRadius: 21,
    height: 70,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  btnPress: {
    backgroundColor: '#7CBE65',
    borderRadius: 21,
    height: 70,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  Card: {
    backgroundColor: '#ACD3D3'
  }
});

export default Homedriver;