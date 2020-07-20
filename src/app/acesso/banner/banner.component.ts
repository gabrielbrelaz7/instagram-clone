import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Imagem } from './imagem.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],

  animations: [

    trigger('banner', [
      state('escondido', style({
// Definindo os estilos CSS com notação Camel Case  
        opacity: 0

      })),
      state('visivel', style({

        opacity:1

      })),

      transition('escondido <=> visivel', animate('0.5s ease-in') )

    ])

  ]

})
export class BannerComponent implements OnInit {

  // Na classe que definimos qual será o estado inicial da animação
  public estado: string = 'visivel';

  public imagens: Imagem[] = [
    {estado: 'visivel' , url: '/assets/banner-acesso/img_1.png'},
    {estado: 'escondido' , url: '/assets/banner-acesso/img_2.png'},
    {estado: 'escondido' , url: '/assets/banner-acesso/img_3.png'},
    {estado: 'escondido' , url: '/assets/banner-acesso/img_4.png'},
    {estado: 'escondido' , url: '/assets/banner-acesso/img_5.png'}
  ]

  constructor() { }

  ngOnInit(): void {

    // Ativando função com SetTime Out de 3 segundos 

    setTimeout(() => this.logicaRotacao(), 10)
  }

  public logicaRotacao(): void {

    // auxilia na exibição da imagem seguinte

    let idx: number;

    //Ocultando imagens
    for(let i:number = 0; i<=4 ; i++) {

      if (this.imagens[i].estado === 'visivel') {
        this.imagens[i].estado = 'escondido'

        idx = i === 4 ? 0 : i + 1

        break
      }
    }

    //Exibindo a próxima imagem
    this.imagens[idx].estado = "visivel"


    setTimeout(() => this.logicaRotacao(), 3000)
  }


}
