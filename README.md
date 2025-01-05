# Hello!

Did this require webpack? No, but live edits are fantastic for developing, so I just used it because it's quick and easy to set up.

## Checking it out

You can either pull this repo down and just open up /public and double click index.html, or you can do these two steps and hear your computer struggle to enter orbit for a couple of seconds:

`npm i`
`npm run start`

## Running some really base-level tests in cypress

`npm run start`
[go to another terminal]
`npm run e2e:open`

Once cypress opens up choose your browser (I typically just go for Electron), click the green button below, then click on the test.cy.js test near the centre of your window.

## Reasonings

### Why [method]?

So, there are many arguments for and against every method I could have completed this using. I'll go through a few here, but please do invite me in for a more in-depth chat about why I did what I've done. If for no other reason than for us all to learn from each other.

#### Why not storybook?

I was going to build this component in Storybook, but it was a little beyond the 4 hour scope to do that on top of the actual task, so forgive me for not using it.

#### Why grid?

Instead of using flex and having each row slung into their own `display: flex;` container and given very strict widths for the columns to adhere to (which is how you'd maintain column parity across the rows), I instead opted for grid to maintain column sizes in a far more clean manner. This did, however, mean that my custom checkboxes had to be ever so slightly over-engineered compared to normal. I could have used tables, but I tend to avoid them (for better or worse) due to Email creation PTSD.

#### Why such a weird custom checkbox label highlighting solution?

The reason behind using the label as a translucent overlay to denote hover and checked states on the grid is because it's not reliant on javascript to select each neighbour and give them their own tint. That said, had I made the grid of a higher number of columns to accommodate the label instead of nesting the checkbox and label (and therefore also the additional span), I could have selected each column via an incredible length of sibling selectors in my scss and given them all a hover/checked state based on the checkbox. However, that would have forced user interaction to be locked to the checkbox column alone instead of the entire row. And in terms of UX, I think it's more intuitive (and touch screen accessible) to give users the entire row to target for interaction.

##### What do you mean by it's not reliant on javascript? The point of this task is to use javascript.

True. But in the event this component actually had it's data delivered to the page at run time via being a php file and the user had turned off javascript for whatever reason, the table would retain it's accessibility and usability features at the very least. The button submitting a form is also for that purpose- however that would/could be handled was outside of scope for this task, however.

#### Why literally no frameworks or libraries (bar the FontAwesome CDN addition for speed)?

I took the orders quite literally. My apologies if you were actually expecting ember, handlebars, or at the very least some sort of partial/component framework.