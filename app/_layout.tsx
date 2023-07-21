import "react-native-reanimated";
import "react-native-gesture-handler";
import { DataStore } from "aws-amplify";
import { RootSiblingParent } from "react-native-root-siblings";
import { ThemeProvider } from "../etc/_Theme";
import { Stack } from "expo-router";
import { ExpoSQLiteAdapter } from "@aws-amplify/datastore-storage-adapter/ExpoSQLiteAdapter";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Authenticator,
  ThemeProvider as AmplifyProvider,
  Theme,
  defaultDarkModeOverride,
} from "@aws-amplify/ui-react-native";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";

import store from "../src/redux/store";


DataStore.configure({
  storageAdapter: ExpoSQLiteAdapter,
});

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};

export default function RootLayout() {
  return (
    <AmplifyProvider>
      <Provider store={store}>
        <Authenticator.Provider>
          <RootSiblingParent>
            <ThemeProvider>
              <Authenticator
                Container={(props) => (
                  // reuse default `Container` and apply custom background
                  <Authenticator.Container
                    {...props}
                    //style={{ backgroundColor: "pink" }}
                  />
                )}
                //components={{SignIn: Login}}
              >
                <PaperProvider>
                  <SafeAreaProvider>
                    <Stack screenOptions={{ headerShown: false }}>
                      <Stack.Screen
                        name="index"
                        options={{
                          title: "Welcome",
                        }}
                      />
                    </Stack>
                  </SafeAreaProvider>
                </PaperProvider>
              </Authenticator>
            </ThemeProvider>
          </RootSiblingParent>
        </Authenticator.Provider>
      </Provider>
    </AmplifyProvider>
  );
}
