const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/board', (req, res) => {
  res.json({
    lists : [
      {
        id : 1,
        text : "To do"
      },
      {
        id : 2,
        text : "In progress"
      },
      {
        id : 3,
        text : "Done"
      }
    ],
    tasks: [
      {
        id : 1,
        text : "Item 1",
        list : 1
      } ,
      {
        id : 2,
        text : "Item 2",
        list : 1
      } ,
      {
        id : 3,
        text : "Item 3",
        list : 1
      },
      {
        id : 4,
        text : "Item 4",
        list : 2
      } ,
      {
        id : 5,
        text : "Item 5",
        list : 2
      } ,
      {
        id : 6,
        text : "Item 6",
        list : 2
      },
      {
        id : 7,
        text : "Item 7",
        list : 3
      } ,
      {
        id : 8,
        text : "Item 8",
        list : 3
      } ,
      {
        id : 9,
        text : "Item 9",
        list : 3
      }
    ]});
  });

  app.listen(port, () => console.log(`Listening on port ${port}`));
