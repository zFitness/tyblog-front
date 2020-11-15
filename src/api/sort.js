import request from "@/utils/request";

export function fetchSorts() {
  return request({
    url: "api/admin/sorts",
    method: "get",
    params: {}
  });
}

export function fetchSortsWithArticleCount() {
  return request({
    url: "api/admin/sorts?more=true",
    method: "get",
    params: {}
  });
}

export function deleteSort(sortId) {
  return request({
    url: `api/admin/sorts/${sortId}`,
    method: "delete",
    params: {}
  });
}

export function addSort(data) {
  return request({
    url: "api/admin/sorts",
    method: "post",
    data: data
  });
}

export function updateSort(sortId, data) {
  return request({
    url: `api/admin/sorts/${sortId}`,
    method: "put",
    data: data
  });
}
