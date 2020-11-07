import request from "@/utils/request";

export function listLinks(query) {
  return request({
    url: "api/admin/links",
    method: "get",
    params: query
  });
}

export function setLinkVisible(linkId, visible) {
  return request({
    url: "api/admin/links/visible",
    method: "post",
    params: { linkId, visible }
  });
}

export function deleteLink(linkId) {
  return request({
    url: "api/admin/links/delete",
    method: "post",
    params: { linkId }
  });
}

export function addLink(data) {
  return request({
    url: "api/admin/links/add",
    method: "post",
    data
  });
}

export function updateLink(data) {
  return request({
    url: "api/admin/links/update",
    method: "post",
    data
  });
}