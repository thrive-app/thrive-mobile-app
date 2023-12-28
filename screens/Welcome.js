import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import { useUser, useAuth } from '@clerk/clerk-expo'
import { SafeAreaView } from 'react-native-safe-area-context'
const Welcome = () => {
  const { colors } = useTheme();  
  const { user } = useUser();

  const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background
    },
    text: {
        fontWeight: "bold",
        color: colors.text
    }
})

  
    const { isLoaded,signOut } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome, {user.firstName} </Text>
      <Button title="Sign Out" onPress={() => {signOut()}}/>
    </SafeAreaView>
  )



  
}

export default Welcome

