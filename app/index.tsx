import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ListActivity from "./componets/ListActivity";
import { Data, getDataActivity } from "./helpers/general";
import { getItem, removeItem, setItem } from "./utils/AsyncStorage";

const App = () => {
  const [data, setData] = useState<any>(null);
  const [savedData, setSavedData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    // Fetch data from AsyncStorage
    const fetchActivity = async () => {
      try {
        const storedTasks = await getItem("savedData");

        if (storedTasks !== null) {
          setSavedData(storedTasks);
        }
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };

    fetchActivity();
  }, []);

  const addActivity = async () => {
    // Add a new task and save to AsyncStorage
    try {
      const updatedTasks = [...savedData, data];
      setSavedData(updatedTasks);
      setItem("savedData", updatedTasks);
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  const deleteListActivity = () => {
    if (savedData?.length > 0) {
      removeItem("savedData");
      setSavedData([]);
    } else {
      Alert.alert("Belum ada data yang di save");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getDataActivity();

      setData(response);
    } catch (error) {
      Alert.alert("Check your connection!");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text
        style={{
          fontSize: 22,
          padding: 16,
        }}
      >
        Random Activity
      </Text>
      <TouchableOpacity
        style={styles.buttonRefresh}
        onPress={() => {
          fetchData();
        }}
      >
        <Text style={styles.itemTitle}>Refresh Data</Text>
      </TouchableOpacity>
      <View
        style={{
          padding: 12,
        }}
      >
        {loading ? (
          <ActivityIndicator size={30} />
        ) : (
          <View>
            <Text>Activity :{data?.activity || "-"}</Text>
            <Text>Type : ({data?.type})</Text>
          </View>
        )}
      </View>
      <View>
        <TouchableOpacity
          style={styles.buttonSave}
          onPress={() => {
            if(data !== null) {
              addActivity();
            } else {
              Alert.alert("Refresh Data terlebih dahulu")
            }
          }}
        >
          <Text style={styles.itemTitle}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonDelete}
          onPress={() => {
            deleteListActivity();
          }}
        >
          <Text style={styles.itemTitle}>Delete All Item</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 12, paddingBottom: 26 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            paddingBottom: 12,
          }}
        >
          Saved Data:
        </Text>
        {savedData?.length > 0 ? (
          <FlatList
            data={savedData}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => {
              return <ListActivity item={item} id={index + 1} />;
            }}
            ItemSeparatorComponent={() => {
              return <View style={{ height: 10 }} />;
            }}
            horizontal={false}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text>Data Belum Tersedia</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  itemTitle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonRefresh: {
    padding: 10,
    backgroundColor: "#0080FF",
    borderRadius: 10,
    width: 200,
  },
  buttonSave: {
    padding: 10,
    backgroundColor: "#0d694d",
    borderRadius: 10,
    width: 200,
  },
  buttonDelete: {
    marginTop: 12,
    padding: 10,
    backgroundColor: "#BF0000",
    borderRadius: 10,
    width: 200,
  },
});

export default App;
