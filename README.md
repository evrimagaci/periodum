# Periodum: An Interactive Periodic Table Project
This project started as a Turkish periodic table and evolved into an international science project. We have a path forward and we are seeking programmers that are willing to take on the language expansion process. [Contribute to the project](https://github.com/evrimagaci/periodum/blob/main/CONTRIBUTING.md) if you're interested - and [feel free to ask any questions](https://github.com/evrimagaci/periodum/discussions) if you cannot figure out anything (because of language or for any other reason)!

## Important Links
- **Periodum Periodic Table (Latest Version):** https://periodum.com/

### Key Docs
- **Project Needs & Roadmap:** https://github.com/evrimagaci/periodum/projects/1
- **Design File:** https://dar.vin/4Ksrj _You can access the design file using [Sketch](https://www.sketch.com/) or [Adobe XD](https://www.adobe.com/products/xd.html)._

### Related Repos
- **Back-End & Database:** https://github.com/evrimagaci/periodum-api
- **iPad and macOS Client:** https://github.com/evrimagaci/periodum-apple

## Installation

### Steps

1. Complete the `mysql` setup via [this link](https://dev.mysql.com/doc/refman/8.0/en/installing.html).
2. Download the [db.sql.zip](https://evrimagaci.org/public/periodum/db.sql.zip) database file.
3. Export the `db.sql` file in the downloaded folder to the project main directory.
4. Go to the main directory of the project via the terminal and enter `sh setup.sh` command.

### Commands
```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Testing
We use [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library) library for testing. You can check the cheat sheet [here](https://testing-library.com/docs/vue-testing-library/cheatsheet) and see example tests [here](https://testing-library.com/docs/vue-testing-library/examples). 

Please follow the [GitLab testing guide](https://docs.gitlab.com/ee/development/testing_guide/frontend_testing.html) for the testing structure and format.

## Contribution Guidelines
Please [click here](https://github.com/evrimagaci/periodum/blob/main/CONTRIBUTING.md) to learn more about how to contribute to Periodum project. 
