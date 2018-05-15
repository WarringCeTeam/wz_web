/**
 * 描述：系统设置
 */
import { fetch } from '@/service/baseService';

// 系统设置
const configDetailApi = '/api/sys/config';                                  // 系统设置           method 'GET'

// 系统设置修改
const configUpdateApi = '/api/sys/config';                                 // 系统设置修改       method 'PUT'

// 系统设置
export const configDetail = () => fetch.get(configDetailApi);

// 系统设置修改
export const configUpdate = (payload) => fetch.put(configUpdateApi, payload);
