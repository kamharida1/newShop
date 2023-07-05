import { useEffect, useState } from "react";
import { OptionType, OptionValue } from "../../src/models";
import { DataStore } from "aws-amplify";
import { Box } from "../_Theme";
import TextInput from "./text_input";
import RNPickerSelect from "react-native-picker-select";
import { View } from "@bacons/react-views";
import DropdownComponent from "./dropdown";


interface DetailsT {
  opt: OptionType;
  index: number;
  handleDropdownFocus: (index: number) => void;
  handleDropdownBlur: (index: number) => void;
  handleDropdownValueChange: (value: string, label: string) => void;
  selectedValues: any
}

export default function DetailsForm(props: DetailsT) {
    const {
      opt,
      index,
      handleDropdownBlur,
      handleDropdownFocus,
      handleDropdownValueChange,
      selectedValues,
    } = props;
  
  const [optionValues, setOptionValues] = useState<OptionValue[]>([]);

  useEffect(() => {
    const fetchOptionValues = async () => {
      await DataStore.query(OptionValue, optValue =>
        optValue.optiontypeID.eq(opt.id),
      ).then(setOptionValues);
    }
    fetchOptionValues();
  }, []);

  let displayComponent;
  switch (opt.category) {
    case "PRODUCT_DETAILS_TEXT":
      displayComponent = (
        <Box key={opt.id} mb="l">
          <TextInput
            placeholder={`${opt.name}`}
            value={selectedValues[opt.name] || ""}
            onChangeText={(value) => handleDropdownValueChange(value, opt.name)}
          />
        </Box>
      );
      break;
    case "PRODUCT_DETAILS_SELECT":
      displayComponent = (
        <Box key={opt.id} mb="l">
          <RNPickerSelect
            onValueChange={(value) =>
              handleDropdownValueChange(value, opt.name)
            }
            items={optionValues.map((option) => ({
              label: option.name,
              value: option.name,
            }))}
            onOpen={() => handleDropdownFocus(index)}
            onClose={() => handleDropdownBlur(index)}
            placeholder={{label: opt.name, value: null}}
          />
        </Box>
      );
      break;
    default:
      displayComponent = "Default Contition";
      break;
  }
  return (
    <View>
      {displayComponent}
    </View>
  );
}