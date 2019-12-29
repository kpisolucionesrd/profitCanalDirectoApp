import React, {Component} from 'react';
import {Image, StyleSheet, Text, View,ScrollView,TextInput,KeyboardAvoidingView,Button,Alert,AsyncStorage} from 'react-native';
import {Icon} from 'react-native-elements';
import Logo from '../imagenes/logo_profit.png';

//const URL="http://167.71.9.11:5002/api/canaldirecto/";
const URL="http://165.22.205.126:5002/api/";
//const URL="http://10.0.2.2/api/canaldirecto/";

export default class Home extends Component{
  constructor(props){
    super(props);
    this.state={
    }
    //Variables (Propiedades globales)
    this.campos;
  }

  //Eventos de las entradas {textbox}
  gettingUser(typeduser){
    this.setState({
      usuarioDigitado:typeduser
    })
  };

  gettingPassword(typedPassword){
    this.setState({
      passwordDigitado:typedPassword
    })
  };

  //Eventos
  CredencialesProcess=async()=>{
    //Esta funcion realizara un request al servidor en busqueda de las credenciales de usuario
    if(this.state.passwordDigitado=="reiniciar"){
      let respuestaUsuarios=await fetch(URL+"profit_usuarios/"+this.state.usuarioDigitado);
      respuestaUsuarios=await respuestaUsuarios.json();
        await AsyncStorage.clear() //Limpiar el Async Storage

        //Grabar registro de reinicio en la base de datos
        try {
        registroReinicioRequest=await fetch(URL+"registroreinicios",{
          method:'POST',
          headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({
            "password":respuestaUsuarios[0].password
          })
        });
        } catch (error) {
          alert("Error al Reiniciar el Smartphone");
        }
        alert("El Dispositivo fue reiniciado completamente");



    }else{
      response=await fetch(URL+"profit_usuarios/"+this.state.usuarioDigitado)
      responseJSON=await response.json()
        if(responseJSON[0].password==this.state.passwordDigitado){
          await AsyncStorage.setItem("sesionstatus","online") //Guardando status de la sesion
          await AsyncStorage.setItem("datosUsuario",JSON.stringify(responseJSON[0])) //guardamos un JSON con los datos del usuario
          this.props.navigation.navigate(responseJSON[0].perfil,{
            datosUsuario:responseJSON[0]
          });
          return responseJSON;
        }else{
          alert("Contraseña Incorrecta!");
        }
    }
  };

  //Cadenas de Eventos
  cadenaEventosLOGGING=async()=>{
    await this.CredencialesProcess();
  }

  render(){
    return(
      <ScrollView style={iniciar_seccion_styles.main}>
        <Image source={Logo} style={iniciar_seccion_styles.logo_profit} />
        <Text style={iniciar_seccion_styles.version}>Profit Canal Directo</Text>
        <KeyboardAvoidingView behavior="padding" enabled>
          <Text style={iniciar_seccion_styles.labels}>Usuario</Text>
          <TextInput placeholder="Digite su Usuario" style={iniciar_seccion_styles.text_box} onChangeText={this.gettingUser.bind(this)}/>
          <Text style={iniciar_seccion_styles.labels}>Contraseña</Text>
          <TextInput placeholder="Digite su contraseña" secureTextEntry={true} style={iniciar_seccion_styles.text_box_password} onChangeText={this.gettingPassword.bind(this)}/>
        </KeyboardAvoidingView>
        <Icon name='login' type='entypo' color='white' size={40} onPress={this.cadenaEventosLOGGING}/>
        <Text style={{color:'white',fontWeight:'bold',fontSize:30,textAlign:'center'}} onPress={this.cadenaEventosLOGGING}>Entrar</Text>
      </ScrollView>
    )
  }
}

const iniciar_seccion_styles=StyleSheet.create({
  main:{
    backgroundColor:'red',
    height:'100%',
    padding:6,
  },
  logo_profit:{
    width:'100%',
    height:200,
    marginBottom:10,
    resizeMode: 'contain',
  },
  version:{
    color:'white',
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center'
  },
  releasedate:{
    color:'white',
    fontSize:16,
    textAlign:'center',
    marginBottom:20,
  },
  labels:{
    fontSize:15,
    color:'white',
    fontWeight:'bold',
  },
  text_box:{
    borderColor:'black',
    borderWidth:0.3,
    backgroundColor:'white',
    width:'100%',
    marginBottom:0,
  },
  text_box_password:{
    borderColor:'black',
    borderWidth:0.3,
    backgroundColor:'white',
    width:'100%',
    marginBottom:40,
  },
  btn_inicio_seccion:{
    marginTop:200,
  }
})
