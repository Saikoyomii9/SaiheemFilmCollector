import React, { useState, useEffect } from 'react';
import  { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
// import openDatabase hook
import { openDatabase} from "react-native-sqlite-storage"

//use the hook to create database
const shopperDB = openDatabase({name: 'Shopper.db'});
const actorsTableName = 'actors';


const ActorsScreen = props => {

    const navigation = useNavigation();

    const [actors, setActors] = useState([]);

    useEffect(() => {//use effect only wen screen is in focus
      const list = navigation.addListener('focus', () => {
        
        // declare an empty arry that will store the results of the 
        //SELECT
        let results = [];
        // declare a transaction that will execute the SELECT
        shopperDB.transaction(txn => {
          
          //execute SELECT
          txn.executeSql(
            `SELECT * FROM  ${actorsTableName}`,
            [],
            // cal back function that will handle the results form the SELECT
            (_, res) => {
              
              // get number of rows of data selected 
              let len = res.rows.length;
              console.log('Length of Lists ' + len);
              // check if more than one ro was returned
              if (len > 0) {
                // loop through the rows 
                for (let i = 0; i < len; i++) {
                  // push a row of data at a time
                  let item  = res.rows.item(i);
                  results.push({
                    id: item.id,
                    name: item.firstName,
                    store: item.lastName,
                  });
                  }
                  //assign the results array to the lists table
                  setActors(results);
                
              } else {
                //if no rows are returned set the lists state variable to an empty array
                setActors([]);
              }
            },
            error => {
              console.log('Error getting listst  ' + error.message);
            },
          )
        });
      });
      return list;
    });
    

  return (
    <View style={styles.container}>
     <View>
     <FlatList
          data={actors}
          renderItem={({item}) => <List post={item} />} 
          keyExtractor={item=> item.id}
          />
          </View>
          <View style={styles.bottom}>
      <TouchableOpacity
       style={styles.button}
       onPress={()=>navigation.navigate('Add Actors')}
       >
        <Text style={styles.buttonText}>Add List</Text>

      </TouchableOpacity>
      </View>

     
    </View>
  );
};

export default ActorsScreen;