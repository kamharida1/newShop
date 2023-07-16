
import React from "react";
import { Text, StyleSheet, View } from "react-native";

interface NumberFormattedProps {
  value: number;
}

const NumberFormatted: React.FC<NumberFormattedProps> = ({ value }) => {
  const formatNumber = (num: number) => {
    const formatted = new Intl.NumberFormat("en-US").format(num);

    if (num >= 1000 && num < 1000000) {
      const parts = formatted.split(",");
      const lastThreeDigits = parts.pop();

      return (
        <View style={styles.container}>
          <Text style={{ fontSize: 18, fontWeight: '300', paddingRight: 3}}>{`${"\u20A6"}`}</Text>
          <Text style={styles.mainText}>{parts}</Text>
          <Text style={styles.smallText}>{lastThreeDigits}</Text>
        </View>
      );
    } else if (num >= 1000000) {
      const parts = formatted.split(",");
      const lastSixDigits = parts.pop();

      return (
        <View style={styles.container}>
          <Text style={styles.mainText}>{parts}</Text>
          <Text style={styles.smallText}>{lastSixDigits}</Text>
        </View>
      );
    }

    return <Text style={styles.mainText}>{formatted}</Text>;
  };

  return <View style={styles.numberContainer}>{formatNumber(value)}</View>;
};

const styles = StyleSheet.create({
  numberContainer: {
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  mainText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  smallText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 2,
  },
});

export default NumberFormatted;
