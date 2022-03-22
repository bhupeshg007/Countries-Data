import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const Weather = ({route, navigation}) => {
  const {capital} = route.params;
  const [data, setdata] = useState({});
  const [weather, setWeather] = useState('');
  const [time, setTime] = useState();
  const [chack, setchack] = useState('');
  const [BgImage, setBgImage] = useState();

  const image = () => {
    if (weather.search('rain') > -1) {
      return require('../assets/rain.jpg');
    } else if (chack != '0') {
      return require('../assets/day.jpg');
    } else {
      return require('../assets/night.jpg');
    }
  };

  useEffect(() => {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=62648898beab426e94a165947220303&q=${capital}&days=1&aqi=yes&alerts=yes`,
    )
      .then(response => response.json())
      .then(response => {
        setdata(response);
        setWeather(response.current.condition.text);
        setTime(response.location.localtime);
        setBgImage(image);
        setchack(response.current.is_day);
      })
      .catch(error => {
        console.error(error);
      });
  });

  return (
    <View style={styles.container}>
      {time !== undefined ? (
        <ImageBackground source={BgImage} style={styles.image}>
          <View style={styles.CapContView}>
            <Text style={styles.CapConttext}>
              {data.location.name} , {data.location.country}
            </Text>
          </View>
          <View style={styles.middleView}>
            <View style={styles.tempTextView}>
              <Text style={styles.tempText}>{data.current.temp_c + '°'}</Text>
            </View>
            <View style={styles.weathTextView}>
              <Text style={styles.weathertext1}>
                {data.current.condition.text}
              </Text>
              <Text style={styles.weathertext1}>
                {data.current.wind_kph}
                <Image
                  style={styles.tinyLogo}
                  source={require('../assets/windspeed.png')}
                />
              </Text>
              <Text style={styles.weathertext1}>
                {data.current.precip_mm}{' '}
                <Image
                  style={styles.tinyLogo}
                  source={require('../assets/precipicon.png')}
                />
              </Text>
            </View>
          </View>
          <View style={styles.timeView}>
            <Text style={styles.timeText}>{time.split(' ')[1].trim()}</Text>
            <Text style={{fontSize: 20, color: '#EFFFFB', paddingBottom: 30}}>
              Local Time
            </Text>
          </View>
        </ImageBackground>
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
export default Weather;
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  image: {
    height: '100%',
    width: '100%',
  },
  CapContView: {
    height: '12.5%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CapConttext: {
    fontSize: 20,
    paddingTop: 30,
    fontWeight: 'bold',
    color: '#7E7474',
  },
  middleView: {
    height: '30%',
    width: '100%',
    flexDirection: 'row',
  },

  tempTextView: {
    height: '100%',
    width: '42%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tempText: {
    fontSize: 80,
    color: '#7E7474',
  },
  weathTextView: {
    height: '100%',
    width: '58%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  weathertext1: {
    fontSize: 15,
    color: '#7E7474',
    paddingVertical: 7,
  },
  tinyLogo: {
    width: 30,
    height: 30,
  },
  timeView: {
    height: '57.5%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 75,
    color: '#C7F0DB',
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
