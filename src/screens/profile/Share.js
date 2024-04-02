import { View, TouchableOpacity, Text, StatusBar } from "react-native";
import { useTheme } from "@react-navigation/native";
import createStyleSheet from "../../styles/screens/Profile";
import { Ionicons } from "@expo/vector-icons";
import ShareIcon2SVG from "../../assets/svg/ShareIcon2SVG";
import { useSelector } from "react-redux";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import HelpSVG from "../../assets/svg/HelpSVG";

const Share = ({ navigation, route }) => {
  const { colors } = useTheme();
  const styles = createStyleSheet(colors);
  let ecS = "";
  let workExp = "";
  let athleticsTot = "";
  let volunteerW = "";
  let awardsTot = "";
  let performingArtsTot = "";
  let courseWork = "";
  const userData = useSelector((sample) => sample.store.value.userData);
  const firstName = userData.firstName;
  const lastName = userData.lastName;
  const aboutInfo = userData.about;
  const infoSchool = userData.school;
  const userGrade = userData.grade;
  const courseWorkArray = userData.courses;



  const ecArray = userData.ecs;
  const workExArray = userData.workExperience;
  const athleticsArray = userData.athletics;
  const volunteerArray = userData.volunteerWork;
  const awardsArray = userData.awards;
  const performingArtsArray = userData.performingArts;

 
  //loop through courses
  for (var i = 0; i < courseWorkArray.length; i++) {
    if (courseWorkArray[i].type === "H") {
      courseWork += `<span class="bold-word">Honors ${courseWorkArray[i].name}</span>` + `<br />`;
    } else if (courseWorkArray[i].type === "R") {
      courseWork += `<span class="bold-word">Honors ${courseWorkArray[i].name}</span>` + `<br />`;
    } else if (courseWorkArray[i].type === "AP" && courseWorkArray[i].score === -1) {
      courseWork += `<span class="bold-word">AP ${courseWorkArray[i].name}</span>`;
    } else if (courseWorkArray[i].type === "AP" && courseWorkArray[i].score != -1) {
      courseWork += `<span class="bold-word">AP ${courseWorkArray[i].name}</span>` + " | Test Score: " + courseWorkArray[i].score + `<br />`;
    } 



  }
  for (var i = 0; i < workExArray.length; i++) {
    workExp += `<span class="bold-word">${workExArray[i].employer}</span>` + " (" + workExArray[i].startDate + "-" + workExArray[i].endDate + ")" + " - " + workExArray[i].jobTitle + `<br />` + workExArray[i].description + `<br />` + `<br />`;
  }

  for (var i = 0; i < ecArray.length; i++) {
    ecS += `<span class="bold-word">${ecArray[i].name}</span>` + " (" + ecArray[i].startDate + "-" + ecArray[i].endDate + ")" + " - " + ecArray[i].position + `<br />` + ecArray[i].description + `<br />` + `<br />`;
  }

  for (var i = 0; i < performingArtsArray.length; i++) {
    performingArtsTot += `<span class="bold-word">${performingArtsArray[i].name}</span>` + " (" + performingArtsArray[i].startDate + "-" + performingArtsArray[i].endDate + ")" + `<br />` + performingArtsArray[i].description + `<br />` +`<br />`;
  }
  for (var i = 0; i < athleticsArray.length; i++) {
    athleticsTot += `<span class="bold-word">${athleticsArray[i].name}</span>` + " (" + athleticsArray[i].startDate + "-" + athleticsArray[i].endDate + ")" + `<br />` + athleticsArray[i].description + `<br />` + `<br />`;
  }



  for (var i = 0; i < volunteerArray.length; i++) {
    volunteerW += `<span class="bold-word">${volunteerArray[i].employer}</span>` + ' ' + volunteerArray[i].jobTitle + " (" + volunteerArray[i].startDate + "-" + volunteerArray[i].endDate + ")" + "   " + volunteerArray[i].location + `<br />` + volunteerArray[i].description + `<br />` + `<br />`;
  }

  for (var i = 0; i < awardsArray.length; i++) {
    awardsTot += awardsArray[i].year + " " + `<span class="bold-word">${awardsArray[i].title}</span>` + " (" + awardsArray[i].provider + ")" + `<br />` + awardsArray[i].description + `<br />` + `<br />`;
  }


  const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" /> 
  </head>
  <style>
      .bold-word {
      font-weight: bold;
      }
      body {
        margin-left: 30px
      }
  </style> 
  <body>
    <h1 style="margin-left: 0px; font-size: 30px; font-family: Cambria; font-weight: bold; text-align: center;">
      ${firstName} ${lastName}
    </h1>
    <p style="margin-left: 0px; font-size: 15px; font-family: Cambria; font-weight: normal; font-style: italic; text-align: center;">
      ${aboutInfo}
    </p>
    <h2 style="font-size: 15px; font-family: Cambria; font-weight: bold; text-align: left;">
      ${userGrade}th grade at ${infoSchool}
    </h2>
    <p id="courseWork" style="font-size: 14px; font-family: Cambria; font-weight: normal; text-align: left;">
      Coursework: 
      ${courseWork} 
    </p>
    <h1 id="workExperienceHeader" style="font-size: 20px; font-family: Cambria; font-weight: bold; text-align: left;">
      Work Experience 
    </h1>
    <p id="workExperience" style="font-size: 15px; font-family: Cambria; font-weight: normal; text-align: left; margin: 35px;">
      ${workExp}
    </p>

    <h1 id="ecHeader" style="font-size: 20px; font-family: Cambria; font-weight: bold; text-align: left;">
      Extracurricular Activities/Clubs
    </h1>
    <p id="ec" style="font-size: 15px; font-family: Cambria; font-weight: normal; text-align: left; margin: 35px;">
      ${ecS}
    </p>
    <h1 id="performingArtsHeader" style="font-size: 20px; font-family: Cambria; font-weight: bold; text-align: left;">
      Performing Arts 
    </h1>
    <p id="performingArts" style="font-size: 15px; font-family: Cambria; font-weight: normal; text-align: left; margin: 35px;">
      ${performingArtsTot} 
    </p>
    
    <h1 id="volunteerExperienceHeader" style="font-size: 20px; font-family: Cambria; font-weight: bold; text-align: left;">
      Volunteer Experience
    </h1>
    <p id="volunteerExperience" style="font-size: 15px; font-family: Cambria; font-weight: normal; text-align: left; margin: 35px;">
      ${volunteerW}
    </p>
    <h1 id="awardsHeader" style="font-size: 20px; font-family: Cambria; font-weight: bold; text-align: left;">
      Awards
    </h1>
    <p id="awards" style="font-size: 15px; font-family: Cambria; font-weight: normal; text-align: left; margin: 35px;">
      ${awardsTot}
    </p>
    </body>

</html>`;
  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await printToFileAsync({ html });
    // debug: console.log("File has been saved to:", uri);
    shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" }).then(() =>
      navigation.navigate("Profile")
    );
  };

  return (
    <View style={{ flex: 0, justifyContent: "center", alignContent: "center" }}>
      <View style={{ flexDirection: "row", top: "0%" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={[styles.backButton, { backgroundColor: "#c7c8c7" }]}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={{ left: "100%", top: StatusBar.currentHeight * 2 + 25 }}>
          <HelpSVG width={30} height={30} />
        </View>
      </View>

      <Text
        style={[
          styles.titleText,
          { flex: 0, alignSelf: "center", fontSize: 32, bottom: "10%" },
        ]}
      >
        Share Your Profile
      </Text>
      <ShareIcon2SVG
        width={150}
        height={150}
        color={colors.subheading}
        style={{ alignSelf: "center", bottom: "10%" }}
      />
      <Text
        style={[
          styles.description,
          {
            flex: 0,
            alignSelf: "center",
            textAlign: "center",
            fontSize: 18,
            marginHorizontal: "5%",
            bottom: "5%",
          },
        ]}
      >
        Export and share your Thrive portfolio as a PDF!
      </Text>
      <TouchableOpacity
        onPress={printToFile}
        style={[
          styles.button,
          { backgroundColor: colors.primary, width: "60%", height: 50 },
        ]}
      >
        <Text style={[styles.buttonText, { fontSize: 20 }]}>Share PDF</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Share;
