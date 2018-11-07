# Clean Todo

Learning Domain Driven Design, Command Query Responsibility Segregation and
Event Sourcing

## Clean install instruction

You need to create the Test Report file first so it can be synchronized with the
container:

`touch test-report.html`

You can then build the image, start the container and execute the tests with:

`docker-compose up`

You may need the Node.js modules on the host if your IDE needs it for various
reasons (type checking, linting):

`docker cp clean-todo_test_1:/usr/app/node_modules ./`

## Using Docker

This project uses Docker because I also want to learn it and to make it run on
any machine. I'm sure the current setup is far from perfect and I expect to
improve it over time.

Currently the setup is created with testing as the sole purpose to the `src`
directory is shared with the container so that it is not necessary to rebuild
the image each time the source code is changed. The test report is also shared.

The image should be rebuilt if any other file is modified.

## Project Log

### Step 1: Walking skeletton and MVP

First step is to build a walking skeleton (the full DDD-CQRS-ES architecture) supporting a MVP : we just want to add and view items. The ubiquitous language is the following:

> An **Item** has a **Description**. Items can be **Added**.
