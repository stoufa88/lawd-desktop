# **Lawd**

![alt text](https://github.com/stoufa88/lawd-desktop/blob/master/logo.png  =250x "Lawd logo")

----------

# Videos
Lawd uses a parse server as its backend to store videos (movies and tv series).
The torrents from the tracker api are transformed and filtered in our parse server.

On the frontend, I used Vue.js and I find it extremely powerful library for building simple UI.
For streaming, I was caught by the simplicity of use of WebTorrent.js.
So I would like to thank these two fellas for making lawd alive.
But to not forgive the kat who offered me rapid access to their daily dump api.

## Install

First, clone the repo via git
And then install dependencies.

```bash
$ npm install
```

## Run

Run this two commands __simultaneously__ in different console tabs.

```bash
$ npm run hot-server
$ npm run start-hot
```

or run two servers with one command

```bash
$ npm run dev
```
