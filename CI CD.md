# Continuous integration and continuous deployment #

## CI/CD overview ##

### What is CI/CD? ###

CI means **Continuous Integration**, which is the practice of integrating code into a shared repository and building/testing each change automatically, as early as possible -- usually several times a day.

CD means **Continuous Delivery**, which adds that the software can be released to production at any time, often by automatically pushing changes to a staging system.  
CD also has another interpretation as **Continuous Deployment**. It goes further and pushes changes to production automatically.

### Some popular tools for CI/CD ###

* Jenkins
* ElectricFlow
* Octopus Deploy
* DeployBot
* TeamCity
* CircleCI
* And much more

## A CI/CD environment ##

### Part I -- CI ###

**Preparation**:

* GitHub login
* Project hosted as a repository on GitHub
* Working code in your project
* Working build or test script

1.Add the project to a new github repository.  

2.Log into `www.travis-ci.org` with the same github account and select the repo.  

3.Add a file named `.travis.yml` under the root directory of the project, which is the configuration file of travis-ci. The content of `.travis.yml` is shown below.  
>    language: node_js  
    node_js:  
      - "stable"  
    cache:  
      directories:  
      - node_modules  
    script:// the command that travis will execute automatically  
      - npm test  
      - npm run build   

4.After committing `.travis.yml`, the CI part is complete. Once the project is modified and committed, travis will do CI and show the result on the webpage.

**Note:** Travis-ci is a service provided by others and it will charge for CI of private repos. As another option, Jenkins and Drone is a good choice for building our own CI environment.

### Part II -- CD ###

#### Using Heroku ####

**Preparation:**

* A heroku account

1.Download heroku-cli and login in commandline.  
`$ heroku login`  
`Enter your Heroku credentials.`  
`Email: user@example.com`  
`Password:`  

2.Enter the root directory of the project and create heroku repo.  
`$ heroku create`  

3.Push the project to heroku repo and it is deployed. Use `$ heroku open` to open the deployed project on webpage.

**Note:** As is the case of CI, heroku is a service provided by others. Tools like puppet can help us deploy our projects on our own server.

#### Using Travis and Github Pages ####

**Preparation:**

* GitHub login
* Project hosted as a repository on GitHub
* Working code in your project
* Working build or test script

1.Add the project to a new github repository.  

2.Log into `www.travis-ci.org` with the same github account and select the repo.  

3.Generate a new github token in github following *Github settings > developer settings > personal access tokens > generate new token*, then add it in travis-ci following *TravisCI settings > environmental variables*.

4.Add a file named `.travis.yml` under the root directory of the project, which is the configuration file of travis-ci. The content of `.travis.yml` is shown below.
>    language: node_js  
    node_js:  
      - "stable"  
    cache:  
      directories:  
      - node_modules  
    script:// the command that travis will execute automatically  
      - npm test  
      - npm run build  
    deploy:// used in CD  
      provider: pages  
      skip_cleanup: true  
      github_token: $github_token// assigned with your github's Personal access token  
      local_dir: build  
      on:  
        branch: master  

5.Add necessary variables to package.json file: 
>"homepage": "https://zzbslayer.github.io/ChargeAccount-React/",
"devDependencies": {
    "gh-pages": "^1.1.0"
  }

6.Add the file to git, commit and push, to trigger a Travis CI&CD build.