interface IRoute {
  path?: string;
  component?: Promise | (() => any);
  wrappers?: string[];
  redirect?: string;
  icon?: Promise | (() => any);
  exact?: boolean;
  routes?: IRoute[];
  name?: string;
  [k: string]: any;
}
