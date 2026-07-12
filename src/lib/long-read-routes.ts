/** Routes where system cursor and scroll affordances are preferred over index chrome. */
export function isLongReadPathname(pathname: string): boolean {
  if (pathname.startsWith("/projects/") && pathname.length > "/projects/".length) {
    return true;
  }

  if (pathname.startsWith("/craft/") && pathname.length > "/craft/".length) {
    return true;
  }

  return false;
}
