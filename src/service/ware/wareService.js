/**
 * 描述：上传管理service
 */
import { fetch, apiFormat } from '@/service/baseService';

// ware
const getWareListApi = '/api/soft/ware/list';                    // 列表           method 'GET'
const addWareApi = '/api/soft/ware/create';                    // 添加           method 'POST'
const deleteWareApi = '/api/soft/ware/delete/{id}';                    // 删除          method 'DELETE'
const stateModifyWareApi = '/api/soft/ware/modifyState/{id}';                    // 激活          method 'PUT'
const getWareRefreshListApi = '/api/soft/ware/refresh/list';                   // 查询刷新任务记录
const getWareDownloadListApi = '/api/soft/ware/download/list';                   // 查询下载任务记录
const getWareRefreshApi = '/api/soft/ware/refresh/{id}';                   // 查询单个刷新任务记录
const getWareDownloadApi = '/api/soft/ware/download/{id}';                   // 查询单个下载任务记录

// 下载、刷新指令部分
const downloadWareApi = '/api/soft/ware/task/download';                    // 发送下载指令          method 'POST'
const taskListWareApi = '/api/soft/ware/task/list';                    // 查询任务列表-分页          method 'GET'
const refreshWareApi = '/api/soft/ware/task/refresh';                    // 发送刷新指令          method 'POST'

const downloadListApi = '/api/soft/ware/download/list';                    // 下载记录          method 'GET'
const refreshListApi = '/api/soft/ware/refresh/list';                    // 刷新记录          method 'GET'
const wareTaskListApi = '/api/soft/ware/task/listAll';                    // 列表看单个软件任务记录          method 'GET'

const rollBackApi = '/api/soft/ware/task/rollback';                    // 单个tbox回滚          method 'POST'
const rollBackSomeApi = '/api/soft/ware/task/rollbackBatch';                    // 批量tbox回滚          method 'POST'
const rollBackWareHistoryApi = '/api/soft/ware/refresh/list/success';           // 列表查询单个tbox软件记录          method 'GET'
const rollBackWareListApi = '/api/soft/ware/rollback';           // 回滚查询任务          method 'GET'

// 列表
export const wareList = (opt) => fetch.get(getWareListApi, {params: opt});

// 添加
export const addWare = (payload) => fetch.post(addWareApi, payload);

// 删除
export const wareDel = (opt) => fetch.delete(apiFormat(deleteWareApi, opt));

// 激活
export const stateModify = (opt, payload) => fetch.put(apiFormat(stateModifyWareApi, opt), payload);

// 刷新纪录列表
export const wareRefreshList = (opt) => fetch.get(getWareRefreshListApi, {params: opt});

// 下载纪录列表
export const wareDownloadList = (opt) => fetch.get(getWareDownloadListApi, {params: opt});

// 刷新纪录单个
export const wareRefresh = (opt) => fetch.get(apiFormat(getWareRefreshApi, opt));

// 下载纪录单个
export const wareDownload = (opt) => fetch.get(apiFormat(getWareDownloadApi, opt));

// 发送下载指令
export const downloadWare = (payload) => fetch.post(downloadWareApi, payload);

// 查询任务列表-分页
export const taskList = (opt) => fetch.get(taskListWareApi, {params: opt});

// 发送刷新指令
export const refreshWare = (payload) => fetch.post(refreshWareApi, payload);

// 查询历史列表-下载
export const downloadHistory = (opt) => fetch.get(downloadListApi, {params: opt});

// 查询历史列表-刷新
export const refreshHistory = (opt) => fetch.get(refreshListApi, {params: opt});

// 查询历史列表-刷新
export const wareTaskListHistory = (opt) => fetch.get(wareTaskListApi, {params: opt});

// 回滚-单个
export const rollBackWare = (payload) => fetch.post(rollBackApi, payload);

// 回滚-多个
export const rollBackWareSome = (payload) => fetch.post(rollBackSomeApi, payload);

// 回滚-单个tbox软件历史记录
export const rollBackWareHistory = (opt) => fetch.get(rollBackWareHistoryApi, {params: opt});

// 回滚-单个tbox软件过程
export const rollBackWareTaskList = (opt) => fetch.get(rollBackWareListApi, {params: opt});
