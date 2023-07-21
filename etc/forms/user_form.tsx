import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Address from "../../pages/pre_order/address";

import tw from "twrnc";
import * as Yup from "yup";
import Button from "../buttons/soft_button";
import TextInput from "./text_input";
import { Screen } from "../views/screen";
import { ActivityIndicator } from "react-native-paper";
import { Box } from "../_Theme";
import { ShippingAddress, User } from "../../src/models";
import { DataStore } from "aws-amplify";
import { useRouter } from "expo-router";
import FlyInput from "./fly_input";

const AddressSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required.")
    .min(4, "Too Short")
    .max(60, "Too Long"),
  lastName: Yup.string()
    .required("Last name is required.")
    .min(2, "Too Short")
    .max(60, "Too Long"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string()
    .required("Phone number is required")
    .test(
      "len",
      "Phone number must be exactly 11 digits",
      (val) => !!val && val.length === 11
    ),
  address: Yup.string()
    .required("Address is required.")
    .min(4, "Too Short")
    .max(100, "Too Long"),
  subAddress: Yup.string().min(2, "Too Short").max(100, "Too Long"),
});

const UserForm = ({ user, myAddress, mode }) => {
  const [province, setProvince] = useState("");
  const [town, setTown] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValues = myAddress || {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    subAddress: "",
  };

  const getInfo = (province, town) => {
    setProvince(province);
    setTown(town);
  };

  const router = useRouter();

  const submitAddress = async (values, { resetForm }) => {
    try {
      if (myAddress) {
        const original = await DataStore.query(ShippingAddress, myAddress.id);
        const updated = ShippingAddress.copyOf(original, (updated) => {
          updated.firstName = values.firstName;
          updated.lastName = values.lastName;
          updated.email = values.email;
          updated.phone = values.phone;
          updated.address = values.address;
          updated.subAddress = values.subAddress;
          updated.city = values.city;
          updated.state = values.state;
        });
        await DataStore.save(updated);
      } else {
        const newAddress = {
          ...values,
          userID: user.id,
          city: town,
          state: province,
        };
        await DataStore.save(new ShippingAddress(newAddress));
        router.back();
      }
    } catch (error) {
      console.warn("Error saving shipping address:", error);
    }
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setValues,
  } = useFormik({
    validationSchema: AddressSchema,
    initialValues,
    onSubmit: submitAddress,
  });

  // Update form values when myAddress prop changes
  useEffect(() => {
    setValues(myAddress || initialValues);
  }, [myAddress]);

  return (
    <Screen style={tw``}>
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator animating color="black" />
        </View>
      ) : (
        <>
          <FlyInput
            value={values.firstName}
            label="First Name"
            placeholder="first Name"
          />
          <Box mb="l">
            <TextInput
              value={values.lastName}
              placeholder="Last Name"
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              error={errors.lastName}
              touched={touched.lastName}
              returnKeyType="next"
              returnKeyLabel="next"
            />
          </Box>
          <Box mb="l">
            <TextInput
              value={values.email}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              error={errors.email}
              touched={touched.email}
              returnKeyType="next"
              returnKeyLabel="next"
            />
          </Box>
          <Box mb="l">
            <TextInput
              value={values.address}
              placeholder="Address 1"
              onChangeText={handleChange("address")}
              onBlur={handleBlur("address")}
              error={errors.address}
              touched={touched.address}
              returnKeyType="next"
              returnKeyLabel="next"
            />
          </Box>
          <Box mb="l">
            <TextInput
              value={values.subAddress}
              placeholder="Address 2"
              onChangeText={handleChange("subAddress")}
              onBlur={handleBlur("subAddress")}
              error={errors.subAddress}
              touched={touched.subAddress}
              returnKeyType="next"
              returnKeyLabel="next"
            />
          </Box>
          <Box mb="l">
            <TextInput
              value={values.phone}
              placeholder="Phone number"
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              error={errors.phone}
              touched={touched.phone}
              returnKeyType="next"
              returnKeyLabel="next"
            />
          </Box>
          <Address getInfo={getInfo} />
          <Button
            buttonStyle={{
              width: "100%",
              height: 55,
              borderRadius: 15,
              backgroundColor: "#345522",
            }}
            //disabled
            isLoading={loading}
            title="SUBMIT"
            onPress={handleSubmit}
          />
        </>
      )}
    </Screen>
  );
};

export default UserForm;

const styles = StyleSheet.create({});
