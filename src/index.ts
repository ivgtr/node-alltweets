import type { Status } from 'twitter-d'
import yamlJson from 'js-yaml'

import getAllTweets from './lib/twitterRequest'

const main = async (
  token: string,
  options: {
    twitterId: string
    rt: boolean
    yaml: boolean
  } = { twitterId: '', rt: false, yaml: false },
  json: Status[] = []
) => {
  const params: params = {
    screen_name: options.twitterId,
    include_rts: options.rt
  }
  const tweetData = await getAllTweets(token, params, [])

  if (options.yaml) {
    const yamlData = yamlJson.dump(json)
    return yamlData
  }

  return tweetData
}

export default main
