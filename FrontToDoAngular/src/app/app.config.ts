import { ApplicationConfig, NgModule } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from './services/task.service';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';


NgModule ({
  declarations: [
    // your components
  ],
  imports: [
    // other modules
    FormsModule,NgModule,CommonModule,BrowserModule,HttpClientModule// or ReactiveFormsModule
  ],
  providers: [provideRouter(routes),TaskService],
  
})
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),TaskService,provideClientHydration(),
    provideHttpClient(), ]
};
