
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { weatherConditions } from '../utility/WeatherConditions';


//weather component properties are sent from HomeScreen
export const Weather = ({ weather, temperature, city, time }) => {
  return (
    <View
      style={[
        styles.weatherContainer,
        { backgroundColor: weatherConditions[weather].color }
      ]}
    >
      <View style={styles.headerContainer}> 
        <MaterialCommunityIcons
          size={72}
          name={weatherConditions[weather].icon}
          color={'#fff'}
        />
        <Text style={styles.tempText}>{temperature}˚</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{city}</Text>  
        <Text style={styles.weather_style}>{weatherConditions[weather].title}</Text>
        <Text style={styles.subtitle}>
          {weatherConditions[weather].subtitle}
        </Text>
        <Text style={styles.subtitle}>{time}</Text>
      </View>
    </View>
  );
};

Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string,
  city: PropTypes.string
};


const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  tempText: {
    fontSize: 72,
    color: '#fff'
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40
  },
  title: {
    fontSize: 60,
    color: '#fff'
  },
  weather_style: {
      fontSize: 30,
      color: '#fff',
  },
  subtitle: {
    fontSize: 24,
    color: '#fff'
  }
});

export default Weather;

