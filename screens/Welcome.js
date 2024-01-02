import { StyleSheet, Text, View, Button, Image } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import ContentBox from "../components/ContentBox";
import Header from '../components/Header'


const Welcome = () => {
  const { colors } = useTheme();
  const { user } = useUser();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      backgroundColor: colors.background,
      alignContent: "center",
    },
    titleText: {
      fontFamily: "DMSansBold",
      fontSize: 24,
      margin: 10,
      paddingVertical: 20,
      flex: 1,
      flexWrap: "wrap",
      color: colors.text
    },
    subheadingText: {},
    bodyText: {
      fontFamily: "DMSansRegular",
      color: colors.text,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 100 / 2,
      overflow: "hidden",
    },
  });

  const { isLoaded, signOut } = useAuth();
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header />
        <GestureHandlerRootView>
          <ScrollView style={styles.scrollView}>
            <ContentBox>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Image
                  source={{
                    uri: user.imageUrl,
                  }}
                  width={100}
                  height={100}
                  style={styles.image}
                />
                <Text style={styles.titleText}>
                  {user.firstName} {user.lastName}
                </Text>
              </View>
            </ContentBox>
          </ScrollView>
        </GestureHandlerRootView>
        <Button title="log out" onPress={() => signOut()} />
      </SafeAreaView>
    </>
  );
};

export default Welcome;
