globalThis.import_meta_env = JSON.parse('"import_meta_env_placeholder"');

self.postMessage(`Hello: ${import.meta.env.HELLO}`);
