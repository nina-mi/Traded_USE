import { StyleSheet} from "react-native";
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
        color: colors.app_green,
    },
    // TODO: add styles for the rest of the components, ie primary button,
    // secondary button, text input, display text, headline, title, label, body
    // icons,...
  });