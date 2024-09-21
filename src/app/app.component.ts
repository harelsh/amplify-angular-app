import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';

//Amplify.configure(outputs);

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, TodosComponent, AmplifyAuthenticatorModule],
})
export class AppComponent {
  title = 'amplify-angular-template';

    
  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure({
      ...Amplify.getConfig(),
      Interactions: {
        LexV2: {
          'Prod': {
            aliasId: 'Prod',
            botId: '13WXGCLGR8',
            localeId: 'en_US',
            region: 'us-east-1'
          }
        }
      }
    });
  }

  /*public signUpAttributes= {}*/

  public formFields = {
    signUp: {
      email: {
        order: 1,
        required: true
      },
      family_name: {
        order: 3,
        required: true
      },
      preferred_username: {
        order: 2,
        required: true
      },
      birthdate: {
        order: 4,
        required: true
      },
      password: {
        order: 5,
        required: true
      },
      confirm_password: {
        order: 6,
        required: true
      },
      city: {
        order: 7,
        required: false,
        label: "City",
        placeholder: "Enter your city"
      },
      zip_code: {
        order: 8,
        required: false,
        label: "Zip Code",
        placeholder: "Enter your zip code"
      },
      phone_number: {
        order: 9,
        required: false
      }
    },
  }

  //print user
  public printUser(user: any){
    console.log(user)
    console.log("type=====", typeof(user))
    //get all the keys from local storage and fine the one ending with idToken
    let keys = Object.keys(localStorage)
    console.log("keys====", keys)
    let idToken = keys.filter(key => key.endsWith("idToken"))
    console.log("idToken====", idToken)
    //get the value of the key
    let token = localStorage.getItem(idToken[0])
    console.log("token====", token)
    //decode the jwt token and extract those fields: email, family_name, preferred_username, birthdate
    let base64Url = token!.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jwt = JSON.parse(window.atob(base64));
    console.log(jwt);
    //get the value of the key
    let email = jwt.email
    let family_name = jwt.family_name
    let preferred_username = jwt.preferred_username
    let birthdate = jwt.birthdate
    let city = jwt.city
    let zip_code = jwt.zip_code
    let phone_number = jwt.phone_number

    console.log("email====", email)
    console.log("family_name====", family_name)
    console.log("preferred_username====", preferred_username)
    console.log("birthdate====", birthdate)
    console.log("city====", city)
    console.log("zip_code====", zip_code)
    console.log("phone_number====", phone_number)

    //store the values in the local storage
    localStorage.setItem("email", email)
    localStorage.setItem("family_name", family_name)
    localStorage.setItem("preferred_username", preferred_username)
    localStorage.setItem("birthdate", birthdate)
    localStorage.setItem("city", city)
    localStorage.setItem("zip_code", zip_code)
    localStorage.setItem("phone_number", phone_number)

    //get the values from the local storage
    let email1 = localStorage.getItem("email")
    let family_name1 = localStorage.getItem("family_name")
    let preferred_username1 = localStorage.getItem("preferred_username")
    let birthdate1 = localStorage.getItem("birthdate")
    let city1 = localStorage.getItem("city")
    let zip_code1 = localStorage.getItem("zip_code")
    let phone_number1 = localStorage.getItem("phone_number")

    console.log("email1====", email1)
    console.log("family_name1====", family_name1)
    console.log("preferred_username1====", preferred_username1)
    console.log("birthdate1====", birthdate1)
    console.log("city1====", city1)
    console.log("zip_code1====", zip_code1)
    console.log("phone_number1====", phone_number1)
  
  }


  public getUserName(){
    this.printUser(null);
    let username = localStorage.getItem("preferred_username");
    return username;
  }
}
