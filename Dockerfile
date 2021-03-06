FROM node:9.4.0
EXPOSE 8081

ENV PORT=8081
ENV DATABASE__CONNECTION__HOST=localhost
ENV DATABASE__CONNECTION__USER=elliotblackburn
ENV DATABASE__CONNECTION__PASSWORD=pa55word
ENV DATABASE__CONNECTION__DATABASE=scaffold
ENV DATABASE__CONNECTION__CHARSET=utf8
ENV AUTH__SECRET=shh
ENV SESSION__SECRET=yesshh
ENV SESSION__STORE__HOST=localhost
ENV SESSION__STORE__PORT=6379

# Copy source code & configuration
COPY . /var/www/scaffold

# Install dependencies
RUN cd /var/www/scaffold && yarn --ignore-optional

# Run db init, migrations, and start the server
ENTRYPOINT cd /var/www/scaffold && \
    yarn run db-init && \
    yarn run db-up && \
    yarn start
