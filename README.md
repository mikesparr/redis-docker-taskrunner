# Redis Docker Task Runner
This app is designed to be run via a Kubernetes `CronJob` but could be run independently,
or as a standalone Docker app. It connects to defined Redis database, and checks for pending
tasks on defined `channel`, and performing defined task.

By default, this will re-publish the task to a Redis `PubSub` channel, but can be extended 
to do anything desired.

# Requirements
You need Redis to be running.

# Usage

## Kubernetes (CronJob)
This is the quick and dirty test, but you'll likely want to clone and change manifest and `ENV`
variables.

```bash
kubectl apply -f https://raw.githubusercontent.com/mikesparr/redis-docker-taskrunner/master/deploy/cronjob.yml
```

## Customizing
This app can be run locally, on any server (likely Linux environment using cron but also Windows with scheduler). 
It is designed to run in Kubernetes using `CronJob`, but you could deploy it anywhere and create your own cron 
to `*/1 * * * *  /usr/local/bin/node /path/to/app/index.js` for example.

### Clone repo and install dependencies locally
```bash
git clone git@github.com:mikesparr/redis-docker-taskrunner.git
cd redis-docker-taskrunner
npm install
```

### Edit files to your liking
1. Create a `.env` file and customize:
```bash
# default env vars for scheduler app
export SCHEDULER_NAME="Default"
export SCHEDULER_CHANNEL="scheduler"
export SCHEDULER_DB_HOST="localhost"
export SCHEDULER_DB_PORT="6379"
#export SCHEDULER_DB_NAME=
#export SCHEDULER_DB_PASS=
```

2. Create your own Docker image and publish to container registry
```bash
docker build -t yourrepo/redis-docker-taskrunner:latest .
docker push yourrepo/redis-docker-taskrunner:latest # assume you logged into your account
```

3. Edit the params in `/deploy/cronjob.yml` for your Kubernetes environment
 * edit the `image` to point to `yourrepo/redis-docker-taskrunner:latest`
 * edit the `env` params to point to your instance of Redis

4. Deploy cronjob to Kubernetes
```bash
kubectl delete -f deploy/cronjob.yml # if you had prior version running
kubectl apply -f deploy/cronjob.yml
```

# Testing
```bash
git clone git@github.com:mikesparr/redis-docker-taskrunner.git
cd redis-docker-taskrunner
npm install
npm test
npm run coverage # optional
```

# Contributing
I haven't thought that far ahead yet. I needed this for a project I'm working on.

# License
MIT
