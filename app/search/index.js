import { View, Text, SafeAreaView, Dimensions, Platform, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useState } from 'react'
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useRouter } from 'expo-router';
import Loading from '../../components/loading';

let { width, height } = Dimensions.get('window');
// const ios = Platform.OS == 'ios'
// const topMargin = ios ? '' : 'mt-3'

const SearchScreen = () => {
    const router =  useRouter();
    const [result, setResult] = useState([1,2,3,4])
    const [loading, setLoading] = useState(false)

    const movieName = 'butoh pakah ang makan snasi ayam korek hidung hantu kak limah'

    return (
        <SafeAreaView className="bg-neutral-800 flex-1">
            <View
                className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full"
            >
                <TextInput
                    placeholder='Search any movies..'
                    placeholderTextColor={'lightgray'}
                    className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
                />
                <TouchableOpacity onPress={() => router.back()} className="rounded-full p-3 m-1 bg-neutral-300">
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
                                    <TouchableWithoutFeedback key={index} onPress={() => router.push({pathname: 'movie', params: { item }})}>
                                        <View className="space-y-2 mb-4">
                                            <Image className="rounded-xl"
                                                source={require('../../assets/images/poster3.jpeg')}
                                                style={{
                                                width: width * 0.44, height: height* 0.3
                                                }}
                                            />
                                            <Text className="text-neutral-300 ml-1 ">
                                                {movieName.length > 22 ? movieName.slice(0,22) + '...' : movieName}
                                            </Text>
    
                                        </View>
                                    </TouchableWithoutFeedback>
                                  )
                                })  
                             }
    
                        </View>
                        </ScrollView>
                    ) : (
                        <View><Text className="text-center justify-center mt-10 text-white font-semibold">No Result Found</Text></View>
                    )
                )
            }
        </SafeAreaView>
    )
}

export default SearchScreen