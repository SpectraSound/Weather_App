import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button } from 'react-native';
import Weather from './Weather';
import { API_KEY } from '../utility/WeatherApiKey';
import ViewPager from '@react-native-community/viewpager';


function HomeScreen({ navigation, cities, setCities }) {


    const [currentPosition, setCurrentPosition] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        temperature: 0,
        weatherCondition: null,
        time: null,
        city: null,
    });
    const [forecast, setForecast] = useState({});

    const getPosition = () => {
        navigator.geolocation.getCurrentPosition(position => {
            setCurrentPosition({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        });
    };

    // create a function that saves your data asyncronously
    _storeData = async () => {
        try {
            await AsyncStorage.setItem('name', 'John');
        } catch (error) {
            // Error saving data
        }
    }



    const fetchWeather = (lat, lon) => {
        var call = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`

        if (!lon) {
            call = `http://api.openweathermap.org/data/2.5/forecast?q=${lat}&appid=${API_KEY}&units=metric`
        }
        fetch(call
        )
            .then(res => res.json())
            .then(json => {

                var temp = json.list;
                var now = new Date(json.list[0].dt * 1000);
                var hour = now.getHours();
                var correct = temp.filter(x => new Date(x.dt * 1000).getHours() === hour);
                var temp_data = {
                    city: json.city.name,
                    time: json.list[0].dt_txt,
                    temperature: json.list[0].main.temp,
                    weatherCondition: json.list[0].weather[0].main,
                }

                setForecast(correct);
                setData(temp_data);
                setLoading(false);

            });
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                fetchWeather(position.coords.latitude, position.coords.longitude);
                    // fetch the data back asyncronously
                _retrieveData = async () => {
                    try {
                        const value = await AsyncStorage.getItem('name');
                        if (value !== null) {
                            // Our data is fetched successfully
                            console.log(value);
                        }
                    } catch (error) {
                        // Error retrieving data
                    }
                }
            },
        );
    }, []);

    return (
        <View style={styles.container}>
            {loading ?
                (<Text>Fetching Weather</Text>)
                :
                (<>
                    <ViewPager style={styles.container} initialPage={0} orientation={"horizontal"}>
                        {forecast.map((day, index) => {
                            var date = new Date(day.dt * 1000).toLocaleString("da-DK", {
                                weekday: "short",
                            })

                            return (<View key={index}>
                                <Weather
                                    weather={day.weather[0].main}
                                    temperature={day.main.temp}
                                    city={data.city}
                                    time={date}
                                />
                            </View>)
                        })}
                    </ViewPager>

                    <View style={styles.saved_cities_container}>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            getPosition();
                            fetchWeather(currentPosition.latitude, currentPosition.longitude);
                        }}>
                            <Text style={styles.text}>Your Location</Text>
                        </TouchableOpacity>
                        <View>
                            {cities.map((city, index) => {

                            return (
                                
                                <TouchableOpacity key={index} style={styles.button} onPress={() => {
                                    fetchWeather(city)
                                }}>
                                    <Text style={styles.text}>{city}</Text>
                                    <TouchableOpacity title="X" onPress={() => {
                                        setCities(cities.filter(x => x !== city))                                        
                                    }}>
                                        <Text style={styles.text}>X</Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            )
                            })}
                        </View>
                        
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Search')}>

                        </TouchableOpacity>
                    </View>
                </>)
            }
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    saved_cities_container: {
        flex: 1,
        backgroundColor: "pink",
        justifyContent: "space-evenly",
    },
    button: {
        backgroundColor: "grey",
        height: 40,
        justifyContent: "space-between",
        flexDirection: "row"
    },
    text: {
        fontSize: 20,
        padding: 10,
        alignSelf: "center"
    }

});

export default HomeScreen;