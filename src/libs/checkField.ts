// 邮箱 正则
export const EMAILREG = /^[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;
// 手机号正则
export const PHONEREG = /^\d{11}$/;
// 身份证号 正则
export const CDRDIDREG = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
// 密码 正则
export const PASSWORD = /^.*(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])\w{2,}/;

// max
export const DEFAULT_INPUT_MAX = 99;
export const PHONE_MAX = 11;
export const USERNAME_MAX = 64;
export const EMAIL_MAX = 50;

// 检测
class CheckField {
  phone = { pattern: PHONEREG, message: "请输入正确的手机号" };

  email = { pattern: EMAILREG, message: "请输入正确的邮箱" };

  idCard = { pattern: CDRDIDREG, message: "请输入正确的身份证号" };

  password = { pattern: PASSWORD, message: "请输入正确的密码" };

  phoneRules = [this.phone, { max: PHONE_MAX, message: `手机号限制输入${PHONE_MAX}位数字` }];

  usernameRules = [{ max: USERNAME_MAX, message: `姓名不能超过${USERNAME_MAX}个字符` }];

  emailRules = [this.email, { max: EMAIL_MAX, message: `邮箱不能超过${EMAIL_MAX}个字符` }];
}
export default new CheckField();
