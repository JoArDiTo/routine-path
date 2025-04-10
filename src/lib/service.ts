export function getTokenFromCookie() {
  const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
  
  return token ?? ""
}

export function setTokenToCookie(token: string) {
  document.cookie = `token=${token}; path=/; secure; samesite=strict`;
}

export function removeTokenFromCookie() {
  document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}
