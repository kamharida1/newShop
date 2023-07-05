import { FC, useEffect, useState } from "react";
import {
  Brand,
  Category,
  LazyProduct,
  OptionType,
  Product,
  ProductType,
  SubCategory,
} from "../../src/models";
import * as ImagePicker from "expo-image-picker";
import { Image, Text, View } from "@bacons/react-views";
import { Button as NativeButton } from "react-native";
import tw from 'twrnc'

import DropdownComponent from "./dropdown";
import { Box } from "../_Theme";
import DetailsForm from "./details_form";
import { KeyboardAvoidingWrapper } from "../views/keyboard_avoiding_wrapper";
import TextInput from "./text_input";
import { Button } from "../buttons/button";
import { useDataStore } from "../../src/hooks/useDataStoreUpdate";
import { useRouter } from "expo-router";


interface ProductFormT {
  optionTypes: OptionType[];
  showOptType: boolean;
  handleSubCategoryChange: (subCatID: string) => void;
  brands: Brand[];
  categories: Category[];
  subCategories: SubCategory[];
  productTypes: ProductType[];
}

const PlaceholderImageSource = "https://picsum.photos/200/300";

const ProductForm2: FC<ProductFormT> = ({
  optionTypes,
  brands,
  categories,
  subCategories,
  productTypes,
  showOptType,
  handleSubCategoryChange,
}) => {
  const [dropdownFocus, setDropdownFocus] = useState<boolean[]>([]);
  const [isFocus, setIsFocus] = useState(false);
  const [brandList, setBrandList] = useState([]);
  const [catList, setCatList] = useState([]);
  const [subList, setSubsList] = useState([]);
  const [subcategoryID, setSubCategoryID] = useState("");
  const [productTypesList, setProductTypeList] = useState([]);
  const [name, setName] = useState("");
  const [count, setCount] = useState("0");
  const [about, setAbout] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [rating, setRating] = useState("0");
  const [price, setPrice] = useState("0");
  const [categoryID, setCategoryID] = useState("");
  const [brandID, setBrandID] = useState("");
  const [producttypeID, setProducttypeID] = useState("");
  // const [prototypeID, setPrototypeID] = useState("");
  // const [shippingclassID, setShippingclassID] = useState("");
  // const [optionValues, setOptionValues] = useState<OptionValue[]>([]);

  const { data, create } = useDataStore(Product);
  
  const [selectedValues, setSelectedValues] = useState({});

  const router = useRouter();

  const handleCreateProduct = async() => {
    const product = {
      name,
      count,
      about,
      images,
      rating,
      price,
      categoryID,
      brandID,
      producttypeID,
      subcategoryID,
      details: JSON.stringify(selectedValues),
    };
    await create(product);
    router.back();
  }

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

  const handleDropdownFocus = (index) => {
    const updatedFocus: boolean[] = [...dropdownFocus];
    updatedFocus[index] = true;
    setDropdownFocus(updatedFocus);
  };

  const handleDropdownblur = (index) => {
    const updatedFocus = [...dropdownFocus];
    updatedFocus[index] = false;
    setDropdownFocus(updatedFocus);
  };

  const handleDropdownValueChange = (value, label) => {
    if (!value) return
    setSelectedValues((previousValues) => ({
      ...previousValues,
      [label]: value,
    }));
  };

  const handleInputNumberChange = (text, setValue) => {
    const parsedValue = parseFloat(text);
    if (!isNaN(parsedValue)) {
      setValue(parsedValue)
    }
  }

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setImages(result.assets.map(({ uri })=> uri));
    } else {
      alert("You did not select any image.");
    }
  };

  // console.warn("Selected Values:", selectedValues);
  // console.log(optionValues);

  return (
    <KeyboardAvoidingWrapper>
      <View style={{ flex: 1, margin: 8 }}>
        <Text style={{ fontSize: 20, padding: 5 }}>Hello World</Text>
        <Box mb="s">
          <DropdownComponent
            label="Product Type"
            value={producttypeID}
            isFocus={isFocus}
            setIsFocus={setIsFocus}
            setValue={setProducttypeID}
            data={productTypesList}
          />
        </Box>
        <Box mb="s">
          <DropdownComponent
            label="Brand"
            value={brandID}
            isFocus={isFocus}
            setIsFocus={setIsFocus}
            setValue={setBrandID}
            data={brandList}
          />
        </Box>
        <Box mb="s">
          <DropdownComponent
            label="Category"
            value={categoryID}
            isFocus={isFocus}
            setIsFocus={setIsFocus}
            setValue={setCategoryID}
            data={catList}
          />
        </Box>
        <Box mb="s">
          <DropdownComponent
            label="Sub Category"
            value={subcategoryID}
            isFocus={isFocus}
            setIsFocus={setIsFocus}
            setValue={(value: string) => { setSubCategoryID(value); handleSubCategoryChange(value); }}
            data={subList}
          />
        </Box>
        {showOptType &&
          optionTypes.map((opt, index) => (
            <View key={opt.id} style={{ marginTop: 24 }}>
              <DetailsForm
                opt={opt}
                index={index}
                handleDropdownFocus={handleDropdownFocus}
                handleDropdownBlur={handleDropdownblur}
                handleDropdownValueChange={handleDropdownValueChange}
                selectedValues={selectedValues}
              />
            </View>
          ))}
        <Box mt="xl" mb="l" justifyContent="space-around">
          <Button
            onPress={pickImages}
            textStyle={{
              color: "#222",
              fontWeight: "500",
              textShadowColor: "#000077",
              textShadowRadius: 0.4,
              textShadowOffset: { width: 0.5, height: 0.2 },
            }}
          >
            Select up to 3 images
          </Button>
          <View
            style={tw`p-4 px-2 flex-row flex-wrap bg-white border border-slate-200 `}
          >
            {images
              ? images.map((image) => (
                  <Image
                    key={image}
                    source={{ uri: image ?? PlaceholderImageSource }}
                    style={{
                      width: 80,
                      height: 80,
                      margin: 6,
                    }}
                  />
                ))
              : null}
          </View>
        </Box>
        <Box mb="s">
          <TextInput
            value={name}
            placeholder="Product name"
            onChangeText={(text) => setName(text)}
          />
        </Box>
        <Box mb="s">
          <TextInput
            value={count}
            placeholder="Quantity"
            onChangeText={(text) => handleInputNumberChange(+text, setCount)}
            keyboardType="numeric"
          />
        </Box>
        <Box mb="s">
          <TextInput
            value={about}
            placeholder="Description"
            onChangeText={(text) => setAbout(text)}
          />
        </Box>
        <Box mb="s">
          <TextInput
            value={price}
            placeholder="Price"
            onChangeText={(text) => handleInputNumberChange(+text, setPrice)}
            keyboardType="decimal-pad"
          />
        </Box>
        <Box mb="s">
          <TextInput
            value={rating}
            placeholder="Product rating"
            onChangeText={(text) => handleInputNumberChange(+text, setRating)}
            keyboardType="decimal-pad"
          />
        </Box>
        <Text>{JSON.stringify(selectedValues)}</Text>
        <NativeButton
          title="Create Product"
          onPress={() => handleCreateProduct()}
        />
      </View>
    </KeyboardAvoidingWrapper>
  );
};

export default ProductForm2;
