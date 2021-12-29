import { animate, query, style, transition, trigger, group } from '@angular/animations';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

export interface Greeting {
  header: string,
  context: string,
  inUser?: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnim', [
      transition(':increment', [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),

        group([
          query(':leave', [
            style({
            }),
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'translateX(-50px)',
              height: '100%',
            }))
          ], { optional: true }),

          query(':enter', [
            style({
              opacity: 0,
              transform: 'translateX(50px)',
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0px)',
            }))
          ], { optional: true }),
        ]),

        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%'
          })
        ], { optional: true })
      ]),

      transition(':decrement', [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),

        group([
          query(':leave', [
            style({
            }),
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'translateX(50px)',
              height: '100%',
            }))
          ], { optional: true }),

          query(':enter', [
            style({
              opacity: 0,
              transform: 'translateX(-50px)',
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0px)',
            }))
          ], { optional: true }),
        ]),

        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%'
          })
        ], { optional: true })
      ])
    ])
  ]
})
export class AppComponent {

  header: string = '';
  context: string = '';
  inUser: boolean = false;

  defaultHeader: string = 'Welcome to Academic';
  defaultContext: string = 'Create an account or log in to access out courses';

  constructor(public router: Router) {
  }

  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) return outlet.activatedRouteData['tab'];
    return undefined;
  }

  updateGreeting(event: any) {
    if (event.greeting) {
      this.header = event.greeting.header;
      this.context = event.greeting.context;
      this.inUser = (event.greeting.inUser ? true : false);
    } else {
      this.header = '';
      this.context = '';
      this.inUser = false;
    }
  }

}
