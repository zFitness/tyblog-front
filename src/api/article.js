import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'api/admin/articles',
    method: 'get',
    params: query,
    baseURL: 'http://localhost:8080'
  })
}

export function fetchArticle(id) {
  return request({
    url: `api/admin/articles/${id}`,
    method: 'get',
    params: {},
    baseURL: 'http://localhost:8080'
  })
}

export function deleteArticle(id) {
  return request({
    url: `api/admin/articles/delete`,
    method: 'post',
    params: { id },
    baseURL: 'http://localhost:8080'
  })
}

export function setArticleStatus(articleId, articleStatus) {
  return request({
    url: `api/admin/articles/setStatus`,
    method: 'post',
    params: { articleStatus, articleId },
    baseURL: 'http://localhost:8080'
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: 'api/admin/articles/add',
    method: 'post',
    data,
    baseURL: 'http://localhost:8080'
  })
}

export function updateArticle(data) {
  return request({
    url: 'api/admin/articles/update',
    method: 'post',
    data,
    baseURL: 'http://localhost:8080'
  })
}
