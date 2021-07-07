#!/usr/bin/env node

import chalk from "chalk";
import dotenv from "dotenv";
import meow from "meow";
import ora from "ora";
import type { Package } from "update-notifier";
import updateNotifier from "update-notifier";
import { allTweets } from "./index.js";
import { createFile, init } from "./utils/createFile.js";

dotenv.config();

const { TWITTER_BEARER_TOKEN: bearerToken } = process.env;

const cli = async () => {
  const cli = meow(
    `
	Usage
	  $ allTweets <SCREEN_NAME> [options]
	Options
	  $ allTweets <SCREEN_NAME>
	  $ allTweets <SCREEN_NAME> -r, --retweets
    Include retweets
	  $ allTweets <SCREEN_NAME> -y, --yaml
    Use YAML instead of JSON
	  $ allTweets <SCREEN_NAME> -b, --bearer <TWITTER_BEARER_TOKEN>
    If you don't set <TWITTER_BEARER_TOKEN> in .env, specify it here
    `,
    {
      importMeta: import.meta,
      flags: {
        retweets: {
          type: "boolean",
          alias: "r",
          default: false,
        },
        yaml: {
          type: "boolean",
          alias: "y",
          default: false,
        },
        bearer: {
          type: "string",
          alias: "b",
        },
      },
    }
  );

  updateNotifier({ pkg: cli.pkg as Package }).notify();

  const { input, flags } = cli;
  if (flags.h) {
    cli.showHelp();
    return;
  }
  if (flags.v) {
    cli.showVersion();
    return;
  }

  if (!input[0])
    return console.log(
      `${chalk.bgRed("ERROR!")} 取得するTwitterIDを入力してください`
    );

  const token = flags.bearer
    ? flags.bearer
    : bearerToken
    ? bearerToken
    : undefined;
  if (!token)
    return console.log(
      `${chalk.bgRed("ERROR!")} TWITTER_BEARER_TOKENを指定してください`
    );

  const { defaultJson, filePath } = await init({
    twitterId: input[0],
    isYaml: flags.yaml,
  });

  const spinner = ora(`${chalk.bgGreen("RUN")} 取得開始`);

  allTweets({
    token,
    options: {
      twitterId: input[0],
      rt: flags.retweets,
    },
    json: defaultJson,
  })
    .then((resultJson) => {
      createFile({ resultJson, filePath, isYaml: flags.yaml })
        .then((path) => {
          spinner.succeed(
            `${chalk.bgGreen("FINISH!")} ${resultJson.length}件のデータを取得`
          );
          console.log(`${chalk.bgGreen("SUCCESS!")} ${path} に出力されました`);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

cli();
