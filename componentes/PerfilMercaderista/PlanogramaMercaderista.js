import React, {Component} from 'react';
import {Image, StyleSheet, Text, View,ScrollView,ActivityIndicator,Picker} from 'react-native';
import {Icon,Button} from 'react-native-elements';
import Slideshow from 'react-native-slideshow';


const URL="http://167.71.9.11:5002/api/canaldirecto/";
//const URL="http://10.0.2.2/api/canaldirecto/";


export default class PlanogramaMercaderista extends Component{
  constructor(props){
    super(props);
    this.state={
      fecha_hoy:new Date(), //Fecha del dia de hoy
      cargando:false,
      supermercados:["Super1","Super2","***SIN SELECCIONAR***"],
      valorSeleccionado:"***SIN SELECCIONAR***",
      fotos:[],
      disableButton:false,
    }
    this.descargarCampos().then((result)=>{
      this.setState({
        supermercados:result,
        cargando:true
      })
    })
  }

  static navigationOptions = {
    title: 'Planograma',
  };

  //Eventos
  gettingComboBox=async(valorSeleccionado)=>{
    this.setState({
      valorSeleccionado:valorSeleccionado,
    });
  };

  descargarCampos=async()=>{
    /* Esta funcion se encarga de descargar los campos desde el servidor */
    try {
      const { navigation } = this.props;
      const datosUsuario=navigation.getParam('datosUsuario','some default value');

      /*Descargar los Campos iniciales*/
      response=await fetch(URL+"profit_supermercadosmercaderista/"+datosUsuario.identificador);
      responseJSON=await response.json();
      camposIniciales=responseJSON[0].supermercados;

      /*Descargar los campos completados*/
      responseCompletados=await fetch(URL+"profit_supermercadosCompletados/"+datosUsuario.identificador+"/Mercaderista/Planograma");
      responseJSONCompletados=await responseCompletados.json();
      try {
        camposCompletados=responseJSONCompletados[0].supermercadoscompletados;
      } catch (e) {
        camposCompletados=["mercaderistaCallValue1"];
      }
      camposNoCompletados=camposIniciales.map((campo)=>{
        if(camposCompletados.includes(campo)){
          return null
        }else{
          return campo
        }
      });

      camposNoCompletadosFiltered=camposNoCompletados.filter((campo)=>{
        if(campo!=null | campo=="***SIN SELECCIONAR***"){
          return campo
        }
      })
      return camposNoCompletadosFiltered
    } catch (e) {
      alert("Error al Cargar los puntos de Ventas");
      return ["Super1","Super2","***SIN SELECCIONAR***"];
    }
  };

  cargarData=async()=>{
    const { navigation } = this.props;
    const datosUsuario=navigation.getParam('datosUsuario','some default value');
    this.setState({disableButton:true});
    try {
      //Cargar las imagenes al servidor
      const { navigation } = this.props;
      let fotos=navigation.getParam('fotos','NA');
      if(fotos.length<35){
        await fotos.forEach(this.cargarIMG);
      }else{
        alert("La cantidad de fotos debe ser menor a 35");
      }

      //cargar el colmado completado
      data={
        identificador:datosUsuario.identificador,
        tipousuario:"Mercaderista",
        supermercadoscompletados:[this.state.valorSeleccionado],
        tipoEncuesta:"Planograma"
      }
      await fetch(URL+"profit_supermercadosCompletados",{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
      });
    } catch (e) {
      alert(e)
    }
  };

  cargarIMG=async(imagenURI,index,vector)=>{
    /* Esta funcion se utiliza para enviar las imagenes al servidor*/
    const {navigation}=this.props;
    const puntoVenta=navigation.getParam('puntoVenta','NA');
    try {
      const h = {}; //headers
      h.Accept = 'application/json';
      let formData=new FormData();
      await formData.append("foto_colmados",{uri:imagenURI,name:"Planograma-"+puntoVenta+".jpg",type:'image/jpg'})
      await fetch(URL+"insertarimagenes",{
        method:'POST',
        headers:h,
        body:formData
      });
      if(index==vector.length-1){
        this.setState({disableButton:false});
        alert("Enviados al servidor CORRECTAMENTE")
        this.props.navigation.goBack(); //Navegar
      }
    }
    catch (e) {
      alert(e)
    }
  };

  //Cadenas de Eventos
  render(){
    const { navigation } = this.props;
    const fotos=navigation.getParam('fotos');
    const puntoVenta=navigation.getParam('puntoVenta');

    if(this.state.cargando){
      return(
        <ScrollView style={iniciar_seccion_styles.main}>
        <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Favor Seleccionar Punto de Venta</Text>
        <Picker onValueChange={this.gettingComboBox} selectedValue={this.state.valorSeleccionado} style={{backgroundColor:'white',width:'100%',marginBottom:15}}>
          {this.state.supermercados.map((campo)=><Picker.Item label={campo} value={campo} />)}
        </Picker>
          <Icon name='camera' type='entypo' color='white' iconStyle={{marginLeft:300,marginBottom:50}} size={40} onPress={
            ()=>{
              if(this.state.valorSeleccionado!="***SIN SELECCIONAR***"){
                this.props.navigation.navigate('CamaraTakerPlanograma',{
                  puntoVenta:this.state.valorSeleccionado
                });
              }else{
                alert("Debe seleccionar un punto de venta")
              }
            }
          }/>
          <Text style={{textAlign:'left',color:'white',fontSize:15}}>Imagenes Capturadas</Text>
          {typeof(fotos)!="undefined" ? <Slideshow dataSource={fotos.map((foto)=>{return{url:foto}})}/>:null}
          <Icon disabled={this.state.disableButton} name='done' type='materiallcons' color='white' iconStyle={{marginLeft:300}} size={40} onPress={this.cargarData}/>
          {this.state.disableButton ? null:<Text style={{marginLeft:300,color:'white',fontSize:15}} onPress={this.cargarData}>Listo</Text>}
        </ScrollView>
      )
    }else{
      return(
        <View>
          <Text style={{color:'black',fontSize:20,fontWeight:'bold'}}>Cargando Puntos de Ventas</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
  }
}

const iniciar_seccion_styles=StyleSheet.create({
  main:{
    backgroundColor:'red',
    height:'100%',
    padding:6
  }
})
