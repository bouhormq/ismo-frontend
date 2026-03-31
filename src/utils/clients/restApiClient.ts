import wretch from "wretch";
import type { QueryStringAddon as WretchQueryStringAddon } from "wretch/addons";
import QueryStringAddon from "wretch/addons/queryString";

declare module "wretch" {
  // all methods' url parameters are removed to enforce consistent usage of the url() method
  interface Wretch {
    post<TRes = unknown, TBody = unknown>(
      this: WretchQueryStringAddon &
        Wretch<WretchQueryStringAddon, unknown, Promise<unknown>>,
      body?: TBody,
      // url?: string | undefined
    ): Promise<TRes>;
    get<TRes = unknown>(
      this: WretchQueryStringAddon &
        Wretch<WretchQueryStringAddon, unknown, Promise<unknown>>,
      // url?: string | undefined
    ): Promise<TRes>;
    put<TRes = unknown, TBody = unknown>(
      this: WretchQueryStringAddon &
        Wretch<WretchQueryStringAddon, unknown, Promise<unknown>>,
      body?: TBody,
      // url?: string | undefined
    ): Promise<TRes>;
    patch<TRes = unknown, TBody = unknown>(
      this: WretchQueryStringAddon &
        Wretch<WretchQueryStringAddon, unknown, Promise<unknown>>,
      body?: TBody,
      // url?: string | undefined
    ): Promise<TRes>;
    delete<TRes = unknown>(
      this: WretchQueryStringAddon &
        Wretch<WretchQueryStringAddon, unknown, Promise<unknown>>,
      // url?: string | undefined
    ): Promise<TRes>;
  }
}

export const rawRestApiClient = wretch(
  `${import.meta.env.VITE_BASE_API_URL}`,
).addon(QueryStringAddon);

export const restApiClient = rawRestApiClient
  .options({ credentials: "include" })
  .catcher(401, async (err, originalRequest) => {
    if ("message" in err.json) {
      if (err.json.message === "AUTH_TOKEN_EXPIRED") {
        await rawRestApiClient
          .options({ credentials: "include" })
          .url("/auth/refresh")
          .post()
          .res();

        // this might tell you that "await" is not necessary, but it is
        return await originalRequest
          .catcher(401, (err) => {
            throw err;
          })
          .fetch();
      }
    }

    throw err;
  })
  .catcherFallback(async (err) => {
    throw err;
  })
  .resolve(async (resolver) => {
    return resolver.res(async (res) => {
      if (res.ok) {
        try {
          return await resolver.json();
          // there is a bug in the eslint rule that doesn't allow the args starting with _
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_resolveJsonError) {
          try {
            return await resolver.text();
            // there is a bug in the eslint rule that doesn't allow the args starting with _
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (_resolveTextError) {
            return null;
          }
        }
      }
      throw await resolver.json();
    });
  });
