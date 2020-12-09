import axios from 'axios'
import type { Status as Tweet, FullUser } from 'twitter-d'

const endPoint = 'https://api.twitter.com/1.1/statuses/user_timeline.json'

export const getTweets = (twitterToken: string, _params: params, json: Tweet[] = []) => {
  const headers = {
    Authorization: `Bearer ${twitterToken}`
  }
  const params: paramsEx = {
    count: 20,
    exclude_replies: false,
    include_rts: false,
    tweet_mode: 'extended',
    ..._params
  }
  return new Promise((resolve, reject) => {
    axios
      .get(endPoint, { headers, params })
      .then((response) => response.data)
      .then((data: Tweet[]) => {
        data.map((i) => {
          const user = i.user as FullUser
          console.log(user.name)
          return i
        })
        // console.log(data.user)
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const getAllTweets = async () => {
  const onepiece = await getTweets()
  return onepiece
}
