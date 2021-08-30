import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { FooterComponent } from './home/footer/footer.component';
import { ListTaskComponent } from './board/list-task/list-task.component';
import { SaveTaskComponent } from './board/save-task/save-task.component';
import { ListUserComponent } from './admin/list-user/list-user.component';
import { RegisterUserComponent } from './admin/register-user/register-user.component';
import { UpdateUserComponent } from './admin/update-user/update-user.component';
import { RegisterRoleComponent } from './admin/register-role/register-role.component';
import { ListRoleComponent } from './admin/list-role/list-role.component';
import { UpdateRoleComponent } from './admin/update-role/update-role.component';

//importar los sevicios que creamos en la carpeta services manualmente
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';
import { BoardService } from './services/board.service';
import { TokenInterceptorService } from './services/token-interceptor.service';

//importar los guard que creamos en la carpeta guard manualmente
import { AuthGuard } from './guard/auth.guard';

//esto es para importar lo visual de angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Esto es para invocar los paquetes con los formularios de angular
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//con este le estamos diciendo que todas las apis las vamos a manejar por http
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; //el http interceptor sirve para eliminar el token apenas se cierre sesion del front

//esta es la api de angular material para que nos actualice todos los compenentes que utilicemos este es el menu
import { MatToolbarModule } from '@angular/material/toolbar';
// esta es la api para los botones de angular material
import { MatButtonModule } from '@angular/material/button';

//para importar el modulo de formularios
import { MatFormFieldModule } from '@angular/material/form-field';

//para importar el modulo de cards
import { MatCardModule } from '@angular/material/card';

//para importar el modulo de input que le da diseños cuando vamos a escribir algo en los recuadros de texto
import { MatInputModule } from '@angular/material/input';

//para importar el modulo de mensajes que le vamos a mostrar al usaurio
import { MatSnackBarModule } from '@angular/material/snack-bar';

//para importar el modulo acordeones de material
import { MatExpansionModule } from '@angular/material/expansion';

//para importar el modulo de iconos de material
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    ListTaskComponent,
    SaveTaskComponent,
    ListUserComponent,
    RegisterUserComponent,
    UpdateUserComponent,
    RegisterRoleComponent,
    ListRoleComponent,
    UpdateRoleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatIconModule,
  ],
  providers: [
    UserService,
    RoleService,
    BoardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService, //para decir que el interceptor se saca de la case token
      multi: true, //para que pueda recibir varios token al tiempo en la pagina
    },
    AuthGuard,
  ], //todos los servicios se llaman aca debido a que se van a proveer servicios
  bootstrap: [AppComponent],
})
export class AppModule {}
