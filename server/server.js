const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const jsonParser = express.json();
const port = 3030;

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use("/assets", express.static("assets"));
app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`server is listening on ${port}`);
});

app.post("/userRegister", jsonParser, function (request, response) {
  console.log(request.body);
  response.send({ registered: true, message: "congrats" });
  let data = fs.readFileSync("db/db.json");
  let parsedData = JSON.parse(data);
  parsedData.users.push({
    id: parsedData.users.length,
    url: "http://localhost:3030/assets/donikghoul.png",
    ...request.body,
    status: "member",
    sessionId: null,
  });
  let dataToPush = JSON.stringify(parsedData);
  fs.writeFile("db/db.json", dataToPush, (err) => {
    if (err) throw err;
  });
});

app.post("/userLogin", jsonParser, function (request, response) {
  console.log(request.body);
  let data = fs.readFileSync("db/db.json");
  let parsedData = JSON.parse(data);

  let user = parsedData.users.findIndex(
    (user) => user.email === request.body.email && user.password === request.body.password
  );
  console.log(parsedData.users[user]);
  parsedData.users[user].sessionId = user * parsedData.users.length;

  if (user !== -1) {
    if (parsedData.users[user].status === "admin") {
      response.send({
        auth: true,
        sessionId: user * parsedData.users.length,
        status: "admin",
      });
    } else {
      response.send({ auth: true, sessionId: user * parsedData.users.length, status: "member" });
    }
  } else {
    response.send({ auth: false, message: "incorrect login or pass" });
  }

  let dataToPush = JSON.stringify(parsedData);
  fs.writeFile("db/db.json", dataToPush, (err) => {
    if (err) throw err;
  });
});
app.get("/userLogout", jsonParser, function (request, response) {
  console.log(request.body);
  response.send({ auth: true, message: "congrats" });
});

app.get("/tours", jsonParser, function (request, response) {
  let data = fs.readFileSync("db/db.json");
  let parsedData = JSON.parse(data);
  response.json(parsedData.tours);
});

app.post("/tours", jsonParser, function (request, response) {
  let data = fs.readFileSync("db/db.json");
  let parsedData = JSON.parse(data);
  let filteredData = parsedData.tours.filter((tour) => {
    // Filter by duration and cost

    if (Number(tour.duration) > Number(request.body.duration) || Number(tour.cost) > Number(request.body.cost)) {
      return false;
    }

    //Filter by date
    if (
      request.body.departingAfter &&
      new Date(tour.date).getTime() < new Date(request.body.departingAfter).getTime()
    ) {
      return false;
    }
    if (
      request.body.departingBefore &&
      new Date(tour.date).getTime() > new Date(request.body.departingBefore).getTime()
    ) {
      return false;
    }

    // Filter by style, type, and continent
    if (request.body.style.length > 0 && !request.body.style.some((style) => tour.style.includes(style))) {
      return false;
    }

    if (request.body.type.length > 0 && !request.body.type.some((type) => tour.type.includes(type))) {
      return false;
    }

    if (request.body.continent.length > 0 && !request.body.continent.includes(tour.continent)) {
      return false;
    }

    return true;
  });
  response.json(filteredData);
});

app.post("/addTour", jsonParser, function (request, response) {
  let data = fs.readFileSync("db/db.json");
  let parsedData = JSON.parse(data);
  let userId = parsedData.users.findIndex((user, id) => {
    if (user.sessionId === Number(request.body.sessionId)) return id;
  });
  if (!parsedData.users[userId].hasOwnProperty("basket")) {
    parsedData.users[userId].basket = [];
  }
  parsedData.users[userId].basket.push(request.body.id);
  console.log(Array.from(new Set(parsedData.users[userId].basket)));
  parsedData.users[userId].basket = Array.from(new Set(parsedData.users[userId].basket));
  let dataToPush = JSON.stringify(parsedData);
  fs.writeFile("db/db.json", dataToPush, (err) => {
    if (err) throw err;
  });
});

app.post("/deleteTour", jsonParser, function (request, response) {
  let data = fs.readFileSync("db/db.json");
  let parsedData = JSON.parse(data);
  let userId = parsedData.users.findIndex((user, id) => user.sessionId === Number(request.body.sessionId));
  parsedData.users[userId].basket = parsedData.users[userId].basket.filter((id) => id !== request.body.id);
  response.json(parsedData.users[userId].basket);
  let dataToPush = JSON.stringify(parsedData);
  fs.writeFile("db/db.json", dataToPush, (err) => {
    if (err) throw err;
  });
});

