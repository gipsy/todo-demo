## About this demo

This demo is using the latest versions of everything it can, React, babel, webpack, etc, with some sensible defaults for bundling. For state management, it's using [redux-bundler](https://reduxbundler.com/) which is an abstraction on top of [redux](https://redux.js.org/) and [reselect](https://github.com/reactjs/reselect). State is persisted locally through [money-clip](https://github.com/HenrikJoreteg/money-clip).
[react-hot-loader](https://github.com/gaearon/react-hot-loader) is also implemented for hot module reloading (HMR) during development. [Prettier](https://prettier.io/) is used for code formatting. Format by using `yarn format`. For UI there are [antd](https://ant.design/) and [styled-components](https://www.styled-components.com/).
It also include [storybook](https://storybook.js.org/) configuration for styleguide UI ecosystem and components reuse amongst developers.

#### Development

Running `yarn && yarn dev` will install dependencies and spin up the development server with HMR. [Don't have yarn?](https://yarnpkg.com/en/docs/install)

#### Production

Running `yarn build` will bundle the application for use in production.

#### Deployment

Deploy easily with [now](https://now.sh) by running `now` or use another service like heroku/digital ocean.

## About the author

[Taras Gavrysh](ter4444@gmail.com) is an independent designer and developer.

###### To Do

* Accomplish Create task view and api to send data to backend
* Accomplish pin/archive task functionality
* Accomplish Delete task functionality
* Configure styled-components theme for <ThemeProvider> to play nicely with antd
* Style components
* Cover api/components with tests and configure loki for visual regression testing
* Add stories for components to reflect it's functionality in storybook styleguide

Last updated: 09/10/2018
