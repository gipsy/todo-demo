import React from 'react';
import Tasks from '@components/tasks';

export default () => (
  <div>
    <h2>Private</h2>
    <p>Nice, you're logged in and can now see this private page!</p>
    {/* <Upload /> */}
    <Tasks />
  </div>
);
