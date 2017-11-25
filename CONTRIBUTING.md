# Contributing

## General Workflow

1. Fork the repo
2. Cut a namespaced feature branch from master
3. Make commits to your feature branch. Prefix each commit like so:
4. When you've finished with your fix or feature, Rebase upstream changes into your branch. submit a pull request directly to master. Include a description of your changes.
5. Your pull request will be reviewed by another maintainer. The point of code reviews is to help keep the codebase clean and of high quality and, equally as important, to help you grow as a programmer. If your code reviewer requests you make a change you don't understand, ask them why.
6. Fix any issues raised by your code reviewer, and push your fixes as a single new commit.
7. Once the pull request has been reviewed, it will be merged by another member of the team. Do not merge your own commits.

## Detailed Workflow

### Running the Scripts

1. On the command line, from the root of the project, run `npm run build`
2. In a seperate command line, also from the root of the project, run `npm run watch`
3. Since the 'build' script runs webpack with the `--watch` flag and the `watch` script uses nodemon, the changes you make will be reflected as soon as the processes have run.

### Adding an HTML page

1. Create your HTML file in the `dist` directory
2. Give it a div tag with an id that is the all lowercase name of what you are handling (Ex. `students`)
3. Add a script tag with the source of a slash `/`, the id you used in step 2, and `.bundle.js` (Ex. `/students.bundle.js`)
4. In the `src` directory, add a load file with the name of `load` and the name you used for the id in step 2, with a `.js` extension, in camelCase (Ex. `loadStudents.js`)
5. In the load file, add imports for `React`, `ReactDOM`, and the `.jsx` component(s) you want to add (Ex. `import Students from './components/Students.jsx';`)
6. In the load file, listen for the event `DOMContentLoaded`, then render the component on the DOM Node with the id established in step 2
Ex:
``
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Students/>,
    document.getElementById('students')
  )
});
``
7. In `webpack.config.js`, in module.exports.entry, add the key/value pair of the id from step 2 and the relative path to the load file (Ex. `'students': './loadStudents.js'`)
8. Then, make sure that the project is 'built' with your changes by running `npm run build`
9. Note, since it is in 'watch' mode, any changes that you make while `npm run build` is still running will be built automatically.

### Fork the repo

Use Github’s interface to make a fork of the repo, then add that repo as an upstream remote:

```
git remote add upstream https://github.com/HRSF84-Mercury/HRSF84-Mercury.git
```

### Cut a namespaced feature branch from master

Your branch should follow this naming convention:
  - bug/...
  - feat/...
  - test/...
  - doc/...
  - refactor/...

These commands will help you do this:

``` bash

# Creates your branch and brings you there
git checkout -b `your-branch-name`
```

### Make commits to your feature branch.

Prefix each commit like so
  - (feat) Add a new feature
  - (fix) Fix inconsistent tests [Fixes #0]
  - (refactor) ...
  - (cleanup) ...
  - (test) ...
  - (doc) ...

Make changes and commits on your branch, and make sure that you
only make changes that are relevant to this branch. If you find
yourself making unrelated changes, make a new branch for those
changes.

#### Commit Message Guidelines

- Commit messages should be written in the present tense; e.g. "Fix continuous integration script".
- The first line of your commit message should be a brief summary of what the commit changes. Aim for about 70 characters max. Remember: This is a summary, not a detailed description of everything that changed.
- If you want to explain the commit in more depth, following the first line should be a blank line and then a more detailed description of the commit. This can be as detailed as you want, so dig into details here and keep the first line short.

### Rebase upstream changes into your branch

Once you are done making changes, you can begin the process of getting
your code merged into the main repo. Step 1 is to rebase upstream
changes to the master branch into yours by running this command
from your branch:

```bash
git pull --rebase upstream master
```

This will start the rebase process. You must commit all of your changes
before doing this. If there are no conflicts, this should just roll all
of your changes back on top of the changes from upstream, leading to a
nice, clean, linear commit history.

If there are conflicting changes, git will start yelling at you part way
through the rebasing process. Git will pause rebasing to allow you to sort
out the conflicts. You do this the same way you solve merge conflicts,
by checking all of the files git says have been changed in both histories
and picking the versions you want. Be aware that these changes will show
up in your pull request, so try and incorporate upstream changes as much
as possible.

You pick a file by `git add`ing it - you do not make commits during a
rebase.

Once you are done fixing conflicts for a specific commit, run:

```bash
git rebase --continue
```

This will continue the rebasing process. Once you are done fixing all
conflicts you should run the existing tests to make sure you didn’t break
anything, then run your new tests (there are new tests, right?) and
make sure they work also.

If rebasing broke anything, fix it, then repeat the above process until
you get here again and nothing is broken and all the tests pass.

### Make a pull request

Make a clear pull request from your fork and branch to the upstream master
branch, detailing exactly what changes you made and what feature this
should add. The clearer your pull request is the faster you can get
your changes incorporated into this repo.

At least one other person MUST give your changes a code review, and once
they are satisfied they will merge your changes into upstream. Alternatively,
they may have some requested changes. You should make more commits to your
branch to fix these, then follow this process again from rebasing onwards.

Once you get back here, make a comment requesting further review and
someone will look at your code again. If they like it, it will get merged,
else, just repeat again.

Thanks for contributing!

### Guidelines

1. Uphold the current code standard:
    - Keep your code [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).
    - Apply the [boy scout rule](http://programmer.97things.oreilly.com/wiki/index.php/The_Boy_Scout_Rule).
    - Follow [STYLE-GUIDE.md](STYLE-GUIDE.md)
1. Run the [tests][] before submitting a pull request.
1. Tests are very, very important. Submit tests if your pull request contains
   new, testable behavior.

## Checklist:

This is just to help you organize your process

- [ ] Did I cut my work branch off of master (don't cut new branches from existing feature branches)?
- [ ] Did I follow the correct naming convention for my branch?
- [ ] Is my branch focused on a single main change?
  - [ ] Do all of my changes directly relate to this change?
- [ ] Did I rebase the upstream master branch after I finished all my
  work?
- [ ] Did I write a clear pull request message detailing what changes I made?
- [ ] Did I get a code review?
  - [ ] Did I make any requested changes from that code review?

If you follow all of these guidelines and make good changes, you should have
no problem getting your changes merged in.


<!-- Links -->
[curriculum workflow diagram]: http://i.imgur.com/p0e4tQK.png
[Git Flow]: http://nvie.com/posts/a-successful-git-branching-model/
[GitHub Flow]: http://scottchacon.com/2011/08/31/github-flow.html
[Squash]: http://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html
