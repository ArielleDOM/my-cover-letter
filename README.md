# My Cover Letter

### Site: https://mycoverletter.herokuapp.com/
### Video: https://www.youtube.com/watch?v=ZXDG9ITOOI8


## Description
My Cover Letter is an application where users can store their cover letter templates. The idea for this application came from when I almost sent a cover letter with the wrong company's name on it. I added a find a replace feature in the cover letter editor so changing a company's name is easy to do. 

Currently the app:
  * stores cover letters
  * find and replaces phrases
  * Edit and save cover letters

In the future, I want to add:
  * PDF downloader to download covers letters
  * Create a email verfication and forgot password feature
  * Fix small bugs like:
      * Text running off page
      * Saving feature refreshs the browser

## Technologies
My Cover Letters uses Express to handle server calls, and stores user information and cover letter information in a PostgreSQL database accessed via Sequelize. On the front end, user and cover letters are handled by Redux, and the user interface is managed by React. In order to deploy this application, I used Heroku and used Travis for continuous integration 
