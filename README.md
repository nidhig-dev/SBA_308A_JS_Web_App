## Objective
 A small web page application for all Harry Potter fans. It will display information about all the books and the characters in it.

 ## Functionality 
* When the page loads, the drop down will display all the published harry potter books from web api. When you choose one of them, it will display the cover page and some information about the book.
* Get Cast by name button will take the value from the search button and based on the entered character name, display image of character and info about the character.
* Get Entire Cast will display all the characters(images) of the HP book world.

## Validation
- If text box is empty, console.log error. but conitnue with funactionality.
- If character name entered is incorrect, alert pops up.
- Making sure next and prev buttons are hidden for get cast by name and drop down functionality
- Making sure next and prev buttons show up if characters grabbed are more than 4 in number.
- making sure to clear all the previous info appened to html elements.

## Requirement
- ✅Use the fetch API or Axios to communicate with an external web API. Use the data provided by this API to populate your application’s content and features.

- ✅Create user interaction with the API through a search feature, paginated gallery, or similar. This feature should use GET requests to retrieve associated data.

- ✅Make use of Promises and async/await syntax as appropriate.

- ✅Organize your JavaScript code into at least three (3) different module files, and import functions and data across files as necessary.

- ✅Ensure the program runs as expected, without any undesired behavior caused by misunderstanding of the JavaScript event loop (such as race conditions, API calls being handled out of order, etc.).

- ✅Create an engaging user experience through the use of HTML and CSS.

- ✅Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit).

- ✅Commit frequently to the git repository.

- ✅Include a README file that contains a description of your application.

- ✅Level of effort displayed in creativity, presentation, and user experience.

## Reflection
- What could you have done differently during the planning stages of your project to make the execution easier?
   - I could have planned my event listeners functionalities better. I added the "get entire cast" button later so I added on to the existing functionality. I could have incorporated it better with a DRY code if I had planned for it in time.

- What would you add to, or change about your application if given more time?

    - I would have added spells and house info as well but trying to keep it to one page had its challenges and I ran out of time. I also could have made search more lenient by taking into account all the spelling errors a user could make in difficult names.




