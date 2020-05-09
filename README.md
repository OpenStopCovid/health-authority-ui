# Health authority UI

A user interface for physicians to generate validation codes for their sick
patients, so they can declare themselves as covid+ in their app.

This user interface is tailored to be used in front of a backend architecture
for _decentralized contact tracing_, such as
[dp3t-ms](https://github.com/jdesboeufs/dp3t-ms), and is written in french.

## Prerequisites

This user interface use one external library for generating QR codes
that has been copied to this repository:
[qrcodejs](https://github.com/davidshimjs/qrcodejs).

## Configuration

The user interface will require the following API endpoints accessible:

- `/login`
- `/logout`
- `/user-info`: should return a 200 status code if logged in
- `/create-code`: see [dp3t-ms](https://github.com/jdesboeufs/dp3t-ms#codes-microservice)

The URLs to the API endpoints are listed at the top of the `pages/index.js` file.

## Development
```bash
yarn install
```

### Front-end

Run the development server:
```bash
yarn dev
```
**or**

Build and start the app
```bash
yarn build
yarn start
```
Make sure to access the front-end with the following URL, or change the
`FRONT_URL` accordingly in `mock-backend/server.py`:

http://localhost:3000

### Mock backend

The mock backend is only here to allow local development. It's developped in
python using [Flask](https://flask.palletsprojects.com/).

To start the server you can use the `Makefile`:

```sh
cd mock-backend
make install
make serve
```

## TODO
- improve call to date format to control the "à" (in fr) in i18n langpack (#bug)
```components/main.jsx:112
const date = new Date(expireAt).toLocaleString();
```
- better components (granularity+) (#quality)
- typescript (#quality)


## License

MIT
