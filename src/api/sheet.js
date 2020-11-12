import request from "@/utils/request";

export function listSheets(query) {
  return request({
    url: "api/admin/sheets",
    method: "get",
    params: query
  });
}

export function fetchSheet(sheetId) {
  return request({
    url: `api/admin/sheets/id/${sheetId}`,
    method: "get",
    params: {}
  });
}

export function deleteSheet(sheetId) {
  return request({
    url: `/api/admin/sheets/id/${sheetId}`,
    method: "delete",
    params: {}
  });
}

export function setSheetStatus(sheetId, status) {
  return request({
    url: `api/admin/sheets/${sheetId}/status`,
    method: "post",
    params: { status }
  });
}

export function fetchPv(pv) {
  return request({
    url: "/vue-element-admin/article/pv",
    method: "get",
    params: { pv }
  });
}

export function createSheet(data) {
  return request({
    url: "api/admin/sheets",
    method: "post",
    data
  });
}

export function updateSheet(sheetId, data) {
  return request({
    url: `api/admin/sheets/id/${sheetId}`,
    method: "put",
    data
  });
}
