import { View, Text, Pressable, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Platform, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ChevronLeftIcon, } from 'react-native-heroicons/outline'
import { HeartIcon} from 'react-native-heroicons/solid'
import { LinearGradient } from 'expo-linear-gradient'
import CastList from '../../components/castList'
import MovieList from '../../components/movieList'
import { fetchMovieCredit, fetchMovieDetails, fetchSimilarMovies, imageFetch500 } from '../../api/moviedb'
import Loading from '../../components/loading'

let { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios'
const topMargin = ios ? '' : 'mt-3'

const MovieScreeDetails = () => {
  const router = useRouter();

  const params = useLocalSearchParams();
  const { id } = params;

  const [favourite, setFavourite] = useState(false);
  const [cast, setCast] = useState([])
  const [similar, setSimilar] = useState([1,2,3,5,6])
  const [loading, setLoading] = useState(true)
  const [movie, setMovie] = useState({})

  useEffect(() => {

      getMoviesDetails();
      getMovieCredit();
      getSimilarMovies();
  }, []);

  const getMoviesDetails = async () => {
      const data = await fetchMovieDetails(id);
      if (data) setMovie(data) 
      setLoading(false)
  };
  const getMovieCredit = async () => {
      const data = await fetchMovieCredit(id);
      if (data && data.cast) setCast(data.cast) 
  };
  const getSimilarMovies = async () => {
      const data = await fetchSimilarMovies(id);
      if (data && data.results) setSimilar(data.results) 
  };
  
  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 20}}
      className="flex-1 bg-neutral-900"
    >
      <View className="w-full">
        <SafeAreaView className={"absolute z-20 w-full flex-row justify justify-between items-center px-4" + topMargin }>
          <TouchableOpacity className="rounded-xl p-1 mb-2 mx-4 bg-yellow-400" onPress={() => router.back()}>
             <ChevronLeftIcon size={30} strokeWidth={2.5} color={"white"}/>
          </TouchableOpacity>
          <TouchableOpacity className="mx-4" onPress={() => setFavourite(!favourite)}>
            <HeartIcon size={35} color={favourite ? "red" : "white"}/>
          </TouchableOpacity>
        </SafeAreaView>

        { loading ? (
            <Loading/>
          ) : (
            <View> 
              <Image
                  source={{uri : imageFetch500(movie.poster_path)}}
                  style={{
                      width: width,
                      height: height*0.55
                  }}
                  className="rounded-3xl"
              />
              <LinearGradient 
                colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                style={{width, height: height * 0.4 }}
                start={{ x:0.5, y: 0}}
                end={{ x:0.5, y: 1}}
                className="absolute bottom-0"
              />    
            </View>
          )
        }

        

        <View className="space-y-3 -mt-14">
          <Text className="text-white text-center text-3xl font-bold semi-tracking">
            {movie.title}
          </Text>

          {
            movie?.id ? (
              <Text className="text-neutral-400 font-semibold text-base text-center">
            {movie.status} | {movie.release_date} | {movie.runtime}
          </Text>

            ) : null
          }

          

          <View className="flex-row justify-center mx-4 space-x-2">
            {
              movie?.genres?.map((genre, index) => {
                let showDot = index+1 != movie.genres.length //false
                return (
                  <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                  {genre?.name} {showDot ? "|" : null}
                  </Text>
                )
              })
            }
          </View>

          {/* Description movie */}
          <Text className="tracking-wide text-neutral-400 mx-4">
            { movie?.overview }
          </Text>

        </View>

        {/* Cast actor */}
        <CastList cast={cast}/>

        {/* Recomenddation movies  */}
        <MovieList title="Similar Movies" data={similar} hideSeeAll={true}/>
         

      </View>
    </ScrollView>
  )
}

export default MovieScreeDetails