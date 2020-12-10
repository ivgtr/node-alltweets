import meow from 'meow'
import chalk from 'chalk'
import updateNotifier from 'update-notifier'
import type { Package } from 'update-notifier'
import * as dotenv from 'dotenv'

import createFile from './lib/createFile'

dotenv.config()

const { TWITTER_BEARER_TOKEN: bearerToken } = process.env

const main = () => {
  const cli = meow(
    `
	Usage
	  $ allTweets [SCREEN_NAME] <options>
	Options
	  $ allTweets yuzuki_roa
	  $ allTweets yuzuki_roa -r, --retweets
    Include retweets
	  $ allTweets yuzuki_roa -y, --yaml
    Use YAML instead of JSON
	  $ allTweets yuzuki_roa -b [TWITTER_BEARER_TOKEN]
    If you don't set TWITTER_BEARER_TOKEN in .env, specify it here
    `,
    {
      flags: {
        retweets: {
          type: 'boolean',
          alias: 'r',
          default: false
        },
        yaml: {
          type: 'boolean',
          alias: 'y',
          default: false
        },
        bearer: {
          type: 'string',
          alias: 'b'
        }
      }
    }
  )

  updateNotifier({ pkg: cli.pkg as Package }).notify()

  const { input, flags } = cli
  if (!input[0]) {
    console.log(`${chalk.bgRed('ERROR!')} 取得するTwitterIDを入力してください`)
    return
  }
  const token = flags.bearer ? flags.bearer : bearerToken ? bearerToken : undefined
  if (!token) {
    console.log(`${chalk.bgRed('ERROR!')} TWITTER_BEARER_TOKENを指定してください`)
    return
  }
  createFile(token, { twitterId: input[0], rt: flags.retweets, yaml: flags.yaml }).then(
    (path: string) => {
      console.log(`${chalk.bgGreen('SUCCESS!')} ${path} に出力されました`)
    }
  )
}

;(() => {
  main()
})()
