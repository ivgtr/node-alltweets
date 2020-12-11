import json from '../configs/error.json'

/**
 * errorコードを元に、error.jsonを参照してerrorテキストを返す
 * @param {number} code - errorコード
 * @returns {string} error.jsonを参照してerrorテキストを返す
 */
const returnError = (code: number): string => {
  const result = json.find((i) => {
    return i.code === code
  })
  if (result) {
    return result.text
  }
  return '不明なエラー...時間を空けてから再度試してみてしてみてください'
}

export default returnError
