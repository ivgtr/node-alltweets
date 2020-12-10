import fs from 'fs'
import path from 'path'
import yamlJson from 'js-yaml'
import getAllTweets from './twitterRequest'

const dir = process.cwd()

/**
 * process.cwd()に同一ファイルがあるか調べる
 * @param {string} fileName - ファイル名を渡す
 * @param {boolean} yaml - yaml形式か
 * @returns {Promise<function | st>} ファイルを返す
 */
const checkProcess = (fileName: string, yaml: boolean) => {
  return []
}

/**
 * tweetを取得し、jsonかyamlでファイルを書き出し、書き出したpathを返す
 * @param {string} twitterId - 取得したいTwitterIdを指定する
 * @param {string} token - 設定したTwitterBearerTokenをいれる
 * @param {boolean} rt - rtを表示するか指定する
 * @param {boolean} yaml - yaml形式で出力するか指定する
 * @returns {Promise<string>} 書き出したpath
 */
const allTweets = async (
  token: string,
  options: {
    twitterId: string
    rt: boolean
    yaml: boolean
  } = { twitterId: '', rt: false, yaml: false }
): Promise<string> => {
  const fileName = options.yaml ? `${options.twitterId}.yaml` : `${options.twitterId}.json`

  const dirPath = path.join(dir, fileName)

  const json = checkProcess(fileName, options.yaml)

  const params: params = {
    screen_name: options.twitterId,
    include_rts: options.rt
  }

  const tweetData = await getAllTweets(token, params, json)

  if (options.yaml) {
    const yamlData = yamlJson.dump(tweetData)
    fs.writeFileSync(dirPath, yamlData)
  } else {
    fs.writeFileSync(dirPath, JSON.stringify(tweetData, null, 2))
  }

  return dirPath
}

export default allTweets