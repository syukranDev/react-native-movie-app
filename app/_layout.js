import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
  return (
    <Stack>
        <Stack.Screen 
            name="index"
            options={{
                headerShown: false
                // headerTitle: 'NetMovies' <---- this is title of top header tab
            }} 
        />
        <Stack.Screen 
            name="movie/index"
            options={{
                headerShown: false,
                // headerTitle:'Home',
                // headerBackTitle: 'Go Splash'

            }}
        />
        <Stack.Screen 
            name="movie/details"
            options={{
                headerShown: false,

            }}
        />
        <Stack.Screen
            name="person/index"
            options={{
                headerShown: false,

            }}
        />
        <Stack.Screen
            name="search/index"
            options={{
                headerShown: false,

            }}
        />
        {/* 
        <Stack.Screen 
            name="home/image"
            options={{
                headerShown: false,
                presentation: 'transparentModal',
                animation: 'fade'
            }}
        /> */}
    </Stack>
  )
}

export default Layout