import React, {Component} from 'react';
import {Image, StyleSheet, Text, View,ScrollView,TextInput,KeyboardAvoidingView,Alert,AsyncStorage,Picker} from 'react-native';
import Logo from '../../imagenes/logo_profit.png';
import TextBoxInputCustom from '../ElementosCompactos/TextBoxCustom.js';
import {Icon,Button} from 'react-native-elements';

var campos;
export default class MedidasEspacios extends Component{
  constructor(props){
    super(props);
    this.state={
      fecha_hoy:new Date(), //Fecha del dia de hoy
      objetoDatosMedidas:{
        cremasDetales80:{},
        hiloDental50:{},
        suavizantes65:{},
        lavaplatosLiquidos45:{},
        cepillosDentales:{},
        jabonesTocador50:{},
        limpiadoresLiquidos40:{},
        lavaplatosSolidos:{},
        enjuagueBucal40:{},
        desodorante30:{},
        lavaplatosCrema50:{},
        desinfectantes:{}
      }, //Este es el objeto donde se guardara los datos capturados por el mercaderista
      puntoVenta:"***SIN SELECCIONAR***",
      camposCallValue:["prueba","PRUEBA","***SIN SELECCIONAR***"],
      disableButton:false,
      cremasDetales80:["No Cargado","No Cargado","No Cargado"],
      hiloDental50:["No Cargado","No Cargado","No Cargado"],
      suavizantes65:["No Cargado","No Cargado","No Cargado"],
      lavaplatosLiquidos45:["No Cargado","No Cargado","No Cargado"],
      cepillosDentales:["No Cargado","No Cargado","No Cargado"],
      jabonesTocador50:["No Cargado","No Cargado","No Cargado"],
      limpiadoresLiquidos40:["No Cargado","No Cargado","No Cargado"],
      lavaplatosSolidos:["No Cargado","No Cargado","No Cargado"],
      enjuagueBucal40:["No Cargado","No Cargado","No Cargado"],
      desodorante30:["No Cargado","No Cargado","No Cargado"],
      lavaplatosCrema50:["No Cargado","No Cargado","No Cargado"],
      desinfectantes:["No Cargado","No Cargado","No Cargado"],
    }
    this.descargarCampos2().then((result)=>{
      this.setState({
        camposCallValue:result.camposNoCompletados,
        cremasDetales80:result.datosForRender.cremasDetales80,
        hiloDental50:result.datosForRender.hiloDental50,
        suavizantes65:result.datosForRender.suavizantes65,
        lavaplatosLiquidos45:result.datosForRender.lavaplatosLiquidos45,
        cepillosDentales:result.datosForRender.cepillosDentales,
        jabonesTocador50:result.datosForRender.jabonesTocador50,
        enjuagueBucal40:result.datosForRender.enjuagueBucal40,
        desodorante30:result.datosForRender.desodorante30,
        lavaplatosCrema50:result.datosForRender.lavaplatosCrema50,
        desinfectantes:result.datosForRender.desinfectantes,
      })
    })
  };

  static navigationOptions = {
  title: 'Medidas de Espacio',
  };

  //Eventos
  crearJson=async(idCampo,nuevo_resultado)=>{
    //Proceso para crear el JSON con los datos de la encuesta
    const { navigation } = this.props;
    const datosUsuario=navigation.getParam('datosUsuario','some default value');

    let objetoDatos=this.state.objetoDatosMedidas; //Obtener el Json del constructor

    if(idCampo.includes("CD80-")){
      objetoDatos.cremasDetales80[idCampo]=idCampo+"|"+nuevo_resultado /* Se Queda */
    }else if (idCampo.includes("HD50-")){
      objetoDatos.hiloDental50[idCampo]=idCampo+"|"+nuevo_resultado
    }else if (idCampo.includes("S65-")){
      objetoDatos.suavizantes65[idCampo]=idCampo+"|"+nuevo_resultado
    }else if (idCampo.includes("LL45-")){
      objetoDatos.lavaplatosLiquidos45[idCampo]=idCampo+"|"+nuevo_resultado
    }else if (idCampo.includes("CP65-")){
      objetoDatos.cepillosDentales[idCampo]=idCampo+"|"+nuevo_resultado /* Se Queda */
    }else if (idCampo.includes("JT50-")){
      objetoDatos.jabonesTocador50[idCampo]=idCampo+"|"+nuevo_resultado
    }else if (idCampo.includes("EB40-")){
      objetoDatos.enjuagueBucal40[idCampo]=idCampo+"|"+nuevo_resultado /* Se Queda */
    }else if (idCampo.includes("D30-")){
      objetoDatos.desodorante30[idCampo]=idCampo+"|"+nuevo_resultado
    }else if (idCampo.includes("LC50-")){
      objetoDatos.lavaplatosCrema50[idCampo]=idCampo+"|"+nuevo_resultado
    }else if (idCampo.includes("DESpul-")){
      objetoDatos.desinfectantes[idCampo]=idCampo+"|"+nuevo_resultado
    }else{
      alert("Campos no identificados")
    }
    this.setState({
      objetoDatos:objetoDatos,
    })
  };

