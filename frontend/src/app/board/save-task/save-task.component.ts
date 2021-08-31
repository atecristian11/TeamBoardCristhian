import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar'; //para que se ejecute el servidor mientras modificamos el appmodule

@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.css'],
})
export class SaveTaskComponent implements OnInit {
  registerData: any; //any significa cualquier tipo de dato
  public message: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2; //para que la ventanita emergente se quite en dos seg automaticamente
  selectedFile: any;

  constructor(
    private _boardService: BoardService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registerData = {}; // la inicializamos como json vacio
    this.message = '';
    this.selectedFile = null;
  } //que se construyan antes de que este listo el archivo

  ngOnInit(): void {}

  saveTask() {
    if (!this.registerData.name || !this.registerData.description) {
      console.log('Failed process: Incomplete data'); // error para ver en consola
      this.message = 'Failed process: Incomplete data'; // error para el usuario
      this.openSnackBarError(); //muestra la ventana de error
      this.registerData = {}; //aca se limpia el json para que llene otra vez todos los datos en el formulario
    } else {
      this._boardService.saveTask(this.registerData).subscribe(
        //nos trae la respuesta el backend
        (res) => {
          //aca es si el back nos responde con todo bien
          console.log(res);
          this._router.navigate(['/lisTask']); //lo redirecciona directo al formulario de listar tarea
          this.message = 'Task Create';
          this.openSnackBarSuccesfull();
          this.registerData = {};
        },
        (err) => {
          //aca es si el back nos responde con algun error
          console.log(err);
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    }
  }

  uploadImg(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  saveTaskImg() {
    if (!this.registerData.name || !this.registerData.description) {
      console.log('Failed process: Incomplete data'); // error para ver en consola
      this.message = 'Failed process: Incomplete data'; // error para el usuario
      this.openSnackBarError(); //muestra la ventana de error
      this.registerData = {}; //aca se limpia el json para que llene otra vez todos los datos en el formulario
    } else {
      const data = new FormData(); //aca estamos creando el formulario
      data.append('image', this.selectedFile, this.selectedFile.name); //aca estamos enviando la imagen del formulario
      data.append('name', this.registerData.name); //aca estamos enviando el name del formulario
      data.append('description', this.registerData.description); //aca estamos enviando la description del formulario

      this._boardService.saveTaskImg(data).subscribe(
        //se envia la data porque ya es un formulario y no un json
        //nos trae la respuesta el backend
        (res) => {
          //aca es si el back nos responde con todo bien
          console.log(res);
          this._router.navigate(['/lisTask']); //lo redirecciona directo al formulario de listar tarea
          this.message = 'Task Create';
          this.openSnackBarSuccesfull();
          this.registerData = {};
        },
        (err) => {
          //aca es si el back nos responde con algun error
          console.log(err);
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    }
  }

  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarTrue'],
    }); //tambien se puede colocar la x para cerrarlo
  }

  openSnackBarError() {
    this._snackBar.open(this.message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse'],
    }); //tambien se puede colocar la x para cerrarlo
  }
}
