import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule'
  },
  {
    path: 'homepage', loadChildren: './pages/homepage/homepage.module#HomepagePageModule'
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
