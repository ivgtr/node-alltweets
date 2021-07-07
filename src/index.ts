import type { Status as Tweet } from "twitter-d";
import { getAllTweets, Options } from "./utils/twitterRequest.js";

export type Configs = {
  token: string;
  options: {
    twitterId: string;
    rt?: boolean;
  };
  json: Tweet[];
};

/**
 * tweetを取得し、jsonかyamlで返す
 * @param {string} token - 設定したTwitterBearerTokenをいれる
 * @param {{twitterId:string,rt:boolean}} options - optionsを設定
 * @param {Tweet[]} json - 途中まで処理したTweetDataがあるなら途中から再開できる
 * @returns {Promise<Tweet[]>} 書き出したJSONデータで返す
 */
export const allTweets = (configs: Configs) => {
  const { token, options = { twitterId: "", rt: false }, json = [] } = configs;
  const params: Options = {
    screen_name: options.twitterId,
    include_rts: options.rt,
  };
  return getAllTweets(token, params, json)
    .then((tweetData) => tweetData)
    .catch((e) => {
      throw new Error(e);
    });
};

export default allTweets;
