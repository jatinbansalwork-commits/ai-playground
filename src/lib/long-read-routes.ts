/** Routes where system cursor and scroll affordances are preferred over index chrome. */
export function isLongReadPathname(pathname: string): boolean {
  if (pathname.startsWith("/notes/")) {
    return true;
  }

  if (pathname.startsWith("/projects/") && pathname.length > "/projects/".length) {
    return true;
  }

  if (pathname.startsWith("/craft/") && pathname.length > "/craft/".length) {
    return true;
  }

  return false;
}

/** JB's Case Notes articles — no floating index chrome (chat, slide nav, etc.). */
export function isFieldNotesPathname(pathname: string): boolean {
  return pathname.startsWith("/notes/");
}
