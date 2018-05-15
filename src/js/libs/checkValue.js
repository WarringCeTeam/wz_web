/**
 * 描述：验证模式基于element-ui
 */
const options = {
	number: /\d{1,10}/,
	string: /[\w+-]/,
	phone: /^1[34578]\d{9}$/,
	mima: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
};

// 是否未定义
const isUndef = (v) => {
	return v === undefined || v === null;
};

// 是否为空
const isEmpty = (v) => {
	return isUndef(v) || v === '';
};

// 不能是空格
export const isSpace = (msg) => {
  return (rule, value, callback) => {
    if (isUndef(value) || value === ' ') {
      callback(new Error(msg + '不能为空'));
    } else {
      callback();
    }
  };
};

// 导出模式
export const handles = (res, msg, delay) => {
	delay = delay || 1000;
	let timer = null;
	return (rule, value, callback) => {
		if (isEmpty(value)) {
          callback(new Error('请输入' + msg));
      	} else {
      		if (timer) {
				clearTimeout(timer);
				timer = null;          // 提高效率
			}
			timer = setTimeout(() => {
				if (!options[res].test(value)) {
				        if (res === 'mima') {
                  callback(new Error(msg + '密码格式为字母与数字组合，至少6位'));
                } else {
                  callback(new Error(msg + '格式不正确'));
                }
	            } else {
	            	callback();
	            }
			}, delay);
      	}
	};
};

// 导出模式(允许为空)
export const allowNull = (res, msg, delay) => {
  delay = delay || 1000;
  let timer = null;
  return (rule, value, callback) => {
    if (isEmpty(value)) {
      callback();
    } else {
      if (timer) {
        clearTimeout(timer);
        timer = null;          // 提高效率
      }
      timer = setTimeout(() => {
        if (!options[res].test(value)) {
          callback(new Error(msg + '格式不正确'));
        } else {
          callback();
        }
      }, delay);
    }
  };
};