  descargarCampos2=async()=>{
    /* Esta funcion se encarga de descargar los campos desde el servidor */
    try {
      const { navigation } = this.props;
      const datosUsuario=navigation.getParam('datosUsuario','some default value');

      /*Descargar los Campos iniciales*/
      response=await fetch("http://167.99.167.145/api/canalDirecto/campos/"+datosUsuario.identificador);
      responseJSON=await response.json();
      camposIniciales=responseJSON[0].mercaderistaCallValue;

      /*Descargar los campos completados*/
      responseCompletados=await fetch("http://167.99.167.145/api/canalDirecto/CamposCompletados/"+datosUsuario.identificador+"/MedidasEspacios");
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

  descargarCampos=async()=>{
    /* Esta funcion se encarga de descargar los campos desde el servidor */
    try {
      const { navigation } = this.props;
      const datosUsuario=navigation.getParam('datosUsuario','some default value');

      /*Descargar todos los campos de cada seccion*/
      response=await fetch("http://167.99.167.145/api/canalDirecto/campos/2");
      responseJSON=await response.json();
      camposTotales=responseJSON[0];

      return camposTotales
    } catch (e) {
      alert(e)
    }
  };

  completarMedidas=async()=>{
    const { navigation } = this.props;
    const datosUsuario=navigation.getParam('datosUsuario','some default value');
    const datosRadar=navigation.getParam('dataRadarExhibiciones','some default value');

    if(
      Object.keys(this.state.objetoDatosMedidas.cremasDetales80).length==this.state.cremasDetales80.length &
      Object.keys(this.state.objetoDatosMedidas.hiloDental50).length==this.state.hiloDental50.length &
      Object.keys(this.state.objetoDatosMedidas.suavizantes65).length==this.state.suavizantes65.length &
      Object.keys(this.state.objetoDatosMedidas.lavaplatosLiquidos45).length==this.state.lavaplatosLiquidos45.length &
      Object.keys(this.state.objetoDatosMedidas.cepillosDentales).length==this.state.cepillosDentales.length &
      Object.keys(this.state.objetoDatosMedidas.jabonesTocador50).length==this.state.jabonesTocador50.length &
      Object.keys(this.state.objetoDatosMedidas.enjuagueBucal40).length==this.state.enjuagueBucal40.length &
      Object.keys(this.state.objetoDatosMedidas.desodorante30).length==this.state.desodorante30.length &
      Object.keys(this.state.objetoDatosMedidas.lavaplatosCrema50).length==this.state.lavaplatosCrema50.length &
      Object.keys(this.state.objetoDatosMedidas.desinfectantes).length==this.state.desinfectantes.length &
      this.state.puntoVenta!="***SIN SELECCIONAR***"
    ){
      //Desabilitar button
      this.setState({
        disableButton:true
      })

      //Cargar los datos
      data={
        identificador:datosUsuario.identificador,
        fecha_ejecucion:this.state.fecha_hoy.getDay()+"-"+this.state.fecha_hoy.getMonth()+"-"+this.state.fecha_hoy.getFullYear(),
        datosMedidas:JSON.stringify(this.state.objetoDatosMedidas),
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
        encuesta:"MedidasEspacios"
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
    }
  };

  gettingComboBox=async(valorSeleccionado)=>{
    this.setState({
      puntoVenta:valorSeleccionado,
    });
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

        <Text style={iniciar_seccion_styles.secciones}>CREMAS DENTALES</Text>
        {this.state.cremasDetales80.map((campo)=><TextBoxInputCustom identificacion={campo} funcion={this.crearJson} value={campo}/>)}

        <Text style={iniciar_seccion_styles.secciones}>HILO DENTAL</Text>
        {this.state.hiloDental50.map((campo)=><TextBoxInputCustom identificacion={campo} funcion={this.crearJson} value={campo}/>)}

        <Text style={iniciar_seccion_styles.secciones}>SUAVIZANTES</Text>
        {this.state.suavizantes65.map((campo)=><TextBoxInputCustom identificacion={campo} funcion={this.crearJson} value={campo}/>)}

        <Text style={iniciar_seccion_styles.secciones}>LAVAPLATOS LIQUIDOS</Text>
        {this.state.lavaplatosLiquidos45.map((campo)=><TextBoxInputCustom identificacion={campo} funcion={this.crearJson} value={campo}/>)}

        <Text style={iniciar_seccion_styles.secciones}>CEPILLOS DENTALES</Text>
        {this.state.cepillosDentales.map((campo)=><TextBoxInputCustom identificacion={campo} funcion={this.crearJson} value={campo}/>)}

        <Text style={iniciar_seccion_styles.secciones}>JABONES DE TOCADOR</Text>
        {this.state.jabonesTocador50.map((campo)=><TextBoxInputCustom identificacion={campo} funcion={this.crearJson} value={campo}/>)}

        <Text style={iniciar_seccion_styles.secciones}>ENJUAGUE BUCAL</Text>
        {this.state.enjuagueBucal40.map((campo)=><TextBoxInputCustom identificacion={campo} funcion={this.crearJson} value={campo}/>)}

        <Text style={iniciar_seccion_styles.secciones}>DESODORANTE</Text>
        {this.state.desodorante30.map((campo)=><TextBoxInputCustom identificacion={campo} funcion={this.crearJson} value={campo}/>)}

        <Text style={iniciar_seccion_styles.secciones}>LAVAPLATOS CREMA</Text>
        {this.state.lavaplatosCrema50.map((campo)=><TextBoxInputCustom identificacion={campo} funcion={this.crearJson} value={campo}/>)}

        <Text style={iniciar_seccion_styles.secciones}>DESINFECTANTES</Text>
        {this.state.desinfectantes.map((campo)=><TextBoxInputCustom identificacion={campo} funcion={this.crearJson} value={campo}/>)}

        <Icon disabled={this.state.disableButton} name='done' type='materiallcons' color='white' iconStyle={{marginLeft:300}} size={40} onPress={this.completarMedidas}/>
        {this.state.disableButton ? null:<Text style={{marginLeft:300,color:'white',fontSize:15,marginBottom:15}} onPress={this.completarMedidas}>Listo</Text>}

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
