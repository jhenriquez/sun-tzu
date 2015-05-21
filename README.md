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

[1]: http://dev.codewars.com/