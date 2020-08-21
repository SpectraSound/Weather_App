import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { API_KEY } from '../utility/WeatherApiKey';
import Weather from './Weather';





function SearchScreen({setCities, cities, navigation}){
    const [loading,setLoading] = useState(true)
    const [data,setData] = useState([])


    const [value,onTextChange] = useState({});

    const fetchWeather = (city) => {

        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        )

            .then(res => res.json())
            .then(json => {
                console.log(json)
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
      <View>
            <View>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} 
                    placeholder="Search for city" 
                    onChangeText={text => onTextChange(text)} 
                    
                />
                <TouchableOpacity onPress={() => 
                    {
                        fetchWeather(value)
                    }}>
                    <Text>Search</Text>
                </TouchableOpacity>
                {!loading ? 
                    
                    (<TouchableOpacity style={styles.button}>
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
        flex: 1,
        backgroundColor: "grey",
        height: 40,
        justifyContent: "center"
    },
})

export default SearchScreen;