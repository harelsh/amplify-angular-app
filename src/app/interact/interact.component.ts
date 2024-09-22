import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Interactions } from '@aws-amplify/interactions';


@Component({
  selector: 'app-interact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './interact.component.html',
  styleUrl: './interact.component.css',
})
export class InteractComponent implements OnInit {
  messages: any[] = [];
  message: string = '';

  ngOnInit(): void {
    
  }

  closeMe() {
    localStorage.setItem('appState', 'main');
  }

  async sendMessageToBot() {
    console.log("XXXXXXXXX Sending message to bot: " + this.message);
    this.messages.push({text: this.message, from: 'me'});

    const response = await Interactions.send({
      botName: "NegotiateandMakeAppointmentBot",
      message: this.message
    });

    this.message = '';

    console.log("XXXXXXXXX Bot response: ");
    response['messages'].forEach((message: any) => {
      console.log(message.content);
      console.log(message.contentType);
      this.messages.push({text: message.content, from: 'bot'});
    });
  }
}
