/**
 * 描述：上传文件service
 */
import { fetch, apiFormat } from '@/service/baseService';

// file
const addFileApi = '/api/file/software';                    // 上传           method 'POST'
const getFileApi = '/api/file/{directory}/{fileName}.{suffix}';                    // 列表           method 'GET'
const findFileApi = '/api/file/{id}/find';

// 上传
export const addFile = (payload) => fetch.post(addFileApi, payload);

// 获取
export const getFileList = (opt) => fetch.get(getFileApi, {params: opt});

// 查询
export const getFile = (opt) => fetch.get(apiFormat(findFileApi, opt));
