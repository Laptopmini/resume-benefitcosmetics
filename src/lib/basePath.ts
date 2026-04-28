export const BASE_PATH = "/ralph-node-resume";

export function withBasePath(path: string): string {
  return `${BASE_PATH}${path.startsWith("/") ? path : "/" + path}`;
}

export function stripBasePath(path: string): string {
  if (path.startsWith(BASE_PATH)) {
    return path.slice(BASE_PATH.length);
  }
  return path;
}
