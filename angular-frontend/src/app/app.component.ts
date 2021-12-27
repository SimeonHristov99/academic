import { animate, query, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnim', [
      transition('* => *', [
        style({
          position: 'relative'
        }),

        query(':enter', [
          style({ opacity: 0, height: '100%' })
        ], { optional: true }),

        query(':leave', [
          style({
          }),
          animate(1000, style({
            opacity: 0,
            height: '100%',
          }))
        ], { optional: true }),

        query(':enter', [
          style({
            opacity: 0,
          }),
          animate(1000)
        ], { optional: true }),

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

  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) return outlet.activatedRoute.snapshot.url;
    return undefined;
  }

}
