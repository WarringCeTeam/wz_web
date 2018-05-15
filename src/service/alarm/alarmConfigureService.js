/**
 * 描述：报警配置管理service
 */
import { fetch, apiFormat } from '@/service/baseService';

const getAlarmConfigureListApi = '/api/alarm/configure/list';                    // 列表           method 'GET'
const createAlarmConfigureApi = '/api/alarm/configure';                         // 新增           method 'POST'
const updateAlarmConfigureApi = '/api/alarm/configure/{id}';                    // 修改           method 'PUT'
const deleteAlarmConfigureApi = '/api/alarm/configure/{id}';                    // 删除           method 'DELETE'
const test = '/api/alarm/configure/signal';                         // 过滤           method 'POST'

// 列表
export const getAlarmConfigureList = (opt) => fetch.get(getAlarmConfigureListApi, {params: opt});

// 新增
export const createAlarmConfigure = (payload) => fetch.post(createAlarmConfigureApi, payload);

// 修改
export const updateAlarmConfigure = (opt, payload) => fetch.put(apiFormat(updateAlarmConfigureApi, opt), payload);

// 删除
export const deleteAlarmConfigure = (opt) => fetch.delete(apiFormat(deleteAlarmConfigureApi, opt));

// 过滤
export const testSignal = (payload) => fetch.post(test, payload);
