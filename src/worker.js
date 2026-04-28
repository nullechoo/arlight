const ports = [];

self.onconnect = (initEvent) => {
  const port = initEvent.source;

  ports.push(port);

  port.onmessage = (event) => {
    ports.forEach((p) =>
      p.postMessage({
        tabs: ports.length,
        theme: event.data,
      }),
    );
  };
};

self.onclose = (e) => {
  ports.filter((item) => item !== e.source);
};
