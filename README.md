# Rails-React--Redux-TypeScript-Docker Example

- [Ruby](https://www.ruby-lang.org/en/) 2.6.3
- [Rails](https://rubyonrails.org/) 5.2.3
- [React.js](https://reactjs.org/) 16.8.6
- [TypeScript](https://www.typescriptlang.org/) 3.5.3
- [Docker](https://docs.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Usage

```shell
git clone git@github.com:frankolson/cycleio_app.git recipe_app
cd recipe_app

# Setup
docker-compose run frontend npm install
docker-compose run backend rake db:create db:migrate db:seed

# Start
docker-compose up
# open http://localhost:3000
```
