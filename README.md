The app can read QR codes and create them from text

### run electron & react in dev mode
Starts a hot reloading react server then starts a development electron app pointing at it
`npm run start:dev`

### build production package
Will create flat files from react then packages these inside electron with no external dependencies.  Will create builds for mac & windows
`npm run build` followed by `npm start`
