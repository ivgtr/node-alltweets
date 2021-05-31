import axios from "axios";
import chalk from "chalk";
import ora from "ora";
import type { Status as Tweet } from "twitter-d";
import getErrorLabel from "./error";

const timelineEndPoint =
  "https://api.twitter.com/1.1/statuses/user_timeline.json";

/**
 * tweetを取得し、返す
 * @param {string} twitterToken - TwitterBearerTokenをいれる
 * @param {{screen_name: string,include_rts?: boolean | undefined,max_id?: string | undefined}} params - paramsを指定
 * @returns {Promise<Tweet[]>} TweetのJSON配列を返す
 */
const getTweets = (twitterToken: string, params: params): Promise<Tweet[]> => {
  const headers = {
    Authorization: `Bearer ${twitterToken}`,
  };
  const _params: paramsEx = {
    count: 200,
    exclude_replies: false,
    include_rts: false,
    tweet_mode: "extended",
    ...params,
  };

  return new Promise((resolve, reject) => {
    axios
      .get(timelineEndPoint, { headers, params: _params })
      .then((response) => response.data)
      .then((result: Tweet[]) => resolve(result))
      .catch(async (err) => reject(err.response));
  });
};

/**
 * tweetを取得し引数の配列に追加、取得した結果のlengthが1以下になるまで繰り返す
 * @param {string} twitterToken - TwitterBearerTokenをいれる
 * @param {{screen_name: string,include_rts?: boolean | undefined,max_id?: string | undefined}} params - paramsを指定
 * @param {Tweet[]} json - これを元に、これより過去のデータを取得する
 * @returns {Promise<Tweet[]>} TweetのJSON配列を返す
 */
const getAllTweets = async (
  twitterToken: string,
  params: params,
  json: Tweet[] = []
): Promise<Tweet[]> => {
  try {
    const result = await getTweets(
      twitterToken,
      json.length ? { ...params, max_id: json.slice(-1)[0].id_str } : params
    );
    if (result.length > 1) {
      const _json = json.concat([...result]);
      return getAllTweets(twitterToken, params, _json);
    }
    return json;
  } catch (err) {
    if (err.data["request"]) {
      throw `${chalk.bgRed("ERROR!")} 引数がおかしいよ`;
    } else if (err.data.errors[0].code === 88) {
      const spinner = ora(
        `${chalk.bgRed("WAIT")} Twitter APIの上限により15分停止します`
      );
      spinner.color = "yellow";

      return new Promise((resolve) => {
        setTimeout(() => {
          spinner.succeed(`${chalk.bgGreen("RUN")} 動作を再開します`);
          return resolve(getAllTweets(twitterToken, params, json));
        }, 15 * 60 * 1000);

        // const timer = setTimeout(() => {
        //   spinner.succeed(`${chalk.bgGreen('RUN')} 動作を再開します`)
        //   return resolve(getAllTweets(twitterToken, params, json))
        // }, 15 * 60 * 1000)
        // process.on('SIGINT', () => {
        //   spinner.succeed(`${chalk.bgYellow('FINISH')} 動作を終了し、取得したデータを保存します`)
        //   clearTimeout(timer)
        //   return resolve(json)
        // })
      });
    }
    throw `${chalk.bgRed("ERROR!")} ${getErrorLabel(
      err.data.errors[0].code as number
    )}`;
  }
};

export default getAllTweets;
