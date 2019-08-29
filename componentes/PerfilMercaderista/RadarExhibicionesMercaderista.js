import React, {Component} from 'react';
import {Image, StyleSheet, Text, View,ScrollView,TextInput,KeyboardAvoidingView,Alert,AsyncStorage,Picker} from 'react-native';
import Logo from '../../imagenes/logo_profit.png';
import TextBoxInputCustom from '../ElementosCompactos/TextBoxCustom.js';
import {Icon,Button} from 'react-native-elements';


const URL="http://167.71.9.11:5002/api/canaldirecto/";
//const URL="http://10.0.2.2/api/canaldirecto/";

const campos={
  "camposHomeCare" : [
          "HC-CABEZAL CONTRATADO",
          "HC-EXHIBIDOR SUAVITEL",
          "HC-EXHIBIDOR FABULOSO",
          "HC-EXHIBIDOR AXION",
          "HC-ISLETA 4 CARAS",
          "HC-EXHIBICION SUAVITEL GESTIONADA POR MERCADERISTA",
          "HC-EXHIBICION FABULOSO GESTIONADA POR MERCADERISTA",
          "HC-EXHIBICION AXION GESTIONADA POR MERCADERISTA",
          "HC-EXHIBICION MIXTA GESTIONADA POR MERCADERISTA",
          "HC-EXHIBICION SUAVITEL CONTRATADA POR CP",
          "HC-EXHIBICION FABULOSO CONTRATADA POR CP",
          "HC-EXHIBICION AXION CONTRATADA POR CP",
          "HC-EXHIBICION MIXTA CONTRATADA POR CP",
          "HC-CABEZAL P&G SUAVIZANTE",
          "HC-CABEZAL P&G LAVAPLATOS",
          "HC-CABEZAL P&G MIXTO",
          "HC-EXHIBICION ADICIONAL P&G SUAVIZANTE",
          "HC-EXHIBICION ADICIONAL P&G LAVAPLATOS",
          "HC-EXHIBICION ADICIONAL  P&G MIXTO",
          "HC-PROMOTORA DOWNY",
          "HC-PROMOTORA DAWN",
          "HC-CABEZAL MISTOLIN",
          "HC-EXHIBICION ADICIONAL MISTOLIN",
          "HC-PROMOTORA MISTOLIN",
          "HC-CABEZAL ENSUEÑO",
          "HC-EXHIBICION ADICIONAL ENSUEÑO",
          "HC-PROMOTORA ENSUEÑO",
          "HC-CABEZAL BRILLANTE",
          "HC-EXHIBICION ADICIONAL BRILLANTE",
          "HC-PROMOTORA BRILLANTE"
  ],
  "camposPersonalCare" : [
          "PC-CABEZAL CONTRATADO MIXTO",
          "PC-CABEZAL CONTRATADO JABONES",
          "PC-CABEZAL CONTRATADO DESODORANTES",
          "PC-EXHIBIDOR PROTEX",
          "PC-EXHIBIDOR PALMOLIVE",
          "PC-EXHIBIDOR DESODORANTE",
          "PC-SIDEKICK",
          "PC-ISLETA 4 CARAS",
          "PC-EXHIBICION JABONES GESTIONADA POR MERCADERISTA",
          "PC-EXHIBICION DESODORANTES GESTIONADA POR MERCADERISTA",
          "PC-EXHIBICION MIXTA GESTIONADA POR MERCADERISTA",
          "PC-EXHIBICION JABONES CONTRATADA POR CP",
          "PC-EXHIBICION DESODORANTES CONTRATADA POR CP",
          "PC-EXHIBICION MIXTA CONTRATADA POR CP",
          "PC-CABEZAL P&G JABONES",
          "PC-CABEZAL P&G DESODORANTES",
          "PC-EXHIBICION ADICIONAL P&G JABONES",
          "PC-EXHIBICION ADICIONAL P&G DESODORANTES",
          "PC-PROMOTORA P&G JABONES",
          "PC-PROMOTORA P&G DESODORANTES",
          "PC-RISTRA P&G JABONES",
          "PC-CABEZAL UNILEVER JABONES",
          "PC-CABEZAL UNILEVER DESODORANTES",
          "PC-EXHIBICION ADICIONAL UNILEVER JABONES",
          "PC-EXHIBICION ADICIONAL UNILEVER DESODORANTES",
          "PC-PROMOTORA UNILEVER JABONES",
          "PC-PROMOTORA UNILEVER DESODORANTES",
          "PC-RISTRAS UNILEVER"
  ],
  "camposOralCare" : [
          "OC-CABEZAL CONTRATADO",
          "OC-SIDEKICK",
          "OC-EXHIBIDOR ENJUAGUE + CEPILLOS",
          "OC-EXHIBIDOR BASE ROJA",
          "OC-EXHIBIDOR PLAX",
          "OC-EXHIBIDOR CEPILLOS",
          "OC-EXHIBIDOR APREZIO",
          "OC-EXHIBIDOR SALUD VISIBLE",
          "OC-ISLETA 4 CARAS",
          "OC-RISTRAS CEPILLO",
          "OC-RISTRAS CREMAS",
          "OC-EXHIBICION CREMA DENTAL GESTIONADA POR MERCADERISTA",
          "OC-EXHIBICION CEPILLOS GESTIONADA POR MERCADERISTA",
          "OC-EXHIBICION ENJUAGUES GESTIONADA POR MERCADERISTA",
          "OC-EXHIBICION MIXTA GESTIONADA POR MERCADERISTA",
          "OC-EXHIBICION CREMA DENTAL CONTRATADA POR CP",
          "OC-EXHIBICION CEPILLOS CONTRATADA POR CP",
          "OC-EXHIBICION ENJUAGUES CONTRATADA POR CP",
          "OC-EXHIBICION MIXTA CONTRATADA POR CP",
          "OC-ORAL CARE BOUTIQUE",
          "OC-SHOPPABILITY",
          "OC-PDQ PLAX 60ML",
          "OC-PDQ MINIONS",
          "OC-EXHIBIDOR PLAX DE CAJA REGISTRADORA",
          "OC-EXHIBICION EN CAJA REGISTRADORA",
          "OC-PROMOTORA CP",
          "OC-CABEZAL P&G",
          "OC-EXHIBIDOR P&G",
          "OC-EXHIBICION ENJUAGUES P&G",
          "OC-EXHIBICION CREMAS P&G",
          "OC-EXHIBICION CAJA REGISTRADORA P&G",
          "OC-RITRAS CREMA DENTAL P&G",
          "OC-RITRAS CEPILLOS P&G",
          "OC-PROMOTORA P&G",
          "OC-CABEZAL JOHNSON",
          "OC-EXHIBIDOR JOHNSON",
          "OC-RISTRAS JOHNSON",
          "OC-SIDEKICKS JOHNSON",
          "OC-EXHIBICION CAJA REGISTRADORA JOHNSON",
          "OC-PROMOTORA JOHNSON"
  ],
  "campoComentario" : [
          "Comentario"
  ],
  "cremasDetales80" : [
          "CD80-Anticaries",
          "CD80-Triple Accion",
          "CD80-Liminous White",
          "CD80-Pro Alivio",
          "CD80-Resto Colgate",
          "CD80-Oral B",
          "CD80-Crest",
          "CD80-Sendodyne",
          "CD80-Aquafresh",
          "CD80-Marca Privada",
          "CD80-Otras Marcas"
  ],
  "hiloDental50" : [
          "HD50-Colgate",
          "HD50-Oral-B",
          "HD50-Jhonson y Johnson",
          "HD50-Marca Privada"
  ],
  "suavizantes65" : [
          "S65-Suavitel",
          "S65-Downy",
          "S65-Ensueño",
          "S65-Brillante",
          "S65-Marca Privada",
          "S65-Otras Marcas"
  ],
  "lavaplatosLiquidos45" : [
          "LL45-Axion",
          "LL45-P&G",
          "LL45-Loza Cream",
          "LL45-Marca Privada",
          "LL45-Otras Marcas"
  ],
  "cepillosDentales" : [
          "CP65-Colgate",
          "CP65-Oral-B",
          "CP65-GUM",
          "CP65-OTROS",
          "CP65-MARCA PRIVADA"
  ],
  "jabonesTocador50" : [
          "JT50-Protex",
          "JT50-Palmolive",
          "JT50-Lavador",
          "JT50-IrishSpring",
          "JT50-Dove",
          "JT50-Rexona",
          "JT50-P&G",
          "JT50-Marca Privada",
          "JT50-Otras Marcas"
  ],
  "limpiadoresLiquidos40" : [
          "LL40-CAMPO1"
  ],
  "lavaplatosSolidos" : [ ],
  "enjuagueBucal40" : [
          "EB40-Frescura",
          "EB40-Pro-Alivio",
          "EB40-Luminous White",
          "EB40-Listerine",
          "EB40-Scope",
          "EB40-Marca Privada",
          "EB40-Otros"
  ],
  "desodorante30" : [
          "D30-Lady Speed Stick",
          "D30-Man Speed Stick",
          "D30-P&G",
          "D30-Unilever",
          "D30-Marca Privada",
          "D30-Otras Marcas"
  ],
  "lavaplatosCrema50" : [
          "LC50-Axion",
          "LC50-Cesar Iglesias",
          "LC50-Loza Cream",
          "LC50-Marca Privada",
          "LC50-Others"
  ],
  "desinfectantes" : [
          "DESpul-Fabuloso",
          "DESpul-Mistolin",
          "DESpul-Marca Privada",
          "DESpul-Otras Marcas"
  ]
}

