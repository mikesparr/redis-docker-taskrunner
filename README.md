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
