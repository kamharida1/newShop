import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { SafeAreaView, View, Modal, Text, Button, TextInput } from "react-native";

const SignUpModal = ({
  onHide,
  onShowSignIn,
  onShowConfirmSignup,
  visible,
  override,
}: {
  onHide: () => void;
  onShowSignIn: () => void;
  onShowConfirmSignup: () => void;
  visible: boolean;
  override: string;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState<null | string>(null);

  const authSignUp = async () => {
    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
        attributes: { email },
      });
      onShowConfirmSignup();
    } catch (e) {
      setSignupError(e.message);
    }
  };

  const onChangeEmail = (text: string) => {
    setSignupError(null);
    setEmail(text);
  };

  const onChangePassword = (text: string) => {
    setSignupError(null);
    setPassword(text);
  };

  const onValidateSubmit = () => {
    if (password !== confirmPassword) {
      setSignupError("Passwords don't match");
      return;
    } else {
      authSignUp();
    }
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
          <Text style={{ marginBottom: 15 }}>
            Create an account to get started.
          </Text>
          {signupError ? (
            <View style={{ marginBottom: 15 }}>
              <Text>{signupError}</Text>
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
          <TextInput
            placeholder="Confirm password"
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize={"none"}
            style={{ marginBottom: 15 }}
          />
          <Button onPress={onValidateSubmit} title="Sign up" />
          <Button
            onPress={onShowSignIn}
            title="Already have an account? Sign in!"
          />
          <View>
            <Button
              title="Got a confirmation code? Enter it now."
              onPress={onShowConfirmSignup}
            />
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <Button
            title="Skip for now"
            onPress={onHide}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default SignUpModal;
