import { Component, OnInit, OnChanges} from '@angular/core';
import { Bd } from 'src/app/bd.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.scss']
})
export class PublicacoesComponent implements OnInit {
  
  public emailUser: string
  public publicacoes: any

  constructor(private bd : Bd) { }

  ngOnChanges() {

    

  }

  ngOnInit(): void {

    // Pegando informações do usuário autenticado 
    firebase.auth().onAuthStateChanged((user) => {
      this.emailUser = user.email

      // chamando o método atualizar timeline 
    this.atualizarTimeLine()
    })


  }

  public atualizarTimeLine():void {
    this.bd.consultaPublicacoes(this.emailUser)
      .then((publicacoes: any) => {
        this.publicacoes = publicacoes
        console.log(publicacoes)
      })
  }

}
