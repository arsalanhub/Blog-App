<h1>Blog-App</h1>
Simple blog app made using
<div>Front-end technologies : html, css, semantic-ui</div> 
<div>Back-end technologies  : nodejs, expressjs</div>
<div>Database               : mongoDB</div>

This blog app follow RESTful routing concept
for CRUD(Create, Read, Update and Delete)

## :file_folder: File Structure

```
C:.
│   app.js
│   package-lock.json
│   package.json
│   README.md
│
├───public
│   └───stylesheet
│           app.css
│
└───views
    │   .gitignore
    │   edit.ejs
    │   index.ejs
    │   new.ejs
    │   show.ejs
    │
    └───partials
            footer.ejs
            header.ejs
```

Setup required to run the project :

1. Download GitBash (optional), MongoDB, nodejs
2. Clone the project
3. Install the dependencies using ```npm install```
4. Run the project using ```node app.js```