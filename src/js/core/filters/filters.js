/**
 *  描述：Global filters js
 */
import tool from '@/js/core/utils/tool';

// 待安装
const install = Vue => {
    // 时间filter
    Vue.filter('formatDate', function (value) {
        if (!value) return '';
        let val = new Date(+value);
        return tool.DateFormat(val, 'yyyy-MM-dd');
    });

    // 时间filter
    Vue.filter('formatTime', function (value) {
        if (!value) return '';
        let val = new Date(+value);
        return tool.DateFormat(val, 'yyyy-MM-dd hh:mm:ss');
    });

    // 是否在线
    Vue.filter('statusType', function (value) {
        switch (+value) {
            case 0:
                return '离线';
            case 1:
                return '在线';
        }
    });

    // 是否激活
    Vue.filter('statusType2', function (value) {
      switch (+value) {
        case 0:
          return '未激活';
        case 1:
          return '激活';
      }
    });

    // 软件类型
    Vue.filter('wareType', function (value) {
        switch (value) {
            case 1:
                return 'BMU';
            case 2:
                return 'HVM';
            case 3:
                return 'CMU';
        }
    });

    // 分 -> 元
    Vue.filter('money', function (value) {
        if (!value && value !== 0) return;
        if (value === 0) {
            return '0元';
        }
        return `${(value / 100).toFixed(2)}元`;
    });

  // 性别
  Vue.filter('sexType', function (value) {
    switch (value) {
      case 0:
        return '未指定';
      case 1:
        return '男';
      case 2:
        return '女';
    }
  });
};

export default install;
