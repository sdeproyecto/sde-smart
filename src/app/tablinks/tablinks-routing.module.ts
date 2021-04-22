import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablinksPage } from './tablinks.page';

const routes: Routes = [

    {
        path: '',
        component: TablinksPage,
        children: [
            {
                path: 'marcas',
                loadChildren: () => import('./marcas/marcas.module').then(m => m.MarcasPageModule)
            },
            {
                path: 'rondas',
                loadChildren: () => import('./rondas/rondas.module').then(m => m.RondasPageModule)
            },
            {
                path: 'empleado',
                loadChildren: () => import('./empleado/empleado.module').then(m => m.EmpleadoPageModule)
            }
        ]
    },
    {
        path: 'home',
        redirectTo: 'home/marcas',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TablinksPageRoutingModule { }
