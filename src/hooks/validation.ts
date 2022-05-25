//아이디 유효성 검사
export const idCheck = (str: string): boolean => {
  return /^((?=.*[A-Za-z])|(?=.*\d))[A-Za-z\d]{4,10}$/.test(str);
};

//비밀번호 유효성 검사
export const strongPassword = (str: string): boolean => {
  // return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(str);
  return /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(str);
};

//닉네임 유효성 검사
export const nickNameCheck = (str: string): boolean => {
  return /^(?=.*\s)[\s]{1,10}$/.test(str);
};

//공백체크
export const checkBlank = /\s/g;

//비밀번호 유효성 검사2
export const checkNum = /[0-9]/g;
export const checkEng = /[a-z]/gi;
export const checkSpe = /[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi;
