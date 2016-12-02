import { TripsExistGuard } from './../../guards/trips-exist.guard';
import { TripsListComponent } from './trips-list/trips-list.component';
import { TripsComponent } from './trips.component';
import { Routes } from '@angular/router';
import { TripDetailComponent } from './trip-detail/trip-detail.component';

export const TripRoutes = [
    { 
      path: '', 
      component: TripsListComponent
    },
    { 
      path: ':id',
      component: TripDetailComponent
    }
]