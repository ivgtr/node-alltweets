// import ora from 'ora'
import fs from 'fs'
import path from 'path'

const dir = process.cwd()

/**
 * process.cwd()に同一ファイルがあるか調べる
 * @param {string} fileName - ファイル名を渡す
 * @returns {Promise<function | st>} ファイル名を返す
 */
const checkProcess = (fileName: string) => {
  // ひとまずは上書きで良いのでそのままファイル名を返す
  return fileName
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
  twitterId: string,
  token: string,
  rt: boolean = false,
  yaml: boolean = false
): Promise<string> => {
  const fileName = checkProcess(yaml ? `${twitterId}.yaml` : `${twitterId}.json`)
  const dirPath = path.join(dir, fileName)

  return dirPath
}

export default allTweets
