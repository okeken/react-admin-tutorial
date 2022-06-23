import { fetchUtils } from "react-admin";
import { stringify } from "query-string";
import { baseUrl } from "./env";

const httpClient = fetchUtils.fetchJson;

export default {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const query = {
      _page: page,
      _limit: perPage,
      ...params.filter,
    };
    const url = `${baseUrl}${resource}?${stringify(query)}`;
    
    const token = localStorage.getItem("authToken");
    const options = {
      headers: new Headers({ Accept: "application/json" }),
    };
    if (token) {
      options.headers.set("Authorization", `Bearer ${token}`);
      return httpClient(url, options).then((resp) => {
        return {
          data: resp.json,
          total: +resp.headers.get("X-Total-Count"),
        };
      });
    }
  },

  getOne: (resource, params) =>
    httpClient(`${baseUrl}${resource}/${params.id}`).then(({ json }) => ({
      data: json,
    })),

  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${baseUrl}${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({ data: json }));
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${baseUrl}${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: json,
      total: parseInt(headers.get("content-range").split("/").pop(), 10),
    }));
  },

  update: (resource, params) =>
    httpClient(`${baseUrl}${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json })),

  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${baseUrl}${resource}?${stringify(query)}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },

  create: (resource, params) =>
    httpClient(`${baseUrl}${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    })),

  delete: (resource, params) =>
    httpClient(`${baseUrl}${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json })),

  deleteMany: async (resource, params) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const delFetch = params.ids.map((eleid) => {
      return fetch(`${baseUrl}${resource}/${eleid}`, {
        method: "DELETE",
        headers: headers,
      });
    });

    const response = await Promise.all([delFetch]).then((res) => {
      return {
        data: params.ids,
      };
    });

    return response;

    // const query = {
    //   filter: JSON.stringify({ id: params.ids }),
    // };
    // return httpClient(`${baseUrl}${resource}?${stringify(query)}`, {
    //   method: "DELETE",
    // }).then(({ json }) => ({ data: json }));
  },
};
