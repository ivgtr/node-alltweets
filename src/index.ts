import yamlJson from "js-yaml";
import type { Status as Tweet } from "twitter-d";
import getAllTweets from "./utils/twitterRequest";

/**
 * tweetを取得し、jsonかyamlで返す
 * @param {string} token - 設定したTwitterBearerTokenをいれる
 * @param {{twitterId:string,rt:boolean,yaml:boolean}} options - optionsを設定
 * @returns {Promise<string | Tweet[]>} 書き出したJSONデータかYAMLデータを返す
 */
export default async (
  token: string,
  options: {
    twitterId: string;
    rt?: boolean;
    yaml?: boolean;
  } = { twitterId: "", rt: false, yaml: false },
  json: Tweet[] = []
) => {
  const params: params = {
    screen_name: options.twitterId,
    include_rts: options.rt,
  };
  return getAllTweets(token, params, []).then((tweetData) => {
    if (options.yaml) {
      const yamlData = yamlJson.dump(json);
      return yamlData;
    }

    return tweetData;
  });
};
