import { composeBundles, createCacheBundle } from 'redux-bundler'

import extraArgs from '@bundles/extra-args'
import tasks from '@bundles/tasks'
import cache from '@common/utils/cache'

export default composeBundles(tasks, createCacheBundle(cache.set), extraArgs)
