import { animation, style, animate } from '@angular/animations';

export const slideIn = animation([
  style({
    opacity: 0,
    transform: 'translateY(75%)',
  }),
  animate(
    '0.5s ease',
    style({
      opacity: 1,
      transform: 'translateY(0%)',
    })
  ),
]);

export const positiveHighlight = animation([
  style({
    backgroundColor: '#4CAF50',
  }),
  animate(
    '2s ease',
    style({
      backgroundColor: 'transparent',
    })
  ),
]);

export const negativeHighlight = animation([
  style({
    backgroundColor: '#F44336',
  }),
  animate(
    '2s ease',
    style({
      backgroundColor: 'transparent',
    })
  ),
]);
