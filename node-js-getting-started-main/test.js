const { spawn } = require('child_process');
const got = require('got');
const test = require('tape');

// Start the app
const env = Object.assign({}, process.env, {PORT: 5000});
const child = spawn('node', ['index.js'], {env});

test('responds to requests', (t) => {
  t.plan(4);

  // Wait until the server is ready
  child.stdout.on('data', _ => {
    // Make a request to our app
    (async () => {
      const response = await got('http://127.0.0.1:5000');
      // stop the server
      child.kill();
      // No error
      t.false(response.error);
      // Successful response
      t.equal(response.statusCode, 200);
      // Assert content checks
      t.notEqual(response.body.indexOf("<title>Node.js Getting Started on Heroku</title>"), -1);
      t.notEqual(response.body.indexOf("Getting Started on Heroku with Node.js"), -1);
    })();
  });
});
// New note post example:  
// app.post('/notes', (request, response) => {
//     const body = request.body
   
//     if(!body.content) { //no content
//         return response.status(400).json({
//             error: 'content missing'
//         })
//     }

//     const note = {
//         content: body.content,
//         important: body.important || false,
//         date: new Date(),
//         id: generateId(),
//     }

//     notes = notes.concat(note)

//     response.json(note)
//   })
