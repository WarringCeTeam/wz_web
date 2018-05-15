/**
 * 描述：诊断管理service
 */
import { fetch } from '@/service/baseService';

const getByTaskIdApi = '/api/BMSDiagnosis/task';                    // 根据任务ID和tbox查询           method 'GET'
const createDiagnoseApi = '/api/BMSDiagnosis/create';                    // 创建           method 'POST'
const getByIdApi = '/api/BMSDiagnosis/task/diagnosis';                    // 根据任务ID查询           method 'GET'

// 根据任务ID和tbox查询
export const getByTaskId = (opt) => fetch.get(getByTaskIdApi, {params: opt});
// 创建
export const createDiagnose = (payload) => fetch.post(createDiagnoseApi, payload);
// 根据任务ID查询
export const getById = (opt) => fetch.get(getByIdApi, {params: opt});
