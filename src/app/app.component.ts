
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

declare const gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title: string = 'angular-historia-clinica';
  loadingDataImg: boolean = false;
 
  constructor(private router: Router, private activatedRoute: ActivatedRoute, 
    private titleService: Title) {
    router.events.subscribe(event => { 
      this.navigationInterceptor(event);
    });

    /** START : Code to Track Page View using gtag.js */
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
       gtag('event', 'page_view', {
          page_path: event.urlAfterRedirects
       })
      })
      /** END : Code to Track Page View  using gtag.js */

      //Add dynamic title for selected pages - Start
      router.events.subscribe(event => {
        if(event instanceof NavigationEnd) {
          var title = this.getTitle(router.routerState, router.routerState.root).join(' > ');
          titleService.setTitle(title);
        }
      });
      //Add dynamic title for selected pages - End
  }
  
  ngOnInit() {
    window.scrollTo(0, 0);
  }

  // collect that title data properties from all child routes
  // there might be a better way but this worked for me
  getTitle(state, parent) {
    var data = [];
    if(parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if(state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: any): void {

  //Triggered When the navigation starts
    if (event instanceof NavigationStart) {
      this.loadingDataImg = true;
    }
  //Triggered When the navigation ends
    if (event instanceof NavigationEnd) {
      this.loadingDataImg = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loadingDataImg = false;
    }
  //Triggered When the error occurrs while navigation
    if (event instanceof NavigationError) {
      this.loadingDataImg = false;
    }
  }
}