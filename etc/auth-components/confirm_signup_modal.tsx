import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { SafeAreaView, View, Modal, Text, TextInput, Button } from "react-native";

const ConfirmSignupModal = ({
  onHide,
  onShowSignIn,
  visible,
  override,
}: {
  onHide: () => void;
  onShowSignIn: () => void;
  visible: boolean;
  override: string;
}) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<null | string>(null);

  const authConfirmSignup = async () => {
    try {
      const { user } = await Auth.confirmSignUp(email, code);
      onShowSignIn();
    } catch (e) {
      setError("Incorrect username or password");
    }
  };

  const onChangeEmail = (text: string) => {
    setError(null);
    setEmail(text);
  };

  const onChangeCode = (text: string) => {
    setError(null);
    setCode(text);
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
            Enter your confirmation code.
          </Text>
          {error ? (
            <View style={{ marginBottom: 15 }}>
              <Text>{error}</Text>
            </View>
          ) : null}

          <TextInput
            placeholder="Email"
            onChangeText={onChangeEmail}
            autoCapitalize={"none"}
            style={{ marginBottom: 15 }}
          />
          <TextInput
            placeholder="Code"
            onChangeText={onChangeCode}
            secureTextEntry
            autoCapitalize={"none"}
            style={{ marginBottom: 15 }}
          />
          <Button title="Confirm" onPress={authConfirmSignup} />
          <Button onPress={onShowSignIn} title="No account? Sign up!" />
        </View>
        <View style={{ padding: 10 }}>
          <Button onPress={onHide} title="Skip for now" />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ConfirmSignupModal;
