const getToken = () => localStorage.getItem("token");

const getDefaultHeaders = () => ({
  "Content-Type": "application/json;charset=utf-8",
  Authorization: `Bearer ${getToken()}`,
});

interface IRequest {
  url: RequestInfo;
  body?: BodyInit;
  headers?: HeadersInit;
  method?: string;
}

export const request = async ({ url, body, headers, method }: IRequest) => {
  const response = await fetch(url, {
    method,
    body,
    headers: {
      ...getDefaultHeaders(),
      ...headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message);
  }

  const bodyAnswer = await response.text();
  return JSON.parse(bodyAnswer);
};

export const get = (url: string) => request({ url });

export const post = (url: string, body: BodyInit) =>
  request({ url, body, method: "POST" });

export const remove = (url: string) => request({ url, method: "DELETE" });

export const patch = (url: string, body: BodyInit) =>
  request({ url, body, method: "PATCH" });
