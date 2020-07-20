import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app3';

  ngOnInit():void {

    //Acessando recursos do firebase

    var firebaseConfig = {
      apiKey: "AIzaSyBU2fU82iHk01Eh_6MnSwtww4UflmTnjks",
      authDomain: "instagram-clone-25c1a.firebaseapp.com",
      databaseURL: "https://instagram-clone-25c1a.firebaseio.com",
      projectId: "instagram-clone-25c1a",
      storageBucket: "instagram-clone-25c1a.appspot.com",
      messagingSenderId: "191060145117",
      appId: "1:191060145117:web:68cb445f8e3d096796bc34"
    };

    firebase.initializeApp(firebaseConfig)

  }

}
