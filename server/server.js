const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('database.json');
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(jsonServer.bodyParser);

//default db defaults({ items: [] }).write();


server.get('/items', (req, res) => {
    const items = router.db.get('items').value();
    res.json(items);
});
//get 1 item by id
server.get('/items/:id', (req, res) => {
    const id = req.params.id;
    const item = router.db.get('items').find({ id: id }).value();
    res.json(item);
});

server.post('/items', (req, res) => {
    const task = req.body;
    router.db.get('items').push(task).write();
    res.json(task);
});

server.put('/items/:id', (req, res) => {
    const id = req.params.id;
    const task = req.body;
    router.db.get('items').find({ id: id }).assign(task).write();
    res.json(task);
});
//edit all 

server.put('/items', (req, res) => {
    const items = req.body;
    router.db.set('items', items).write();
    res.json(items);
});


server.delete('/items/:id', (req, res) => {
    const id = req.params.id;
    router.db.get('items').remove({ id: id }).write();
    res.json({});
});

server.delete('/items', (req, res) => {
    //delete all
    router.db.get('items').remove().write();
    res.json({});
});

const port = 3000;
server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});

// change all code to use express
