import React, {Component} from 'react';
import {Image, StyleSheet, Text, View,ScrollView,TextInput,KeyboardAvoidingView,Alert,AsyncStorage,Picker} from 'react-native';
import Logo from '../../imagenes/logo_profit.png';
import TextBoxInputCustom from '../ElementosCompactos/TextBoxCustom.js';
import {Icon,Button} from 'react-native-elements';

export default class RadarExhibiciones extends Component{
  constructor(props){
    super(props);
    this.state={
      fecha_hoy:new Date(), //Fecha del dia de hoy
      camposCallValue:["prueba","PRUEBA","***SIN SELECCIONAR***"],
      camposHomeCare:["Campo1","Campo2"],
      camposPersonalCare:["Campo1","Campo2"],
      camposOralCare:["Campo1","Campo2"],
      campoComentario:["Comentario"],
      puntoVenta:"***SIN SELECCIONAR***",
      objetoDatosRadar:{
        puntoVentaName:null,
        mercaderistaName:null,
        fecha:new Date(), //Fecha del dia de hoy
        resultHomeCare:{},
        resultPersonalCare:{},
        resultOralCare:{},
        resultComentario:{},
      }, //Este es el objeto donde se guardara los datos capturados por el mercaderista
      disableButton:false
    }
    this.descargarCampos().then((result)=>{
      this.setState({
        camposCallValue:result.camposNoCompletados,
        camposHomeCare:result.datosForRender.camposHomeCare,
        camposPersonalCare:result.datosForRender.camposPersonalCare,
        camposOralCare:result.datosForRender.camposOralCare,
        campoComentario:result.datosForRender.campoComentario
      })
    })
  };

  static navigationOptions = {
  title: 'Radar Exhibiciones',
  };

  //Eventos
  gettingComboBox=async(valorSeleccionado)=>{
    this.setState({
      puntoVenta:valorSeleccionado,
    });
  };

  crearJson=async(idCampo,nuevo_resultado)=>{
    //Proceso para crear el JSON con los datos de la encuesta
    const { navigation } = this.props;
    const datosUsuario=navigation.getParam('datosUsuario','some default value');

    let objetoDatosRadar=this.state.objetoDatosRadar; //Obtener el Json del constructor

    objetoDatosRadar.puntoVentaName= this.state.puntoVenta; // Guardando punto de venta
    objetoDatosRadar.mercaderistaName=datosUsuario.identificador; //Guardando Indentificador mercaderista

    if(idCampo.includes("HC-")){
      objetoDatosRadar.resultHomeCare[idCampo]=idCampo+"|"+nuevo_resultado
    }else if (idCampo.includes("PC-")){
      objetoDatosRadar.resultPersonalCare[idCampo]=idCampo+"|"+nuevo_resultado
    }else if(idCampo.includes("OC-")){
      objetoDatosRadar.resultOralCare[idCampo]=idCampo+"|"+nuevo_resultado
    }else{
      objetoDatosRadar.resultComentario[idCampo]=idCampo+"|"+nuevo_resultado
    }
    this.setState({
      objetoDatosRadar:objetoDatosRadar,
    })
  };

