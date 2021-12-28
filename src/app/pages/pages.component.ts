import { Component, OnInit } from '@angular/core';

// Services
import { LoadScriptsService } from '../services/load-scripts.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor( private loadScripts: LoadScriptsService ) { 
    // loadScripts.loadScript(
    //   [
    //     "main.js",
    //     "polyfills.js",
    //     "././assets/js/app.js"
    //   ]
    // );
  }
  
  ngOnInit(): void {

  }

}
