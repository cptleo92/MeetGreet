%w[
  .ruby-version
  .rbenv-vars
  tmp/restart.txt
  tmp/caching-dev.txt
].each { |path| Spring.watch(path) }

%w(
  ...
  config/application.yml
).each { |path| Spring.watch(path) }