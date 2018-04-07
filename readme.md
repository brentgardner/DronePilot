# Drone Pilot

A node.js server, socket.io/express client for the Rabits to program a drone

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Install [Node.js](https://nodejs.org/en/)

you can download an install binary directly from [Node.js](https://nodejs.org/en/) or use your favorite [package manager](https://nodejs.org/en/download/package-manager/)

A Parrot MiniDrone or other Parrot drone:  [Parrot.com](https://www.parrot.com/)

### Installing


Download or fork the repository

open your OS's console or the Node console

CD into the directory where you saved the repository and then into the dronepilot directory - You should see the app.js file.
```
CD dronpilot
```

Install all the dependencies

```
npm install
```

Start the node server
```
node app.js
```

The server should start and invite you to launch the client in a browser by visiting: [http://localhost:3005](http://localhost:3005)


Also helps if you have a drone but you can take a look without one...

## Built With

* [Node.js](https://nodejs.org)
* [Express](https://expressjs.com/)
* [Socket.io](https://socket.io/)
* [RollingSpider](https://github.com/voodootikigod/node-rolling-spider)

## Authors

* **Brent Gardner** - [Brent Gardner](https://github.com/BrentGardner)
## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* stood on the shoulders of everyone that figured out the hard stuff first
* Love the [RollingSpider](https://github.com/voodootikigod/node-rolling-spider)
