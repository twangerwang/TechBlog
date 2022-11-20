// Import app dependencies
const express = require("express");
const sequelize = require("./config/connection");
const routes = require("./controllers");
const path = require("path");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
const hbs = exphbs.create({ helpers });
const session = require("express-session");
const PORT = process.env.PORT || 3001;
const app = express();
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const morganLogger = require("morgan");

// Initialize browser session the app
const sess = {
  secret: "secret session authentication",
  cookie: { maxAge: 300000 },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Setup Express middleware to json parse and urlendoded for POST requests.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(sess));
app.use(express.static(path.join(__dirname, "public")));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(routes);

// Setup morgan middleware to log HTTP requests and errors.
app.use(morganLogger("dev"));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
});
