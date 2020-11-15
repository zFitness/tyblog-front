import request from "@/utils/request";

export function fetchLabels() {
  return request({
    url: "api/admin/labels",
    method: "get",
    params: {}
  });
}

export function fetchLabelsWithArticleCount() {
  return request({
    url: "api/admin/labels?more=true",
    method: "get",
    params: {}
  });
}

export function createLabel(data) {
  return request({
    url: "api/admin/labels",
    method: "post",
    data: data
  });
}

export function updateLabel(labelId, data) {
  return request({
    url: `api/admin/labels/${labelId}`,
    method: "put",
    data: data
  });
}

export function deleteLabel(labelId) {
  return request({
    url: `api/admin/labels/${labelId}`,
    method: "delete",
    params: {}
  });
}
