/**
 * 描述：信号管理service
 */
import { fetch, apiFormat } from '@/service/baseService';

const getSignalListApi = '/api/signal/list';                    // 列表           method 'GET'
const updateSignalApi = '/api/signal/update';                    // 修改           method 'PUT'
const deleteSignalApi = '/api/signal/delete/{id}';                // 删除          method 'DELETE'

// 列表
export const getSignalList = (opt) => fetch.get(getSignalListApi, {params: opt});

// 修改
export const updateSignal = (payload) => fetch.put(updateSignalApi, payload);

// 删除
export const deleteSignal = (opt) => fetch.delete(apiFormat(deleteSignalApi, opt));
