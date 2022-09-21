import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { ChatMsgComponent } from './chat/chat-msg/chat-msg.component';
import { RegisterComponent } from './register/register.component';
import { httpInterceptorProviders } from './helpers/auth.interceptor';
import { FjoriComponent } from './fjori/fjori.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    ChatMsgComponent,
    RegisterComponent,
    FjoriComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonToggleModule,

    RouterModule.forRoot([]),
    CommonModule,
  ],

  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
