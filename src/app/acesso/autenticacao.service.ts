import { Usuario } from './usuario.model';
import * as firebase from 'firebase'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()

export class Autenticacao {

    public token_id: string

    constructor(private router: Router){}


    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        // console.log('Chegamos até o serviço', usuario)
        
        // Padrão do Firebase com return para conseguir usar thens no cadastro.ts
        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
        .then((resposta:any) =>{

            // remover a senha do atributo senha do objeto usuario
            delete usuario.senha

            // Caso tenha sucesso no usuário e senha, vamos utilizar os patch do banco de dados e registrar 
            // dados complementares 

            // btoa converte caracteres especiais em JavaScript
            firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
            .set(usuario)
        })

        .catch((error:Error)=>{
            console.log(error)
        })

    }


    public realizarLogin(email:string, senha:string):void {

        // console.log(email,senha)

        firebase.auth().signInWithEmailAndPassword(email,senha)
        .then((resposta:any)=> {

            // Pegando ID Token do usuário
            firebase.auth().currentUser.getIdToken()
            .then((idToken: string)=> { 
                this.token_id = idToken
                localStorage.setItem('idToken' , idToken)
                this.router.navigate(['/home'])
                console.log(this.token_id)
            })
        })
        .catch((error: Error)=> console.log(error))
    }

    public autenticado():boolean {

        if (this.token_id === undefined && localStorage.getItem('idToken') != null) {

            this.token_id = localStorage.getItem('idToken')
            
            return true

        }
        else if (this.token_id === undefined) {
            this.router.navigate(['/'])
            return false;
        }

    }

    public sair():void {

        firebase.auth().signOut()
        .then(()=> {
            localStorage.removeItem('idToken')
            this.token_id = undefined
            this.router.navigate(['/'])

        })

    }

}