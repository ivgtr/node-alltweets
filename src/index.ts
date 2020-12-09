import fs from 'fs'
// import { exec } from 'child_process'
import yaml from 'js-yaml'
import { getAllTweets } from './lib/twitterRequest'

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
  const path = process.cwd()
  const json = await getAllTweets()

  fs.writeFileSync(`${path}/hoge.json`, JSON.stringify(json, null, 2))
  const data = yaml.dump(json)
  fs.writeFileSync(`${path}/hoge.yaml`, data)
}

export default main
