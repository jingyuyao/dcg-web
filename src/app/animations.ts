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
