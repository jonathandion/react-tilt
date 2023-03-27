# react-tilt

![react-tilt demo gif](https://github.com/jonathandion/react-tilt/blob/master/demo.gif)

React version of [tilt.js](https://github.com/gijsroge/tilt.js)

## Demo

- [Reddit](https://nft.reddit.com/)
- [VX](https://vx-demo.now.sh/gallery)

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
| onMouseEnter     | () -> React.SyntheticEvent     |
| onMouseMove      | () -> React.SyntheticEvent     |
| onMouseLeave     | () -> React.SyntheticEvent     |
| options          | Object    |

## Alternatives

- **JQuery JS version:** https://github.com/gijsroge/tilt.js
- **Vanilla JS version:** https://github.com/micku7zu/vanilla-tilt.js

### Check Also

- [Web Configs](https://github.com/jonathandion/web-configs) - Monorepo for all common configurations for building web apps.
- [My Neovim Config](https://github.com/jonathandion/web-dev.nvim) - Small Neovim configuration written in Lua that is specifically designed for web development.
