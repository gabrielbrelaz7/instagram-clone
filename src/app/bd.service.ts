import * as firebase from 'firebase'
import {Injectable} from '@angular/core'
import {Progresso} from './progresso.service'

@Injectable()

export class Bd {

    constructor(private progresso : Progresso) {}

    public publicar(publicacao : any): void {

        firebase
            .database()
            .ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({titulo: publicacao.titulo})
            .then((resposta : any) => {
        
                let nomeImagem = resposta.key

                console.log(nomeImagem)

                firebase.storage().ref().child(`imagens/${nomeImagem}`)
                    .put(publicacao.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                    //acompanhamento do progresso do upload
                    (snapshot : any) => {
                        this.progresso.status = 'andamento'
                        this.progresso.estado = snapshot
                        // console.log('Snapshot', snapshot)
                    }, (error) => {
                        this.progresso.status = 'erro'
                        console.log(error)
                    },
                    // finalização do processo
                    () => {
                        this.progresso.status = 'concluido'
                        // console.log('upload completo')
                    })
                // console.log("Chegamos até o serviço")
            })

        }

        public consultaPublicacoes(emailUsuario: string): any {

            // retornando uma promise para fazer a chamada no componente 

            return new Promise((resolve, reject) => {

                firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
                .orderByKey()
                .once('value').then((snapshot: any) => {

                    console.log("Valor" + snapshot.val())
                    console.log("Email" + emailUsuario)

                    let publicacoes: Array<any> = []

                    console.log(publicacoes)

                    // O orderby "se perde" no push para o Array
                    snapshot.forEach((childSnapshot: any) => {

                         let publicacao = childSnapshot.val()

                         publicacao.key = childSnapshot.key

                        publicacoes.push(publicacao)

                    })

                    // resolve(publicacoes)

                    // Reverse é um método javascript que inverte a ordem dos Arrays
                    return publicacoes.reverse()

                })

                .then((publicacoes:any) => {

                    // recuperando os valores do documento
                    publicacoes.forEach((publicacao) => {

                    console.log(publicacao)

                    //consultar a url da imagem
                    firebase.storage().ref()
                    .child(`imagens/${publicacao.key}`)
                    .getDownloadURL()
                    .then((url: string) => {
                        console.log("URL" + url)

                        // Criando uma valor url_imagem dentro do valor recuperado
                        publicacao.url_imagem = url

                        //consultar o nome do usuário
                        firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                            .once('value')
                            .then((snapshot:any) => {
                                // console.log(snapshot.val().nome_usuario)

                        // Criando uma valor nome_usuario dentro do valor recuperado
                                publicacao.nome_usuario = snapshot.val().nome_usuario
                            })
                        })  

                        })
                                resolve(publicacoes)
                })

            })

            
        }
}


