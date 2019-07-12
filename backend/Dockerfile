FROM ruby:2.6.3
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client
RUN mkdir -p /recipe_app/backend
WORKDIR /recipe_app/backend
COPY Gemfile /recipe_app/backend/Gemfile
COPY Gemfile.lock /recipe_app/backend/Gemfile.lock
RUN bundle install
COPY . /recipe_app/backend

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
