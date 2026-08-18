/**
 * Prefix a public asset path with the deployment basePath.
 *
 * `next/image` rewrites URLs for `basePath` only when the optimizer is in play.
 * This site exports statically with `images.unoptimized`, so the raw `src` is
 * emitted verbatim and the prefix has to be applied by hand — otherwise every
 * image 404s once the site is served from a sub-path.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${BASE}${path}`;
