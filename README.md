# nodejs_training

## Table of contents
  - [Prerequisite](#prerequisite)
  - [Setup Instructions](#setup-instructions)

## Prerequisite
- Install [Node.js](https://nodejs.org/en/) (10.15.0)
- Install [Postgres](https://www.postgresql.org/) (10.7)

## Setup Instructions
- Clone mentioned projects in your workspace
	* nodejs_training (`git clone https://github.com/anuj-hm/nodejs_training`)
- Go to project root directory [cd nodejs_training]
- install npm [npm i]
- Copy env file `cp .env-example .env`
- Modify SQL_USERNAME, SQL_PASSWORD, SQL_HOST and SQL_PORT as per your localhost/remote server.
- Create database into postgres - [name should be SQL_DATABASE + "_" + NODE_ENV] [Check .env file for values] [`CREATE DATABASE nodejs_training_dev;`]
- Start the server [node src]