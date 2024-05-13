import { View, Text, Dimensions, Pressable, Image } from 'react-native'
import React from 'react'
import Carousel from 'react-native-reanimated-carousel';
import { imageFetch500 } from '../api/moviedb';

let { width, height }= Dimensions.get('window');
 
const handleClick = (item) => {
  console.log(item)
  // router.push('')
}


const TrendingMovies = ({data}) => {
    let viewCount = 5;

    return (
      <View className="mb-8">
        <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
        <View className="items-center">
        <Carousel
              style={{
                width: width,
                height: height /2.5,
                // alignItems: "center",
                justifyContent: "center",
              }}
              width={280}
              height={210}
              pagingEnabled={true}
              snapEnabled={true}
              mode={"horizontal-stack"}
              loop={true}
              autoPlay={false}
              autoPlayReverse={false}
              data={data}
              modeConfig={{
                snapDirection:"left",
                stackInterval: 18,
              }}
              customConfig={() => ({ type: "positive", viewCount })}
              renderItem={({item}) => <MovieCard item={item} handleClick={handleClick}/>}
            />
            {/* <Carousel
                loop={true}
                width={width}
                height={height / 2.5}
                autoPlay={true}
                data={data}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({item}) => <MovieCard item={item} handleClick={handleClick}/>}
                style={}
            /> */}
        </View>
      </View>
    )
  }
  
  const MovieCard = ({item}) => {
      return (
          <Pressable onPress={() => handleClick(item)}>
            <Image
                source={{uri: imageFetch500(item.poster_path)}}
                style={{
                    width: width*0.6,
                    height: height*0.4
                }}
                className="rounded-3xl mx-auto"
            />
          </Pressable>
      )
  }
  
export default TrendingMovies