  descargarCampos=async()=>{
    /* Esta funcion se encarga de descargar los campos desde el servidor */
    try {
      const { navigation } = this.props;
      const datosUsuario=navigation.getParam('datosUsuario','some default value');

      /*Descargar los Campos iniciales*/
      response=await fetch("http://167.99.167.145/api/canalDirecto/campos/"+datosUsuario.identificador);
      responseJSON=await response.json();
      camposIniciales=responseJSON[0].mercaderistaCallValue;

      /*Descargar los campos completados*/
      responseCompletados=await fetch("http://167.99.167.145/api/canalDirecto/CamposCompletados/"+datosUsuario.identificador+"/RadarExhibiciones");
      responseJSONCompletados=await responseCompletados.json();
      try {
        camposCompletados=responseJSONCompletados[0].mercaderistaCallValue;
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
      return {
        camposNoCompletados:camposNoCompletadosFiltered,
        datosForRender:responseJSON[0]
      }
    } catch (e) {
      alert(e)
    }
  };

  completarRadar=async()=>{
    const { navigation } = this.props;
    const datosUsuario=navigation.getParam('datosUsuario','some default value');

    if(this.state.puntoVenta!="***SIN SELECCIONAR***" &
      Object.keys(this.state.objetoDatosRadar.resultHomeCare).length==this.state.camposHomeCare.length &
      Object.keys(this.state.objetoDatosRadar.resultPersonalCare).length==this.state.camposPersonalCare.length &
      Object.keys(this.state.objetoDatosRadar.resultOralCare).length==this.state.camposOralCare.length
    ){
      //Deshabilitar button
      this.setState({
        disableButton:true
      });

      //Cargar los datos
      data={
        identificador:datosUsuario.identificador,
        fecha_ejecucion:this.state.fecha_hoy.getDay()+"-"+this.state.fecha_hoy.getMonth()+"-"+this.state.fecha_hoy.getFullYear(),
        datosRadar:JSON.stringify(this.state.objetoDatosRadar),
      }

      await fetch("http://167.99.167.145/api/canalDirecto/DatosCompletados",{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
      });

      //cargar el colmado completado
      dataCamposCompletados={
        identificador:datosUsuario.identificador,
        fecha_ejecucion:this.state.fecha_hoy.getDay()+"-"+this.state.fecha_hoy.getMonth()+"-"+this.state.fecha_hoy.getFullYear(),
        mercaderistaCallValue:[this.state.puntoVenta],
        encuesta:"RadarExhibiciones"
      }
      await fetch("http://167.99.167.145/api/canalDirecto/CamposCompletados",{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(dataCamposCompletados)
      });

      //Volver al menu
      await this.props.navigation.navigate(datosUsuario.perfil,{
        datosUsuario:datosUsuario,
      })
    }else{
      alert("Faltan Campos por completar")
      //alert(Object.keys(this.state.objetoDatosRadar.resultHomeCare).length==this.state.camposHomeCare.length)
      //alert(Object.keys(this.state.objetoDatosRadar.resultPersonalCare).length==this.state.camposPersonalCare.length)
      //alert(Object.keys(this.state.objetoDatosRadar.resultPersonalCare).length+"-"+this.state.camposPersonalCare.length)
      //alert(Object.keys(this.state.objetoDatosRadar.resultOralCare).length==this.state.camposOralCare.length)
    }

  };

  //Cadenas de Eventos
  render(){
    const { navigation } = this.props;
    const datosUsuario=navigation.getParam('datosUsuario','some default value');
    return(
      <ScrollView style={iniciar_seccion_styles.main}>
        <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Favor Seleccionar Punto de Venta</Text>
        <Picker onValueChange={this.gettingComboBox} selectedValue={this.state.puntoVenta} style={{backgroundColor:'white',width:'100%',marginBottom:30}}>
          {this.state.camposCallValue.map((campo)=><Picker.Item label={campo} value={campo} />)}
        </Picker>

        {/*Campos para el HOMECARE section*/}
        <Text style={iniciar_seccion_styles.secciones}>SECCION HOME CARE</Text>
        {this.state.camposHomeCare.map((campo)=><TextBoxInputCustom identificacion={campo} funcion={this.crearJson} value={campo}/>)}

        {/*Campos para el PERSONALCARE section*/}
        <Text style={iniciar_seccion_styles.secciones}>SECCION PERSONAL CARE</Text>
        {this.state.camposPersonalCare.map((campo)=><TextBoxInputCustom identificacion={campo} funcion={this.crearJson} value={campo}/>)}

        {/*Campos para el ORALCARE section*/}
        <Text style={iniciar_seccion_styles.secciones}>SECCION ORAL CARE</Text>
        {this.state.camposOralCare.map((campo)=><TextBoxInputCustom identificacion={campo} funcion={this.crearJson} value={campo}/>)}

        {/*Campos para el COMENTARIO section*/}
        <Text style={iniciar_seccion_styles.secciones}>SECCION COMENTARIO</Text>
        {this.state.campoComentario.map((campo)=><TextBoxInputCustom identificacion={campo} funcion={this.crearJson} value={campo}/>)}

        <Icon disabled={this.state.disableButton} name='done' type='materiallcons' color='white' iconStyle={{marginLeft:300}} size={40} onPress={this.completarRadar}/>
        {this.state.disableButton ? null:<Text style={{marginLeft:300,color:'white',fontSize:15,marginBottom:15}} onPress={this.completarRadar}>Listo</Text>}

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
  secciones:{
    color:'white',
    fontSize:20,
    fontWeight:'bold',
    backgroundColor:'darkblue',
    width:'100%',
    textAlign:'center'
  }
})
