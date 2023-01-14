import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Input from '../components/UI/Input'
import { useEffect, useState } from 'react'
import { COLORS, DUMMY_CRIMES } from '../constants/styles'
import { StatusBar } from 'expo-status-bar'
import { getAddress } from '../utils/location'
import { AntDesign } from '@expo/vector-icons'

const Crimes = ({ navigation }) => {
  const [title, setTitle] = useState('')
  const inputChangeHandler = (text) => {
    setTitle(text)

  }

  const [crimes, setCrimes] = useState([])

  useEffect(() => {
    const formatCrimes = (crimes) => {
      return crimes.map((crime) => {
        return {
          id: crime.id,
          title: crime.titre,
          decription: crime.description,
          latitude: crime.localisation.latitude,
          longitude: crime.localisation.longitude,
          image: `data:image/png;base64,${crime.piecesJointes[0].content}`,
        }
      })
    }

    const getDeclarations = async () => {
      const result = await fetch('http://localhost:8080/declarations-only/')
      const crimes = formatCrimes(await result.json())
      const newCrimes = []

      for (let item of crimes) {
        const address = await getAddress(item.latitude, item.longitude)
        newCrimes.push({ ...item, address })
      }

      setCrimes(newCrimes)
    }

    getDeclarations()
  }, [])

  const renderLatestHandler = ({ item }) => {
    return (
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.address}>Rabat, Agdal</Text>
        </View>
      </View>
    )
  }
  const renderAllHandler = ({ item }) => {
    // console.log(item.address)
    return (
      <View style={styles.item}>
        <View>
          <Image source={{ uri: item.image }} style={styles.smallImage} />
        </View>
        <View style={styles.smallInfoContainer}>
          <Text style={styles.smallTitle}>{item.title}</Text>
          <Text style={[styles.smallTitle, { fontSize: 10 }]}>
            {item.address}
          </Text>
        </View>
        <Pressable
          onPress={() => {
            navigation.navigate('crime', {
              item,
            })
          }}
          style={({ pressed }) => {
            pressed && styles.pressed
          }}>
          <Text style={styles.link}>
            View More{' '}
            <AntDesign
              name="arrowright"
              size={12}
              color={COLORS.primaryYellow}
            />
          </Text>
        </Pressable>
      </View>
    )
  }
  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Input
          textInputConfig={{
            placeholder: 'Search',
            value: title,
            onChangeText: inputChangeHandler,
          }}
          nameIcon="search"
          sizeIcon={24}
          colorIcon={COLORS.primaryBlue}
        />
        <View style={styles.secondContainer}>
          <Text style={styles.headingPrimary}>Latest Declarations</Text>
          <ScrollView
            style={styles.latestDeclarations}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {crimes?.map((data) => {
              return (
                <Pressable
                  key={data.id}
                  onPress={() =>
                    navigation.navigate('crime', {
                      item: data,
                    })
                  }>
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: data.image }} style={styles.image} />
                    <View style={styles.infoContainer}>
                      <Text style={styles.title}>{data.title}</Text>
                      <Text style={styles.address}>{data.address}</Text>
                    </View>
                  </View>
                </Pressable>
              )
            })}
          </ScrollView>
        </View>

        <View style={styles.thirdContainer}>
          <Text style={styles.headingPrimary}>All Declarations</Text>
          <FlatList
            data={crimes}
            keyExtractor={(item, index) => index}
            renderItem={renderAllHandler}
            style={{ marginTop: 10 }}
          />
        </View>
      </View>
    </>
  )
}
export default Crimes
const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  container: {
    flex: 1,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  secondContainer: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
  thirdContainer: {
    marginHorizontal: 10,
    flex: 1,
  },
  latestDeclarations: {
    // margin: 10,
    marginVertical: 10,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginRight: 15,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 18,
    left: 18,
  },
  title: {
    fontFamily: 'Inner-Black',
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: 1.1,
  },
  address: {
    fontFamily: 'Inner-Black',
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: 1.05,
  },
  headingPrimary: {
    fontFamily: 'Inner-Black',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1.1,
    color: COLORS.primaryYellow,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
  item: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 12,
    backgroundColor: '#EEE',
    borderRadius: 30,
    paddingHorizontal: 6,
    paddingVertical: 4,
    // elevation: 2,
  },
  smallTitle: {
    fontFamily: 'Inner-Black',
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primaryBlue,
    letterSpacing: 1.1,
  },
  link: {
    fontFamily: 'Inner-Black',
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primaryYellow,
  },
  smallImage: {
    width: 90,
    height: 90,
    borderRadius: 20,
  },
  list: {
    marginTop: 10,
    marginBottom: 10,
    // flex: 1,
    // flexGrow: 1,
  },
  smallInfoContainer: {
    // marginLeft: 70,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
})
