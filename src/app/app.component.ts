import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { Interactions } from '@aws-amplify/interactions';

Amplify.configure(outputs);

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, TodosComponent, AmplifyAuthenticatorModule],
})
export class AppComponent {
  title = 'amplify-angular-template';
  displayUserName: string | null = null;

    
  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure({
      ...Amplify.getConfig(),
      Interactions: {
        LexV2: {
          'NegotiateandMakeAppointmentBot': {
            aliasId: 'CFDVKWBDVM',
            botId: 'I3UNKY6RXF',
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

    if(this.displayUserName != null) {
      return this.displayUserName;
    }
    this.printUser(null);
    this.displayUserName = localStorage.getItem("preferred_username");
    if(this.displayUserName == null || this.displayUserName == "") {
      alert("User name is null or empty");
      this.displayUserName = "User";
    }

    this.registerUser();

    return this.displayUserName;
  }

  private async registerUser() {
    /*
    invoke the following api to register the user
https://dnrfcutbrg.execute-api.us-east-1.amazonaws.com/default/LinkersUserRegistration

Method: POST
Body:
{
 "userName": "Sam",
 "userPassword": "ABCFDTS",
 "userEmail": "mailto:john.doe@example.com",
 "userZipCode": "87009",
 "userCity": "Holand"
}


Response:
{
   "userID": "Linker2"
}
    */
    console.log("Registering user");
    const response = await fetch('https://dnrfcutbrg.execute-api.us-east-1.amazonaws.com/default/LinkersUserRegistration', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: localStorage.getItem("preferred_username"),
          userLastName: localStorage.getItem("family_name"),
          userPassword: "ABCFDTS",
          userEmail: localStorage.getItem("email"),
          userNumber: localStorage.getItem("phone_number"),
          userZipCode: localStorage.getItem("zip_code"),
          userCity: localStorage.getItem("city")})
        });

    const data = await response.json();
    console.log("User registration response: " + data);

  }

  public async sendMessageToBot(){
    console.log("Sending message to bot");

    const response = await Interactions.send({
      botName: "NegotiateandMakeAppointmentBot",
      message: "Rest session"
    });

    console.log("111111111");
    const response1 = await this.sendMessage("i want to make an appointment to see a doctor?");
    console.log("22222222");
    const response2 = await this.sendMessage("Dentist");
    console.log("3333333333");
    const response3 = await this.sendMessage("Tomorrow 10am");
    console.log("4444444444");
    const response31 = await this.sendMessage("10am");
    console.log("555555555");
    const response4 = await this.sendMessage("Yes");
    console.log("6666666666");
  }

  private async sendMessage(userInput: string) {
    

    // Provide a bot name and user input
    const response = await Interactions.send({
      botName: "NegotiateandMakeAppointmentBot",
      message: userInput
    });
    

    //response is coming back with the following json format:
    /*
    {
    "$metadata": {
        "httpStatusCode": 200,
        "requestId": "dba39f03-de34-4fd2-bd28-b30184530eb8",
        "attempts": 1,
        "totalRetryDelay": 0
    },
    "interpretations": [
        {
            "intent": {
                "confirmationState": "None",
                "name": "FallbackIntent",
                "slots": {},
                "state": "ReadyForFulfillment"
            },
            "interpretationSource": "Lex"
        },
        {
            "intent": {
                "name": "BookMedicalAppointment",
                "slots": {}
            },
            "interpretationSource": "Lex",
            "nluConfidence": {
                "score": 0.69
            }
        },
        {
            "intent": {
                "name": "ThankUser",
                "slots": {}
            },
            "interpretationSource": "Lex",
            "nluConfidence": {
                "score": 0.55
            }
        },
        {
            "intent": {
                "name": "NegotiationKnowledgeBaseGetServiceInfo",
                "slots": {}
            },
            "interpretationSource": "Lex",
            "nluConfidence": {
                "score": 0.48
            }
        },
        {
            "intent": {
                "name": "GreetUser",
                "slots": {}
            },
            "interpretationSource": "Lex",
            "nluConfidence": {
                "score": 0.44
            }
        }
    ],
    "messages": [
        {
            "content": "I’m sorry, I didn’t catch that. Could you please repeat?",
            "contentType": "PlainText"
        }
    ],
    "sessionId": "us-east-2:c8880e45-24f0-cdb2-cd82-6bf71424041c",
    "sessionState": {
        "dialogAction": {
            "type": "Close"
        },
        "intent": {
            "confirmationState": "None",
            "name": "FallbackIntent",
            "slots": {},
            "state": "ReadyForFulfillment"
        },
        "originatingRequestId": "3793f586-37ae-4cf1-b22a-36dbcd16fdd5",
        "sessionAttributes": {}
    }
}
    */


    // Log chatbot response
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1");

    response['messages'].forEach((message: any) => {
      console.log(message.content);
      console.log(message.contentType);
    });

    //print sessionId
    console.log("sessionId====", response['sessionId'])

    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX2");
    
    console.dir(response);
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX3");

    return response;
    
  }
}
