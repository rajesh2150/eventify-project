import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module'; // This already imports RouterModule
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/common-dashboard/dashboard.component';
import { NavComponent } from './components/nav/nav.component';
import { OrganizerDashboardComponent } from './components/organizer-dashboard/organizer-dashboard.component';
import { AdminComponent } from './components/Admin/admin-login/admin.component';
import { AdminDashboardComponent } from './components/Admin/admin-dashboard/admin-dashboard.component';
import { AtendeeDashboardComponent } from './components/atendee-dashboard/atendee-dashboard.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { FeebackComponent } from './components/feeback/feeback.component';
import { DeleteeventComponent } from './components/oragnizer/deleteevent/deleteevent.component';
import { AddeventComponent } from './components/oragnizer/addevent/addevent.component';
import { UpdateEventComponent } from './components/oragnizer/update-event/update-event.component';
import { UpdateComponent } from './components/oragnizer/update/update.component';
import { AlertsComponent } from './components/oragnizer/alerts/alerts.component';
import { AttendeesComponent } from './components/oragnizer/attendees/attendees.component';
import { EventsComponent } from './components/oragnizer/events/events.component';
import { PaymentComponent } from './components/oragnizer/payment/payment.component';
import { ManageeventsComponent } from './components/oragnizer/manageevents/manageevents.component';
import { OrganizerReportsComponent } from './components/oragnizer/reports/reports.component';
import { AdminReportsComponent } from './components/Admin/admin-reports/admin-reports.component';
import { PlatformComponent } from './components/oragnizer/platform/platform.component';

import { OrganizerService } from './services/organizer.service';
import { Eventify } from './EventifyAdminURL';
import { CommonModule } from '@angular/common';
import { UnathorizedComponent } from './unathorized/unathorized.component';
import { AdminEventsComponent } from './components/Admin/events/events.component';
import { AdminAttendeesComponent } from './components/Admin/admin-attendees/attendees.component';
import { OrganizerComponent } from './components/Admin/organizer/organizer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavComponent,
    AtendeeDashboardComponent,
    OrganizerDashboardComponent,
    AdminComponent,
    AdminDashboardComponent,
    BookingFormComponent,
    EventDetailsComponent,
    FeebackComponent,
    DeleteeventComponent,
    AddeventComponent,
    UpdateEventComponent,
    UpdateComponent,
    AlertsComponent,
    AttendeesComponent,
    EventsComponent,
    PaymentComponent,
    ManageeventsComponent,
    OrganizerReportsComponent,
    AdminReportsComponent,
    PlatformComponent,
    UnathorizedComponent,
    AdminEventsComponent,
    AdminAttendeesComponent,
     OrganizerComponent,
     AdminDashboardComponent,
     OrganizerComponent,
     AdminDashboardComponent,
     AdminReportsComponent,
     AdminComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,         // ngModel needs FormsModule
    ReactiveFormsModule, // for reactive forms
    AppRoutingModule,    // this imports RouterModule, no need to import RouterModule here
    HttpClientModule,
    BrowserAnimationsModule,
    NgChartsModule,
    CommonModule
  ],
  providers: [
    OrganizerService,
    Eventify
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
