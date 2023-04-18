// 业务接口都写在interface这个文件内
import axios from '/src/service/api.js';

/* 接口备注 */
export function aa(req) {
  return axios.post(`/url/a`, req);
}
export function bb(req) {
  return axios.get(`/url/b`, {params: req});
}
