let ports = new Map();

self.onconnect = (initEvent) => {
  const port = initEvent.source;
  const portId = Date.now() + "_" + Math.random();

  ports.set(portId, port);

  port.onmessage = (e) => {
    ports.forEach((p) => {
      if (e.data === "close") {
        ports.delete(portId);
      }

      broadcastCount(p);
    });
  };

  port.onclose = (e) => {
    ports.delete(portId);
    broadcastCount(e);
  };
};

function broadcastCount(e) {
  ports.forEach((p, id) => {
    try {
      p.postMessage({
        tabs: ports.size,
        theme: e.data,
      });
    } catch (e) {
      ports.delete(id);
    }
  });
}

setInterval(() => {
  ports.forEach((port, id) => {
    try {
    } catch (e) {
      ports.delete(id);
    }
  });
}, 5000);
