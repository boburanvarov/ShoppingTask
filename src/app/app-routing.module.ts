import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductComponent } from './pages/product/product.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
   { path: '', component: WelcomeComponent},
   { path: 'category', component: CategoryComponent},
   { path: 'product', component: ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
