const getToken = () => localStorage.getItem("token");

const getDefaultHeaders = () => ({
  "Content-Type": "application/json;charset=utf-8",
  Authorization: `Bearer ${getToken()}`,
});

interface IRequest {
  url: RequestInfo;
  headers?: HeadersInit;
  method: string;
}

export const logOut = async ({ url, headers, method }: IRequest) => {
  const response = await fetch(url, {
    method,
    headers: {
      ...getDefaultHeaders(),
      ...headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message);
  }
};

export const out = (url: string) => logOut({ url, method: "POST" });
