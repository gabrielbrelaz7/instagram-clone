import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Bd } from 'src/app/bd.service';
import * as firebase from 'firebase'
import { Progresso } from 'src/app/progresso.service';
import { Observable, interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.scss']
})
export class IncluirPublicacaoComponent implements OnInit {

  // Criando o event emitter 
  @Output() public atualizarTimeLine: EventEmitter<any> = new EventEmitter<any>()

  public email:string
  private imagem: any

  public progressoPublicacao: string = "pendente"
  public porcentagemUpload: number 

  public formulario: FormGroup = new FormGroup ({

    'titulo': new FormControl(null)

  })


  constructor(
    private bd: Bd,
    private progresso: Progresso
  ) { }

  ngOnInit(): void {

    // Explorando o estado do usuário autenticado, funciona como o Observable 
    firebase.auth().onAuthStateChanged((user) =>{
      this.email = user.email
    })

  }

  public publicar():void {
    this.bd.publicar({

      email: this.email ,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]

    });

    let acompanharUpload = interval(1500)
    let continua = new Subject<boolean>()
    continua.next(true)
    
    acompanharUpload.pipe(
      // Enquanto o processo de upload ocorre
      takeUntil(continua)
    ).subscribe(() => {
      // console.log(this.progresso.estado)
      // console.log(this.progresso.status)
      this.progressoPublicacao = "andamento"

      // Pegando os bytes transferidos durante o upload em porcentagem 
      this.porcentagemUpload = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes) * 100)

      if (this.progresso.status === 'concluido') {

        //emitir um evento do componente parent (home)
        this.atualizarTimeLine.emit()
        continua.next(false)
        this.progressoPublicacao = "concluido"
        // console.log(this.progressoPublicacao)
      }

    })
  }

  public preparaImagemUpload(event: Event) :void{
    this.imagem = (<HTMLInputElement>event.target).files
  }

}
