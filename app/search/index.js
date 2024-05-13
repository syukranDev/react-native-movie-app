import { View, Text, SafeAreaView, Dimensions, Platform, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useState, useCallback } from 'react'
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useRouter } from 'expo-router';
import Loading from '../../components/loading';
import { debounce } from 'lodash';
import { fetchSearchMovies, imageFetch185, imageFetch342 } from '../../api/moviedb';

let { width, height } = Dimensions.get('window');

const SearchScreen = () => {
    const router =  useRouter();
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(false)

    const handleSearch = (value) => {
        console.log(value)
        if (value && value.length > 2) {
            setLoading(true)
            fetchSearchMovies({
                query: value,
                include_adult: 'false',
                language: 'en-US',
                page: '1'
            }).then(data => {
                setLoading(false);
                setResult(data.results)
            })
        } else {
            setLoading(false)
            setResult([]) //make it empty so .length == 0 and run no data found below
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []); //to avoid every char key stroke is calling an API aboe

    return (
        <SafeAreaView className="bg-neutral-800 flex-1">
            <View
                className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full"
            >
                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder='Search any movies..'
                    placeholderTextColor={'lightgray'}
                    className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
                />
                <TouchableOpacity onPress={() => router.back()} className="rounded-full p-3 m-1 bg-red-600">
                    <XMarkIcon size={25} color={"white"}/>
                </TouchableOpacity>
            </View>

            {
                loading ? (
                    <Loading/>
                ) : (
                    result.length > 0 ? (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{paddingHorizontal: 15}}
                            className="space-y-3"
                        >
                        <Text className="text-white font-semibold ml-1">
                            Results: ({result.length})
                        </Text>
                        <View
                            className="flex-row justify-between flex-wrap"
                        >
                             {
                                result.map((item, index) => {
                                  return (
                                    <TouchableWithoutFeedback key={index} onPress={() => router.push({pathname: 'movie/details', params: { id: item.id }})}>
                                        <View className="space-y-2 mb-4">
                                            <Image className="rounded-xl"
                                                source={{uri: imageFetch185(item.poster_path)}}
                                                style={{
                                                width: width * 0.44, height: height* 0.3
                                                }}
                                            />
                                            <Text className="text-neutral-300 ml-1 text-center ">
                                                {item.original_title.length > 22 ? item.original_title.slice(0,22) + '...' : item.original_title}
                                            </Text>
    
                                        </View>
                                    </TouchableWithoutFeedback>
                                  )
                                })  
                             }
    
                        </View>
                        </ScrollView>
                    ) : (
                        <View className="flex-1 justify-cen ter items-center ml-2 mr-2 "> 
                            <Image className="rounded-xl scale-75"
                                                source={require('../../assets/images/family.png')}
                                                style={{
                                                width: width , height: height* 0.4
                                                }}
                            />
                            <Text className="text-white ">Enjoy your favourite movie</Text>
                        </View>
                    )
                )
            }
        </SafeAreaView>
    )
}

export default SearchScreen