# ensure the project can compile and run

- fix/bypass the package dependency issues

# I will take steps

0. spend 1 minute to go through TODOs to have a roughly idea what needs to be done
   I noticed that the testing is not mentioned, which I assue it's out of the scope of this challenge.

1. understand the atomic element - feedback visual UI
2. understand the layers
3. understand the data layer - feedback
4. work on the persistence layer API - CRUD of Feedback
5. continue to work on UI

# Now, it's time to understand the application and its layers

# First, start to work on the Feedback page.tsx, which gives me a better understanding of the atomic element of this system in a visual view

## use Cursor to work on the page.tsx to have a visual view of Feedback

    - generate form
    - do the form valition
    - refactor direct types to enums to fix linter errors

# Secondly, it's time to understand the data layer

    - noticed that db.ts is just a mock. Ignore it.
    - we need to implement the data persistence layer.
    - Implemented the data.ts and fix the error introduced in the corresponding UI feedback-list.tsx

# Third, work on UI

TODO:

- Testing
- Clean up logging
- All TODOs
- Test sorting, pagination
