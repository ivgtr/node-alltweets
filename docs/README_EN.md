<div align="center">
  <h3 align="center">node-alltweets</h3>
  <p align="center">Downloads someone's all tweets by Node.js</p>
  <p><a href="https://github.com/ivgtr/node-alltweets/blob/master/README.md" >日本語</a> | ENGLISH</p>
</div>

---

> 📌✨ inspire: https://github.com/tatzyr/alltweets

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
### Required
- Node.js
- Twitter Account
   - Need to apply for `Twitter Developers`

### 準備
1. Apply for `Twitter Developers`. (https://developer.twitter.com/en/apps/)
   1. Create a new App, create a `Bearer Token` and copy it.
   1. Create a `.env` file in working directory, and Write `TWITTER_BEARER_TOKEN=xxxx` (`xxx` is the `Bearer Token` copied above) and save it.

### Usages
#### Commands
- `alltweets <SCREEN_NAME> [options]`: Download <SCREEN_NAME>'s all tweets by JSON.  
_howto:<SCREEN_NAME> = The `xxxx` part of @`xxxx`_

#### Options
| Property                          | Arias                       | Description                                    | Type      | Required |  Default |
| --------------------------------- | --------------------------- | ---------------------------------------------- | --------- | -------- |  ------- |
| `--retweets`                      | `-r`                        | Include retweets                            | `boolean` | no       |  `false` |
| `--yaml`                          | `-y`                        | Output YAML instead of JSON      | `boolean` | no       |  `false` |
| `--bearer <TWITTER_BEARER_TOKEN>` | `-b <TWITTER_BEARER_TOKEN>` | If you don't set TWITTER_BEARER_TOKEN in `.env`, specify it here | `string`  | no       |  `''`    |

#### Examples
- `alltweets ivgtr`: Download @ivgtr's all tweets by JSON.
- `alltweets ivgtr -r`: Download @ivgtr's all tweets including retweets by JSON.
- `alltweets ivgtr -y`: Download @ivgtr's all tweets by YAML.

#### Using node-alltweets from JS/TS Modules
```js
import alltweets from "alltweets"

const tweetDate = await alltweets(
  token : "TWITTER_BEARER_TOKEN", // Set TWITTER_BEARER_TOKEN.
  options : {
    twitterId: "SCREEN_NAME",    // Get SCREEN_NAME.
    rt: false,                   // Include retweets.
    yaml: false                  // Output YAML instead of JSON.
  },
  json : []                      // You can run it halfway through and specify the saved data, or not.
)

console.log(tweetDate)
// => [{tweetData}, {tweetData}, ...]
```


## License
MIT ©[ivgtr](https://github.com/ivgtr)


[![Twitter Follow](https://img.shields.io/twitter/follow/mawaru_hana?style=social)](https://twitter.com/mawaru_hana) [![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE) [![Donate](https://img.shields.io/badge/%EF%BC%84-support-green.svg?style=flat-square)](https://www.buymeacoffee.com/ivgtr)  