import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TreesComponent } from './components/trees/trees.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'trees',
        component: TreesComponent,
    }
];
