import { DataStore } from "aws-amplify"
import { Category, OptionType, OptionValue, Product, ProductType, SubCategory } from "../models"

export const mergeData = async () => {
  // Get the data from different models
  const productTypeData = await DataStore.query(ProductType);
  const subCatData = await DataStore.query(SubCategory);
  const categoriesData = await DataStore.query(Category);
  const optionTypesData = await DataStore.query(OptionType);
  const optionValuesData = await DataStore.query(OptionValue);
  const productsData = await DataStore.query(Product);

  // Merge the data into a single object
  const mergedData = {
    productTypes: productTypeData,
    subCategories: subCatData,
    categories: categoriesData,
    optionTypes: optionTypesData,
    optionValues: optionValuesData,
    products: productsData
  };

  // Save the data to the cloud
  await DataStore.save(mergedData);
}