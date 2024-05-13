import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, Platform, TouchableOpacity, ScrollView, Pressable } from 'react-native'
import { StatusBar } from "expo-status-bar";

import { Bars3CenterLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import TrendingMovies from "../../components/trendingMovies";
import MovieList from "../../components/movieList";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import Loading from "../../components/loading";
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from "../../api/moviedb";
import { setGestureState } from "react-native-reanimated";

const ios = Platform.OS == 'ios';

const HomeScreen = () => {
    const router = useRouter('search')
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([])
    const [topRated, setTopRated] = useState(['Cat And Dog', 'Home Alone 2', 'House S8', 'Transformer: Age of Ice'])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, []);

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        if (data && data.results) setTrending(data.results) 
        setLoading(false)
    };
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();
        if (data && data.results) setUpcoming(data.results) 
    };
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        if (data && data.results) setTopRated(data.results) 
    };
        
    
    return (
        <View className="flex-1 bg-neutral-800">
            <SafeAreaView className={ ios ? '-mb-2' : 'mb-3'}>
                <StatusBar style="light"/>
                <View className="flex-row justify-between items-center mx-4">
                    <TouchableOpacity onPress={() => console.log('testingggg')}>
                        <Bars3CenterLeftIcon size="30" strokeWidth={2} color={"white"}/>
                    </TouchableOpacity>
                    <Text
                        className="text-3xl font-bold text-white"
                    >
                        <Text className="text-red-200">NetMovies</Text>
                    </Text>
                    <TouchableOpacity onPress={() => router.push('search')}>
                        <MagnifyingGlassIcon size="30" strokeWidth={2} color={"white"}/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            { loading ? (
                <Loading/>
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 10}}
                    >
                        <TrendingMovies data={trending}/>
        
                        <MovieList title="Upcoming" data={upcoming}/>
        
                        <MovieList title="Top Rated" data={topRated}/>
        
                    </ScrollView>
                )
            }
        </View>
    )
}

export default HomeScreen