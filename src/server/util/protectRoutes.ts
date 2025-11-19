export function protectRoutes(routes: string[], pathname: string) {
  return routes.some(route => {
    if (route.includes(':path*')) {
      const regex = new RegExp('^' + route.replace(/:[^/]+?\*/g, '.*') + '/?$');
      return regex.test(pathname);
    } else {
      return route === pathname;
    }
  });
}