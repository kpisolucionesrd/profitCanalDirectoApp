import React, {Component} from 'react';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import {Platform, StyleSheet, Text, View,ScrollView} from 'react-native';
import Home from './componentes/Home.js';
import MenuFlashTeam from './componentes/Menu_Flashteam.js';
import MenuMercaderista from './componentes/Menu_Mercaderista.js';
import EncuestaFlashTeam from './componentes/EncuestaFlashTeam.js';
import RadarExhibiciones from './componentes/PerfilMercaderista/RadarExhibicionesMercaderista.js';
import MedidasEspacios from './componentes/PerfilMercaderista/MedidasEspaciosMercaderista.js';
import FaltantesMercaderista from './componentes/PerfilMercaderista/FaltantesMercaderista.js';
import CamaraTakerFaltantes from './componentes/PerfilMercaderista/CamaraTakerFaltantes.js';
import PlanogramaMercaderista from './componentes/PerfilMercaderista/PlanogramaMercaderista.js';
import CamaraTakerPlanograma from './componentes/PerfilMercaderista/CamaraTakerPlanograma.js';
import FlejeOfertasMercaderista from './componentes/PerfilMercaderista/FlejeOfertasMercaderistas.js';
import CamaraTakerFlejeOfertas from './componentes/PerfilMercaderista/CamaraTakerFlejesOfertas.js';
import ProcesoCompletado from './componentes/PerfilMercaderista/ProcesoCompletado.js';
import CamaraTaker from './componentes/CamaraTaker.js';

const App = createStackNavigator(
  {
    Home: Home,
    MenuFlashTeam:MenuFlashTeam,
    MenuMercaderista:MenuMercaderista,
    EncuestaFlashTeam:EncuestaFlashTeam,
    RadarExhibiciones:RadarExhibiciones,
    MedidasEspacios:MedidasEspacios,
    FaltantesMercaderista:FaltantesMercaderista,
    CamaraTakerFaltantes:CamaraTakerFaltantes,
    PlanogramaMercaderista:PlanogramaMercaderista,
    CamaraTakerPlanograma:CamaraTakerPlanograma,
    FlejeOfertasMercaderista:FlejeOfertasMercaderista,
    CamaraTakerFlejeOfertas:CamaraTakerFlejeOfertas,
    ProcesoCompletado:ProcesoCompletado,
    CamaraTaker:CamaraTaker,
  },
  {
    initialRouteName:"Home"
  }
);

export default createAppContainer(App);
