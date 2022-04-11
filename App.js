import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Header } from 'react-native-elements';

export default class App extends React.Component { 
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: false,
      isLoading: false,
      word  : "Loading...",
      lexicalCategory :'',
      definition : ""  
    };
  } 

getWord=(word)=>{
    var searchKeyword=word.toLowerCase()
    var url = "https://rupinwhitehatjr.github.io/dictionary/"
    +searchKeyword+".json"
    return fetch(url)
    .then((data)=>{
      if(data.status===200)
      {
        return data.json()
      }
      else
      {
        return null
      }
    })
    .then((response)=>{
        

        var responseObject = response
        if(responseObject){

          var wordData = responseObject.definitions[0]
          var definition=wordData.description
          var lexicalCategory=wordData.wordtype
          
          this.setState({
            "word" : this.state.text, 
            "definition" :definition,
            "lexicalCategory": lexicalCategory     
            
          })
        }
        else
        {
          this.setState({
            "word" : this.state.text, 
            "definition" :"Not Found",
            
          })

        }
    
    })
  }

render() {
  return (
    <View style={styles.container}>
      <Header
          backgroundColor={'#9c8210'}
          centerComponent={{
            text: 'Dictionary',
            style: { color: '#fff', fontSize: 20 },
          }}
        />
      <Image
      style = {styles.logoimage}
      source={require('./assets/logo.png')}
      />
      <TextInput
      style = {styles.inputBox}
      placeholder = "Enter Word Here"
      onChangeText={text => {
            this.setState({ text: text });
          }}
          value={this.state.text}
      />
      <TouchableOpacity
      style = {styles.goButton}
      onPress={() => {
      this.setState({ isSearchPressed: true });
              this.getWord(this.state.text)
      }}>
      <Text style = {styles.buttonText}>GO</Text>
      </TouchableOpacity>


   

  <View style={styles.outputContainer}>
          <Text style={{fontSize:20}}>
            {
              this.state.isSearchPressed && this.state.word === "Loading..."
              ? this.state.word
              : ""
            }
          </Text>
            {
              this.state.word !== "Loading..." ?
              (
                <View style={{justifyContent:'center', marginLeft:10 }}>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                      Word :{" "}
                    </Text>
                    <Text style={{fontSize:18 }}>
                      {this.state.word}
                    </Text>
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                      Type :{" "}
                    </Text>
                    <Text style={{fontSize:18}}>
                      {this.state.lexicalCategory}
                    </Text>
                  </View>
                  <View style={{flexDirection:'row',flexWrap: 'wrap'}}>
                    <Text style={styles.detailsTitle}>
                      Definition :{" "}
                      </Text>
                    <Text style={{ fontSize:18}}>
                      {this.state.definition}
                    </Text>
                  </View>
                </View>
              )
              :null
            }
        </View>
      </View>
)



}









  
}

const styles = StyleSheet.create({

logoimage: {
  width: 200,
  height: 200,
  alignSelf: "center"
},

inputBox: {
  marginTop: 50,
  width: "80%",
  alignSelf: "center",
  height: 40,
  alignText: "center",
  borderWidth: 4,
  outline: "none"
},

goButton: {
  width: "40%",
  height: 55,
  alignSelf: "center",
  padding: 10,
  margin: 10,
  marginTop: 20,
  backgroundColor: "green"
},

buttonText: {
  textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
}


    

})

