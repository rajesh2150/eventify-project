import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/common-dashboard/dashboard.component';
// import { AtendeeDashboardComponent } from './components/attendee-dashboard/atendee-dashboard.component';
import { OrganizerDashboardComponent } from './components/organizer-dashboard/organizer-dashboard.component';
import { AdminComponent } from './components/Admin/admin-login/admin.component';
import { AdminDashboardComponent } from './components/Admin/admin-dashboard/admin-dashboard.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { AtendeeDashboardComponent } from './components/atendee-dashboard/atendee-dashboard.component';
import { FeebackComponent } from './components/feeback/feeback.component';
import { AlertsComponent } from './components/oragnizer/alerts/alerts.component';
import { UpdateComponent } from './components/oragnizer/update/update.component';
import { DeleteeventComponent } from './components/oragnizer/deleteevent/deleteevent.component';
import { UpdateEventComponent } from './components/oragnizer/update-event/update-event.component';
import { EventsComponent } from './components/oragnizer/events/events.component';
import { PaymentComponent } from './components/oragnizer/payment/payment.component';
import { AttendeesComponent } from './components/oragnizer/attendees/attendees.component';
import { AddeventComponent } from './components/oragnizer/addevent/addevent.component';
import { ManageeventsComponent } from './components/oragnizer/manageevents/manageevents.component';
import { OrganizerReportsComponent } from './components/oragnizer/reports/reports.component';
import { AdminReportsComponent } from './components/Admin/admin-reports/admin-reports.component';
import { PlatformComponent } from './components/oragnizer/platform/platform.component';
import { OrganizerComponent } from './components/Admin/organizer/organizer.component';
import { AuthgaurdService } from './authgaurd.service';
import { UnathorizedComponent } from './unathorized/unathorized.component';
import { AdminEventsComponent } from './components/Admin/events/events.component';
import { AdminAttendeesComponent } from './components/Admin/admin-attendees/attendees.component';
// import { BookingFormComponent } from './booking-form/booking-form.component';
// import { EventDetailsComponent } from './event-details/event-details.component';
// import { FeebackComponent } from './feeback/feeback.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
 


  {  path: 'eventname/:eventTitle', component: EventDetailsComponent, canActivate:[AuthgaurdService], data: { role: 'attendee' }},
  {  path: 'booking/:eventTitle', component: BookingFormComponent, canActivate:[AuthgaurdService], data: { role: 'attendee' }},
  { path: 'feedback', component: FeebackComponent, canActivate:[AuthgaurdService], data: { role: 'attendee' } },
  { path: 'paytoplatform', component: PlatformComponent, canActivate:[AuthgaurdService], data: { role: 'attendee' } },
 
 
 

  { path: 'attendeedashboard', component:  AtendeeDashboardComponent, canActivate:[AuthgaurdService], data: { role: 'attendee' }},
  { path: 'organizerdashboard', component: ManageeventsComponent, canActivate:[AuthgaurdService], data: { role: 'organizer' } },
 
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // {  path: 'eventname/:eventTitle/feedback', component: FeebackComponent }
  {path:'event/book',component:BookingFormComponent},
  {
    path:'manageevents',
    component:ManageeventsComponent, canActivate:[AuthgaurdService], data: { role: 'organizer' }
  },
  {
    path:'addevent',
    component:AddeventComponent, canActivate:[AuthgaurdService], data: { role: 'organizer' }
  },{
    path:'attendees',
    component:AttendeesComponent, canActivate:[AuthgaurdService], data: { role: 'organizer' }
  },
  { path: 'unauthorized', component: UnathorizedComponent },
  // {
  //   path:'payment',
  //   component:PaymentComponent
  // },
  {
    path:'events',
    component:EventsComponent, canActivate:[AuthgaurdService], data: { role: 'organizer' }
  },
  {
    path:'updateEvents',
    component:UpdateEventComponent, canActivate:[AuthgaurdService], data: { role: 'organizer' }
  },
  {
    path:'deleteEvents',
    component:DeleteeventComponent, canActivate:[AuthgaurdService], data: { role: 'organizer' }
  },
  {
    path:'update',
    component:UpdateComponent, canActivate:[AuthgaurdService], data: { role: 'organizer' }
  },
  {
    path:'dashboard',
    component:OrganizerDashboardComponent, canActivate:[AuthgaurdService], data: { role: 'organizer' }
  },{
    path:'alerts',
    component:AlertsComponent, canActivate:[AuthgaurdService]
  },
  {
    path:'organizer/reports',
    component:OrganizerReportsComponent, canActivate:[AuthgaurdService], data: { role: 'organizer' }
  },
  // {
  //   path:'admin/dashboard',
  //   component:AdminDashboardComponent, 
  // },



  { path: 'admin', component: AdminComponent  },  //login

{path:'admin/dashboard',component:AdminDashboardComponent,canActivate:[AuthgaurdService], data: { role: 'admin' }},

{path:'admin/organizer',component:OrganizerComponent,canActivate:[AuthgaurdService], data: { role: 'admin' }},
{path:'admin/events',component:AdminEventsComponent,canActivate:[AuthgaurdService], data: { role: 'admin' }},
{path:'admin/attendees',component:AdminAttendeesComponent,canActivate:[AuthgaurdService], data: { role: 'admin' }},
{path:'admin/reports',component:AdminReportsComponent,canActivate:[AuthgaurdService], data: { role: 'admin' }}


  // {path:'admin/reports',component:AdminReportsComponent,},
  // { path: 'admin/dashboard', component: AdminDashboardComponent,},
  // {
  //   path:'admin/organizer',
  //   component: OrganizerComponent,
  // },{
  //   path:'admin/events',
  //   component:AdminEventsComponent, 
  // },
  // {
  //   path:'admin/attendees',
  //   component: AdminAttendeesComponent,
  // },
  // {
  //   path:'reports',
  //   component: AdminReportsComponent
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