export default class RadarExhibiciones extends Component{
  constructor(props){
    super(props);
    this.state={
      fecha_hoy:new Date(), //Fecha del dia de hoy
      supermercados:["Super1","Super2","***SIN SELECCIONAR***"],
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
        supermercados:result
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
      response=await fetch(URL+"profit_supermercadosmercaderista/"+datosUsuario.identificador);
      responseJSON=await response.json();
      camposIniciales=responseJSON[0].supermercados;

      /*Descargar los campos completados*/
      responseCompletados=await fetch(URL+"profit_supermercadosCompletados/"+datosUsuario.identificador+"/Mercaderista/RadarExhibiciones");
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
      alert(e)
    }
  };

  completarRadar=async()=>{
    const { navigation } = this.props;
    const datosUsuario=navigation.getParam('datosUsuario','some default value');

    if(this.state.puntoVenta!="***SIN SELECCIONAR***" &
      Object.keys(this.state.objetoDatosRadar.resultHomeCare).length==campos.camposHomeCare.length &
      Object.keys(this.state.objetoDatosRadar.resultPersonalCare).length==campos.camposPersonalCare.length &
      Object.keys(this.state.objetoDatosRadar.resultOralCare).length==campos.camposOralCare.length
    ){
      //Deshabilitar button
      this.setState({
        disableButton:true
      });

      //Cargar los datos
      data={
        identificador:datosUsuario.identificador,
        tipoEncuesta:"RadarExhibiciones",
        datalevantada:JSON.stringify(this.state.objetoDatosRadar),
      }

      await fetch(URL+"profit_insertar_data",{
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
        tipousuario:"Mercaderista",
        supermercadoscompletados:[this.state.puntoVenta],
        tipoEncuesta:"RadarExhibiciones"
      }
      await fetch(URL+"profit_supermercadosCompletados",{
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

  //Cadenas de Eventos
  render(){
    const { navigation } = this.props;
    const datosUsuario=navigation.getParam('datosUsuario','some default value');
    return(
      <ScrollView style={iniciar_seccion_styles.main}>
        <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Favor Seleccionar Punto de Venta</Text>
        <Picker onValueChange={this.gettingComboBox} selectedValue={this.state.puntoVenta} style={{backgroundColor:'white',width:'100%',marginBottom:30}}>
          {this.state.supermercados.map((campo)=><Picker.Item label={campo} value={campo} />)}
        </Picker>

        {/*Campos para el HOMECARE section*/}
        <Text style={iniciar_seccion_styles.secciones}>SECCION HOME CARE</Text>
        {campos.camposHomeCare.map((campo)=><TextBoxInputCustom identificacion={campo} funcion={this.crearJson} value={campo}/>)}

        {/*Campos para el PERSONALCARE section*/}
        <Text style={iniciar_seccion_styles.secciones}>SECCION PERSONAL CARE</Text>
        {campos.camposPersonalCare.map((campo)=><TextBoxInputCustom identificacion={campo} funcion={this.crearJson} value={campo}/>)}

        {/*Campos para el ORALCARE section*/}
        <Text style={iniciar_seccion_styles.secciones}>SECCION ORAL CARE</Text>
        {campos.camposOralCare.map((campo)=><TextBoxInputCustom identificacion={campo} funcion={this.crearJson} value={campo}/>)}

        {/*Campos para el COMENTARIO section*/}
        <Text style={iniciar_seccion_styles.secciones}>SECCION COMENTARIO</Text>
        {campos.campoComentario.map((campo)=><TextBoxInputCustom identificacion={campo} funcion={this.crearJson} value={campo}/>)}

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
