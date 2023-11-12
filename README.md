This is a project which pretends to be a digital hymnary for (at least initially) the adventist hymns.

At the moment of write this lines is still in construction, and there is no hurry to finish soon, because I use my free time to complete it.

To store the data, I'm using Realm SDK, a MondgoBD library to perform actions such as insert data, edit data, remove data, and query data very fast. Actually, I'm using it as state management and the performance is awesome, so, this project doesn't use Redux or similar solutions to preserve data.

Realm is "offline first", and that solves lot of problems. Is reactive, and "easy" to use.

There is a file inside the project. [DB.tsx](https://github.com/gersonmontenegro/adventshymns/blob/main/src/components/DB.tsx), which has some basic operations if you want to see how Realm works.

Another file, [Hymns.tsx](https://github.com/gersonmontenegro/adventshymns/blob/main/src/screens/Hymns.tsx), has more complex operations, because is in charge to load the database based in a file with all the hymns: [hymns.json](https://github.com/gersonmontenegro/adventshymns/blob/main/src/assets/bd/hymns.json). That file insert the whole dataset, and, until now, search by title, and search hymns by the content of the verse, which is quite useful when you're in the church.
