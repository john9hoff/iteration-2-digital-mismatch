// Imports
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UserListComponent} from './users/user-list.component';
import {TrackerListComponent} from './trackers/tracker-list.component';
import {JournalListComponent} from './journals/journal-list.component';


// Route Configuration
export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'users', component: UserListComponent},
    {path: 'trackers', component: TrackerListComponent},
    {path: 'journals', component: JournalListComponent},
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
