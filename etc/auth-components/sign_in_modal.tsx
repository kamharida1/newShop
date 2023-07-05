import React, { useState } from "react";
import { SafeAreaView, View, Modal, TextInput, Button, Text } from "react-native";
import { Auth } from "aws-amplify";

const SignInModal = ({
  onHide,
  onShowSignUp,
  visible,
  override,
}: {
  onHide: () => void;
  onShowSignUp: () => void;
  visible: boolean;
  override: string;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signinError, setSigninError] = useState<null | string>(null);

  const authSignIn = async (email: string, password: string) => {
    try {
      const { user } = await Auth.signIn({ username: email, password });
      onHide();
    } catch (e) {
      setSigninError("Incorrect username or password");
    }
  };

  const onChangeEmail = (text: string) => {
    setSigninError(null);
    setEmail(text);
  };

  const onChangePassword = (text: string) => {
    setSigninError(null);
    setPassword(text);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View style={{ padding: 10 }}>
          <Text style={{ marginBottom: 15 }}>Welcome! Please sign in.</Text>
          {signinError ? (
            <View style={{ marginBottom: 15 }}>
              <Text>{signinError}</Text>
            </View>
          ) : null}

          <TextInput
            placeholder="Email"
            onChangeText={onChangeEmail}
            autoCapitalize={"none"}
            style={{ marginBottom: 15 }}
          />
          <TextInput
            placeholder="Password"
            onChangeText={onChangePassword}
            secureTextEntry
            autoCapitalize={"none"}
            style={{ marginBottom: 15 }}
          />
          <Button
            onPress={() => authSignIn(email, password)}
            title={"Sign in"}
          />
          <Button onPress={onShowSignUp} title={"No account? Sign Up."} />
        </View>
        <View style={{ padding: 10 }}>
          <Button onPress={onHide} title={"Skip For Now"} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default SignInModal;
