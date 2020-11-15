import request from "@/utils/request";

export function fetchList(query) {
  return request({
    url: "api/admin/articles",
    method: "get",
    params: query
  });
}

export function fetchArticle(id) {
  return request({
    url: `api/admin/articles/${id}`,
    method: "get",
    params: {}
  });
}

export function deleteArticle(id) {
  return request({
    url: `api/admin/articles/${id}`,
    method: "delete",
    params: {}
  });
}

export function setArticleStatus(articleId, articleStatus) {
  return request({
    url: `api/admin/articles/${articleId}/status/${articleStatus}`,
    method: "put",
    params: {}
  });
}

export function fetchPv(pv) {
  return request({
    url: "/vue-element-admin/article/pv",
    method: "get",
    params: { pv }
  });
}

export function createArticle(data) {
  return request({
    url: "api/admin/articles/",
    method: "post",
    data
  });
}

export function updateArticle(data) {
  return request({
    url: "api/admin/articles/",
    method: "put",
    data
  });
}
