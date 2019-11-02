import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: './pages/tabs/tabs.module#TabsPageModule',
    canActivateChild: [AuthGuard]
  },
  {
    path: 'homepage',
    loadChildren: './pages/homepage/homepage.module#HomepagePageModule',
    canActivateChild: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  {
    path: 'registration',
    loadChildren: './pages/registration/registration.module#RegistrationPageModule'
  },
  {
    path: 'armadietto',
    loadChildren: './pages/armadietto/armadietto.module#ArmadiettoPageModule',
    canActivateChild: [AuthGuard]
  },
  {
    path: 'addfarmaco',
    loadChildren: './pages/addfarmaco/addfarmaco.module#AddfarmacoPageModule',
    canActivateChild: [AuthGuard]
  },
  {
    path: 'lista-piani',
    loadChildren: './pages/lista-piani/lista-piani.module#ListaPianiPageModule',
    canActivateChild: [AuthGuard]
  },
  {
    path: 'nuovo-piano',
    loadChildren: './pages/nuovo-piano/nuovo-piano.module#NuovoPianoPageModule',
    canActivateChild: [AuthGuard]
  },
  {
    path: 'impostazioni',
    loadChildren: './pages/impostazioni/impostazioni.module#ImpostazioniPageModule',
    canActivateChild: [AuthGuard]
  },
  {
    path: 'scegli-farmaco',
    loadChildren: './pages/scegli-farmaco/scegli-farmaco.module#ScegliFarmacoPageModule' ,
    canActivateChild: [AuthGuard]
  },
  {
    path: 'edit-info-piano',
    loadChildren: './pages/edit-info-piano/edit-info-piano.module#EditInfoPianoPageModule'
  },
  {
    path: 'dettaglio-piano-sub-tab-left',
    loadChildren: './pages/dettaglio-piano-sub-tab-left/dettaglio-piano-sub-tab-left.module#DettaglioPianoSubTabLeftPageModule'
  },
  {
    path: 'dettaglio-piano-sub-tab-right',
    loadChildren: './pages/dettaglio-piano-sub-tab-right/dettaglio-piano-sub-tab-right.module#DettaglioPianoSubTabRightPageModule'
  },
  { path: 'dettaglio-assunzione', loadChildren: './pages/dettaglio-assunzione/dettaglio-assunzione.module#DettaglioAssunzionePageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
