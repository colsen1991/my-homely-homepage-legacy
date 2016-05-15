function init() {
  window.onerror = () => {
  // TODO Error to server
  console.error('JS error!'); // eslint-disable-line
  };
}

export default init;
