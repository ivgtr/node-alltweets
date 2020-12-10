import fs from 'fs'
// import { exec } from 'child_process'
import yaml from 'js-yaml'
import * as dotenv from 'dotenv'
import { getAllTweets } from './lib/twitterRequest'

dotenv.config()

const { TWITTER_BEARER_TOKEN: bearerToken } = process.env

// const json = [
//   {
//     id: 1,
//     gohan: 'aaa'
//   },
//   {
//     id: 2,
//     gohan: 'aaa'
//   },
//   {
//     id: 3,
//     gohan: 'aaa'
//   }
// ]
const main = async (): Promise<void> => {
  console.log('start')
  const path = process.cwd()
  const token = bearerToken as string
  const json = await getAllTweets(token, { screen_name: 'yuzuki_______roa' })

  fs.writeFileSync(`${path}/hoge.json`, JSON.stringify(json, null, 2))
  const data = yaml.dump(json)
  fs.writeFileSync(`${path}/hoge.yaml`, data)
}

export default main()
