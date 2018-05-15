/**
 * 描述：项目管理service
 */
import { fetch, apiFormat } from '@/service/baseService';

const getProjectListApi = '/api/project/list';                    // 列表           method 'GET'
const addProjectApi = '/api/project/create';                    // 添加bmu           method 'POST'
const modifyProjectApi = '/api/project/update';                    // 修改           method 'PUT'
const deleteProjectApi = '/api/project/delete/{id}';                    // 删除          method 'DELETE'
const sleepApi = '/api/sample/sleep';                    // 测试超时          method 'get'
const downloadProjectTaskApi = '/api/soft/ware/task/project/download';         // 项目执行下载软件           method 'POST'
const refreshProjectTaskApi = '/api/soft/ware/task/project/refresh';           // 项目执行刷新软件           method 'POST'

// 列表
export const projectList = (opt) => fetch.get(getProjectListApi, {params: opt});

// 添加
export const addProject = (payload) => fetch.post(addProjectApi, payload);

// 修改
export const projectUpdate = (opt, payload) => fetch.put(apiFormat(modifyProjectApi, opt), payload);

// 删除
export const projectDel = (opt) => fetch.delete(apiFormat(deleteProjectApi, opt));

// 测试超时
export const testSleep = (opt) => fetch.get(sleepApi, {params: opt});

// 项目执行-下载软件
export const downloadProjectTask = (payload) => fetch.post(downloadProjectTaskApi, payload);

// 项目执行-刷新软件
export const refreshProjectTask = (payload) => fetch.post(refreshProjectTaskApi, payload);
