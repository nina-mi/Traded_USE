import { StyleSheet } from "react-native";
import { colors } from "./Colors";

export const styles = StyleSheet.create({
    // TODO: change these styles to something more appropriate for the app
    // container: {
    //   flex: 1,
    //   backgroundColor: '#25292e',
    //   alignItems: 'center',
    // },
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: colors.app_grey,
    },
    container2: {
      flex: 1, 
      justifyContent: 'center',
      backgroundColor: colors.app_grey,
    },
    imageContainer: {
      flex: 1,
      paddingTop: 58,
    },
    footerContainer: {
      flex: 1 / 3,
      alignItems: 'center',
    },
    title: {
        fontSize: 25,
        alignItems: 'center',
        fontWeight: 'bold',
        color: colors.app_evergreen,
        paddingBottom: 20,
        maxWidth: 300,
    },
    textlb: {
      fontSize: 24,
      alignSelf: 'baseline',
      paddingLeft: 45,
      paddingBottom: 4,
  },
  textblank: {
    fontSize: 24,
    alignItems: 'center',
    color: colors.app_grey,
},
  checkin: {
    flex: 0.3,
    backgroundColor: colors.app_grey,
    borderWidth: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
    PrimaryButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: colors.app_evergreen,
      width: 130,
      height: 50,
    },
    PrimaryButtonBig: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: colors.app_evergreen,
      width: 330,
      height: 50,
    },
    ButtonText: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: colors.app_evergreen_brighter,

    },
    ProgressBarContainer: {
      marginTop: 20
    },
    tableContainer: { 
      flex: 1,
      padding: 16,
      paddingTop: 100,
      backgroundColor: '#fff'
    },
    tableHead: {
      height: 40,
      backgroundColor: 'orange'
    },
    tableWrapper: {
      flexDirection: 'row'
    },
    tableTitle: {
      flex: 1,
      backgroundColor: '#2ecc71'
    },
    tableRow: {
      height: 28
    },
    tableText: {
      textAlign: 'center'
    },
    item: {
      backgroundColor: colors.app_white,
      paddingLeft: 15,
      marginBottom: 15,
      paddingTop: 0,
      width: 330,
      height: 'auto',
      flexDirection: 'row',
      borderRadius: 10,
      borderColor: colors.app_evergreen_brighter,
      borderWidth: 1,
    },
    itemText: {
      textAlign: 'left',
      marginBottom: '10%',
      marginTop: '0%',
      paddingTop: '0%',
    },
    dropdownView3: {
      marginHorizontal: 10,
      width: "50%",
      marginBottom: 15,
    },
    dropdown: {
      borderColor: "#B7B7B7",
      height: 50,
    },
    placeholderStyles: {
      color: "grey",
    },
    browseItem: {
      backgroundColor: colors.app_white,
      paddingLeft: 0,
      marginHorizontal: 0,
      marginTop: 15,
      width: 330,
      height: 'auto',
      paddingBottom: 40,
      paddingTop: 40,
      borderRadius: 10,
      borderColor: colors.app_evergreen_brighter,
      borderWidth: 1,
    },
    browseItemText: {
      fontSize: 25,
      alignItems: 'center',
      fontWeight: 'bold',
      color: colors.app_black_text_secondary,
      alignSelf: 'center'
    },
    containerBrowse: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: colors.app_grey,
    },
    textInput: {
      width:330,
    },
    buttonView: {
      paddingTop: 25,
      paddingBottom: 25,
      width: 330,
    },
    paragraph: {
      width: 330,
      textAlign: 'justify',
      paddingBottom: 15,
    },
    leaderboardView: { 
      backgroundColor: colors.app_white,

      alignItems: 'center',
      borderRadius: 10,
      borderColor: colors.app_evergreen_brighter,
      borderWidth: 1,
      marginTop: 15,
      paddingBottom: 25,
      paddingTop: 25,
      width: 330,
    },
    profileImage: {
      width: 3*50,
      height: 3*50,
      borderRadius: 3*50/2,
      overflow: "hidden",
      borderWidth: 2,
      borderColor: colors.app_evergreen_brighter
    },
  });