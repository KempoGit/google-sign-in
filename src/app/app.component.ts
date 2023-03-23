import { Component, OnInit } from '@angular/core';
declare const google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'new-proyect';
  
  ngOnInit(): void {
    this.loginWithGoogle();
    }

  loginWithGoogle() {
    function handleCredentialResponse(response: any) {
      // console.log("Encoded JWT ID token: " + response.credential);
      const url = 'http://localhost:3000/api/login/google';
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: response.credential })
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch( console.log )
    }
    window.onload = function () {
      google.accounts.id.initialize({
        client_id: "662920755882-431j2dredilnabsgrr55pop6us93m309.apps.googleusercontent.com",
        callback: handleCredentialResponse
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    }
  }
  
}
