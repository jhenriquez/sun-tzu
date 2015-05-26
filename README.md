## Sun-Tzu ##

A command line interface for the [codewars][1] API. Focus on those who prefer to work locally,
it helps you keep your katas organized.

### Notes ###

The project is still on very early stages, not even usable. This readme will be updated as functionality becomes available.

### Usage ###

### configuration ###

A config file is any valid JSON holding the codewars username and access key, named ".sun-tzu".

### Commands ###

#### init ####

The init command creates a configuration file (.sun-tzu) on the current directory. It warns if the a configuration file already exists, or overwrites it if the "--force" option is passed.

Options:

-u, --username <username>
-k, --key <access_key>
-f, --force

### Development ###

#### Setup ####

A simple ```npm install``` should install all required dependencies. The solution uses grunt for some automated tasks, installing grunt-cli is recommended.

#### Code Style ####

JSHint is configured to help maintain code style. The code can be linted on demand by running ```grunt jshint``` or with every change by starting a watch on the files with: ```grunt watch```.

#### Automated Tests ####

The automated tests are written using mocha. And can be executed by executing either of this commands:

```npm test```
```mocha specs/```

or

```mocha # from the specs directory.``` 

[1]: http://dev.codewars.com/