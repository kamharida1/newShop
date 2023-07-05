import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Picker } from "@react-native-picker/picker";

const jsonData = [
  {
    label: "Color",
    options: [
      { label: "Red", value: "red" },
      { label: "Blue", value: "blue" },
      { label: "Green", value: "green" },
    ],
  },
  {
    label: "Size",
    options: [
      { label: "Small", value: "small" },
      { label: "Medium", value: "medium" },
      { label: "Large", value: "large" },
    ],
  },
  {
    label: "Country",
    options: [
      { label: "USA", value: "usa" },
      { label: "Canada", value: "canada" },
      { label: "Australia", value: "australia" },
    ],
  },
  // Add more dropdowns as needed
];

const DropdownContainer = styled(View)`
  margin-bottom: 20px;
`;

const DropdownLabel = styled.Text`
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
`;

const Dropdown = styled(Picker)`
  width: 200px;
  height: 40px;
  border-radius: 8px;
  background-color: #f2f2f2;
`;

const PickerComponent = ({ label, options }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <DropdownContainer>
      <DropdownLabel>{label}</DropdownLabel>
      <Dropdown selectedValue={selectedValue} onValueChange={handleValueChange}>
        {options.map((option) => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Dropdown>
    </DropdownContainer>
  );
};

export default PickerComponent;

// const App = () => {
//   return (
//     <View style={styles.container}>
//       {jsonData.map((item, index) => (
//         <DropdownComponent
//           key={index}
//           label={item.label}
//           options={item.options}
//         />
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//   },
// });

// export default App;
