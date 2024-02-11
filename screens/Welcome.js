import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { createElement } from "react";
import { useTheme } from "@react-navigation/native";
import { useUser } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import ContentBox from "../components/ContentBox";
import Header from "../components/Header";
import SettingsSVG from "../assets/svg/SettingsSVG";
import HatSVG from "../assets/svg/HatSVG";
import BuildingSVG from "../assets/svg/BuildingSVG";
import VolunteerSVG from "../assets/svg/VolunteerSVG";
import TrophySVG from "../assets/svg/TrophySVG";
import GroupSVG from "../assets/svg/GroupSVG";
import MedalSVG from "../assets/svg/MedalSVG";
import TheaterSVG from "../assets/svg/TheaterSVG";
import StarSVG from "../assets/svg/StarSVG";
import auth from "@react-native-firebase/auth"
import firestore from '@react-native-firebase/firestore'
import createNewUser from "../functions/createNewUser";

const test = firestore().collection('users').doc("test").get()
const Welcome = ({ route, navigation }) => {
  const sample = require("../sample.json");
  console.log(test)
  const { colors } = useTheme();
  const { user } = useUser();
  createNewUser(auth().currentUser.uid)
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
      color: colors.text,
    },
    title2Text: {
      fontFamily: "DMSansRegular",
      fontSize: 24,
      margin: 10,
      paddingVertical: 10,
      flex: 1,
      flexWrap: "wrap",
      color: colors.text,
    },
    grayBody: {
      fontFamily: "DMSansRegular",
      fontSize: 11,
      flex: 1,
      flexWrap: "wrap",
      color: "#696969",
      marginLeft: 5,
    },
    subheadingText: {
      fontFamily: "DMSansBold",
      fontSize: 20,
      flex: 1,
      flexWrap: "wrap",
      color: colors.text,
      marginLeft: 5,
      marginBottom: 5,
    },
    subheading2Text: {
      fontFamily: "DMSansBold",
      fontSize: 16,
      flex: 1,
      flexWrap: "wrap",
      color: "#474747",
      marginLeft: 10,
      marginTop: 10,
      marginBottom: 5,
    },
    description: {
      fontFamily: "DMSansRegular",
      fontStyle: "italic",
      fontSize: 14,
      flex: 1,
      flexWrap: "wrap",
      color: "#474747",
      marginLeft: 10,
      marginBottom: 5,
    },
    bodyText: {
      fontFamily: "DMSansRegular",
      marginLeft: 10,
      marginVertical: 1,
      color: colors.text,
      fontSize: 12,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 100 / 2,
      overflow: "hidden",
    },
    settings: {
      position: "relative",
      marginLeft: "50%",
      marginTop: "2%",
    },
  });

  function gradeSwitch() {
    switch (sample.grade) {
      case 9:
        return "Freshman";
      case 10:
        return "Sophomore";
      case 11:
        return "Junior";
      case 12:
        return "Senior";
    }
  }

  function findStarred(arr) {
    let index;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].starred) {
        index = i;
      }
    }
    return index;
  }

  const renderCourse = (info) => {
    let text;
    if (info[1] === "H") {
      text = "Honors " + info[0];
    }
    if (info[1] === "R") {
      text = info[0];
    }
    if (info[1] === "AP" && info[2] === -1) {
      text = "AP " + info[0];
    }
    if (info[1] === "AP" && info[2] != -1) {
      text = "AP " + info[0] + " | AP Test Score: " + info[2];
    }
    return <Text style={styles.bodyText}>{text}</Text>;
  };
  const courses = sample.academics.courses.map((course) =>
    renderCourse(course)
  );
  const testScores = sample.academics.testScores.map((score) => (
    <Text style={styles.bodyText}>
      <Text style={{ fontFamily: "DMSansMedium" }}>{score[0]}: </Text>
      {score[1]}
    </Text>
  ));

  const renderWork = sample.workExperience.map((work) => (
    <>
      <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
        {work.starred ? <StarSVG /> : null}
        <Text style={styles.subheadingText}>{work.jobTitle}</Text>
      </View>
      <Text style={styles.description}>
        <Text style={{ fontFamily: "DMSansBold", fontStyle: "italic" }}>
          {work.employer} ||{" "}
        </Text>
        <Text style={{ fontFamily: "DMSansMedium", fontStyle: "italic" }}>
          {work.city}, {work.state} || {}
        </Text>
        {work.startDate}-{work.endDate}
      </Text>
      <Text style={styles.bodyText}>{work.description}</Text>
    </>
  ));

  const renderVolunteer = sample.volunteerWork.map((work) => (
    <>
      <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
        {work.starred ? <StarSVG /> : null}
        <Text style={styles.subheadingText}>{work.jobTitle}</Text>
      </View>
      <Text style={styles.description}>
        <Text style={{ fontFamily: "DMSansBold", fontStyle: "italic" }}>
          {work.employer} ||{" "}
        </Text>
        <Text style={{ fontFamily: "DMSansMedium", fontStyle: "italic" }}>
          {work.city}, {work.state} || {}
        </Text>
        {work.startDate}-{work.endDate}
      </Text>
      <Text style={styles.bodyText}>{work.description}</Text>
      <View style={{ height: 20 }} />
    </>
  ));

  const renderAthletics = sample.athletics.map((work) => (
    <>
      <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
        {work.starred ? <StarSVG /> : null}
        <Text style={styles.subheadingText}>{work.jobTitle}</Text>
      </View>
      <Text style={styles.description}>
        <Text style={{ fontFamily: "DMSansBold", fontStyle: "italic" }}>
          {work.employer}{" "}
        </Text>
        <Text style={{ fontFamily: "DMSansMedium", fontStyle: "italic" }}>
          {work.city}, {work.state} {}
        </Text>
        {work.startDate}-{work.endDate}
      </Text>
      <Text style={styles.bodyText}>{work.description}</Text>
      <View style={{ height: 20 }} />
    </>
  ));

  const renderECs = sample.ecs.map((work) => (
    <>
      <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
        {work.starred ? <StarSVG /> : null}
        <Text style={styles.subheadingText}>{work.name}</Text>
      </View>
      <Text style={styles.description}>
        <Text style={{ fontFamily: "DMSansBold", fontStyle: "italic" }}>
          {work.position} || {""}
        </Text>
        {work.startDate}-{work.endDate}
      </Text>
      <Text style={styles.bodyText}>{work.description}</Text>
      <View style={{ height: 20 }} />
    </>
  ));

  const renderAwards = sample.awards.map((award) => (
    <>
      <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
        {award.starred ? <StarSVG /> : null}
        <Text
          style={{
            fontFamily: "DMSansBold",
            fontStyle: "italic",
            flexWrap: "nowrap",
            color: colors.text,
            flex: 0,
          }}
        >
          {award.title}{" "}
          <Text style={{ fontFamily: "DMSansRegular", fontStyle: "italic" }}>
            {award.year}
          </Text>
        </Text>
      </View>
    </>
  ));

  const starredWork = sample.workExperience[findStarred(sample.workExperience)];
  const starredVolunteer =
    sample.volunteerWork[findStarred(sample.volunteerWork)];
  const starredEC = sample.ecs[findStarred(sample.ecs)];
  const starredPerformingArts =
    sample.performingArts[findStarred(sample.performingArts)];
  const starredAward = sample.awards[findStarred(sample.awards)];
  
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header
          onPress={() => {
            navigation.navigate("Settings");
          }}
        >
          <SettingsSVG
            width={40}
            height={40}
            style={styles.settings}
            onPress={() => {
              navigation.navigate("Settings");
            }}
          />
        </Header>
        <GestureHandlerRootView>
          <ScrollView style={styles.scrollView}>
            <ContentBox>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Image
                  source={{
                    uri: auth().currentUser.photoURL,
                  }}
                  width={100}
                  height={100}
                  style={styles.image}
                />
                <Text style={styles.titleText}>
                  {auth().currentUser.displayName}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginTop: 10,
                  margin: 5,
                }}
              >
                {console.log()}
                <HatSVG width={20} height={16} />
                <Text style={styles.grayBody}>
                  {gradeSwitch()} @ {sample.school}
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
                <BuildingSVG width={20} height={16} />
                <Text style={styles.grayBody}>
                  {starredWork.jobTitle} @ {starredWork.employer}
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
                <VolunteerSVG width={20} height={16} />
                <Text style={styles.grayBody}>
                  {starredVolunteer.jobTitle} @ {starredVolunteer.employer}
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
                <GroupSVG width={20} height={16} />
                <Text style={styles.grayBody}>
                  {starredEC.name} {starredEC.position}
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
                <TheaterSVG width={20} height={16} />
                <Text style={styles.grayBody}>
                  {starredPerformingArts.name}
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
                <MedalSVG width={20} height={16} />
                <Text style={styles.grayBody}>{starredAward.title}</Text>
              </View>
              <View
                style={{
                  marginVertical: 10,
                  borderBottomColor: "#d9d7d7",
                  borderBottomWidth: 1,
                  width: "50%",
                  alignSelf: "center",
                }}
              />
              <Text style={styles.title2Text}>About</Text>
              <Text style={styles.bodyText}>{sample.about}</Text>
            </ContentBox>
            <ContentBox>
              <Text style={styles.titleText}>Academics</Text>
              <Text style={styles.subheading2Text}>Courses</Text>
              {courses}
              <Text style={styles.subheading2Text}>Test Scores</Text>
              {testScores}
            </ContentBox>
            <ContentBox>
              <Text style={styles.titleText}>Work Experience</Text>
              {renderWork}
            </ContentBox>
            <ContentBox>
              <Text style={styles.titleText}>Volunteer Work</Text>
              {renderVolunteer}
            </ContentBox>
            <ContentBox>
              <Text style={styles.titleText}>Athletics</Text>
            </ContentBox>
            <ContentBox>
              <Text style={styles.titleText}>
                Extracurricular Activities/Clubs
              </Text>
              {renderECs}
            </ContentBox>
            <ContentBox>
              <Text style={styles.titleText}>Awards/Honors</Text>
              {renderAwards}
            </ContentBox>
            <View style={{ height: 150 }} />
          </ScrollView>
        </GestureHandlerRootView>
      </SafeAreaView>
    </>
  );
};

export default Welcome;
