import { composeBundles, createCacheBundle } from 'redux-bundler'

import extraArgs from '@bundles/extra-args'
import tasks from '@bundles/tasks'
import menu from '@bundles/menu'
import cache from '@common/utils/cache'

export default composeBundles(
  tasks,
  menu,
  createCacheBundle(cache.set),
  extraArgs,
)
