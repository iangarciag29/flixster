## Week 1 Assignment: Flixster

Submitted by: **Ian Garcia Gonzalez** (iangarciag@fb.com)

Estimated time spent: **10** hours spent in total

Deployed Application (optional): [Flixster Deployed Site](https://iangarciag29.github.io/flixster/)

### Application Features

#### CORE FEATURES

- [X] User can view a list of current movies from The Movie Database API as a grid view
    - The grid element should have an id of `movies-grid`
    - Each movie wrapper element should have a class of `movie-card`
- [X] For each movie displayed, user can see the following details:
    - Title - the element should have a class of `movie-title`
    - Image - the `img` element should have a class of `movie-poster`
    - Votes - the element should have a class of `movie-votes`
- [X] User can load more current movies by clicking a button at the bottom of the list
    - The button should have an id of `load-more-movies-btn`.
    - When clicked, the page should not refresh.
    - New movies should simply be added to the bottom
- [X] Allow users to search for movies and display them in a grid view
    - There should be a search input element with an id of `search-input`
    - Users should be able to type into the input
    - When a user hits 'Enter', it should send a search request to the movies API
    - The results from the search should be displayed on the page
    - There should be a close icon with an id of `close-search-btn` that exits the search, clears results, and shows the
      current movies displayed previously
- [X] Website accounts for basic HTML/CSS accessibility features
- [X] Website should be responsive

#### STRETCH FEATURES

- [X] Deploy website using GitHub Pages.
- [X] Allow user to view more details about a movie within a popup.
- [X] Improve the user experience through CSS & animation.
- [X] Allow movie video trailers to be played
  using [embedded YouTube](https://support.google.com/youtube/answer/171780?hl=en)
- [X] Implement anything else that you can get done to improve the app functionality!

### Walkthrough Video

![Walkthrough Video](https://media.giphy.com/media/49PSvJ0KRbyz7jlwXY/giphy.gif)

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your
  weekly assignment did you feel unprepared to complete?

Yes, specifically Labs 2 and 3 gave us the basic concepts on how to make html/css/javascript applications interact with
external APIs and how to render data the right way.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way
  your project responded to a particular event, etc.

Probably change the way the movie grid is presented, as well as some UI changes. On the "backend", I'll change how data
is stored and probably make an application cache to reduce load times.

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice
  something that your peer did that you would like to try next time?

The project went alright, nevertheless at the end implementing the modal feature I was having some trouble because of
the way I did things, having such a "complex" structure for something simpler make the event listeners not to work as
expected, but apart from that the progress and development went smooth.

### Open-source libraries used

- MicroModal - [Github](https://github.com/Ghosh/micromodal).
