import { View, Text, Pressable, ScrollView, Image, Dimensions } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { imageFetch185, imageFetch342 } from '../api/moviedb';
let { width, height }= Dimensions.get('window');

const MovieList = ({title, data, hideSeeAll}) => {
    const router = useRouter();
    return (
        <View className="mb-8 space-y-4">
            <View className="mx-4 flex-row justify-between items-center mb-[-5px]">
                <Text className="text-xl text-white">{title}</Text>
                {
                    !hideSeeAll && (
                        <Pressable>
                            <Text className="text-yellow-400 text-lg">
                                See All
                            </Text>
                        </Pressable>
                    )
                }
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 15}}
            >
                {
                    data.map((item, index) => {
                        let id = item?.id
                        let title = item?.original_title
                        let imagePath = item?.poster_path
                        return (
                            <Pressable className="m-2" key={index} onPress={() => router.push({ pathname: 'movie/details', params: { id }})}>
                                <View>
                                    <Image
                                        source={{uri: imageFetch185(imagePath)}}
                                        style={{
                                            width: width*0.3,
                                            height: height*0.2
                                        }}
                                        className="rounded-3xl"
                                    />
                                </View>
                                <Text i className="text-center text-white font-semibold mt-1">
                                    {title && title.length > 12 ? title.slice(0,12) + '...' : title} 
                                </Text>

                            </Pressable>
                        )
                    })
                }

            </ScrollView>
        </View>
    )
}

export default MovieList