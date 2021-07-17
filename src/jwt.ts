import Base64 from "crypto-js/enc-base64";
import Utf8 from "crypto-js/enc-utf8";
import HmacSHA256 from "crypto-js/hmac-sha256";

export function BASE64_URL(source: Parameters<typeof Base64.stringify>[0]): string {
  // Encode in classical base64
  let encodedSource = Base64.stringify(source);
  // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, "");
  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, "-");
  encodedSource = encodedSource.replace(/\//g, "_");
  return encodedSource;
}

export function CREATE_JWT_TOKEN(data: any): string {
  // https://www.jonathan-petitcolas.com/2014/11/27/creating-json-web-token-in-javascript.html
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const stringifiedHeader = Utf8.parse(JSON.stringify(header));
  const encodedHeader = BASE64_URL(stringifiedHeader);
  const stringifiedData = Utf8.parse(JSON.stringify(data));
  const encodedData = BASE64_URL(stringifiedData);

  const token = encodedHeader + "." + encodedData;
  return token;
}

export function SIGN_JWT_TOKEN(token: string, secret: string): string {
  const sha = HmacSHA256(token, secret);
  const signature = BASE64_URL(sha);
  const signed = token + "." + signature;
  return signed;
}