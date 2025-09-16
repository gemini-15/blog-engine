# syntax=docker/dockerfile:1


ARG RUST_VERSION=1.86.0
ARG APP_NAME=ayzblog_core
FROM rust:${RUST_VERSION}-slim-bullseye AS build
ARG APP_NAME
WORKDIR /app
COPY ./ /app/

RUN apt update -y
RUN apt install -y libpq-dev libpq5 build-essential
RUN cargo install diesel_cli --no-default-features --features postgres

RUN --mount=type=bind,source=src,target=src \
    --mount=type=bind,source=Cargo.toml,target=Cargo.toml \
    --mount=type=bind,source=Cargo.lock,target=Cargo.lock \
    --mount=type=cache,target=/app/target/ \
    --mount=type=cache,target=/usr/local/cargo/registry/ \
    <<EOF
set -e
apt update
cargo build --locked --release
cp ./target/release/$APP_NAME /bin/server
EOF

FROM rust:${RUST_VERSION}-slim-bullseye AS diesel
WORKDIR /app
ENV CARGO_HOME=/app/.cargo 
RUN apt update -y
RUN apt install -y libpq-dev libpq5 build-essential
RUN cargo install diesel_cli --no-default-features --features postgres

FROM ubuntu AS final
WORKDIR /core

RUN apt update -y 
RUN apt install -y libpq-dev libpq5 librust-pq-sys-dev
RUN apt-get install -y \
    build-essential \
    curl


ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser



# Copy the executable from the "build" stage.
COPY --from=build /bin/server /bin/
COPY --from=diesel /app/.cargo/bin/diesel /bin/
COPY ./articles /core/articles
COPY ./migrations /core/migrations
COPY ./entrypoint.sh /core/entrypoint.sh
RUN chmod +x /core/entrypoint.sh
# Expose the port that the application listens on.
RUN chmod 777 /core/

USER appuser
# What the container should run when it is started.
ENTRYPOINT [ "/core/entrypoint.sh" ]
