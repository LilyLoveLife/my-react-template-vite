/* eslint-disable consistent-return */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import config from "config/index";
import refreshToken from "services/refresh";
import { Modal, Toast } from "antd-mobile";

const getUrlParamsValue = (location: any, paramsKey: string) => {
  const { search } = location;
  if (search && search.length > 1) {
    const searchParams = new URLSearchParams(search.substring(1));
    return searchParams.get(paramsKey);
  }
  return null;
};

export enum StatusCode {
  success = 200,
  unauthorized = "1001",
  invalid_token = "1002",
  refresh_cookies = "1003",
  need_login_again = "1004",
  refresh_success = "1005",
  disabled = "1006", // 账号禁用
  conflict = "1007", // 登录冲突
  account_delete = "1008",
}

let isRefreshing = false;

let requestQueue = [] as any;

const cancelToken = axios.CancelToken;
const source = cancelToken.source();

axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
  baseURL: config?.API_URL,
  timeout: 30000,
});

export const loginAgain = () => {
  return new Promise(() => {
    window.location.href = "#/login";
  });
};
const gotoLoginPage = () => {
  window.location.href = "#/login";
};

const fixConfig = (config: any) => {
  if (!Array.isArray(config.data) && !(config.data instanceof FormData)) {
    config.data = JSON.parse(config.data);
  }
  return config;
};

const fileToJson = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (res) => {
      const { result } = res.target as any;
      let data;
      try {
        data = JSON.parse(result);
      } catch (e) {
        data = result;
      }
      resolve(data);
    };
    reader.onerror = (err) => {
      reject(err);
    };
    reader.readAsText(new Blob([file]), "utf-8");
  });
};

axiosInstance.interceptors.request.use(
  function (config: any) {
    const botId = 1;
    const tenantId = getUrlParamsValue(window.location, "tenantId");

    // todo
    const needSetBlobType: string[] = [];
    // const needSetBlobType = [
    //   'test/url/blob'
    // ]

    // 入参是数组时 不传入bot_id FormData  不传
    if (botId && !Array.isArray(config.data) && !(config.data instanceof FormData)) {
      config.data = { ...config.data };
    }

    if (needSetBlobType.indexOf(config.url.split("?")[0] as any) !== -1) {
      config.responseType = "blob";
    }
    // todo
    if (tenantId) {
      config.headers["x-header-tid"] = tenantId;
    }
    // for test
    // config.headers['x-header-uid'] = '111'

    config.cancelToken = source.token;
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  async function (response: any) {
    // eslint-disable-next-line prefer-const
    let { data, config }: any = response;
    if (response.status === StatusCode.success) {
      if (config.responseType === "blob") {
        data = await fileToJson(response.data);
      }
      if (data.code === StatusCode.refresh_cookies) {
        if (isRefreshing) {
          return new Promise((resolve) => {
            requestQueue.push(() => {
              resolve(axiosInstance(fixConfig(config)));
            });
          });
        }
        isRefreshing = true;
        const res = await refreshToken.refreshToken();
        if (res && res.code === StatusCode.need_login_again) {
          return new Promise(() => {
            gotoLoginPage();
          });
        }
        if (res && res.code === StatusCode.disabled) {
          return new Promise(() => {
            gotoLoginPage();
          });
        }
        if (res && res.code === StatusCode.refresh_success) {
          isRefreshing = false;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          requestQueue.forEach((cb: any) => cb());
          requestQueue = [];
          return axiosInstance(fixConfig(config));
        }
        return loginAgain();
      }
      if (data.code === StatusCode.conflict) {
        source.cancel(data.code);
        Modal.alert({
          content: data.message || "该账号已在别处登录",
          confirmText: "确定",
          onConfirm: () => {
            // history.push('/login')
            gotoLoginPage();
          },
        });
        return;
      }
      if (data.code === StatusCode.account_delete) {
        data = { success: false, code: data.code, message: data.message };
        gotoLoginPage();
        Toast.show({
          content: data.message,
        });
        return data;
      }
    } else {
      data = { success: false };
    }
    if (!config?.noErrorMsg && data.success === false) {
      Toast.show({
        content: data.message,
      });
    }
    return data;
  },
  function (error: unknown) {
    if (axios.isCancel(error)) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
  },
);
export default axiosInstance;
