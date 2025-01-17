# Songbox

Search, discover and keep track of your favorite albums, artists, playlists, tracks, shows, episodes and audiobooks

## Requirements

[**bun**](https://bun.sh) is required to install all the necessary packages.

[**Docker**](https://www.docker.com) must be installed to run the development containers on the target machine.

(_Optional_) Containers can also be started by invoking `make dev` from the repository root directory if `make` is available and the initial setup is done.

## Getting the development environment up and running

First, clone the repository:

```bash
git clone git@github.com:birzgalisn/songbox.git
```

After cloning the repository, from the root directory, create a new `.env` file by copying `.env.example`:

```bash
cp .env.example .env
```

Afterwards, add your `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` access keys by editing them within `.env`.

Next, run the following command to install all necessary modules:

```bash
bun i --frozen-lockfile
```

Finally, start the development Docker containers:

```bash
docker compose up
```

Once the containers are running, everything should be set up and ready to go.

Visit [http://songbox.localhost](http://songbox.localhost) to view the application.
