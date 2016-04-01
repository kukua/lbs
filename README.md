# LBS
> London Business School graphical interface

### Setup

Set values
```bash
$ cp .env.sample .env
# > Edit configuration in .env

$ cp public_html/.environment/default.php public_html/.environment/config.php
# > Edit configuration in public_html/.environment/config.php
```

### Docker

* [Docker](http://docs.docker.com/linux/started/)
* [Docker Compose](https://docs.docker.com/compose/install/)

```bash
$ docker-compose up -d
# Navigate to http://<container ip>:80/
```

### CSS / JS

* [NodeJS](https://nodejs.org/en/docs/)

Required global NPM & Gulp

```bash
$ npm install
$ bower install
$ gulp build
```
