require("dotenv").config();
const express = require("express");
const path = require("path");


const app = express();
const port = 3000;

const http = require("http").Server(app);
const io = require("socket.io", { reconnection: true, transports: ['websockets'] })(http);

const pg = require("pg");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userController = require("./controllers/users-controller");
const itemsController = require("./controllers/items-controller");
const session = require("express-session");
const passport = require("passport");
const messagingController = require("./controllers/messaging-controller");

//passport config
require("./config/passport")(passport);

//Load route
const auth = require("./auth");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// express session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.listen(port, () => console.log(`Listening on port ${port}`));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-TypeError, Accept"
  );
  next();
});

app.get("/login", (req, res) => {
  res.status(200);
  res.json({ what: "what" });
});

/* GET REQUESTS */

app.get("/user/:email", (req, res, err) => {
  // joins user table and item table
  res.status(200);
});

app.get("/item/:id", itemsController.getOneItem, (req, res, err) => {
  res.status(200).json(res.locals.oneItem);
});

app.get("/search/:item_name", itemsController.searchItem, (req, res, err) => {
  res.status(200).json(res.locals.search);
});

app.get(
  "/category/:category",
  itemsController.searchCategory,
  (req, res, err) => {
    res.status(200).json(res.locals.category);
  }
);

app.get("/allItems", itemsController.getAllItems, (req, res, err) => {
  res.status(200).json(res.locals.items);
});

app.post("/addUser", userController.addUser, (req, res, err) => {
  res.status(200).json(res.locals.data);
});

app.post("/addItem", itemsController.addItem, (req, res, err) => {
  res.status(200).json(res.locals.data);
});

//=========================================================================
//WEB SOCKETS

io.on("connection", (socket) => {
  console.log("a user is connected")

  socket.on('client-connect', (data) => {
    console.log(data, socket.id);
    socket.emit('server-connect', 'Hey from server');
  })

  app.get("/login", (req, res) => {
    res.status(200);
    res.json({ what: "what" });
  });

  /* GET REQUESTS */

  app.get("/user/:email", (req, res, err) => {
    // joins user table and item table
    res.status(200);
  });

  app.get("/item/:id", itemsController.getOneItem, (req, res, err) => {
    res.status(200).json(res.locals.oneItem);
  });

  app.get("/search/:item_name", itemsController.searchItem, (req, res, err) => {
    res.status(200).json(res.locals.search);
  });

  app.get(
    "/category/:category",
    itemsController.searchCategory,
    (req, res, err) => {
      res.status(200).json(res.locals.category);
    }
  );

  app.get("/convos/:userId", messagingController.getConvos, (req, res, err) => {
    res.status(200).json(res.locals.convos);
  });

  app.get(
    "/messages/:convoId",
    messagingController.getMessages,
    (req, res, err) => {
      res.status(200).json(res.locals.messages);
    }
  );

  /* POST REQUESTS */



  app.post("/addConvo", messagingController.createConvo, (req, res, err) => {
    res.status(200).json(res.locals.convo);
  });

  app.post("/addMessage", messagingController.createMessage, (req, res, err) => {
    io.emit('message', res.locals.message)
    res.status(200).end();
  });

  /* DELETE REQUESTS */

  app.delete("/deleteItem", (req, res, err) => {
    // deletes item from database
    res.status(200);
  });

  app.use("/auth", auth);

  //=========================================================================\

});

app.use(express.static(path.resolve(__dirname, "../build")));

http.listen(5000, () => console.log(`Listening on port 5000`));
