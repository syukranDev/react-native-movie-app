import { View, Text, Image } from 'react-native'
import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { imageFetch185 } from '../api/moviedb'

const CastList = ({cast}) => {
    const router = useRouter();

    return (
        <View className="my-6">
            <Text className="text-white text-lg mx-5 mb-5">Top Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 15}}
            >
                {
                    cast && cast.map((person, index) => {
                        return (
                            <TouchableOpacity key={index} className="mr-4 items-center" onPress={() => router.push({pathname: 'person', params: { person }})}>
                                <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
                                    <Image
                                        source={{uri: imageFetch185(person.profile_path)}}
                                        className="rounded-2xl h-24 w-20"
                                    />
                                </View>
                                <Text className="text-white text-xs mt-1">
                                    { 
                                        person.character.length > 10 ? person.character.slice(0,10) + '...' : person.character
                                    }
                                </Text>
                                <Text className="text-neutral-400 text-xs mt-1">
                                    { 
                                        person.original_name.length > 10 ? person.original_name.slice(0,10) + '...' : person.original_name
                                    }
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }

            </ScrollView>
        </View>
    )
}

export default CastList