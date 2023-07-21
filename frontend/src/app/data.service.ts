import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }

  register(username: string, email: string, password: string, password2: string) {
    const data = {
      username: username,
      email: email,
      password: password,
      password2: password2
    };

    return fetch('http://127.0.0.1:8000/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json());
  }

  login(data: any) {
    return fetch('http://127.0.0.1:8000/login/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json());
  }
}
