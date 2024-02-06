# Blog engine
Blog engine for my personal blog at : [https://ayzminy.blog](https://ayzminy.blog). 

## What's in here ? 
### Core engine 
The core folder is the backend of the server. It's written with Rust and uses [Actix web](https://actix.rs/). 
The ORM used is [diesel](https://diesel.rs/) combined to [r2d2](https://github.com/sfackler/r2d2) for the connection pool. 

It implements the following features :
- Registers an Article metadata on the database.
- Listing all registered articles.
- Requesting a registered article via its `uuid`.

### App
The app is a React app. 

The app request the core for articles and generates the page using `react-markdown` to take into account the content. 

## Running locally
### Database 
A postgres database must be setup. You can do so quickly with a docker image :
```bash
docker run -e POSTGRES_USER=blogdev -e POSTGRES_DB=blogdb -e POSTGRES_PASSWORD=blogdev -p 5432:5432 postgres:latest
```

Additionally, some packages might be required : 
```bash
sudo apt install -y libpq-dev build-essential
```

### Core
Running the core doing cargo run : 
```bash
DATABASE_URL="postgresql://blogdev:blogdev@127.0.0.1:5432/blogdb" RUST_LOG=info cargo run
```
- `DATABASE_URL` must be specified. 
- You can choose the log level with `RUST_LOG`. 
- `PORT` (Optional), can also be specified, default at 8080.

### App
Specifying the React APP url env variable :
the `app/blog/.env` file specifies the `REACT_APP_API_URL` which is set to communicate with the core at `http://127.0.0.1:8080/`.  

Running the React app with npm run : 
```bash 
npm install
npm run 
```

## Using with Docker

### Dependencies
The docker engine and Docker compose must be installed to run the core. 

### Env variables

**Database URL** : The database URL must be specified so that the server can connect to it. 
**Database credentials** : The database credentials are also needed. 
**React App API URL** : The react app API url, which is basically the API url access to the core. `REACT_APP_API_URL`

Creating a random password for postgres :
```bash
openssl rand -hex 20 > db_secrets.txt
```


### Compose file 
A docker compose file is available to run directly the postgres with the precedently created password, the core and the app :
```
docker compose up
```

## If you find something not working/ Not done properly or any ideas to add 

Create an issue please 😄 ! I'll take care of it ASAP!!
Some of the things that I'm working on adding: 
- [ ] Adding units tests for the API
- [ ] Adding fuzzing targets as an example
- [ ] Adding github workflow for transparency build with rust builder and SLSA
- [ ] Implementing a search on the rendered articles (Must be optimized)
- [ ] Tags filtering (Ongoing)






