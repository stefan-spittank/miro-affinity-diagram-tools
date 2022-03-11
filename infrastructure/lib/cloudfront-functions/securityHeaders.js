function handler(event) {
  var response = event.response;
  var headers = response.headers;

  // Set HTTP security headers
  // Since JavaScript doesn't allow for hyphens in variable names, we use the dict["key"] notation
  headers["strict-transport-security"] = {
    value: "max-age=31536000; includeSubdomains; preload",
  };
  headers["content-security-policy"] = {
    value:
      "default-src 'self'; img-src 'self'; script-src 'self' https://miro.com/*; style-src 'self'; object-src 'none'; frame-ancestors 'self' miro.com *.miro.com ;",
  };
  headers["x-content-type-options"] = { value: "nosniff" };
  headers["x-frame-options"] = { value: "deny" };
  headers["x-xss-protection"] = { value: "1; mode=block" };
  headers["referrer-policy"] = { value: "same-origin" };

  // Return the response to viewers
  return response;
}
