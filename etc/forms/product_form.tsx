import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { Brand, Category, LazyProduct, OptionType, OptionValue, Product, ProductType, SubCategory } from '../../src/models'
import { Box } from '../_Theme';
import TextInput from './text_input';
import DropdownComponent from './dropdown';
import { DataStore } from 'aws-amplify';
import DropDownPicker from "react-native-dropdown-picker";

interface ProductFormT {
  optionTypes: OptionType[];
  showOptType: boolean;
  handleDetailsChange: (name: string, value: string) => void;
  handleSubCategoryChange: (subCatID: string) => void;
  handleChange: (key: string, value: string) => void;
  values: any;
  setValues: any;
  details: any;
  saveRecord: (values: LazyProduct) => void;
  brands: Brand[];
  categories: Category[];
  subCategories: SubCategory[];
  productTypes: ProductType[];
}

const ProductForm: FC<ProductFormT> = ({
  optionTypes,
  showOptType,
  handleChange,
  handleDetailsChange,
  saveRecord,
  handleSubCategoryChange,
  values,
  setValues,
  details,
  brands,
  categories,
  subCategories,
  productTypes
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [brandList, setBrandList] = useState([]);
  const [brandID, setBrandID] = useState("");
  const [catList, setCatList] = useState([]);
  const [categoryID, setCategoryID] = useState("");
  const [subList, setSubsList] = useState([]);
  const [subCategoryID, setSubCategoryID] = useState("");
  const [productTypesList, setProductTypeList] = useState([]);
  const [productTypeID, setProductTypeID] = useState(null);
  const [optionValues, setOptionValues] = useState([])

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
      renderDetailsFields(optionTypes)
    }
  },[optionTypes, optionValues])

  const renderDetailsFields = (optionTypes: OptionType[]) => {

    async function renderOptionValues(field: OptionType) {
      // use OptionTypeId to query for optionValues
      // const comments = await DataStore.query(Comment, (c) =>
      //   c.post.id.eq("YOUR_POST_ID")
      // );
      const optionValues = await DataStore.query(OptionValue, (v) => 
        v.opttionType.id.eq(field.id)
      );

      const options = optionValues.map((option) => ({
        label: option.name,
        value: option.id,
      }));

      setOptionValues(options)

    return (
      <View style={{ flex: 1, marginHorizontal: 16, marginBottom: 8 }}>
        {optionTypes.map((field, index) => {
          switch (field.category) {
            case "PRODUCT_DETAILS_TEXT":
              return (
                <Box key={field.id} mb="l">
                  <TextInput
                    placeholder={`${field.placeholder}`}
                    value={values.details[field.name] || ''}
                    onChangeText={(value) =>
                      handleDetailsChange(field.name, value)
                    }
                  />
                </Box>
              );
            case "PRODUCT_DETAILS_SELECT":
              return (
                <Box key={field.id} mb="l">
                  <DropdownComponent
                    mode={"modal"}
                    value={values.details[field.name]}
                    isFocus={isFocus}
                    setIsFocus={setIsFocus}
                    // setValue={(value: string) => handleDetailsChange(field.name, value) }
                    setValue={(value: string) =>
                      setValues({
                        ...values,
                        details: { ...values.details, [field.name]: value },
                      })
                    }
                    data={getOP}
                  />
                </Box>
              );
            default:
              return null;
          }
        })}
      </View>
    );
  }
  return (
    <View style={{ margin: 8 }}>
      <Text style={{ fontSize: 30 }}>Hello World</Text>
      <Box mb="l">
        <DropdownComponent
          value={productTypeID}
          isFocus={isFocus}
          setIsFocus={setIsFocus}
          setValue={(value: string) => setValues({ ...values, productTypeID: value })
          }
          data={productTypesList}
        />
      </Box>
      <Box>
        <DropdownComponent
          value={subCategoryID}
          isFocus={isFocus}
          setIsFocus={setIsFocus}
          setValue={(value: string) => handleSubCategoryChange(value)}
          data={subList}
        />
        {/* {optionTypes.map(opt => <Text key={opt.id}>{opt.name}</Text>)} */}
        {showOptType && renderDetailsFields(optionTypes)}
      </Box>
    </View>
  );
}

export default ProductForm;

const styles = StyleSheet.create({})