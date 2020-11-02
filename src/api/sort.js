import request from "@/utils/request";

export function fetchSorts() {
  return request({
    url: "api/admin/sorts",
    method: "get",
    params: {},
    baseURL: "http://localhost:8080"
  });
}
