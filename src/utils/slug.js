import pinyin from "tiny-pinyin";

export function getSlug(source) {
  if (pinyin.isSupported()) {
    return pinyin.convertToPinyin(source, "", true); // WO
  } else {
    return source;
  }
}
