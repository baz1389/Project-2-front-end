#Melcher Wordbook

- Heroku URL: https://fathomless-island-1134.herokuapp.com/
- Github Pages URL: http://baz1389.github.io/Project-2-front-end

**NOTE: This is still a *work in progress* and is not anywhere near a finished product**

##Overview

This project was designed and cloned after a combination of [Urban Dictionary](http://www.urbandictionary.com/) and [Dictionary.com](http://dictionary.reference.com/). This single-page application (SPA) allows users to read, search, define, and update words or idioms/phrases. Users must create an account before being able to use the site's functionality.

To see the **back-end** repository, click [here](https://github.com/baz1389/project2-api).

##Approach

- **Wireframing and User Stories**
      - [Wireframes](http://imgur.com/a/kxTis)
      - [User Stories](http://imgur.com/FnvgSkw)
      - [ERM Diagram](http://imgur.com/BWpHA5R)
- **Create my back-end**
      - What will my database need?
      - Model relationships and controller functionality.
      - What routes do I need?
- **Basic HTML/CSS implementation**
- **Ajax, jquery, and javascript implementation on the front end**
      - One method at a time.

##Unsolved Problems
 - On login, I have hardcoded the same word to show up every time. I would like the landing word to be random every time someone logs in.
 - My search function has to have exactly the correct string to be able to search. I need to implement substring functionality (.downcase/.upcase methods??).
      - Need to throw an error or have some indication if a word doesn't exist yet.
 - If I hit the login button it still removes the login menu and shows the main landing page
 - I hard coded my update method by showing each word ID on the page, s now there is always a number just hanging out.
 - HTML and CSS needs to improve when I have free time to do so.
 - I need to refresh the page a lot to do multiple events
 - Update works, however, the server throws a 500 error.

##Future Additions
 - Favorites List.
 - Have a page where you can click a letter of the alphabet and see all words (or 20 per page) starting with that letter.
 - Word of the Day.
 - Random Word.
 - Share a word on Facebook/Twitter/some other social media platform.


##Sources
- My login form was based off of the [DesignsCrazed](http://designscrazed.org/css-html-login-form-templates/) Elegant Login template.
- My page layout was created with the [Bootstrap](http://startbootstrap.com/template-overviews/simple-sidebar/) Simple Sidebar template.


