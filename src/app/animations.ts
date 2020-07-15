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

export const highlightDiffer = (v1: number, v2: number): number =>
  v1 > v2 ? 1 : v2 > v1 ? -1 : 0;

export const highlight = animation([
  style({
    backgroundColor: '#FFEB3B',
  }),
  animate(
    '1.5s ease',
    style({
      backgroundColor: 'transparent',
    })
  ),
]);

export const positiveHighlight = animation([
  style({
    backgroundColor: '#4CAF50',
  }),
  animate(
    '1.5s ease',
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
    '1.5s ease',
    style({
      backgroundColor: 'transparent',
    })
  ),
]);
