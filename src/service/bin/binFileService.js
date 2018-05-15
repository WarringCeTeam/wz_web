/**
 * 描述：bin文件管理service
 */
import { fetch, apiFormat } from '@/service/baseService';

const getBinFileListApi = '/api/binFile/list';                    // 列表           method 'GET'
const addBinFileApi = '/api/binFile/create';                    // 添加bmu           method 'POST'
const modifyBinFileApi = '/api/binFile/update';                    // 修改           method 'PUT'
const deleteBinFileApi = '/api/binFile/delete/{id}';                    // 删除          method 'DELETE'

// 列表
export const binFileList = (opt) => fetch.get(getBinFileListApi, {params: opt});

// 添加
export const binFileAdd = (payload) => fetch.post(addBinFileApi, payload);

// 修改
export const binFileUpdate = (opt, payload) => fetch.put(apiFormat(modifyBinFileApi, opt), payload);

// 删除
export const binFileDel = (opt) => fetch.delete(apiFormat(deleteBinFileApi, opt));
