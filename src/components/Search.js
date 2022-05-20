import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'

const search = () => {
  return (
    <View style = {styles.searchPanel}>
      <Text>search</Text>
    </View>
  )
}

export default search

const styles = StyleSheet.create({
    searchPanel:{
        
        backgroundColor: "orange",
    }
})