import axios from 'axios'
import type { Status as Tweet } from 'twitter-d'
import chalk from 'chalk'
import ora from 'ora'

import getErrorLabel from './error'

const timelineEndPoint = 'https://api.twitter.com/1.1/statuses/user_timeline.json'
// const limitEndPoint = 'https://api.twitter.com/1.1/application/rate_limit_status.json'

// const getLimit = (twitterToken: string): Promise<any> => {
//   const headers = {
//     Authorization: `Bearer ${twitterToken}`
//   }
//   const params = {
//     resources: 'statuses'
//   }
//   return new Promise((resolve, reject) => {
//     axios
//       .get(limitEndPoint, { headers, params })
//       .then((response) => response.data)
//       .then((result) => {
//         resolve(result.resources)
//         const count = result.resources.statuses['/statuses/user_timeline'].remaining as number
//         if (typeof count === 'number') resolve(count)
//       })
//       .catch((err) => {
//         reject(err.response.data.errors[0].code)
//       })
//   })
// }

const getTweets = (twitterToken: string, params: params): Promise<Tweet[]> => {
  const headers = {
    Authorization: `Bearer ${twitterToken}`
  }
  const _params: paramsEx = {
    count: 200,
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
        return resolve(result)
      })
      .catch(async (err) => {
        return reject(err.response)
      })
  })
}

const getAllTweets = async (
  twitterToken: string,
  params: params,
  json: Tweet[] = []
): Promise<Tweet[]> => {
  try {
    const result = await getTweets(
      twitterToken,
      json.length ? { ...params, max_id: json.slice(-1)[0].id_str } : params
    )
    if (result.length > 1) {
      const _json = json.concat([...result])
      return getAllTweets(twitterToken, params, _json)
    }
    return json
  } catch (err) {
    console.log(err.data)
    if (err.data['request']) {
      console.log(`${chalk.bgRed('ERROR!')} 引数がおかしいよ`)
      return json
    } else if (err.data.errors[0].code === 88) {
      const spinner = ora(`${chalk.bgRed('WAIT')} Twitter APIの上限により15分停止します`)
      spinner.color = 'yellow'

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          spinner.succeed(`${chalk.bgGreen('RUN')} 動作を再開します`)
          return resolve(getAllTweets(twitterToken, params, json))
        }, 15 * 60 * 1000)

        // const timer = setTimeout(() => {
        //   spinner.succeed(`${chalk.bgGreen('RUN')} 動作を再開します`)
        //   return resolve(getAllTweets(twitterToken, params, json))
        // }, 15 * 60 * 1000)
        // process.on('SIGINT', () => {
        //   spinner.succeed(`${chalk.bgYellow('FINISH')} 動作を終了し、取得したデータを保存します`)
        //   clearTimeout(timer)
        //   return resolve(json)
        // })
      })
    }
    console.log(`${chalk.bgRed('ERROR!')} ${getErrorLabel(err.data.errors[0].code as number)}`)

    return json
  }
}

// const twitterRequest = async (
//   twitterToken: string,
//   params: params,
//   json: Tweet[] = []
// ): Promise<Tweet[]> => {
//   const onepiece = await getAllTweets(twitterToken, params, json)
//   // const onepiece = await getLimit(twitterToken)
//   return onepiece
// }

export default getAllTweets
