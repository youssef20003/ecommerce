import { WishlistComponent } from './pages/wishlist/wishlist/wishlist.component';

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AuthComponent } from './layouts/auth-layout/auth/auth.component';
import { MainComponent } from './layouts/main-layout/main/main.component';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    // {path:'' ,redirectTo:'home' , pathMatch:'full'},
    // {path:'home' ,component:HomeComponent ,title:'Home'},
    // {path:'products' ,component:ProductsComponent ,title:'Products'},
    // {path:'brands' ,component:BrandsComponent ,title:'Brands'},
    // {path:'categories' ,component:CategoriesComponent ,title:'categories'},
    // {path:'cart' ,component:CartComponent ,title:'Cart'},
    // {path:'login' ,component:LoginComponent ,title:'Login'},
    // {path:'register' ,component:RegisterComponent ,title:'Register'},
    // {path:'**' ,component:NotfoundComponent , title:'error404'}

    
    {
        
        path: '', component: AuthComponent, children: [
            { path: '', redirectTo: 'login', pathMatch: 'full',  title: 'login' },
            { path: 'login', component: LoginComponent, title: 'login' },
            { path: 'register', loadComponent: () => import('./pages/register/register.component').then((classes) => classes.RegisterComponent), title: 'register' },
        ]
    },
    {
        path: '', component: MainComponent, children: [
            { path: 'home', component: HomeComponent, title: 'Home',  },
            { path: 'products', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent), title: 'Products' },
            { path: 'brands', loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent), title: 'Brands' },
            { path: 'categories', loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent), title: 'Categories' },
            { path: 'cart', loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent), title: 'Cart' },
            { path: 'wishlist', loadComponent: () => import('./pages/wishlist/wishlist/wishlist.component').then(m => m.WishlistComponent), title: 'whishlist' },
            { path: 'allorders', loadComponent: () => import('./pages/allorders/allorders.component').then(m => m.AllordersComponent), title: 'allorders' },
            { path: 'checkout/:c_id', loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent), title: 'checkout' },
            { path: 'product-details/:id', loadComponent: () => import('./pages/products-details/products-details.component').then(m => m.ProductsDetailsComponent), title: 'details' },
        ] , canActivate: [authGuard]
    },
    { path: '**', component: NotfoundComponent, title: 'error404' }
];
