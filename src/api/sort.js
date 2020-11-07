import request from "@/utils/request";

export function fetchSorts() {
  return request({
    url: "api/admin/sorts",
    method: "get",
    params: {},
    baseURL: "http://localhost:8080"
  });
}

export function deleteSort(sortId) {
  return request({
    url: "api/admin/sorts/delete",
    method: "post",
    params: { sortId }
  });
}

export function addSort(data) {
  return request({
    url: "api/admin/sorts/add",
    method: "post",
    data: data
  });
}

export function updateSort(data) {
  return request({
    url: "api/admin/sorts/update",
    method: "post",
    data: data
  });
}
