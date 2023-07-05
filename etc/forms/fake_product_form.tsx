import { FC, useEffect, useState } from "react";
import {
  Brand,
  Category,
  LazyProduct,
  OptionType,
  OptionValue,
  ProductType,
  SubCategory,
} from "../../src/models";
import DropdownComponent from "./dropdown";
import { Text, View } from "@bacons/react-views";
import { Box } from "../_Theme";
import { Button } from "react-native";
import TextInput from "./text_input";
import { ScrollView } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";
import { DataStore } from "aws-amplify";



interface ProductFormT {
  optionTypes: OptionType[];
  showOptType: boolean;
  handleDetailsChange: (name: string, value: string) => void;
  handleSubCategoryChange: (subCatID: string) => void;
  handleChange: (key: string, value: string) => void;
  values: any;
  setValues: any;
  setOptionTypes: any;
  details: any;
  saveRecord: (values: LazyProduct) => void;
  brands: Brand[];
  categories: Category[];
  subCategories: SubCategory[];
  productTypes: ProductType[];
}

const ProdForm: FC<ProductFormT> = ({
  optionTypes,
  values,
  setValues,
  brands,
  details,
  categories,
  subCategories,
  productTypes,
  showOptType,
  handleSubCategoryChange,
  handleDetailsChange,
}) => {
  const [dropdownFocus, setDropdownFocus] = useState<boolean[]>([]);
  const [optionValues, setOptionValues] = useState([]);

  const [isFocus, setIsFocus] = useState(false);
  const [brandList, setBrandList] = useState([]);
  const [catList, setCatList] = useState([]);
  const [subList, setSubsList] = useState([]);
  const [subcategoryID, setSubCategoryID] = useState("");
  const [productTypesList, setProductTypeList] = useState([]);
  const [productTypeID, setProductTypeID] = useState(null);
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [about, setAbout] = useState("");
  const [images, setImages] = useState([]);
  const [rating, setRating] = useState(0.0);
  const [price, setPrice] = useState(0.0);
  const [categoryID, setCategoryID] = useState("");
  const [brandID, setBrandID] = useState("");
  const [producttypeID, setProducttypeID] = useState("");
  const [prototypeID, setPrototypeID] = useState("");
  const [shippingclassID, setShippingclassID] = useState("");

  const [selectedValues, setSelectedValues] = useState({});


  useEffect(() => {
    //console.warn(catList);
    const brandOptions = brands.map((option) => ({
      label: option.name,
      value: option.id,
    }));
    setBrandList(brandOptions);

    const catOptions = categories.map((option) => ({
      label: option.name,
      value: option.id,
    }));
    setCatList(catOptions);

    const subsOptions = subCategories.map((option) => ({
      label: option.name,
      value: option.id,
    }));
    setSubsList(subsOptions);

    const productTypeOptions = productTypes.map((option) => ({
      label: option.name,
      value: option.id,
    }));
    setProductTypeList(productTypeOptions);
  }, [brands, categories, subCategories, productTypes]);

  useEffect(() => {
    if (optionTypes) {
      optionTypes.map(optionType => {
        fetchOptionValues(optionType)
      })
    }
  }, [optionTypes])
  
  const fetchOptionValues = async (optionType: OptionType) => {
    const { id, name, category } = optionType;
    const optType = await DataStore.query(OptionType, id);
    const optValues = await optType?.OptionValues.toArray();
    const options = optValues?.map((option) => ({
      label: option.name,
      value: option.id,
    }));
    setOptionValues(options);
  };


  const handleDropdownFocus = (index) => {
    const updatedFocus: boolean[] = [...dropdownFocus];
    updatedFocus[index] = true;
    setDropdownFocus(updatedFocus)
  };

  const handleDropdownblur = (index) => {
    const updatedFocus = [...dropdownFocus];
    updatedFocus[index] = false
    setDropdownFocus(updatedFocus);
  }

  const handleDropdownValueChange = (value, label) => {
    setSelectedValues((previousValues) => ({
      ...previousValues,
      [label]: value,
    }))
  }

  // replace the inner map function with this in showOptType below
  const renderDetailsForm = (optionTypes: OptionType[]) => {
    if (!optionTypes) {
      return null;
    }
    
    return (
      <View style={{ flex: 1, marginHorizontal: 16, marginBottom: 8 }}>
        {optionTypes.map((field, index) => {
          switch (field.category) {
            case "PRODUCT_DETAILS_TEXT":
              return (
                <Box key={field.id} mb="l">
                  <TextInput
                    placeholder={`${field.placeholder}`}
                    value={selectedValues[field.name] || ""}
                    onChangeText={(value) =>
                      handleDropdownValueChange(value, field.name)
                    }
                  />
                </Box>
              );
            case "PRODUCT_DETAILS_SELECT":
              return (
                <Box key={field.id} mb="l">
                  <RNPickerSelect
                    onValueChange={(value) => handleDropdownValueChange(value, field.name)}
                    items={optionValues}
                    onOpen={() => handleDropdownFocus(index)}
                    onClose={() => handleDropdownblur(index)}
                  />
                </Box>
              );
            default:
              return null;
          }
        })}
      </View>
    );
  };

  console.warn('Selected Values:', selectedValues)
  console.log(optionValues)

  return (
    <View style={{ flex: 1, margin: 8 }}>
      <Text style={{ fontSize: 20, padding: 5 }}>Hello World</Text>
      <Box mb="l">
        <DropdownComponent
          value={productTypeID}
          isFocus={isFocus}
          setIsFocus={setIsFocus}
          setValue={(value: string) =>
            setValues({ ...values, productTypeID: value })
          }
          data={productTypesList}
        />
      </Box>
      <Box>
        <DropdownComponent
          value={subcategoryID}
          isFocus={isFocus}
          setIsFocus={setIsFocus}
          setValue={(value: string) => handleSubCategoryChange(value)}
          data={subList}
        />
      </Box>
      {showOptType && (
        // optionTypes.map(opt => <Text>{opt.name}</Text> )
        <ScrollView style={{ flex: 1 }}>
          {renderDetailsForm(optionTypes)}
        </ScrollView>
      )}
      <Button title="Create Product" onPress={() => {}} />
    </View>
  );
};

export default ProdForm;
