/**
 * 描述：信号类别管理service
 */
import { fetch, apiFormat } from '@/service/baseService';

const getSignalCategoryListApi = '/api/signal/category/list';                    // 列表           method 'GET'
const createSignalCategoryApi = '/api/signal/category/create';                    // 新增           method 'POST'
const updateSignalCategoryApi = '/api/signal/category/update';                    // 修改           method 'PUT'
const deleteSignalCategoryApi = '/api/signal/category/delete/{id}';                // 删除          method 'DELETE'
const changePositionApi = '/api/signal/category/change/position';                    // 位置           method 'PUT'

// 列表
export const getSignalCategoryList = (opt) => fetch.get(getSignalCategoryListApi, {params: opt});

// 新增
export const createSignalCategory = (payload) => fetch.post(createSignalCategoryApi, payload);

// 修改
export const updateSignalCategory = (payload) => fetch.put(updateSignalCategoryApi, payload);

// 删除
export const deleteSignalCategory = (opt) => fetch.delete(apiFormat(deleteSignalCategoryApi, opt));

// 位置
export const changePosition = (payload) => fetch.put(changePositionApi, payload);
