import { View, Text, Dimensions, Platform, SafeAreaView, TouchableOpacity, ScrollView, Image} from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import MovieList from '../../components/movieList';

let { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios'
const verticalMargin = ios ? '' : 'my-3'

const PersonScreen = () => {
  const router = useRouter();

  const [favourite, setFavourite] = useState(false)
  const [personMovies, setPersonMovies] = useState([1,2,3,4])

  return (
    <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{paddingBottom: 20}}>
        <SafeAreaView className={"z-20 w-full flex-row justify-between items-center px-4" + verticalMargin}>
          <TouchableOpacity className="rounded-xl p-1 mb-2 mx-4 bg-yellow-400" onPress={() => router.back()}>
             <ChevronLeftIcon size={30} strokeWidth={2.5} color={"white"}/>
          </TouchableOpacity>
          <TouchableOpacity className="mx-4" onPress={() => setFavourite(!favourite)}>
            <HeartIcon size={35} color={favourite ? "red" : "white"}/>
          </TouchableOpacity>
        </SafeAreaView>

        {/* cast details */}
        <View>
            <View className="flex-row justify-center"
                style={{
                    shadowColor: 'gray',
                    shadowRadius: 40,
                    shadowOffset: { width: 0, height: 5},
                    shadowOpacity: 1
                }}
            >
                <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
                    <Image
                        source={require('../../assets/images/poster1.jpeg')}
                        style={{ height: height * 0.3,  width: width * 0.74
                        }}
                    />
                </View>
            </View>

            <View className="mt-6">
                <Text className="text-3xl text-white font-bold text-center">Keanue Reave</Text>
                <Text className="text-base text-neutral-500 text-center">Keanue Reave</Text>
            </View>

            <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                        <Text className="text-white font-semibold">Gender</Text>
                        <Text className="text-neutral-300 text-sm">Male</Text>
                </View>
                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                        <Text className="text-white font-semibold">Birthday</Text>
                        <Text className="text-neutral-300 text-sm">11.12.1997</Text>
                </View>
                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                        <Text className="text-white font-semibold">Known For</Text>
                        <Text className="text-neutral-300 text-sm">Gay</Text>
                </View>
                <View className="px-2 items-center">
                        <Text className="text-white font-semibold">popularity</Text>
                        <Text className="text-neutral-300 text-sm">88</Text>
                </View>
            </View>
            <View className="my-6 mx-4 space-y-2">
                <Text className="text-white text-lg">Biography</Text>
                <Text className="text-neutral-400 tracking-wide">Biography</Text>
            </View>
            {/* Cast movie list */}
            <MovieList title={'Movies'} hideSeeAll={true} data={personMovies}/>
        </View>
    </ScrollView>
  )
}

export default PersonScreen