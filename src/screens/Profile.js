import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
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
//import { LinearGradient } from "expo-linear-gradient"
//import { gradient } from "../themes";
import createStyleSheet from "../styles/screens/Profile";

const Profile = ({ route, navigation }) => {
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
    //update only affected DB fields (REST API PATCH)
    firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .update(data)
      .then(() => {
        //GET updated user data
        firestore()
          .collection("users")
          .doc(auth().currentUser.uid)
          .get()
          .then((doc) => {
            //update Redux (business layer) in-memory data store
            dispatch(updateUser(doc.data()));
          })

          //close window
          .then(toggleModal);
      });
  };

  const { colors } = useTheme();

  const styles = createStyleSheet(colors)

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

  const renderTestScores = (item) => {
    return (
      <Text style={styles.bodyText}>
        <Text style={{ fontFamily: "DMSansMedium" }}>{item.name}: </Text>
        {item.score}
      </Text>
    );
  };

  const renderWork = (item) => {
    return (
      <>
        <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
          {item.starred ? <StarSVG /> : null}
          <Text style={styles.subheadingText}>{item.jobTitle}</Text>
        </View>
        <Text style={styles.description}>
          <Text style={{ fontFamily: "DMSansBold" }}>{item.employer} || </Text>
          <Text style={{ fontFamily: "DMSansMedium" }}>
            {item.city}, {item.state} || {}
          </Text>
          {item.startDate}-{item.endDate}
        </Text>
        <Text style={styles.bodyText}>{item.description}</Text>
        <View style={{ height: 30 }} />
      </>
    );
  };

  const renderAthletics = (item) => {
    return (
      <>
        <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
          {item.starred ? <StarSVG /> : null}
          <Text style={styles.subheadingText}>{item.sport}</Text>
        </View>
        <Text style={styles.description}>
          <Text style={{ fontFamily: "DMSansBold" }}>{item.position} </Text>
          {item.startDate}-{item.endDate}
        </Text>
        <Text style={styles.bodyText}>{item.description}</Text>
        <View style={{ height: 30 }} />
      </>
    );
  };

  const renderECs = (item) => {
    return (
      <>
        <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
          {item.starred ? <StarSVG /> : null}
          <Text style={styles.subheadingText}>{item.name}</Text>
        </View>
        <Text style={styles.description}>
          {userData.ecs.position ? (
            <Text style={{ fontFamily: "DMSansBold" }}>
              {item.position} || {""}
            </Text>
          ) : null}
          {item.startDate}-{item.endDate}
        </Text>
        <Text style={styles.bodyText}>{item.description}</Text>
        <View style={{ height: 30 }} />
      </>
    );
  };

  const renderAwards = userData.awards
    ? userData.awards.map((award) => (
        <>
          <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
            {award.starred ? <StarSVG /> : null}
            <Text
              style={{
                fontFamily: "DMSansBold",
                flexWrap: "nowrap",
                color: colors.text,
                flex: 0,
              }}
            >
              {award.title}{" "}
              <Text style={{ fontFamily: "DMSansRegular" }}>
                | {award.year}
              </Text>
            </Text>
          </View>
        </>
      ))
    : null;

  const renderPerformingArts = userData.performingArts
    ? userData.performingArts.map((work) => (
        <>
          <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
            {work.starred ? <StarSVG /> : null}
            <Text style={styles.subheadingText}>{work.name}</Text>
          </View>
          <Text style={styles.description}>
            {work.startDate}-{work.endDate}
          </Text>
          <Text style={styles.bodyText}>{work.description}</Text>
        </>
      ))
    : null;

  const editWorkExperience = () => {
    console.log("edited");
  };

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

  const generalInfoBox = (
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
          <Text style={styles.grayBody}>{starredPerformingArts.name}</Text>
        </View>
      ) : null}
      {starredAthletics ? (
        <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
          <TrophySVG width={20} height={16} />
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
  );

  const academicsBox = (
    <ContentBox>
      <Text style={styles.titleText}>Academics</Text>
      {userData.academics.courses ? (
        <>
          <Text style={styles.subheading2Text}>Courses</Text>

          <FlatList
            data={userData.academics.courses}
            renderItem={({ item }) => renderCourse(item)}
            keyExtractor={(item) => userData.academics.courses.indexOf(item)}
          />
        </>
      ) : null}

      {userData.academics.testScores ? (
        <>
          <Text style={styles.subheading2Text}>Test Scores</Text>
          <FlatList
            data={userData.academics.testScores}
            renderItem={({ item }) => renderTestScores(item)}
            keyExtractor={(item) => userData.academics.testScores.indexOf(item)}
          />
        </>
      ) : null}
    </ContentBox>
  );

  const workExperienceBox = (
    <ContentBox onPress={() => editWorkExperience}>
      <Text style={styles.titleText}>Work Experience</Text>
      {/* only renders work experience if the corresponding object
      in the database exists; if the object exists, then a FlatList
      is used to efficiently parse through the object and render each item */}
      {userData.workExperience ? (
        <FlatList
          data={userData.workExperience}
          renderItem={({ item }) => renderWork(item)}
          keyExtractor={(item) => userData.workExperience.indexOf(item)}
        />
      ) : null}
    </ContentBox>
  );

  const volunteerBox = (
    <ContentBox>
      <Text style={styles.titleText}>Volunteer Work</Text>
      {userData.volunteerWork ? (
        <FlatList
          data={userData.volunteerWork}
          renderItem={({ item }) => renderWork(item)}
          keyExtractor={(item) => userData.workExperience.indexOf(item)}
        />
      ) : null}
    </ContentBox>
  );

  const athleticsBox = (
    <ContentBox>
      <Text style={styles.titleText}>Athletics</Text>
      {userData.athletics ? (
        <FlatList
          data={userData.athletics}
          renderItem={({ item }) => renderAthletics(item)}
          keyExtractor={(item) => userData.athletics.indexOf(item)}
        />
      ) : null}
    </ContentBox>
  );

  const ecsBox = (
    <ContentBox>
      <Text style={styles.titleText}>Extracurricular Activities/Clubs</Text>
      {userData.ecs ? (
        <FlatList
          data={userData.ecs}
          renderItem={({ item }) => renderECs(item)}
          keyExtractor={(item) => userData.ecs.indexOf(item)}
        />
      ) : null}
    </ContentBox>
  );

  const performingArtsBox = (
    <ContentBox>
      <Text style={styles.titleText}>Performing Arts</Text>
      {renderPerformingArts}
    </ContentBox>
  );

  const awardsBox = (
    <ContentBox>
      <Text style={styles.titleText}>Awards/Honors</Text>
      {renderAwards}
    </ContentBox>
  );

  const boxes = [
    generalInfoBox,
    academicsBox,
    workExperienceBox,
    volunteerBox,
    athleticsBox,
    ecsBox,
    performingArtsBox,
    awardsBox,
    <View style={{ height: 150 }} />,
  ];

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
          <EditBox isVisible={visible}>
            <ScrollView style={{ bottom: 8 }}>
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

            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={() =>
                onSubmitForm({
                  school: school,
                  grade: grade,
                  about: about,
                })
              }
            >
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#c7c8c7" }]}
              onPress={toggleModal}
            >
              <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
          </EditBox>

          <FlatList
            data={boxes}
            renderItem={({ item }) => item}
            keyExtractor={(item) => boxes.indexOf(item)}
          />
        </GestureHandlerRootView>
      </SafeAreaView>
    </>
  );
};

export default Profile;
