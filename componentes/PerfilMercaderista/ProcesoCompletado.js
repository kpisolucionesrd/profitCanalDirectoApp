import React, {Component} from 'react';
import {Image, StyleSheet, Text, View,ScrollView,TextInput,KeyboardAvoidingView,Alert,AsyncStorage} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class ProcesoCompletado extends Component{
  constructor(props){
    super(props);
    this.state={
      disableButton:false,
    }
  };

  //Eventos
  irMenu=async()=>{
    const { navigation } = this.props;
    const datosUsuario=navigation.getParam('datosUsuario','some default value');
    const datosRadar=navigation.getParam('dataRadarExhibiciones','some default value');
    const datosMedidas=navigation.getParam('dataMedidasEspacios','some default value');
    const fotosFaltantes=navigation.getParam('fotosFaltantes','some default value');
    const fotosPlanograma=navigation.getParam('fotosPlanograma','some default value');
    const fotosFlejeOfertas=navigation.getParam('fotosFlejeOfertas','some default value');

    this.setState({
      disableButton:true
    })

    //Cargar los datos
    data={
      identificador:datosUsuario.identificador,
      fecha_ejecucion:"dd-mm-yyyy",
      datosRadar:JSON.stringify(datosRadar),
      datosMedidas:JSON.stringify(datosMedidas),

    }
    await fetch("http://167.99.167.145/api/canalDirecto/CamposCompletados",{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(data)
    });

    //Cargar las fotos
    await fotosFaltantes.forEach(this.cargarIMGFaltantes) //Cargar las fotos Faltantes
    await fotosPlanograma.forEach(this.cargarIMGPlanograma) //Cargar las fotos Planograma
    await fotosFlejeOfertas.forEach(this.cargarIMGFlejes) //Cargar las fotos Flejes Ofertas

    await this.props.navigation.navigate(datosUsuario.perfil)
  };

  cargarIMGFaltantes=async(imagenURI,index)=>{
    /* Esta funcion se utiliza para enviar las imagenes al servidor*/
    const {navigation}=this.props;
    const dataRadarExhibiciones=navigation.getParam('dataRadarExhibiciones','some default value');
    try {
      const h = {}; //headers
      h.Accept = 'application/json';
      let formData=new FormData();
      await formData.append("foto_colmados",{uri:imagenURI,name:"Faltantes-"+dataRadarExhibiciones.puntoVentaName+".jpg",type:'image/jpg'})
      await fetch("http://167.99.167.145/api/profit_insertar_imagenes",{
        method:'POST',
        headers:h,
        body:formData
      });
    }
    catch (e) {
      alert(e)
    }
  };

  cargarIMGPlanograma=async(imagenURI,index)=>{
    /* Esta funcion se utiliza para enviar las imagenes al servidor*/
    const {navigation}=this.props;
    const dataRadarExhibiciones=navigation.getParam('dataRadarExhibiciones','some default value');
    try {
      const h = {}; //headers
      h.Accept = 'application/json';
      let formData=new FormData();
      await formData.append("foto_colmados",{uri:imagenURI,name:"Planograma-"+dataRadarExhibiciones.puntoVentaName+".jpg",type:'image/jpg'})
      await fetch("http://167.99.167.145/api/profit_insertar_imagenes",{
        method:'POST',
        headers:h,
        body:formData
      });
    }
    catch (e) {
      alert(e)
    }
  };

  cargarIMGFlejes=async(imagenURI,index)=>{
    /* Esta funcion se utiliza para enviar las imagenes al servidor*/
    const {navigation}=this.props;
    const dataRadarExhibiciones=navigation.getParam('dataRadarExhibiciones','some default value');
    try {
      const h = {}; //headers
      h.Accept = 'application/json';
      let formData=new FormData();
      await formData.append("foto_colmados",{uri:imagenURI,name:"Flejes-"+dataRadarExhibiciones.puntoVentaName+".jpg",type:'image/jpg'})
      await fetch("http://167.99.167.145/api/profit_insertar_imagenes",{
        method:'POST',
        headers:h,
        body:formData
      });
    }
    catch (e) {
      alert(e)
    }
  };

  //Cadenas de Eventos
  render(){
    const { navigation } = this.props;
    const datosUsuario=navigation.getParam('datosUsuario','some default value');
    return(
      <ScrollView style={iniciar_seccion_styles.main}>
        <Text style={{color:'white',fontSize:30,fontWeight:'bold',textAlign:'center',marginBottom:110}}>Felicidades!! Sr. {datosUsuario.nombre}</Text>
        <Button disabled={this.state.disableButton} icon={{name:'cloud-done'}} title='Completar Proceso'onPress={this.irMenu} buttonStyle={{width:'80%',marginLeft:'10%',backgroundColor:'white',borderColor:'red'}} titleStyle={{color:'red',fontWeight:'bold'}}/>
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
