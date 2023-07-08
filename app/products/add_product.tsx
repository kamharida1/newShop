import {  useState } from "react";
import { useDataStore } from "../../src/hooks/useDataStoreUpdate";
import { Brand, Category, OptionType,ProductType, SubCategory } from "../../src/models";
import { DataStore } from "aws-amplify";
import ProductForm2 from "../../etc/forms/product_form2";

export default function AddProduct() {
  const [showOptType, setShowOptType] = useState(false);
  const [optionTypes, setOptionTypes] = useState<OptionType[]>([])

  const { data: brandList } = useDataStore(Brand);
  

  const { data: categoryList } = useDataStore(Category);


  const { data: productTypeList } = useDataStore(ProductType);

  const { data: subsList } = useDataStore(SubCategory);


  const handleSubCategoryChange = async (subCatID: string) => {
    // setValues({ ...values, subcategoryID: subCatID });
    const optionTypes = await DataStore.query(OptionType, (opt) =>
      opt.subcategorys.subCategory.id.eq(subCatID)
    );
    setOptionTypes(optionTypes);
    setShowOptType(true)
  };

  return (
    <ProductForm2
      optionTypes={optionTypes}
      showOptType={showOptType}
      handleSubCategoryChange={handleSubCategoryChange}
      categories={categoryList}
      productTypes={productTypeList}
      subCategories={subsList}
      brands={brandList}
    />
  );
}
