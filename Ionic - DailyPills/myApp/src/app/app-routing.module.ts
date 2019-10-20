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
    path: 'dettaglio-farmaco', loadChildren: './pages/dettaglio-farmaco/dettaglio-farmaco.module#DettaglioFarmacoPageModule'
  },
  {
    path: 'armadietto', loadChildren: './pages/armadietto/armadietto.module#ArmadiettoPageModule'
  },
  {
    path: 'addfarmaco', loadChildren: './pages/addfarmaco/addfarmaco.module#AddfarmacoPageModule'
  },
<<<<<<< HEAD
  { path: 'lista-piani', loadChildren: './pages/lista-piani/lista-piani.module#ListaPianiPageModule' },
  { path: 'nuovo-piano', loadChildren: './pages/nuovo-piano/nuovo-piano.module#NuovoPianoPageModule' }
=======
  {
    path: 'lista-piani', loadChildren: './pages/lista-piani/lista-piani.module#ListaPianiPageModule'
  }
>>>>>>> 393308d9d8e40b5a98c1353dbfd9a833e7c68ea1
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
