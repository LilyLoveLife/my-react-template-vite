/* eslint-disable @typescript-eslint/no-explicit-any */
import HTTP from "libs/http";
import { TypeResponse } from "types/api";

class Login extends HTTP {
  login_post(params: Record<string, any>): Promise<TypeResponse<string>> {
    return this.post("/login/post", params);
  }

  async login_get(params: Record<string, any>) {
    return this.get(`/login/get`, {
      params: { ...params },
    });
  }
}

export default new Login();
