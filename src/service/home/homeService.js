/**
 * 描述：首页service
 */
import { fetch, apiFormat } from '@/service/baseService';

// home
const homeApi = '/api/system/car/location';                                    // 系统登陆           method 'GET'

// 根据车牌号查询车辆列表
const licenseListApi = '/api/system/car/location/{license}';                   // 查询车辆列表       method 'GET'

// 分页查询正在行驶中的车辆
const carAllListApi = '/api/system/car/map/list';                              // 行驶中车辆         method 'GET'

// 首页分页查停车场车辆
const parkListApi = '/api/parking/{id}/car';                       // 查停车场车辆       method 'GET'

// 首页查询停车场详情
const parkDetailApi = '/api/parking/{id}';                       // 查停车场车辆       method 'GET'

// 查询所有停车场
const parkAllApi = '/api/parking/select';                              // 查询所有停车场     method 'GET'

// 首页
export const home = () => fetch.get(homeApi);

// 根据车牌号查询车辆列表
export const licenseList = (opt) => fetch.get(apiFormat(licenseListApi, opt));

// 分页查询正在行驶中的车辆
export const carAllList = (opt) => fetch.get(carAllListApi, {params: opt});

// 首页分页查停车场车辆
export const parkList = (opt, params) => fetch.get(apiFormat(parkListApi, opt), {params: params});

// 首页查询停车场详情
export const parkDetail = (opt, params) => fetch.get(apiFormat(parkDetailApi, opt), {params: params});

// 查询所有停车场
export const parkAll = () => fetch.get(parkAllApi);
