import React, {useState,useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const App = () => {
  const [textinput, setTextinput] = useState([{id:1,title: 'hiii'}]);
  const [text,onChangeText]=useState('');
  const isDarkMode = useColorScheme() === 'dark';

 const Setdata =async(item,item2)=>{
  try {
    const jsonValue = JSON.stringify(item?[...textinput,item]:item2);
    await AsyncStorage.setItem('ItemList', jsonValue);
  } catch (e) {
    // saving error
  }
 }
  
  const Delete=(index)=>{
    let itemcopy=textinput.filter(i=>i.id !== index);
    setTextinput(itemcopy);
    Setdata(false,itemcopy);
  }
  const Item = ({title,id}) => (
    <View style={styles.listitem}>
     
      <Text style={styles.titleitem} >{title}</Text>
      <TouchableOpacity onPress={()=>Delete(id)} style={styles.squre}><Text style={{textAlign:'center',color:'white',fontWeight:'bold' }}>x</Text></TouchableOpacity>
    </View>
  );

  
const Addtext =()=>{
 
  if(text != "")  { 
    const item={id:Math.random(),title:text}
    setTextinput([...textinput,item]);
    onChangeText('');
    Setdata(item,false);
  } 
}
const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('ItemList');
        setTextinput( jsonValue != null ? JSON.parse(jsonValue) : "");
      } catch(e) {
        // error reading value
      }
    }
useEffect(() => {
   getData();
  },[])

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View style={styles.header}>
        <Text style={styles.headertext}>TODO</Text>
      </View>
     
        <View style={{margin:10,height:'80%'}}>
         
          <FlatList
            data={textinput}
            renderItem={({item}) => <Item title={item.title} id={item.id} />}
            keyExtractor={item => item.id}
          />
        </View>
  
      <View style={styles.footer}>
        <View style={styles.textfooter}>
        <TextInput  onChangeText={onChangeText}  value={text}  placeholder="Enter Your Task" />
        </View>
        <View style={styles.textadd}>
          <TouchableOpacity onPress={() =>Addtext()}><Text style={{fontSize:30,textAlign:'center',color:'white'}}>+</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor:'rgb(253, 245, 202)'
  },
  headertext: {
    fontSize: 25,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  footer: {
    position: 'absolute',
    flex: 1,
    flexDirection:'row',
    bottom: 0,
    padding: 5,
    margin: 10,
    width: '100%',
    backgroundColor:'rgb(253, 245, 202)',
    
  },
  textfooter: {
    height:'100%',
    width: '74%',
    padding: 3,
    borderRadius: 10,
    backgroundColor: 'white'

  },
  listitem: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    backgroundColor: 'rgb(250, 206, 127)',
    borderRadius: 10,
    padding: 10,
  },
  squre: {
    width: 24,
    height: 24,
    backgroundColor: 'red',
    marginRight: 10,
    borderRadius: 20,
  },
  titleitem:{
    fontSize:15,
    flex: 1,
    flexWrap:'wrap'
  },
  textadd:{
    height:'100%',
    width:'20%',
    padding:5,
    marginLeft:5,
    borderRadius: 10,
    backgroundColor: 'red'
  }
 
});

export default App;
