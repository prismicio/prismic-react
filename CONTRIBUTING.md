# Contributing

This package is primarily maintained by [Prismic](https://prismic.io)[^1]. External contributions are welcome. Ask for help by [opening an issue](https://github.com/prismicio/prismic-react/issues/new/choose), or request a review by opening a pull request.

## :gear: Setup

<!-- When applicable, list system requriements to work on the project. -->

The following setup is required to work on this project:

- Node.js 24 or later
- npm CLI

## :memo: Project-specific notes

<!-- Share information about the repository. -->
<!-- What specific knowledge do contributors need? -->

> [!TIP]
> Please update this section with helpful notes for contributors.

#### Tests

- `@prismicio/react` uses [Playwright](https://playwright.dev/) to test its APIs.
- Using Playwright allows us to test the package's components and helpers against real React apps.
- The package is tested against a Next.js App Router-based project.

## :construction_worker: Develop

> [!NOTE]
> It's highly recommended to discuss your changes with the Prismic team before starting by [opening an issue](https://github.com/prismicio/prismic-react/issues/new/choose).[^2]
>
> A short discussion can accellerate your work and ship it faster.

```sh
# Clone and prepare the project.
git clone git@github.com:prismicio/prismic-react.git
cd prismic-react
npm install

# Create a new branch for your changes (e.g. lh/fix-win32-paths).
git checkout -b <your-initials>/<feature-or-fix-description>

# Start the development watcher.
# Run this command while you are working on your changes.
node --run dev

# Build the project for production.
# Run this command when you want to see the production version.
node --run build

# Lint your changes before requesting a review. No errors are allowed.
node --run lint
# Some errors can be fixed automatically:
node --run lint -- --fix

# Format your changes before requesting a review. No errors are allowed.
node --run format

# Create a .env.test.local file and provide a Prismic username and password.
# They will be used to run E2E tests.
# The file will not be committed.
cp .env.test.example .env.test.local

# Test your changes before requesting a review.
# All changes should be tested. No failing tests are allowed.
node --run test
# Run only E2E tests (optionally in UI mode):
node --run e2e
node --run e2e:ui
# Run only type tests
node --run types
```

## :building_construction: Submit a pull request

> [!NOTE]
> Code will be reviewed by the Prismic team before merging.[^3]
>
> Request a review by opening a pull request.

```sh
# Open a pull request. This example uses the GitHub CLI.
gh pr create

# Someone from the Prismic team will review your work. This review will at
# least consider the PR's general direction, code style, and test coverage.

# Prereleases are published to npm automatically to upon pushing commits.
# Install the prerelease using the `pr-${number}` tag.
npm install @prismicio/react@pr-101

# When ready, PRs should be merged using the "Squash and merge" option.
```

## :rocket: Publish

> [!CAUTION]
> Publishing is restricted to the Prismic team.[^4]

This repository uses [Release Please](https://github.com/googleapis/release-please). To publish changes in `master`, merge [the pending Release Please PR](https://github.com/prismicio/prismic-react/pulls?q=is%3Apr+is%3Aopen+label%3A%22autorelease%3A+pending%22).

If you don't see a pending PR, there are no changes to publish from `master`.

[^1]: This package is maintained by the DevX team. Prismic employees can ask for help or a review in the [#team-devx](https://prismic-team.slack.com/archives/C014VAACCQL) Slack channel.

[^2]: Prismic employees are highly encouraged to discuss changes with the DevX team in the [#team-devx](https://prismic-team.slack.com/archives/C014VAACCQL) Slack channel before starting.

[^3]: Code should be reviewed by the DevX team before merging. Prismic employees can request a review in the [#team-devx](https://prismic-team.slack.com/archives/CPG31MDL1) Slack channel.

[^4]: Prismic employees can ask the DevX team for [npm](https://www.npmjs.com) publish access.
