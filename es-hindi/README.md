#How to setup a hindi_react code on your development enviroument

#Clone the code.  
git clone http://git.active18.com/news18/hindi_react.git

Steps to Run The Project:
 1. After Cloning Get Inside the root of Project.
 Run These Commands:
 git submodule init
 git submodule update
 git submodule update --remote --merge

 2. npm install --force
 3. Run script from Package.json

#Change directory to cloned one  
cd hindi_react

#Install dependency  
npm i

#Set environment variable  
export APP_ENV=production/beta/stg/development/dev_production

#Set environment variable For Windows
set-content env:APP_ENV 'production/beta/stg/development/dev_production';
get-childitem env:APP_ENV   

#start the code  
npm run dev
