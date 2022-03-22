import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import CountrySelectDropdown from 'react-native-searchable-country-dropdown';
const Home = ({navigation}) => {
  const [select, setSelect] = useState('');

  return (
    <View style={styles.container}>
      <CountrySelectDropdown
        placeholderStyle={styles.placeholderStyle}
        style={styles.dropdown}
        textColor={'black'}
        fontSizeOffset={5}
        value={select}
        countrySelect={setSelect}
      />
      {select ? (
        <View style={{display: 'flex'}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Detail', {
                country: select,
              });
            }}>
            <Text style={styles.text}>Submit</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#EEEDDE',
    paddingTop: 200,
  },
  button: {
    backgroundColor: '#203239',
    padding: 2,
    borderRadius: 40,
    bottom: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 20,
  },
  text: {
    fontSize: 30,
    color: '#EEEDDE',
    textAlign: 'center',
    margin: 10,
  },
});
