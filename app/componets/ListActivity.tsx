import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";

const ListActivity = ({ item, id }: any) => {
  return (
    <View style={styles.container}>
      <Text>{id}. </Text>
      <Text>{item?.activity}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
  },
});

const customComparator = (prevProps: any, nextProps: any) => {
  return JSON.stringify(nextProps?.item) === JSON.stringify(prevProps?.item);
};

export default memo(ListActivity, customComparator);
