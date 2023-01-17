
FROM ruby:2.7.5

RUN apt-get update -qq && apt-get install -y nodejs npm libpq-dev

COPY . .
RUN npm install && gem install bundler && bundle install

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]

