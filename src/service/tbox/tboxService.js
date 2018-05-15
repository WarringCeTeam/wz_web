/**
 * 描述：tbox管理service
 */
import { fetch, apiFormat } from '@/service/baseService';

// BMU
const getTBoxListApi = '/api/tbox';                    // 列表           method 'GET'
const addTBoxApi = '/api/tbox';                    // 添加           method 'POST'
const modifyTBoxApi = '/api/tbox/{id}';                    // 修改           method 'PUT'
const deleteTBoxApi = '/api/tbox/{id}';                    // 删除          method 'DELETE'
const seeTBoxApi = '/api/tbox/{id}';                    // 详情          method 'GET'

const logApi = '/api/bms/upgrade/log/list';                    // 日志列表          method 'GET'
const logIdApi = '/api/bms/upgrade/log/list/{logId}';                    // 日志列表Id        method 'GET'

// 列表
export const tBoxList = (opt) => fetch.get(getTBoxListApi, {params: opt});

// 添加
export const addTBox = (payload) => fetch.post(addTBoxApi, payload);

// 修改
export const tBoxUpdate = (opt, payload) => fetch.put(apiFormat(modifyTBoxApi, opt), payload);

// 删除
export const tBoxDel = (opt) => fetch.delete(apiFormat(deleteTBoxApi, opt));

// 详情
export const tBoxDetail = (opt) => fetch.get(apiFormat(seeTBoxApi, opt));

// 日志
export const logList = (opt) => fetch.get(logApi, {params: opt});

// 日志ById
export const logListId = (id, opt) => fetch.get(apiFormat(logIdApi, id), {params: opt});
