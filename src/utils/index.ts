/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";

const dayMap: any = {
  1: "周一",
  2: "周二",
  3: "周三",
  4: "周四",
  5: "周五",
  6: "周六",
  0: "周日",
};

export const file2Base64 = (file: any) => {
  return new Promise((resolve, reject) => {
    /// FileReader类就是专门用来读文件的
    const reader = new FileReader();
    // 开始读文件
    // readAsDataURL: dataurl它的本质就是图片的二进制数据， 进行base64加密后形成的一个字符串，
    reader.readAsDataURL(file);
    // 成功和失败返回对应的信息，reader.result一个base64，可以直接使用
    reader.onload = () => resolve(reader.result);
    // 失败返回失败的信息
    reader.onerror = (error) => reject(error);
  });
};
/*
 * 富文本字符串替换
 */
export const htmlTagsTranslate = (str: string, tagList: any) => {
  const regX = /\{(.+?)\}/g;
  return str.replace(regX, (word) => {
    if (tagList.includes(word)) {
      const tempWord = word.replace("{", "").replace("}", "");
      return `<span style="color: #5A80C0;background: #E1F1FF; padding: 2PX; display: inline-block;margin: 2PX;">${tempWord}</span>`;
    }
    return word;
  });
};

/*
 * 搜索高亮显示keyword
 */
export const warpTag = (content: any, keyword: any, color: string | undefined = "#5774FF") => {
  if (!keyword) {
    return content;
  }
  const a = content.toLowerCase();
  const b = keyword.toLowerCase();

  const indexof = a.indexOf(b);
  const c = indexof > -1 ? content.substr(indexof, keyword.length) : "";
  const val = `<span style="color:${color};font-weight: bold;">${c}</span>`;
  const regS = new RegExp(keyword, "gi");
  return content.replace(regS, val);
};
/**
 * 时间戳格式化为YYYY.MM.DD HH:mm
 * @param interviewerTime
 * @returns YYYY.MM.DD HH:mm
 */
export const formatTimeWithMinute = (time: any) => {
  if (!time) return "";
  return `${moment(time).format("YYYY.MM.DD")} ${moment(time).format("HH:mm")}`;
};
/**
 * 时间戳格式化为YYYY.MM.DD（周几）HH:mm
 * @param interviewerTime
 * @returns YYYY.MM.DD（周几）HH:mm
 */
export const formatTimeWithWeek = (time: any) => {
  if (!time) return "";
  const week = moment(time).weekday();
  return `${moment(time).format("YYYY.MM.DD")} （${dayMap[week]}） ${moment(time).format("HH:mm")}`;
};
/**
 * 时间戳格式化为YYYY.MM.DD 周几
 * @param interviewerTime
 * @returns YYYY.MM.DD 周几
 */
export const formatTimeWithDayWithWeek = (time: any) => {
  if (!time) return "";
  const week = moment(time).weekday();
  return `${moment(time).format("YYYY.MM.DD")} ${dayMap[week]}`;
};
// 分组
export const goup4 = (list: any[]) => {
  if (!(list && list.length)) return [];
  let dealtList: any[] = [];
  let num = 0;
  let temp: any[] = [];
  list.forEach((each: any) => {
    if (num % 4 === 0) {
      // 新开一行
      if (temp && temp.length) {
        dealtList = ([] as any).concat(dealtList, [temp]);
      }
      temp = [];
      temp.push(each);
      ++num;
    } else {
      temp.push(each);
      ++num;
    }
  });
  dealtList = ([] as any).concat(dealtList, [temp]);
  return dealtList;
};

export const getQuery = (search: string) => {
  const firstIndex = search.indexOf("?");
  const paramsStr = search.substring(firstIndex + 1);
  console.log("---paramsStr--", paramsStr);
  const paramsArr = paramsStr.split("&") || [];
  console.log("---paramsArr--", paramsArr);
  const obj: any = {};
  for (let i = 0; i < paramsArr.length; i++) {
    const item = paramsArr[i];
    const itemArr = item.split("=");
    const [ele0, ele1] = itemArr;
    obj[ele0] = decodeURIComponent(ele1);
  }
  console.log("---params obj--", obj);
  return obj;
};

/**
 * 解析出window.location.search
 * @returns {}
 */
export const getQueryOfSearch = () => {
  const { search } = window.location;
  const obj = getQuery(search);
  return obj;
};
/**
 * 解析出window.location.hash
 * @returns {}
 */
export const getQueryStrOfHash = () => {
  return window.location.hash.split("?")[1];
};

/**
 * 解析出window.location.search或window.location.hash中的指定参数
 * @returns
 */
export const getQueryByName = (name = "", url = window.location.search) => {
  const reg = new RegExp(`[?&]${name}=([^&#]+)`);
  const query = url.match(reg);
  return query ? decodeURIComponent(query[1]) : null;
};

export const getUrlParamsValue = (location: any, paramsKey: string) => {
  const { search } = location;
  if (search && search.length > 1) {
    const searchParams = new URLSearchParams(search.substring(1));
    return searchParams.get(paramsKey);
  }
  return null;
};

export const joinQuery = (obj: Record<string, any>) => {
  const arr: string[] = [];
  const keys = Object.keys(obj);
  keys.forEach((key: any) => {
    arr.push(`${key}=${obj[key]}`);
  });
  return arr.join("&");
};
