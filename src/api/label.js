import request from "@/utils/request";

export function fetchLabels() {
  return request({
    url: "api/admin/labels",
    method: "get",
    params: {},
    baseURL: "http://localhost:8080"
  });
}

export function createLabel(labelName) {
  return request({
    url: "api/admin/labels/addByName",
    method: "post",
    params: { labelName },
    baseURL: "http://localhost:8080"
  });
}
