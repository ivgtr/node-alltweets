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

export const getTweets = (twitterToken: string, _params: params, json: Tweet[] = []) => {
  console.log('start')
  const headers = {
    Authorization: `Bearer ${twitterToken}`
  }
  const params: paramsEx = {
    count: 2,
    exclude_replies: false,
    include_rts: false,
    tweet_mode: 'extended',
    ..._params
  }

  return new Promise((resolve, reject) => {
    try {
      axios
        .get(timelineEndPoint, { headers, params })
        .then((response) => response.data)
        .then((result: Tweet[]) => {
          if (result.length) {
            console.log(json)

            const _json = json.concat([...result])

            console.log(_json)

            if (_json.length > 30) {
              return resolve(_json)
            }
            return resolve(
              getTweets(twitterToken, { ..._params, max_id: result.slice(-1)[0].id_str }, _json)
            )
          }
          return resolve(json)
        })
        .catch(async (err) => {
          console.log(err.response.data.errors[0].code)
          const spinner = ora(`${chalk.bgRed('ERROR')} エラー内容を確認します`).start()
          try {
            const result = await getLimit(twitterToken)
            if (result < 1) {
              spinner.color = 'yellow'
              spinner.text = `${chalk.bgYellow('STOP')} API上限により15分ほど停止します`
              setTimeout(() => {
                spinner.succeed('再開します')
                resolve(getTweets(twitterToken, _params, json))
              }, 900 * 1000)
            } else {
            }
          } catch (err) {
            console.log(err)
          }
        })
    } catch (err) {
      console.log('trycatchでキャッチしたエラ-----------------------------')
      console.log(err)
      console.log('trycatchでキャッチしたエラ-----------------------------終わり')
    }
  })
}

export const getAllTweets = async (twitterToken: string, _params: params) => {
  const onepiece = await getTweets(twitterToken, _params)
  // const onepiece = await getLimit(twitterToken)
  return onepiece
}
