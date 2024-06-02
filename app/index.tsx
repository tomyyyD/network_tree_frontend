import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from "react";
import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // state as in the 50 states not a mindset
  const [state, setState] = useState(null)

  // GET data
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch('http://localhost:3000/states')
        const data = await response.json()
        setData(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    )
  }

  if (error != null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{error}</Text>
      </View>
    )

  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 100,
      }}
    >
      <View style={ styles.top_view }>
        <Text style={ styles.title }>State picker challenge</Text>
        <View>
          <Pressable style={ selected ? styles.selected_button : styles.select_button } onPress={() => setSelected(selected => ! selected)}>
            { state == null ?
              (<Text style={ styles.placeholder_text }>state</Text>) :
              (
                <View style={{ paddingLeft: 15, }}>
                  <Text style={{ color: 'grey', paddingTop: 6, fontSize: 12 }}>state</Text>
                  <Text style={{ paddingBottom: 10}}>{state}</Text>
                </View>
              )
            }
            <Image
              style={styles.tiny_logo}
              source={require('../assets/images/arrow-down-icon.png')}
            />
          </Pressable>
        </View>
      </View>
      { selected ? 
      (
        <View style={{width: '100%'}}>
          <View style={ styles.done_button }>
            <Button title="Done" onPress={() => setSelected(false)}/>
          </View>
          <Picker
            style={{width: '100%'}}
            selectedValue={state}
            onValueChange={(itemValue, itemIndex) =>
              setState(itemValue)
          }>
            {data.map((state, index) => <Picker.Item key={index} label={state} value={state} />)}
          </Picker>
        </View>
      ) : 
      (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  done_button: {
    backgroundColor: '#e6e6e6',
    alignItems: 'flex-end',
    paddingRight: 15,
  },
  title: {
    fontFamily: 'Arial',
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  top_view: {
    width: '90%',
  },
  select_button: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 2,
  },
  selected_button: {
    backgroundColor: '#d1e7ff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#005aba',
    borderRadius: 10,
    borderWidth: 2,
  },
  placeholder_text: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: 'grey',
    padding: 15,
  },
  tiny_logo:{
    width: 10,
    height: 5,
    marginRight: 25,
  }
})
