# IBM Web Animation
- [Code License][code-license]
- [Getting Started][getting-started]
    - [Requirements][reqs]
    - [Installation][install]
- [Find your way around][navigate]
    - [Example][example]
- [Library][lib]
- [Use in your own project][use]

As you pull the code from this repository, get inspired by the IBM Design Language animation guidelines. Remember: thoughtfully applied animation should be straightforward, limited to the most important interactions on the screen and helping users in delightful ways as they interact.

&mdash; [IBM Design Language: Animation][animation]

This repository serves as a **codebase for developers** who want to use, prototype with, or get inspired by the machine motion style from the IBM Design Language. It contains **six unique examples**, each demonstrating the movement of a single component. The **source code and full working example** for each component are available.

## Code License
[Apache License 2.0][apache]

## Getting Started

### Requirements
- A modern browser
- [Node.js][node] (to build the examples)
- Ruby gem scss-lint

### Installation

**Prerequisites**
```sh
npm install -g gulp
gem install scss-lint
```

**Build and run**
```sh
git clone https://github.com/IBM-Design/web-animations.git
npm install && npm start
```
## Find your way around
Source files for each example can be found in `app -> src -> <component>`. Each component contains a `.js`, `.scss`, and `.html` file, which is the complete module for that given example.

### Example

**Source (this is where you see the code)**
```
app/
|__ src/
    |__ drawer/
        |__ drawer.js
        |__ index.html
        |__ main-drawer.scss
```

`npm start` is an alias for just running `gulp` in the command line. [Gulp][gulp] will simply compile the `.scss` file into `.css`, run some linters, and move the three source files into the `dist` folder:

**Distribution (this is where you see the working example)**
```
app/
|__ dist/
    |__ drawer/
        |__ drawer.js
        |__ index.html
        |__ drawer.css
```
A web server will open in your default browser, with a base URL of `app/dist`:
```javascript
browserSync.init({
    server: {
        baseDir: 'app/dist' // makes the distribution folder the base directory
    }
// ...
```

# Library

Helper functions and global CSS stylesheets are used throughout this project to prevent you from repeating things like `document.getElementById` and basic stylings. If you open up a component's `.html` file, it will contain something like `<script src="../lib/scripts.js"></script>.`

```
app/
|__ src/
    |__ lib/
```

One of the main helper functions, found at `app -> src -> lib -> utils -> select.js`, provides a wrapper function for `Element.querySelectorAll`.

Additionally, several of the components use scripts from `app -> src -> lib -> components`. For example, `scrollable.js` (found in that directory) is a module that creates a custom scrollbar for `drop-down`.

# Using examples

Simply copy and paste the `.html`, `.css`, and `.js` files from the built component inside `dist`, and add your own markup. All components are independent of each other. Make sure to follow the requirement set forth by our license.

[code-license]: #code-license
[getting-started]: #getting-started
[reqs]: #requirements
[install]: #installation
[navigate]: #find-your-way-around
[example]: #example
[lib]: #library
[use]: #use-in-your-own-project
[animation]: http://www.ibm.com/design/language/framework/animation
[apache]: http://www.apache.org/licenses/LICENSE-2.0
[node]: http://www.nodejs.org
[gulp]: http://gulpjs.com/
