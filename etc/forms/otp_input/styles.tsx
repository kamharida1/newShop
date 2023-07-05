import styled from "styled-components/native";
import { theme } from "../../../etc/_Theme";

export const ScreenContainer = styled.SafeAreaView`
  flex: 1;
  margin: 20px;
  padding-left: 20px;
`;

export const OTPInputContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const TextInputHidden = styled.TextInput`
  width: 300px;
  border-color: ${theme.colors.primary};
  border-width: 1px;
  border-radius: 5px;
  padding: 15px;
  position: absolute;
  opacity: 0;
`;

export const SplitOTPBoxesContainer = styled.Pressable`
  width: 80%;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 8px;
`;

export const SplitBoxes = styled.View`
  border-color: #e5e5e5;
  border-width: 2px;
  border-radius: 5px;
  padding: 12px;
  min-width: 40px;
`;

export const SplitBoxesFocused = styled(SplitBoxes)`
  border-color: ${theme.colors.primary};
  background-color: white;
`;

export const SplitBoxText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: black;
  //font-family: airbnb-bold
`;

export const ButtonContainer = styled.TouchableOpacity`
  background-color: #d8e9a8;
  padding: 20px;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  width: 300px;
  margin-top: 30px;
`;

export const ButtonText = styled.Text`
  color: black;
  font-size: 20px;
  //font-family: airbnb-bold
`;
