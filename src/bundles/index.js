import { composeBundles, createCacheBundle } from 'redux-bundler';

import auth from '@bundles/auth';
import routes from '@bundles/routes';
import baseData from '@bundles/base-data';
import extraArgs from '@bundles/extra-args';
import tasks from '@bundles/tasks';
import cache from '@common/utils/cache';

export default composeBundles(
  routes,
  auth,
  baseData,
  tasks,
  createCacheBundle(cache.set),
  extraArgs,
);
