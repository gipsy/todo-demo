// import { configure } from '@storybook/react';
//
// function loadStories() {
//   require('../stories');
// }
//
// configure(loadStories, module);

import 'loki/configure-react';
import { configure } from '@storybook/react'
// import '../src/index.css'

const req = require.context('../src', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)