export const pathProcessing = (url) => {
  if (!url) return null
  let endpoint = process.env.VITE_BASE_API_ENDPOINT
  const baseUrl = window.location.origin + "/"
  if (url.includes(baseUrl)) {
    return url
  } else if (url.includes("/")) {
    return url
  }
  return endpoint + "/" + url
}
