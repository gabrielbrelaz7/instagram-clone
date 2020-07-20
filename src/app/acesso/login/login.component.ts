import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Autenticacao } from '../autenticacao.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormulario: string;


  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  public formulario: FormGroup = new FormGroup({
    'email':new FormControl(null),
    'senha':new FormControl(null)
  })



  constructor(private autenticacao: Autenticacao) { }

  ngOnInit(): void {
  }

  public exibirPainelCadastro():void {
    this.exibirPainel.emit('cadastro')
  }

  public autenticar():void {

    // let usuario = new 

    this.autenticacao.realizarLogin(
      this.formulario.value.email, 
      this.formulario.value.senha
      )
  }

}
