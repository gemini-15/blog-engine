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

## Installation

### Dependencies


### Variables to specify

**Database URL** : The database URL must be specified so that the server can connect to it. 
**Database credentials** : The database credentials are also needed. 




