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
    },
    textlb: {
      fontSize: 24,
      alignItems: 'center',
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
      backgroundColor: '#ededed',
      paddingLeft: 8,
      marginVertical: 8,
      marginHorizontal: 0,
      paddingTop: 0,
      width: 300,
      height: 'auto',
      flexDirection: 'row',
    },
    itemText: {
      textAlign: 'left',
      marginBottom: '10%',
      marginTop: '0%',
      paddingTop: '0%',
    }
    
    // TODO: add styles for the rest of the components, ie primary button,
    // secondary button, text input, display text, headline, title, label, body
    // icons,...
  });