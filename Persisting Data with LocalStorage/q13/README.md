# Enhanced Todo List

This is an enhanced Todo List application that allows users to add, complete, delete, and search tasks. It also persists tasks using `localStorage`.

## Features

-   **Add Tasks:** Users can add tasks by typing in the input field and clicking the "Add Task" button.
-   **Complete Tasks:** Users can mark tasks as completed by checking the checkbox next to each task. Completed tasks are displayed with a strikethrough.
-   **Delete Tasks:** Users can delete tasks by clicking the "Delete" button next to each task.
-   **Search Tasks:** Users can search for tasks in real time by typing in the search bar. Only tasks that match the search term are displayed.
-   **Persistence:** Tasks are stored in `localStorage`, so they persist across page reloads.

## How to Use

1.  Open the `index.html` file in your web browser.
2.  To add a task, type the task in the input field and click the "Add Task" button.
3.  To mark a task as completed, check the checkbox next to the task.
4.  To delete a task, click the "Delete" button next to the task.
5.  To search for tasks, type in the search bar.

## Notes

-   Tasks are stored in `localStorage` as a JSON array.
-   Each task object contains a unique ID, the task text, and the completion status.
-   The search is case-insensitive.
