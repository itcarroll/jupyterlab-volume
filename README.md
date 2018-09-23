# jupyterlab-volume

Open a file browser pointing to a path available to ther server.

## To Do

- [x] Prompt user for path from command "File Operations" > "Browse at Path..."
- [x] Add additional file browser to sidebar
- [ ] Actually point file browser to path
- [ ] Let the path be any path accessible to the labhub authenticated user

## Prerequisites

- nodejs
- pipenv

## Development

Clone this repository, then use Pipenv to set up the environment.

```bash
$ pipenv install
$ pipenv shell
Launching subshell in virtual environment…
(jupyterlab-volume)$
```

For a development install (requires npm version 4 or later), do the following in the repository directory:

```bash
(jupyterlab-volume)$ jlpm install
(jupyterlab-volume)$ jlpm run build
(jupyterlab-volume)$ jupyter labextension link .
```

To rebuild the package and the JupyterLab app:

```bash
(jupyterlab-volume)$ jlpm run build
(jupyterlab-volume)$ jupyter lab build
```
