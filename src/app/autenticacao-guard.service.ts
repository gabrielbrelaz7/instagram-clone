
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Autenticacao } from './acesso/autenticacao.service';


// Injectable é utilizado para fazer importações de services 
@Injectable()

export class AutenticacaoGuard implements CanActivate {

    constructor(private autenticacao: Autenticacao) {}

    canActivate(): boolean {
        return this.autenticacao.autenticado()
    }
}