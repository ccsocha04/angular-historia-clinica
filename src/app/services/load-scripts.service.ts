import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadScriptsService {

  constructor() { }

  loadScript(files: string[]) {
    for (let file of files) {
      const body = <HTMLDivElement>document.body;
      const script = document.createElement('script');
      script.src = file
      body.appendChild(script);
    }
  }

}
