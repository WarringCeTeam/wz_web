/**
 * 描述：报警管理service
 */
import { fetch, apiFormat } from '@/service/baseService';

const getAlarmListApi = '/api/alarm/list';                    // 列表           method 'GET'
const handleAlarmApi = '/api/alarm/{id}';                    // 处理           method 'PUT'

// 列表
export const getAlarmList = (opt) => fetch.get(getAlarmListApi, {params: opt});

// 处理
export const handleAlarm = (opt, payload) => fetch.put(apiFormat(handleAlarmApi, opt), payload);
