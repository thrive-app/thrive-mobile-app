import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
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
import { useSelector, useDispatch } from "react-redux";
import EditBox from "../components/EditBox";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { updateUser } from "../redux/state";


const Welcome = ({ route, navigation }) => {
  const userData = useSelector((sample) => sample.store.value.userData);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [grade, setGrade] = useState(userData.grade);
  const [about, setAbout] = useState(userData.about);
  const [school, setSchool] = useState(userData.school);

  const toggleModal = () => {
    setVisible(!visible);
  };

  const onSubmitForm = (data) => {
    firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .update(data)
      .then(() => {
        firestore()
          .collection("users")
          .doc(auth().currentUser.uid)
          .get()
          .then((doc) => {
            dispatch(updateUser(doc.data()));
          })
          .then(toggleModal);
      });
  };

  const sample = require("../sample.json");
  const { colors } = useTheme();

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
    inputText: {
      fontSize: 12,
      color: "#000000",
      fontFamily: "DMSansRegular",
      padding: 5,
      borderRadius: 16,
      marginBottom: 10,
      borderColor: "#ececec",
      borderWidth: 1,
      flex: 0,
    },
    buttonText: {
      color: "white",
      fontFamily: "DMSansBold",
      textAlign: "center",
      fontSize: 16,
    },
    button: {
      width: "90%",
      borderRadius: 25,
      height: 40,
      marginVertical: 5,
      marginHorizontal: "8%",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
  });

  function gradeSwitch() {
    switch (userData.grade) {
      case 9:
        return "Freshman";
      case 10:
        return "Sophomore";
      case 11:
        return "Junior";
      case 12:
        return "Senior";
      case -1:
        return "";
      case 0:
        return "";
      default:
        return "Grade " + userData.grade;
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
    if (info.type === "H") {
      text = "Honors " + info.name;
    }
    if (info.type === "R") {
      text = info.name;
    }
    if (info.type === "AP" && info.score === -1) {
      text = "AP " + info.name;
    }
    if (info.type === "AP" && info.score != -1) {
      text = "AP " + info.name + " | AP Test Score: " + info.score;
    }
    return <Text style={styles.bodyText}>{text}</Text>;
  };
  const courses = userData.academics.courses
    ? userData.academics.courses.map((course) => renderCourse(course))
    : null;

  const testScores = userData.academics.testScores
    ? userData.academics.testScores.map((score) => (
        <Text style={styles.bodyText}>
          <Text style={{ fontFamily: "DMSansMedium" }}>{score.name}: </Text>
          {score.score}
        </Text>
      ))
    : null;

  const renderWork = userData.workExperience
    ? map((work) => (
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
      ))
    : null;

  const renderVolunteer = userData.volunteerWork
    ? userData.volunteerWork.map((work) => (
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
      ))
    : null;

  const renderAthletics = userData.athletics
    ? sample.athletics.map((work) => (
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
      ))
    : null;

  const renderECs = userData.ecs
    ? userData.ecs.map((work) => (
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
      ))
    : null;

  const renderAwards = userData.awards
    ? userData.awards.map((award) => (
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
              <Text
                style={{ fontFamily: "DMSansRegular", fontStyle: "italic" }}
              >
                {award.year}
              </Text>
            </Text>
          </View>
        </>
      ))
    : null;

  const starredWork = userData.workExperience
    ? userData.workExperience[findStarred(userData.workExperience)]
    : null;
  const starredVolunteer = userData.volunteerWork
    ? userData.volunteerWork[findStarred(userData.volunteerWork)]
    : null;
  const starredEC = userData.ecs
    ? userData.ecs[findStarred(userData.ecs)]
    : null;
  const starredAthletics = userData.athletics
    ? userData.athletics[findStarred(userData.athletics)]
    : null;
  const starredPerformingArts = userData.performingArts
    ? userData.performingArts[findStarred(userData.performingArts)]
    : null;
  const starredAward = userData.awards
    ? userData.awards[findStarred(userData.awards)]
    : null;

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
            <EditBox isVisible={visible}>
              <ScrollView style={{bottom: 8}}>
                <Text style={styles.titleText}>Edit General Info</Text>
                <Text style={styles.subheading2Text}>School</Text>
                <TextInput
                  autoCorrect={false}
                  style={styles.inputText}
                  placeholder="School"
                  defaultValue={userData.school}
                  placeholderTextColor={"gray"}
                  keyboardAppearance="default"
                  onChangeText={(text) => setSchool(text)}
                  maxLength={50}
                />
                <Text style={styles.subheading2Text}>Grade/Class</Text>
                <TextInput
                  autoCorrect={false}
                  inputMode="numeric"
                  keyboardType="number-pad"
                  style={styles.inputText}
                  placeholder="Grade"
                  defaultValue={String(userData.grade)}
                  placeholderTextColor={"gray"}
                  keyboardAppearance="default"
                  onChangeText={(text) => setGrade(parseInt(text))}
                  maxLength={2}
                  multiline={false}
                />
                <Text style={styles.subheading2Text}>About</Text>
                <TextInput
                  autoCorrect={true}
                  inputMode="text"
                  keyboardType="default"
                  style={styles.inputText}
                  placeholder="About"
                  defaultValue={userData.about}
                  placeholderTextColor={"gray"}
                  keyboardAppearance="default"
                  onChangeText={(text) => setAbout(text)}
                  maxLength={1000}
                  multiline={true}
                  spellCheck={true}
                  scrollEnabled={true}
                  autoCapitalize="sentences"
                />
              </ScrollView>
              <TouchableOpacity style={[styles.button, {backgroundColor: colors.primary}]} onPress={() => onSubmitForm({
                  "school": school,
                  "grade": grade,
                  "about": about,
                })}>
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, {backgroundColor: "#c7c8c7"}]} onPress={toggleModal}>
              <Text style={styles.buttonText}>Go Back</Text>
              </TouchableOpacity>
            </EditBox>
            <ContentBox onPress={toggleModal}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Image
                  source={{
                    uri: userData.profileImage,
                  }}
                  width={100}
                  height={100}
                  style={styles.image}
                />
                <Text style={styles.titleText}>
                  {userData.firstName + " " + userData.lastName}
                </Text>
              </View>
              {userData.grade && userData.school ? (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    marginTop: 10,
                    margin: 5,
                  }}
                >
                  <HatSVG width={20} height={16} />

                  <Text style={styles.grayBody}>
                    {gradeSwitch()} @ {userData.school}
                  </Text>
                </View>
              ) : null}
              {starredWork ? (
                <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
                  <BuildingSVG width={20} height={16} />
                  <Text style={styles.grayBody}>
                    {starredWork.jobTitle} @ {starredWork.employer}
                  </Text>
                </View>
              ) : null}
              {starredVolunteer ? (
                <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
                  <VolunteerSVG width={20} height={16} />
                  <Text style={styles.grayBody}>
                    {starredVolunteer.jobTitle} @ {starredVolunteer.employer}
                  </Text>
                </View>
              ) : null}
              {starredEC ? (
                <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
                  <GroupSVG width={20} height={16} />
                  <Text style={styles.grayBody}>
                    {starredEC.name} {starredEC.position}
                  </Text>
                </View>
              ) : null}
              {starredPerformingArts ? (
                <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
                  <TheaterSVG width={20} height={16} />
                  <Text style={styles.grayBody}>
                    {starredPerformingArts.name}
                  </Text>
                </View>
              ) : null}
              {starredAthletics ? (
                <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
                  <TheaterSVG width={20} height={16} />
                  <Text style={styles.grayBody}>{starredAthletics.name}</Text>
                </View>
              ) : null}
              {starredAward ? (
                <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
                  <MedalSVG width={20} height={16} />
                  <Text style={styles.grayBody}>{starredAward.title}</Text>
                </View>
              ) : null}
              <View
                style={{
                  marginVertical: 25,
                  borderBottomColor: "#d9d7d7",
                  borderBottomWidth: 1,
                  width: "50%",
                  alignSelf: "center",
                }}
              />
              <Text style={styles.title2Text}>About</Text>
              <Text style={styles.bodyText}>
                {userData.about ? userData.about : null}
              </Text>
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
