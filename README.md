<div align="center">
  <h3 align="center">node-alltweets</h3>
  <p align="center">Node.jsを使って誰かの全ツイート(直近3200ツイート)をダウンロードします。</p>
  <p>日本語 | <a href="https://github.com/ivgtr/node-alltweets/blob/master/docs/README_EN.md" >ENGLISH</a></p>
</div>

---

> 📌✨ inspire: https://github.com/tatzyr/alltweets

- _全ツイートというのは嘘で、APIの仕様上直近3200ツイートしか取得できませんでした..._  

## Install
### Global Install Usage
```shell
npm i -g alltweets
```
### Module Import Usage
```shell
npm i alltweets --save
```

## Setup
### 必要なもの
- Node.js
- Twitter アカウント
   - 開発者申請をする必要がある

### 準備
1. Twitter Developers ページで、任意のアカウントでログインします (https://developer.twitter.com/en/apps/)
   1. 新しいApp を作成するために開発者申請をします
   1. 新しいApp を作成し、`Bearer Token` を作成し、コピーしておきます
   1. 作業フォルダに`.env`ファイルを作成し、`TWITTER_BEARER_TOKEN=xxxx`(`xxx`は上でコピーした`Bearer Token`)を記述して、保存します

### 使い方
#### Commands
- `alltweets <SCREEN_NAME> [options]`: SCREEN_NAMEの全ツイートをダウンロードできます  
_howto:<SCREEN_NAME>=@xxxxのxxxx部分_

#### Options
| Property                          | Arias                       | Description                                    | Type      | Required |  Default |
| --------------------------------- | --------------------------- | ---------------------------------------------- | --------- | -------- |  ------- |
| `--retweets`                      | `-r`                        | リツイートを含むか                             | `boolean` | no       |  `false` |
| `--yaml`                          | `-y`                        | yaml形式で出力するか、`false`ならjson形式      | `boolean` | no       |  `false` |
| `--bearer <TWITTER_BEARER_TOKEN>` | `-b <TWITTER_BEARER_TOKEN>` | `.env`内かここでTWITTER_BEARER_TOKENを指定する | `string`  | no       |  `''`    |

#### Examples
- `alltweets ivgtr`: @ivgtrの全ツイートをJSONでダウンロードします
- `alltweets ivgtr -r`: @ivgtrのRTを含めた全ツイートをJSONでダウンロードします
- `alltweets ivgtr -y`: @ivgtrの全ツイートをYAMLでダウンロードします

#### Using node-alltweets from JS/TS Modules
```js
import alltweets from "alltweets"

const tweetDate = await alltweets(
  token : "TWITTER_BEARER_TOKEN", // TWITTER_BEARER_TOKENを指定
  options : {
    twitterId: "SCREEN_NAME",    // 取得したいSCREEN_NAMEを指定
    rt: false,                   // リツイートを含むか指定
    yaml: false                  // yaml形式で出力するか、json形式で出力するか指定
  },
  json : []                      // 途中まで実行して保存されたデータを指定してもいいし、しなくてもいい
)

console.log(tweetDate)
// => [{tweetData}, {tweetData}, ...]
```


## License
MIT ©[ivgtr](https://github.com/ivgtr)


[![Twitter Follow](https://img.shields.io/twitter/follow/mawaru_hana?style=social)](https://twitter.com/mawaru_hana) [![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE) [![Donate](https://img.shields.io/badge/%EF%BC%84-support-green.svg?style=flat-square)](https://www.buymeacoffee.com/ivgtr)  