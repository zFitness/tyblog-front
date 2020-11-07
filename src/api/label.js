import request from "@/utils/request";

export function fetchLabels() {
  return request({
    url: "api/admin/labels",
    method: "get",
    params: {}
  });
}

export function createLabel(labelName) {
  return request({
    url: "api/admin/labels/addByName",
    method: "post",
    params: { labelName }
  });
}

export function updateLabel(data) {
  return request({
    url: "api/admin/labels/update",
    method: "post",
    data: data
  });
}

export function deleteLabel(labelId) {
  return request({
    url: "api/admin/labels/delete",
    method: "post",
    params: { labelId }
  });
}
