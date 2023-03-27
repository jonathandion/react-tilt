<h1 align="center">
react-tilt 🪄
</h1>
<h4 align="center">
A tiny requestAnimationFrame powered 60+fps lightweight parallax hover tilt effect for ReactJS.
</h4>
<p align="center" style="text-align: center;">
<a href="https://www.npmjs.com/package/react-tilt"><img src="https://img.shields.io/npm/dw/react-tilt" alt="react-tilt downloads"></a>
<a href="https://www.npmjs.com/package/react-tilt"><img src="https://img.shields.io/npm/v/react-tilt" alt="react-tilt version"></a>
<a href="https://twitter.com/@0xjdion"><img src="https://img.shields.io/twitter/url/https/twitter.com/blueaquilae.svg?style=social&amp;label=Follow%20%400xjdion" alt="Jonathan Dion Twitter"></a>
</p>

![react-tilt demo gif](https://github.com/jonathandion/react-tilt/blob/master/demo.gif)

## Demo

- [Reddit NTFs](https://nft.reddit.com/)
- [VX Demo](https://vx-demo.now.sh/gallery)

## Install

```bash
pnpm add react-tilt react react-dom
# or
npm install react-tilt react react-dom
# or
yarn add react-tilt react react-dom
```

## Usage

```tsx
import { Tilt } from 'react-tilt'

const defaultOptions = {
	reverse:        false,  // reverse the tilt direction
	max:            35,     // max tilt rotation (degrees)
	perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
	scale:          1.1,    // 2 = 200%, 1.5 = 150%, etc..
	speed:          1000,   // Speed of the enter/exit transition
	transition:     true,   // Set a transition on enter/exit.
	axis:           null,   // What axis should be disabled. Can be X or Y.
	reset:          true,    // If the tilt effect has to be reset on exit.
	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}

const App = () => {
  return (
    <Tilt options={defaultOptions} style={{ height: 250, width: 250 }}>
      <div>👽</div>
    </Tilt>
  )
}
```

## Props

| Property         | Signature           | 
| -------------    |:-------------:|
| onMouseEnter     | (event: React.SyntheticEvent) -> void  |
| onMouseMove      | (event: React.SyntheticEvent) -> void  |
| onMouseLeave     | (event: React.SyntheticEvent) -> void  |
| options          | Options    |

## Alternatives

- **JQuery JS version:** https://github.com/gijsroge/tilt.js
- **Vanilla JS version:** https://github.com/micku7zu/vanilla-tilt.js

### Check Also

- [Web Configs](https://github.com/jonathandion/web-configs) - Monorepo for all common configurations for building web apps.
- [My Neovim Config](https://github.com/jonathandion/web-dev.nvim) - Small Neovim configuration written in Lua that is specifically designed for web development.
