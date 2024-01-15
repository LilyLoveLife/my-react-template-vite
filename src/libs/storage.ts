const TOKEN_KEY = "TOKEN_KEY";

class Storage {
  prefix = "ProjectName_"; // todo

  setItem(name: string, content: any) {
    if (!name) return;
    if (typeof content !== "string") {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(this.prefix + name, content);
  }

  getItem(name: string): any {
    if (!name) return undefined;
    return window.localStorage.getItem(this.prefix + name);
  }

  removeItem(name: string) {
    if (!name) return;
    window.localStorage.removeItem(this.prefix + name);
  }

  getToken() {
    return this.getItem(TOKEN_KEY);
  }

  setToken(token: string) {
    return this.setItem(TOKEN_KEY, token);
  }

  removeToken() {
    return this.removeItem(TOKEN_KEY);
  }

  isLogin() {
    const token = this.getToken();
    return token && !["undefined", "null", "false", "0"].includes(token);
  }
}

export default new Storage();
