import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const Detail = ({route, navigation}) => {
  const {country} = route.params;
  const [data, setdata] = useState({});
  const [Language, setLanguage] = useState({});
  const [Currency, setCurrency] = useState({});
  const [LatLang, setLatLang] = useState([]);
  const [Flag, setFlag] = useState({});
  const image = require('../assets/weathicon.png');

  useEffect(() => {
    fetch(`https://restcountries.com/v2/alpha/${country}`)
      .then(response => response.json())
      .then(response => {
        setdata(response);
        setLanguage(response.languages[0]);
        setCurrency(response.currencies[0]);
        setLatLang(response.latlng);
        setFlag(response.flags.png);
      })
      .catch(error => {
        console.error(error);
      });
  });

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{alignSelf: 'auto', flex: 4}}>
            <Text
              style={{
                color: 'white',
                fontSize: 25,
                textAlign: 'left',
                padding: 10,
                marginTop: 15,
                textTransform: 'uppercase',
              }}>
              {data.name}
            </Text>
          </View>

          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                navigation.navigate('Weather', {
                  capital: `${data.capital}`,
                });
              }}>
              <Image source={image} style={styles.weatherIcon} />

              <Text
                style={{
                  fontSize: 12,
                  color: 'white',
                  marginRight: 10,
                }}>
                Weather
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {Flag !== undefined ? (
        <ScrollView>
          <View style={styles.headings}>
            <View style={styles.everyview}>
              <View style={styles.view1}>
                <Text style={styles.headertext}>Capital : </Text>
              </View>
              <View style={styles.view2}>
                <Text style={styles.text}>{data.capital}</Text>
              </View>
            </View>

            <View style={styles.everyview}>
              <View style={styles.view1}>
                <Text style={styles.headertext}>Population :</Text>
              </View>
              <View style={styles.view2}>
                <Text style={styles.text}>{data.population}</Text>
              </View>
            </View>

            <View style={styles.everyview}>
              <View style={styles.view1}>
                <Text style={styles.headertext}>Area : </Text>
              </View>
              <View style={styles.view2}>
                <Text style={styles.text}>
                  {data.area} {data.area !== undefined ? 'km²' : ''}
                </Text>
              </View>
            </View>

            <View style={styles.everyview}>
              <View style={styles.view1}>
                <Text style={styles.headertext}>Latitude : </Text>
              </View>
              <View style={styles.view2}>
                <Text style={styles.text}>{LatLang[0]}</Text>
              </View>
            </View>

            <View style={styles.everyview}>
              <View style={styles.view1}>
                <Text style={styles.headertext}>Longitude : </Text>
              </View>
              <View style={styles.view2}>
                <Text style={styles.text}>{LatLang[1]}</Text>
              </View>
            </View>

            <View style={styles.everyview}>
              <View style={styles.view1}>
                <Text style={styles.headertext}>Flag :</Text>
              </View>
              <View style={styles.view2}>
                <Image
                  style={styles.image}
                  source={{
                    uri: `${Flag}`,
                  }}
                />
              </View>
            </View>

            <View style={styles.everyview}>
              <View style={styles.view1}>
                <Text style={styles.headertext}>Currency :</Text>
              </View>
              <View style={styles.view2}>
                <Text style={styles.text}>{Currency.name}</Text>
              </View>
            </View>

            <View style={styles.everyview}>
              <View style={styles.view1}>
                <Text style={styles.headertext}>Language : </Text>
              </View>
              <View style={styles.view2}>
                <Text style={styles.text}>{Language.name}</Text>
              </View>
            </View>

            <View style={styles.everyview}>
              <View style={styles.view1}>
                <Text style={styles.headertext}>Continent : </Text>
              </View>
              <View style={styles.view2}>
                <Text style={styles.text}>{data.subregion}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
            style={styles.activityIndicator}
            size="large"
            color="black"
          />
        </View>
      )}
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    backgroundColor: '#084594',
    flexDirection: 'row',
  },
  headings: {
    backgroundColor: '#B8FFF9',
  },
  weatherIcon: {
    height: 25,
    width: 25,
    paddingTop: 30,
  },
  everyview: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#85F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    margin: 5,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 20,
  },
  view1: {
    flex: 1.3,
  },
  view2: {
    flex: 2,
  },
  headertext: {
    fontSize: 20,
    textAlign: 'left',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  text: {
    fontSize: 20,
    textAlign: 'right',
    alignSelf: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  image: {
    width: 90,
    height: 60,
    margin: 3,
    marginRight: 20,
    alignSelf: 'flex-end',
  },
  activityIndicator: {
    backgroundColor: 'white',
    height: 45,
    width: 45,
    borderRadius: 50,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
});
