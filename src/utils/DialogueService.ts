// import { Alert, Platform } from 'react-native';

export class DialogueService {
  //   /**
  //    * Shows confirmation dialogue with a title and message. User can tap cancel or submit. In case of tapping submit, the submit action callback is executed.
  //    * On platforms where the Alert framework is not supported (web), the submitAction is executed immediately.
  //    * @param title
  //    * @param message
  //    * @param submitAction
  //    */
  //   static showConfirmation(title: string, message: string, submitText: string, submitAction: () => void): void {
  //     if (Platform.OS !== 'web') {
  //       Alert.alert(
  //           title,
  //           message,
  //           [
  //               {
  //                   text: "Cancel",
  //                   onPress: () => {},
  //                   style: "cancel"
  //               },
  //               { text: submitText, onPress: () => submitAction() }
  //           ]
  //       );
  //     } else {
  //       submitAction();
  //     }
  //   }
}
