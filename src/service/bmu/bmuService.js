/**
 * 描述：bmu管理service
 */
import { fetch, apiFormat } from '@/service/baseService';

// BMU
const getBmuListApi = '/api/bmu/list';                    // 列表           method 'GET'
const addBmuApi = '/api/bmu/create';                    // 添加bmu           method 'POST'
const modifyBmuApi = '/api/bmu/update';                    // 修改           method 'PUT'
const deleteBmuApi = '/api/bmu/delete/{id}';                    // 删除          method 'DELETE'
const getBmuDataApi = '/api/bmu/data/list';                    // 列表           method 'GET'
const getDataHistoryPageApi = '/api/bmu/data/history/page';                    // 历史分页列表         method 'GET'
const getDataHistoryListApi = '/api/bmu/data/history/list';                    // 历史列表             method 'GET'
const getDataHistoryCountApi = '/api/bmu/data/history/count';                    // 历史列表数量            method 'GET'
const getBmuDataChannelApi = '/api/bmu/data/list/channel';                    // 查询所有的通道号           method 'GET'
// 列表
export const bmuList = (opt) => fetch.get(getBmuListApi, {params: opt});

// 添加
export const addBmu = (payload) => fetch.post(addBmuApi, payload);

// 修改
export const bmuUpdate = (opt, payload) => fetch.put(apiFormat(modifyBmuApi, opt), payload);
// 删除
export const bmuDel = (opt) => fetch.delete(apiFormat(deleteBmuApi, opt));

// 实时数据
export const bmuData = (opt) => fetch.get(getBmuDataApi, {params: opt});

// 历史数据分页
export const historyDataPage = (opt) => fetch.get(getDataHistoryPageApi, {params: opt});
// 历史数据
export const historyDataList = (opt) => fetch.get(getDataHistoryListApi, {params: opt});
// 历史数据数量
export const historyDataCount = (opt) => fetch.get(getDataHistoryCountApi, {params: opt});

// 查询通道号
export const getBmuDataChannel = (opt) => fetch.get(getBmuDataChannelApi, {params: opt});
