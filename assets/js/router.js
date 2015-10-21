export default function getRouter() {
  return reduxReactRouter(routes, createHistory);
}
