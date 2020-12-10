import axios from 'axios'
import type { Status as Tweet } from 'twitter-d'
import chalk from 'chalk'
import ora from 'ora'

const timelineEndPoint = 'https://api.twitter.com/1.1/statuses/user_timeline.json'
const limitEndPoint = 'https://api.twitter.com/1.1/application/rate_limit_status.json'

const getLimit = (twitterToken: string): Promise<number> => {
  const headers = {
    Authorization: `Bearer ${twitterToken}`
  }
  const params = {
    resources: 'statuses'
  }
  return new Promise((resolve, reject) => {
    axios
      .get(limitEndPoint, { headers, params })
      .then((response) => response.data)
      .then((result) => {
        const count = result.resources.statuses['/statuses/user_timeline'].remaining as number
        if (typeof count === 'number') resolve(count)
      })
      .catch((err) => {
        reject(err.response.data.errors[0].code)
      })
  })
}

export const getTweets = (twitterToken: string, params: params, json: Tweet[] = []) => {
  const headers = {
    Authorization: `Bearer ${twitterToken}`
  }
  const _params: paramsEx = {
    count: 2,
    exclude_replies: false,
    include_rts: false,
    tweet_mode: 'extended',
    ...params
  }

  return new Promise((resolve, reject) => {
    axios
      .get(timelineEndPoint, { headers, params: _params })
      .then((response) => response.data)
      .then((result: Tweet[]) => {
        if (result.length) {
          const _json = json.concat([...result])

          return resolve(_json)
        }
        return resolve(json)
      })
      .catch(async (err) => {
        return reject(err.response.data.errors[0])
      })
  })
}

export const getAllTweets = async (twitterToken: string, params: params) => {
  const onepiece = await getTweets(twitterToken, params)
  // const onepiece = await getLimit(twitterToken)
  return onepiece
}
