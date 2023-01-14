Welcome to Story Creator!

Story Creator is an interactive user application where users can begin and add to stories! The author of a story can choose to add contributions from other users to their own story! They can also post contributions to other users' stories. These contributions can recieve likes and be easily appended to the end of a starter story and built into a long tale! Once a story is marked complete by the original author, contributions can no longer be made.

The application is equipped with many features including:
- Secure registration and loggin. 
- Fullscreen and mobile versions of the application.
- Error handling
- Nav bar scrolling

ERD: 

<img width="901" alt="Screen Shot 2023-01-09 at 7 01 47 PM" src="https://user-images.githubusercontent.com/87041176/212490975-50d97fec-3ad5-4d1c-839d-12bc183fd076.png">

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
