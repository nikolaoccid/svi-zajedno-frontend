# Build the Vite app, serve it with nginx. The API is reached at the relative path /api,
# which nginx forwards to the backend container, so one hostname serves both.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG VITE_API_URL=/api
ARG VITE_I18N_DEFAULT_LOCALE=hr
ARG VITE_HIDE_LANGUAGE_PICKER=true
# Demo build: a DEMO button on the login page signs in with these (public) credentials. Empty = off.
ARG VITE_DEMO_MODE=
ARG VITE_DEMO_EMAIL=
ARG VITE_DEMO_PASSWORD=
ENV VITE_API_URL=$VITE_API_URL \
    VITE_I18N_DEFAULT_LOCALE=$VITE_I18N_DEFAULT_LOCALE \
    VITE_HIDE_LANGUAGE_PICKER=$VITE_HIDE_LANGUAGE_PICKER \
    VITE_DEMO_MODE=$VITE_DEMO_MODE \
    VITE_DEMO_EMAIL=$VITE_DEMO_EMAIL \
    VITE_DEMO_PASSWORD=$VITE_DEMO_PASSWORD
# tsc on the generated API client needs more than Node's default heap in a small container
ENV NODE_OPTIONS=--max-old-space-size=3072
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
