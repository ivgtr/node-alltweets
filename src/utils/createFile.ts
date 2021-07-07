import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import type { Status as Tweet } from "twitter-d";

const BASE_DIR = process.cwd();

/**
 * process.cwd()に同一ファイルがあるか調べる
 * @param {string} fileName - ファイル名を渡す
 * @returns {boolean} 存在するか返す
 */
const isDir = (filePath: string) => {
  try {
    fs.accessSync(path.join(filePath));

    return true;
  } catch {
    return false;
  }
};

/**
 * optionから既にファイルが生成されてるか確認、生成されてたらjsonで返す
 * @param {{twitterId:string,isYaml:boolean}} options - optionsを設定
 * @returns {Promise<Tweet[]>} json
 */
export const init = async (options: {
  twitterId: string;
  isYaml: boolean;
}): Promise<{ defaultJson: Tweet[]; filePath: string }> => {
  const { twitterId = "", isYaml = false } = options;
  const fileName = isYaml ? `${twitterId}.yaml` : `${twitterId}.json`;

  const filePath = path.join(BASE_DIR, fileName);

  try {
    if (isDir(fileName)) {
      if (isYaml) {
        const yamlJson = yaml.load(fs.readFileSync(filePath, "utf8"), {
          json: true,
        }) as string;
        return { defaultJson: JSON.parse(yamlJson), filePath };
      } else {
        return {
          defaultJson: JSON.parse(fs.readFileSync(filePath, "utf8")),
          filePath,
        };
      }
    } else {
      return { defaultJson: [], filePath };
    }
  } catch {
    return { defaultJson: [], filePath };
  }
};

/**
 * tweetを取得し、jsonかyamlでファイルを書き出し、書き出したpathを返す
 * @param {{filePath:string,resultJson:Tweet[],isYaml:boolean}} options - optionsを設定
 * @returns {Promise<string>} 書き出したpath
 */
export const createFile = async ({
  filePath,
  resultJson,
  isYaml,
}: {
  filePath: string;
  resultJson: Tweet[];
  isYaml: boolean;
}): Promise<string> => {
  try {
    if (isYaml) {
      const yamlData = yaml.dump(resultJson);
      fs.writeFileSync(filePath, yamlData);
    } else {
      fs.writeFileSync(filePath, JSON.stringify(resultJson, null, 2));
    }
    return filePath;
  } catch (e) {
    throw new Error(e);
  }
};
