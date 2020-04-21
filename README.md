# Health authority UI

A user interface for physicians to generate validation codes for their sick
patients, so they can declare themselves as covid+ in their app.

This user interface is tailored to be used in front of a backend architecture
for _decentralized contact tracing_, such as
[dp3t-ms](https://github.com/jdesboeufs/dp3t-ms).

The user interface will require the following API endpoints accessible:

- `/login`
- `/logout`
- `/user-info`: should return a 200 status code if logged in
- `/create-code`: see [dp3t-ms](https://github.com/jdesboeufs/dp3t-ms#codes-microservice)

## Prerequisites

This user interface does not have any dependencies. There is one external
library for generating QR codes that has been copied to this repository:
[qrcodejs](https://github.com/davidshimjs/qrcodejs).

## Configuration

The URLs to the API endpoints are listed at the top of the `index.js` file.

## Development

### Front-end

You can use a simple http server like
[live-server](https://www.npmjs.com/package/live-server) to have live
reloading, or `python3 -m http.server`.

### Mock backend

The mock backend is only here to allow local development. It's developped in
python using [Flask](https://flask.palletsprojects.com/).

To start the server you can use the `Makefile`:

```sh
cd mock-backend
make install
make serve
```

## License

MIT