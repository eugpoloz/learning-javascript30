# Wes Bos #Javascript30 Notes

These are my notes on Wes Bos' awesome #Javascript30 challenge! I think I'll convert them into a blog post one of these days, but this is gonna do for now. :smile:

***

&nbsp;

## 1. Javascript Drum Kit

### Javascript:
```
function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if(!audio) return;
  audio.currentTime = 0;
  audio.play();
  key.classList.add('playing');
}

function removeTransition(e) {
  if(e.propertyName !== 'transform') return;
  this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', playSound);
```

### Notes:
- You can add event listeners when CSS animation ends.
- You can check if event has `propertyName` of a CSS property, and if it's animated, it will go away when animation is finished, so you can also check that it's not there anymore and do stuff w/ your code.
- `${foo}` is da bomb!
- `=>` shorthand for function is da bomb too!
- You can use `currentTime = 0` to reset the timing of audio if it's fired on event.

***

&nbsp;

## 2. JS + CSS Clock

### CSS:

```

    .hand {
      transform-origin: 100%;
      transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
    }
```

### Javascript:

```

    const secondHand = document.querySelector('.second-hand');
    const minHand = document.querySelector('.min-hand');
    const hourHand = document.querySelector('.hour-hand');

    function setDate() {
        const now = new Date();

        const seconds = now.getSeconds();
        const secondsDegrees = ((seconds / 60) * 360) + 90;
        secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

        const minutes = now.getMinutes();
        const minutesDegrees = ((minutes / 60) * 360) + 90;
        minHand.style.transform = `rotate(${minutesDegrees}deg)`;

        const hours = now.getHours();
        const hoursDegrees = ((hours / 12) * 360) + 90;
        hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    }

    setInterval(setDate, 1000);
```

### Notes:
- `transform-origin` property handles the origin of transform if you don't want it from the exact center of the element.
- You can play w/ `transition-timing-function` at Chrome Dev Tools and then copy your `cubic-bezier`! _Incredible._
- `Date()` can be parsed into `getSeconds()`, `getMinutes()`, `getHours()`... and so on, I think. Rad.
- `setInterval()` is da bomb too! ~~Although I think I knew it already...~~
- Code is not finished; you need to either reset transform for a while or make the degree count a neverending one to ensure a smooth transition between 0 and 360 degrees.

***

&nbsp;

## 3. CSS Variables

### CSS:

```

    :root {
      --base: #ffc600;
      --spacing: 10px;
      --blur: 10px;
    };
    img {
      background: var(--base);
      padding: var(--spacing);
      filter: blur(var(--blur));
    }
    .h1 {
      color: var(--base);
    }
```

### Javascript:

```

    const inputs = document.querySelectorAll('.controls input');

    function handleUpdate() {
      const suffix = this.dataset.sizing || '';
      document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    }

    inputs.forEach(input => input.addEventListener('change', handleUpdate));
    inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
```

### Notes:
- CSS variables are declared on the highest elem on the page, which in this case is `:root`. You can declare on any elem, though; then cascade takes precedence. (`h1` is more specific than `:root`, for example.)
- The syntax is: `--variable: stuff` for declaring variable and `property: var(--variable)` for actually assigning it.
- You can update CSS variables with JS!
- If variable requires units, you can handle adding those with custom `data-` HTML prop.
- `.dataset` can be called to retrieve every `data-` HTML prop, and you can select one of them with typical object syntax. E.g., if your prop on `this` elem is `data-stuff`, then you target it with `this.dataset.stuff`. _Neat-o!_