import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import tw from 'twrnc'
import { Button } from "../../etc/buttons/button";
import { useRouter } from "expo-router";

const CreditCardInput: React.FC = () => {
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardHolder, setCardHolder] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCVV] = useState<string>("");
  const [cardNumberError, setCardNumberError] = useState<string>("");
  const [expiryDateError, setExpiryDateError] = useState<string>("");
  const [cvvError, setCVVError] = useState<string>("");

  const router = useRouter();
  
  const detectCardType = (value: string): string => {
    const firstDigit = value.charAt(0);

    if (firstDigit === "4") {
      return "Visa";
    } else if (["5", "2", "1", "6"].includes(firstDigit)) {
      return "MasterCard";
    } else {
      return "Unknown";
    }
  };

  const isValidCardNumber = (value: string): boolean => {
    const cleanedValue = value.replace(/\s/g, "");

    let sum = 0;
    let shouldDouble = false;
    for (let i = cleanedValue.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanedValue.charAt(i));

      if (shouldDouble) {
        if ((digit *= 2) > 9) digit -= 9;
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  };

  const formatCardNumber = (value: string): void => {
    let formattedValue = value.replace(/\s/g, "").slice(0, 16);
    formattedValue = formattedValue.match(/.{1,4}/g)?.join(" ") || "";
    setCardNumber(formattedValue);
  };

  const validateExpiryDate = (value: string): boolean => {
    const monthRegex = /^(0[1-9]|1[0-2])$/;
    const yearRegex = /^([2-9]\d)$/;

    if (
      !value ||
      !monthRegex.test(value.slice(0, 2)) ||
      !yearRegex.test(value.slice(3, 5))
    ) {
      return false;
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;

    const inputMonth = parseInt(value.slice(0, 2));
    const inputYear = parseInt(value.slice(3, 5));

    return (
      inputYear > currentYear ||
      (inputYear === currentYear && inputMonth >= currentDate.getMonth() + 1)
    );
  };

  const formatExpiryDate = (value: string): void => {
    let formattedValue = value.replace(/\s/g, "").slice(0, 5);

    if (!formattedValue.includes("/")) {
      formattedValue = formattedValue.match(/.{1,2}/g)?.join("/") || "";
    }

    setExpiryDate(formattedValue);
  };

  const handleCardNumberChange = (value: string): void => {
    formatCardNumber(value);
    setCardNumberError("");
    const cardType = detectCardType(value);
    console.log("Card Type:", cardType);
  };

  const handleCardNumberBlur = (): void => {
    if (!isValidCardNumber(cardNumber)) {
      setCardNumberError("Invalid card number");
    } else {
      setCardNumberError(""); // Clear the error on blur if the input is valid
    }
  };

  const handleExpiryDateBlur = (): void => {
    if (!validateExpiryDate(expiryDate)) {
      setExpiryDateError("Invalid expiry date");
    } else {
      setExpiryDateError(""); // Clear the error on blur if the input is valid
    }
  };

  const handleCVVBlur = (): void => {
    if (cvv.length !== 3) {
      setCVVError("Invalid CVV");
    } else {
      setCVVError(""); // Clear the error on blur if the input is valid
    }
  };

  const addCard = () => {
    //Todo save payment card
    router.push("order/payment_methods");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Card Number</Text>
      <TextInput
        style={[styles.input, cardNumberError && styles.inputError]}
        placeholder="1234 5678 9012 3456"
        keyboardType="number-pad"
        value={cardNumber}
        onChangeText={handleCardNumberChange}
        onBlur={handleCardNumberBlur}
        maxLength={19}
      />
      {cardNumberError ? (
        <Text style={styles.errorText}>{cardNumberError}</Text>
      ) : null}

      <Text style={styles.label}>Card Holder</Text>
      <TextInput
        style={styles.input}
        placeholder="John Doe"
        value={cardHolder}
        onChangeText={setCardHolder}
      />

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Expiry Date</Text>
          <TextInput
            style={[styles.input, expiryDateError && styles.inputError]}
            placeholder="MM/YY"
            keyboardType="number-pad"
            value={expiryDate}
            onChangeText={formatExpiryDate}
            onBlur={handleExpiryDateBlur}
            maxLength={5}
          />
          {expiryDateError ? (
            <Text style={styles.errorText}>{expiryDateError}</Text>
          ) : null}
        </View>
        <View style={{ flex: 1, marginLeft: 16 }}>
          <Text style={styles.label}>CVV</Text>
          <TextInput
            style={[styles.input, cvvError && styles.inputError]}
            placeholder="CVV"
            keyboardType="number-pad"
            value={cvv}
            onChangeText={setCVV}
            onBlur={handleCVVBlur}
            maxLength={3}
          />
          {cvvError ? <Text style={styles.errorText}>{cvvError}</Text> : null}
        </View>
      </View>
      <Button
        onPress={() => addCard()}
        buttonStyle={tw`w-full bg-yellow-900 mt-8`}
        textStyle={tw`text-base`}
      >
        ADD CARD
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  inputError: {
    borderColor: "red",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    flex: 1,
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 8,
  },
});

export default CreditCardInput;
