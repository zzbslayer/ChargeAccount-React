# A CI/CD environment #
---

### Preparation ###

1. A github account and a heroku account.
2. A javascript project with test files. A react project built by create-react-app is used as an example here.

### Part I -- CI ###

1.Add the project to a new github repository.  

2.Log into `www.travis-ci.org` with the same github account and select the repo.  

3.Add a file named `.travis.yml` under the root directory of the project. The content of `.travis.yml` is shown below.  
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
      github_token: $github_token  
      local_dir: build  
      on:  
        branch: master  

4.Now the CI part is complete. Once the project is modified and committed, travis will do CI and show the result on the webpage.

**Note:** Travis-ci is a service provided by others and it will charge for CI of private repos. As another option, Jenkins and Drone is a good choice for building our own CI environment.

### Part II -- CD ###

1. Download heroku-cli and login in commandline.  
`$ heroku login`  
`Enter your Heroku credentials.`  
`Email: user@example.com`  
`Password:`  

2. Enter the root directory of the project and create heroku repo.  
`$ heroku create`  

3. Push the project to heroku repo and it is deployed. Use `$ heroku open` to open the deployed project on webpage.

**Note:** As is the case of CI, heroku is a service provided by others. Tools like puppet can help us deploy our projects on our own server.