app.post("/basketTours", jsonParser, function (request, response) {
  let data = fs.readFileSync("db/db.json");
  let parsedData = JSON.parse(data);
  let userId = parsedData.users.findIndex((user) => user.sessionId === Number(request.body.sessionId));
  let toursId = parsedData.users[userId].basket;
  let tours = parsedData.tours.map((tour) => {
    if (toursId.includes(tour.id)) {
      return tour;
    }
  });
  tours = tours.filter((tour) => tour !== undefined);
  response.json(tours);
});

app.post("/tourEdit", jsonParser, function (request, response) {
  let data = fs.readFileSync("db/db.json");
  let parsedData = JSON.parse(data);
  let tourId = parsedData.tours.findIndex((tour) => tour.id === Number(request.body.updatedTour.id));

  parsedData.tours[tourId] = { ...parsedData.tours[tourId], ...request.body.updatedTour };

  let dataToPush = JSON.stringify(parsedData);
  fs.writeFile("db/db.json", dataToPush, (err) => {
    if (err) throw err;
  });
  response.send("edited");
});

app.post("/addTourAdmin", jsonParser, function (request, response) {
  for (let key in request.body) {
    if (request.body[key] === "") {
      response.send("Fill all the fields");
      return;
    }
  }
  let data = fs.readFileSync("db/db.json");
  let parsedData = JSON.parse(data);

  parsedData.tours.push({
    id: parsedData.tours.length,
    ...request.body,
    date: new Date(request.body.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
  });
  response.send("Rerendered");
  let dataToPush = JSON.stringify(parsedData);
  fs.writeFile("db/db.json", dataToPush, (err) => {
    if (err) throw err;
  });
});

app.post("/book", jsonParser, function (request, response) {
  let data = fs.readFileSync("db/db.json");
  let parsedData = JSON.parse(data);
  let userId = parsedData.users.findIndex((user, id) => {
    if (user.sessionId === Number(request.body.sessionId)) return id;
  });
  if (!parsedData.users[userId].hasOwnProperty("bookedTours")) {
    parsedData.users[userId].bookedTours = [];
  }
  console.log(Array.from(new Set(parsedData.users[userId].bookedTours)));
  parsedData.users[userId].bookedTours.push(request.body.id);
  parsedData.users[userId].bookedTours = Array.from(new Set(parsedData.users[userId].bookedTours));
  let dataToPush = JSON.stringify(parsedData);
  fs.writeFile("db/db.json", dataToPush, (err) => {
    if (err) throw err;
  });
});

app.post("/clients", jsonParser, function (request, response) {
  let data = fs.readFileSync("db/db.json");
  let parsedData = JSON.parse(data);
  console.log(request.body.amount);
  if (request.body.amount + 20 > parsedData.users.length) {
    response.json(parsedData.users.slice(request.body.amount, parsedData.users.length));
  } else {
    response.json(parsedData.users.slice(request.body.amount, request.body.amount + 20));
  }
});

app.post("/basketOrBooked", jsonParser, function (request, response) {
  let data = fs.readFileSync("db/db.json");
  let parsedData = JSON.parse(data);
  let userTours = parsedData.users.find((user) => user.id == request.body.id);
  let tours;
  if (request.body.target == "basket") {
    if (userTours.basket == [] || !userTours.basket) {
      response.json([]);
      return;
    }
    tours = parsedData.tours.filter((tour) => userTours.basket.includes(tour.id));
  } else {
    if (userTours.bookedTours == [] || !userTours.bookedTours) {
      response.json([]);
      return;
    }
    tours = parsedData.tours.filter((tour) => userTours.bookedTours.includes(tour.id));
  }

  response.json(tours);
});

app.post("/adminDelete", jsonParser, function (request, response) {
  let data = fs.readFileSync("db/db.json");
  let parsedData = JSON.parse(data);
  let userId = parsedData.users.findIndex((user) => user.id == request.body.userId);
  if (request.body.target == "deleteBasket") {
    parsedData.users[userId].basket = parsedData.users[userId].basket.filter((tour) => tour != request.body.tourId);
  } else {
    parsedData.users[userId].bookedTours = parsedData.users[userId].bookedTours.filter(
      (tour) => tour != request.body.tourId
    );
  }
  response.send("Deleted");
  let dataToPush = JSON.stringify(parsedData);
  fs.writeFile("db/db.json", dataToPush, (err) => {
    if (err) throw err;
  });
});
