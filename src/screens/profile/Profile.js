import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ContentBox from "../../components/ContentBox";
import Header from "../../components/Header";
import SettingsSVG from "../../assets/svg/SettingsSVG";
import HatSVG from "../../assets/svg/HatSVG";
import BuildingSVG from "../../assets/svg/BuildingSVG";
import VolunteerSVG from "../../assets/svg/VolunteerSVG";
import TrophySVG from "../../assets/svg/TrophySVG";
import GroupSVG from "../../assets/svg/GroupSVG";
import MedalSVG from "../../assets/svg/MedalSVG";
import TheaterSVG from "../../assets/svg/TheaterSVG";
import StarSVG from "../../assets/svg/StarSVG";
import { useSelector } from "react-redux";
//import { LinearGradient } from "expo-linear-gradient"
//import { gradient } from "../themes";
import createStyleSheet from "../../styles/screens/Profile";
import findStarred from "../../functions/profile/findStarred";
import ReactNativeModal from "react-native-modal";
import ShareIcon1SVG from "../../assets/svg/ShareIcon1SVG";


const Profile = ({ route, navigation }) => {
  const userData = useSelector((sample) => sample.store.value.userData);

  const { colors } = useTheme();

  const [helpBox, setHelpBox] = useState(false);

  const styles = createStyleSheet(colors);

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
      text = "AP " + info.name + " | Test Score: " + info.score;
    }
    if (info.type === "IB" && info.score === -1) {
      text = "IB " + info.name;
    }
    if (info.type === "IB" && info.score != -1) {
      text = "IB " + info.name + " | Test Score: " + info.score;
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
          <Text style={{ fontFamily: "DMSansBold" }}>{item.employer} // </Text>
          <Text style={{ fontFamily: "DMSansMedium" }}>
            {item.location} // {}
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
          {item.position != "" ? (
            <Text style={{ fontFamily: "DMSansBold" }}>
              {item.position} // {""}
            </Text>
          ) : null}
          {item.startDate}-{item.endDate}
        </Text>
        <Text style={styles.bodyText}>{item.description}</Text>
        <View style={{ height: 30 }} />
      </>
    );
  };

  const renderAwards = (item) => {
    return (
      <>
        <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
          {item.starred ? <StarSVG /> : null}
          <Text style={styles.subheadingText}>{item.title} </Text>
        </View>

        <Text style={[styles.description, { fontSize: 15 }]}>
          <Text style={{ fontFamily: "DMSansBold" }}>{item.provider} // </Text>
          {item.year}
        </Text>
        <Text style={styles.bodyText}>{item.description}</Text>
        <View style={{ height: 30 }} />
      </>
    );
  };

  const renderPerformingArts = (item) => {
    return (
      <>
        <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
          {item.starred ? <StarSVG /> : null}
          <Text style={styles.subheadingText}>{item.name}</Text>
        </View>
        <Text style={styles.description}>
          {item.startDate}-{item.endDate}
        </Text>
        <Text style={styles.bodyText}>{item.description}</Text>
        <View style={{ height: 30 }} />
      </>
    );
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
    <ContentBox
      onPressHelp={() => setHelpBox(!helpBox)}
      onPress={() => navigation.navigate("EditGeneralInfo")}
    >
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
      {userData.grade > 0 && !(userData.school === "") ? (
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
            {starredEC.name}{" "}
            {starredEC.position != "" ? `// ${starredEC.position}` : ""}
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
          <Text style={styles.grayBody}>{starredAthletics.sport}</Text>
        </View>
      ) : null}
      {starredAward ? (
        <View style={{ flex: 1, flexDirection: "row", margin: 5 }}>
          <MedalSVG width={20} height={16} />
          <Text style={styles.grayBody}>
            {starredAward.title} // {starredAward.provider}
          </Text>
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
      {userData.about != "" ? (
        <>
          <Text style={styles.title2Text}>About</Text>
          <Text style={styles.bodyText}>{userData.about}</Text>
        </>
      ) : null}
    </ContentBox>
  );

  const academicsBox = (
    <ContentBox onPress={() => navigation.navigate("AcademicsHome")}>
      <Text style={styles.titleText}>Academics</Text>
      {userData.courses ? (
        <>
          <Text style={styles.subheading2Text}>Courses</Text>
          <FlatList
            data={userData.courses}
            renderItem={({ item }) => renderCourse(item)}
            keyExtractor={(item) => userData.courses.indexOf(item)}
          />
        </>
      ) : null}

      {userData.testScores ? (
        <>
          <Text style={styles.subheading2Text}>Test Scores</Text>
          <FlatList
            data={userData.testScores}
            renderItem={({ item }) => renderTestScores(item)}
            keyExtractor={(item) => userData.testScores.indexOf(item)}
          />
        </>
      ) : null}
    </ContentBox>
  );

  const workExperienceBox = (
    <ContentBox onPress={() => navigation.navigate("WorkExperienceHome")}>
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
    <ContentBox onPress={() => navigation.navigate("VolunteerWorkHome")}>
      <Text style={styles.titleText}>Volunteer Work</Text>
      {userData.volunteerWork ? (
        <FlatList
          data={userData.volunteerWork}
          renderItem={({ item }) => renderWork(item)}
          keyExtractor={(item) => userData.volunteerWork.indexOf(item)}
        />
      ) : null}
    </ContentBox>
  );
  const athleticsBox = (
    <ContentBox onPress={() => navigation.navigate("AthleticsHome")}>
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

  //this is a custom implementation for the extracurricular box.
  const ecsBox = (
    <ContentBox onPress={() => navigation.navigate("ECsHome")}>
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
    <ContentBox onPress={() => navigation.navigate("PerformingArtsHome")}>
      <Text style={styles.titleText}>Performing Arts</Text>
      {userData.performingArts ? (
        <FlatList
          data={userData.performingArts}
          renderItem={({ item }) => renderPerformingArts(item)}
          keyExtractor={(item) => userData.performingArts.indexOf(item)}
        />
      ) : null}
    </ContentBox>
  );

  const awardsBox = (
    <ContentBox onPress={() => navigation.navigate("AwardsHome")}>
      <Text style={styles.titleText}>Awards/Honors</Text>
      {userData.awards ? (
        <FlatList
          data={userData.awards}
          renderItem={({ item }) => renderAwards(item)}
          keyExtractor={(item) => userData.awards.indexOf(item)}
        />
      ) : null}
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
    <TouchableOpacity
      onPress={() => navigation.navigate("Share")}
      style={[
        styles.button,
        {
          top: "5%",
          height: 50,
          backgroundColor: colors.primary,
          flexDirection: "row",
          width: "60%",
          borderRadius: 25
        },
      ]}
    >
      <ShareIcon1SVG
        style={{ right: 10 }}
        width={28}
        height={28}
        color="#fff"
      />
      <Text style={[styles.buttonText, { fontSize: 18 }]}>Share Portfolio</Text>
    </TouchableOpacity>,
    <View style={{ height: 150 }} />,
  ];

  const HelpBox = () => (
    <>
      <ReactNativeModal isVisible={helpBox}>
        <View style={styles.popupContent}>
          <Text style={[styles.titleText, { flex: 0, fontSize: 22 }]}>
            Help
          </Text>

          <Text style={[styles.description, { textAlign: "center" }]}>
            This is the profile page! Here, you can add, edit, and share all of
            your qualifications. This first box consists of your general
            information and starred items.
          </Text>
          <TouchableOpacity
            onPress={() => setHelpBox(!helpBox)}
            style={[styles.button, { backgroundColor: colors.primary }]}
          >
            <Text style={[styles.buttonText, { alignSelf: "center" }]}>
              Sounds good, thanks!
            </Text>
          </TouchableOpacity>
        </View>
      </ReactNativeModal>
    </>
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <GestureHandlerRootView>
          <Header>
            <SettingsSVG
              width={40}
              height={40}
              style={styles.settings}
              onPress={() => {
                navigation.navigate("Settings");
              }}
            />
          </Header>
          {HelpBox()}
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
