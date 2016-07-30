animaze
-------

Supersmall animation library. [AMD is supported.]

`npm install --save animaze`

```js
import animaze from 'animaze';

const animazeOpacity = () => animaze({
    onTick: { v => myDiv.style.opacity = v; }, // v is varied from 0 to 1
                                               // during animation
});

const animazeScroll = () =>  animaze({
    onTick: { window.scrollTo(0, 200 * v) },
    duration: 500, // default is 250
    ease: k => 0.5 * (1 - Math.cos(Math.PI * k)), // this is default one
});

animazeOpacity().then(animazeScroll); // animaze returns Promise

```
