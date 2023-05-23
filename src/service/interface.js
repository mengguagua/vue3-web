// 业务接口都写在interface这个文件内
import axios from '/src/service/api.js';

const prefix = '/mfm-core-etime';

// 获取用户信息
export function getUserInfo(req) {
  return axios.get(`${prefix}/sys/user/getUserInfo`, {params: req});
}
// 上传文件
export function uploadFile(req) {
  return axios.post(`${prefix}/sys/fileUpload/uploadFile`, req, {headers: {'Content-Type': 'multipart/form-data'}});
}
/*学而时习*/
// 查询详情
export function partyLearnView(req) {
  return axios.get(`${prefix}/party/partyLearn/view`, {params: req});
}
// 查询列表
export function selectPageList(req) {
  return axios.get(`${prefix}/party/partyLearn/selectPageList`, {params: req});
}
// 保存
export function partyLearnSave(req) {
  return axios.post(`${prefix}/party/partyLearn/save`, req);
}
// 删除
export function partyLearnDelete(req) {
  return axios.post(`${prefix}/party/partyLearn/delete`, req);
}
// 发布
export function partyLearnRelease(req) {
  return axios.post(`${prefix}/party/partyLearn/release`, req);
}
