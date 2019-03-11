import React, {Component} from 'react';
import {Image, StyleSheet, Text, View,ScrollView,TextInput,KeyboardAvoidingView,Alert,AsyncStorage} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class MenuMercaderista extends Component{
  constructor(props){
    super(props);
    this.state={
    }
  };

  //Eventos
  iniciarRadarExhibiciones(){
    const { navigation } = this.props;
    const datosUsuario=navigation.getParam('datosUsuario','some default value');
    this.props.navigation.navigate('RadarExhibiciones',{
      datosUsuario:datosUsuario
    })
  };

  iniciarMedidasEspacios(){
    const { navigation } = this.props;
    const datosUsuario=navigation.getParam('datosUsuario','some default value');
    this.props.navigation.navigate('MedidasEspacios',{
      datosUsuario:datosUsuario
    })
  };

  iniciarFaltantes(){
    const { navigation } = this.props;
    const datosUsuario=navigation.getParam('datosUsuario','some default value');
    this.props.navigation.navigate('FaltantesMercaderista',{
      datosUsuario:datosUsuario
    })
  };

  iniciarPlanograma(){
    const { navigation } = this.props;
    const datosUsuario=navigation.getParam('datosUsuario','some default value');
    this.props.navigation.navigate('PlanogramaMercaderista',{
      datosUsuario:datosUsuario
    })
  };

  iniciarFlejeOfertas(){
    const { navigation } = this.props;
    const datosUsuario=navigation.getParam('datosUsuario','some default value');
    this.props.navigation.navigate('FlejeOfertasMercaderista',{
      datosUsuario:datosUsuario
    })
  };

  //Cadenas de Eventos
  render(){
    const { navigation } = this.props;
    const datosUsuario=navigation.getParam('datosUsuario','some default value');
    return(
      <ScrollView style={iniciar_seccion_styles.main}>
        <Text style={{color:'white',fontSize:30,fontWeight:'bold',textAlign:'center',marginBottom:110}}>Hola! Sr. {datosUsuario.nombre}</Text>
        <Button icon={{name:'list',type:'entypo'}} title='Radar Exhibiciones'onPress={this.iniciarRadarExhibiciones.bind(this)} buttonStyle={{width:'80%',marginLeft:'10%',backgroundColor:'white',borderColor:'red',marginBottom:15}} titleStyle={{color:'red',fontWeight:'bold'}}/>
        <Button icon={{name:'list',type:'entypo'}} title='Medidas de Espacios'onPress={this.iniciarMedidasEspacios.bind(this)} buttonStyle={{width:'80%',marginLeft:'10%',backgroundColor:'white',borderColor:'red',marginBottom:15}} titleStyle={{color:'red',fontWeight:'bold'}}/>
        <Button icon={{name:'list',type:'entypo'}} title='Faltantes'onPress={this.iniciarFaltantes.bind(this)} buttonStyle={{width:'80%',marginLeft:'10%',backgroundColor:'white',borderColor:'red',marginBottom:15}} titleStyle={{color:'red',fontWeight:'bold'}}/>
        <Button icon={{name:'list',type:'entypo'}} title='Planograma'onPress={this.iniciarPlanograma.bind(this)} buttonStyle={{width:'80%',marginLeft:'10%',backgroundColor:'white',borderColor:'red',marginBottom:15}} titleStyle={{color:'red',fontWeight:'bold'}}/>
        <Button icon={{name:'list',type:'entypo'}} title='Fleje de Ofertas'onPress={this.iniciarFlejeOfertas.bind(this)} buttonStyle={{width:'80%',marginLeft:'10%',backgroundColor:'white',borderColor:'red',marginBottom:15}} titleStyle={{color:'red',fontWeight:'bold'}}/>

        <Text style={{color:'white',fontSize:8,fontWeight:'bold',textAlign:'center',marginTop:50}}>Release Date: 2019-Feb-01</Text>

      </ScrollView>
    )
  }
}

const iniciar_seccion_styles=StyleSheet.create({
  main:{
    backgroundColor:'red',
    height:'100%',
    padding:6
  },
  logo_profit:{
    width:'100%',
    height:200,
    marginBottom:10,
    resizeMode: 'contain',
    borderWidth:3,
  },
  menuItem:{
    fontSize:24,
    color:'black',
    fontWeight:'bold',
    backgroundColor:'white',
    textAlign:'center',
    borderWidth:3,
    marginTop:5,
  },
})
