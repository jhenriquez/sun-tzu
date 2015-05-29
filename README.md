## Sun-Tzu ##

A command line interface for the [codewars][1] API. Focus on those who prefer to work locally,
it helps you keep your katas organized.

### Notes ###

The project is still on very early stages, not even usable. It has only reached a barely useful state.

### Usage ###

### Configuration ###

A config file is any valid JSON holding with the following fields:

* username
* access_key (required for most operations)
* language (a default language to fallback to)

### Commands ###

#### init ####

The init command creates a configuration file (.sun-tzu) on the current directory. It warns if the a configuration file already exists, or overwrites it if the "--force" option is passed.

Options:

-u, --username <username>
	
-k, --key <access_key>
	
-f, --force

#### train ####

Begins a new training session for the next code challenge (kata) within your training queue. It expects a language to be provided. If none, it will use the one configured, if any.

sun-tzu train [language] [options]

Options:

-p, --peek 

If you only want to peek at the next item in your queue, without removing it from the queue or beginning a new training session. It will NOT persist the challenge information.

### Development ###

#### Setup ####

A simple ```npm install``` should install all required dependencies. The solution uses grunt for some automated tasks, installing grunt-cli is recommended.

#### Code Style ####

JSHint is configured to help maintain code style. The code can be linted on demand by running ```grunt jshint``` or with every change by starting a watch on the files with: ```grunt watch```.

#### Automated Tests ####

The automated tests are written using mocha. Can be executed any of these commands:

```npm test or mocha specs/ # from the root directory.```

or

```mocha # from the specs directory.``` 

[1]: http://dev.codewars.com/