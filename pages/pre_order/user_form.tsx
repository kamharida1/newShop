import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import { useFormik } from 'formik'
import Address from './address';

import tw from 'twrnc';
import * as Yup from "yup";
import Button from '../../etc/buttons/soft_button'
import TextInput from '../../etc/forms/text_input';
import { Screen } from '../../etc/views/screen';
import { ActivityIndicator } from 'react-native-paper';
import { Box } from '../../etc/_Theme';
import { ShippingAddress, User } from '../../src/models';
import { addAddress, fetchRequest, initialState, reducer } from './reducer';
import { DataStore } from 'aws-amplify';
import { useRouter } from 'expo-router';

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
  subAddress: Yup.string()
    .min(2, "Too Short")
    .max(100, "Too Long"),
});

const UserForm = ({user}) => {
  const [province, setProvince] = useState("");
  const [town, setTown] = useState("");
  const [userAddress, setUserAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    subAddress: "",
  });
  const [state, dispatch] = useReducer(reducer, initialState)
  const {addresses, loading, error} = state

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setLoading(false); // Set loading to false after the timeout duration
  //     // Perform any other actions you need after the timeout
  //   }, 2000);

  //   return () => {
  //     clearTimeout(timeout); // Clear the timeout if the component unmounts or changes
  //   };
  // }, []);

  const getInfo = (province, town) => {
    setProvince(province);
    setTown(town);
  };

  const router = useRouter();

  const submitAddress = async (values, { resetForm }) => {
    try {
      const newAddress = { ...values, userID: user.id, city: town, state: province };
      await DataStore.save(new ShippingAddress(newAddress));
      dispatch(addAddress(newAddress))
      resetForm();
      router.back()
    } catch (error) {
      console.warn('Error saving shipping address:', error)
    }
  }

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    validationSchema: AddressSchema,
    initialValues: userAddress,
    onSubmit: submitAddress
  });

  return (
    <Screen style={tw``}>
      {loading ? (
        <View style={tw`flex-1 items-center justify-center`}>
          <ActivityIndicator animating color="black" />
        </View>
      ) : (
        <>
          <Box mb="l">
            <TextInput
              value={values.firstName}
              placeholder="First Name"
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              error={errors.firstName}
              touched={touched.firstName}
              returnKeyType="next"
              returnKeyLabel="next"
            />
          </Box>
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
}

export default UserForm

const styles = StyleSheet.create({})