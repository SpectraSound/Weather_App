import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Button, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { API_KEY } from '../utility/WeatherApiKey';
import Weather from './Weather';





function SearchScreen({setCities, cities, navigation}){
    const [loading,setLoading] = useState(true)
    const [data,setData] = useState([])


    const [value,onTextChange] = useState({});


    // Fetchweather to see if city exists
    const fetchWeather = (city) => {

        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        )

            .then(res => res.json())
            .then(json => {
                
                var temp_data = {
                    city: json.name,
                    temperature: json.main.temp,
                    weatherCondition: json.weather[0].main,
                }

                setCities(cities => [...cities, city])
                setData(temp_data)
                setLoading(false)
            }
        );
    }


    
    return(
      <View style={styles.container}>
            <View>
                <TextInput
                    style={styles.textInput} 
                    placeholder="Search for city" 
                    onChangeText={text => onTextChange(text)} 
                    
                />
                <TouchableOpacity style={styles.button} onPress={() => 
                    {
                        fetchWeather(value)
                        
                    }}>
                    <Text style={styles.text}>Search</Text>
                </TouchableOpacity>
                {!loading ? 
                    
                    (<TouchableOpacity>
                       <Text>{data.city}</Text>
                    </TouchableOpacity>)
                    :
                    (
                        <></>
                    )
                }
            </View>
      </View>
    );
}

const styles = StyleSheet.create({
    button:{
        
        backgroundColor: "blue",
        height: 40,
        justifyContent: "center"
    },
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
    textInput: { 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1 
    },
    text: {
        fontSize: 20,
        padding: 10,
        alignSelf: "center"
    }
})

export default SearchScreen;