import { composeBundles, createCacheBundle } from 'redux-bundler';

import auth from '@bundles/auth';
import extraArgs from '@bundles/extra-args';
import tasks from '@bundles/tasks';
import cache from '@common/utils/cache';

export default composeBundles(
  auth,
  tasks,
  createCacheBundle(cache.set),
  extraArgs,
);
