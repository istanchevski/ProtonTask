# ProtonTask

## Summary

This is a Playwright based project which contains set of test scripts created for the purpose of the Proton task received for homework.

The project contains 6 test cases which were converted into automation scripts, and are divided into two categories. The first category contains 1 test case which focuses on the log in functionality, while the second category contains 5 different test cases which focus on creating and deleting folders and labels alongside with selecting the option to use folder colors. Each of the scripts contain validations implemented inside them.

---

This is the list of test cases converted into automation scripts:

1. Successful log in
2. Create new folder
3. Create new label
4. Use folder colors
5. Delete existing folder
6. Delete existing label

---

## Framework

For the purpose of the homework, the Playwright framework was selected as one of the preferred test automation frameworks.

The solution itself is structured in the following way:

| Section                            | Info details                                                                     |
| ---------------------------------- | -------------------------------------------------------------------------------- |
| data                               | Data files containing all the data for the test scripts                          |
| node_modules                       | All needed dependencies for the solution                                         |
| page_objects                       | Page objects containing locators and methods for the pages under test            |
| playwright-report                  | HTML test reports generated after each run                                       |
| test-results                       | Contains screenshots of failed test scripts                                      |
| tests                              | Contains all test scripts                                                        |
| .env                               | Environment file containing details about the credentials and base url           |
| .gitignore                         | File containing all ignored files which will not be pushed on GitHub             |
| Jenkinsfile                        | Configuration file for the Jenkins CI integration                                |
| package.json and package-lock.json | Files which help to track dependencies, create a shortcut for running tests, etc |
| playwright.config.js               | Configuration file for Playwright                                                |

## How to run

1. Clone/download the repository and import it in your preferred IDE
2. Open terminal and go inside the project directory
3. Install all dependencies by using the **npm install**
4. Run test scripts
   - Run all the tests by using **npx playwright test**
   - Run a single test file by using **npx playwright test tests/logIn.spec.js**
5. You can open the report once the run is finished by using **npx playwright show-report**

Note: By default the scripts will be executed using chromium browser based on Chrome, which can be changed and configured in the **playwright.config.js** file where two additional browser configurations are available, and that is Firefox and Webkit (Safari based browser).

## Jenkins - CI integration

For the purpose of the task, I have selected to use and configure my Playwright solution to be integrated with Jenkins CI where the test scripts can be executed independently of the solution.
In order to do that, I installed and configured Jenkins locally where I created dedicated pipelines which clones the solution from this repository, installs all dependencies and runs the test cases. As you can see, there is a **Jenkinsfile** file where the Jenkins configuration is stored in which the docker image needed for the Playwright dependencies is located alongside with the 3 stages for install, help and test case execution.

![](https://raw.githubusercontent.com/istanchevski/ProtonTask/master/Jenkins%20Dashboard.png)

Note: Due to the lack of time, the **ProtonTask** pipeline needs some additional work to be done in order to be able to successfully run the scripts on the provided docker container. The **Proton** pipeline is a freestyle build which runs the scripts on Jenkins by using the local machine resources.

![](https://raw.githubusercontent.com/istanchevski/ProtonTask/master/Jenkins%20Run.png)
