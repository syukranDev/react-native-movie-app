import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'
import Animated, { FadeInDown } from 'react-native-reanimated';

const SplashScreen = () => {
    const router = useRouter();

    useEffect(()=> {
        setTimeout(() => router.push('movie'), 1500)
    }, [])

  return (
    <View className="flex-1 justify-center items-center space-y-10">
        <Animated.View entering={FadeInDown.springify().delay(100)}>
            <View className="bg-red-600/20 rounded-full p-10">
                <View className="bg-red-600/20 rounded-full p-8">
                    <View className="bg-red-600/20 rounded-full p-8">
                        <Text className="text-lg font-semibold text-white">NetMovies</Text>
                    </View>
                </View>
            </View>
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(200)}>
            <Text className="text-base font-semibold">Enjoy refreshing content always</Text>
        </Animated.View>
        {/* <Animated.View entering={FadeInDown.springify().delay(300)}>
            <Text>2024</Text>
        </Animated.View> */}
    </View>
  )
}

export default SplashScreen