# Website Performance Optimization Project

This is one of the projects for the Front-End Web Developer Nanodegree program at [Udacity](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001).
The goal was to optimize a provided website with a number of optimization- and performance-related issues so that it achieves above 90 [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) score and runs at 60 frames per second.

## Quick Start
To test working (production) version of the project on [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/), or to inspect the site on your phone, you need:
* Check out the repository
* Install [Node](https://nodejs.org/en/) and [Gulp](https://gulpjs.com/)
* Run a local server from a terminal:
 ```
  $ npm install -g live-server
  $ cd /path/to/directory/dist
  $ live-server --port=80
  ```
* Download and unzip [ngrok](https://ngrok.com/) into project's ```dist``` directory to make your local server accessible remotely.
* In a new terminal window:
```
  $ cd /path/to/directory/dist
  $ ./ngrok http 80
```
* In a web browser open http://localhost:4040/inspect/http and click on one of the links
* Use provided URL to run it through PageSpeed Insights or to inspect the application on your phone.

## Optimization Summary
### Part 1: PageSpeed Score
This part focused on index.html page. The project requirement was to optimize the Critical Rendering Pathw to achieve PageSpeed Insights score of at least 90 for Mobile and Desktop.
Before optimization the score was 28 for Mobile and 30 for Desktop.
The following optimization steps had been taken to take that score above 90:
1. Refactored CSS file to keep it lean by reducing selector complexity and optimizing the rules.
2. Minified and inlined CSS - eliminating an extra CSS request helped to speed up CSSOM construction. I felt it was reasonable to do it in this project since there were not a lot of styles applied to the pages. However, for those pages that share one, more complex CSS file, it would make sense to leave the links and utilize browser's caching as well as SoC.
3. Removed Google fonts and used Arial font size instead (though, this eliminated request to Google Server, I did not notice much of an improvement on DCL speed).
4. Applied media type to print.css link to unblock page rendering.
5. Replaced remotely hosted thumbnails with locally hosted versions - this allowed for image optimization.
6. Resized pizzeria.jpg from 2.3mb to 6kb (99% reduction).
8. Applied async attribute to Google Analytics to unblock page rendering.
7. Minified all images with [gulp-image](https://www.npmjs.com/package/gulp-image) task.
Minified print.css with [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css) task.
Minified permatters.js with [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) task.
Minified index.html with [gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin) task.

### Part 2: Getting Rid of Jank
This part focused on [pizza.html](http://sakela17.github.io/frontend-nanodegree-mobile-portfolio/views/pizza.html). The project requirements were to optimize views/js/main.js file to make pizza.html page render with a consistent frame-rate at 60fps when scrolling. And, to reduce time down to less than 5 ms that takes to resize pizzas using the pizza size slider.
The following optimization steps had been taken to meet the project requirements:
1. Refactored changePizzaSizes() (that is called when user toggles pizza size slider) to eliminate forced synchronous layout (FSL). Now time to resize pizzas takes less than 5ms.
2. Refactored updatePositions() that caused FSL on scroll.
3. Replaced 'DOM Content Loaded' listener and its function with createPizzaBackground(). This eliminated FSL on load.
4. Refactored code to generate amount of background pizzas based on user's viewport.
5. Replaced pizza.svg with pizza.png reducing file size by 30%.
6. Micro-optimizations were made to speed up the 'for' loops by minimizing DOM queries, caching the variable, and reducing calculations.

## Editing the Application
* Clone the repository
* Install [Node](https://nodejs.org/en/) and [Gulp](https://gulpjs.com/)
* In a terminal, navigate to this project and install dependencies:
```
  $ npm install
```
* Make modifications to a code in ```src``` directory (development directory)
* When done, run ```gulp default``` task in the terminal. This will minify html, css, and js files and update their copies in ```dist``` directory (production directory)
* You can additionally run ```gulp min-img```. This will optimize images with .jpg, .gif., and .png extensions and save them in ```dist``` directory