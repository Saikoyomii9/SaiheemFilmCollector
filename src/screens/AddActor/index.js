import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const Actors = props => {

        const navigation = useNavigation();
        //Name of shopping, store, date
        const [firstName, setFName] = useState('');
        const [lastName, setLName] = useState('');

        const onActorAdd = ()  => { //Validation //declaring a function
                if(!firstName) {
                        alert( 'Please enter a shopping list name.');
                        return;
                }
                if(!lastName) {
                        alert('Please enter a store name.');
                        return;
                }

                try {
                        database.addList(firstName, lastName,)
                } catch (error) {
                        console.log('Error adding list  ' + error);
                }
        
                
                alert(firstName + ' Added ');//Alert List has been added
                navigation.navigate('Start Shopping!' );
        }

        return (
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                            <TextInput
                                    value={firstName}
                                    onChangeText={value => setFName(value)}
                                    style={styles.name}
                                    clearButtonMode={'while-editing'}
                                    placeholder={'Enter First Name'}
                                    placeholderTextColor={'grey'}
                            />
                            <TextInput  
                                    value={lastName}
                                    onChangeText={value => setLName(value)}
                                    style={styles.store}
                                    clearButtonMode={'while-editing'}
                                    placeholder={'Enter Last Name'}
                                    placeholderTextColor={'grey'}
                            />
            
                    </View> 
                    <View style={styles.bottomContainer}>
                             <Pressable style={styles.button} onPress={onActorAdd}> 
                                    <Text style={styles.buttonText}> Add Actors</Text>
                            </Pressable>
            
                    </View>
                </View>
              );
};
export default Actors;