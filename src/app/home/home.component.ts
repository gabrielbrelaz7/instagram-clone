import { Component, OnInit, ViewChild } from '@angular/core';
import { Autenticacao } from '../acesso/autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Pegando atributo do componente filho publicacoes
  @ViewChild('publicacoes') public publicacoes: any

  constructor(
    private autenticacao: Autenticacao
  ) { }

  ngOnInit(): void {
  }


  public sair(): void {
    this.autenticacao.sair()
  }


  // Event Emitter, temos que fazer o inverso do processo 
  public atualizarTimeLine():void {
    // Executando método do componente filho
    this.publicacoes.atualizarTimeLine()
  }

}
