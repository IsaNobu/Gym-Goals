const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);

const port = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: [
      "https://assignment-12-2a31d.web.app",
      "https://assignment-12-2a31d.firebaseapp.com",
    ],
  })
);
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.DB_PASSWORD}@cluster0.hvsdcgj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const collection = client.db("BodyGoals");

    const usersCollection = collection.collection("users");
    const subscribersCollection = collection.collection("subscribers");
    const trainerFormCollection = collection.collection("trainer-form");
    const classCollection = collection.collection("class-details");
    const postsCollection = collection.collection("community-posts");
    const paymentsCollection = collection.collection("payments");
    const reviewCollection = collection.collection("review");

    app.post("/create-payment-intent", async (req, res) => {
      const { items } = req.body;
      const price = parseInt(items * 100);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: price,
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    const verifyToken = (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "unauthorized access" });
      }

      jwt.verify(
        req.headers.authorization,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
          if (err) {
            return res.status(401).send({ message: "unauthorized access" });
          }
          req.decoded = decoded;
          next();
        }
      );
    };

    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const isAdmin = user?.roll === "admin";
      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };
    const verifyTrainer = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const isTrainer = user?.roll === "trainer";
      if (!isTrainer) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

    app.get("/users/admin/:email", verifyToken, async (req, res) => {
      const email = req.params.email;

      if (email !== req.decoded.email) {
        return res.status(409).send({ message: "forbidden access" });
      }

      const query = { email: email };
      const user = await usersCollection.findOne(query);
      let admin = false;
      let trainer = false;

      if (user) {
        admin = user?.roll === "admin" ? true : false;
      }
      if (user) {
        trainer = user?.roll === "trainer" ? true : false;
      }
      res.send({ admin, trainer });
    });

    app.post("/users", async (req, res) => {
      const checkIfEmailAlreadyExists = await usersCollection.findOne({
        email: req.body.email,
      });

      if (checkIfEmailAlreadyExists) {
        return res.send({ insertedId: 0 });
      }

      const result = await usersCollection.insertOne(req.body);
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const result = await usersCollection
        .find({ email: req.query.email })
        .toArray();
      res.send(result);
    });

    app.patch("/users", async (req, res) => {
      const check = await usersCollection.findOne({ email: req.body.email });

      const result = await usersCollection.updateMany(
        { email: req.body.email },
        {
          $set: {
            username:
              req.body.username === undefined
                ? check.username
                : req.body.username,
            photoURL:
              req.body.photoURL === undefined
                ? check.photoURL
                : req.body.photoURL,
            email: req.body.email,
            roll: req.body.roll === undefined ? check.roll : req.body.roll,
          },
        }
      );

      res.send(result);
    });

    app.post("/subscribers", async (req, res) => {
      const checkEmailExists = await subscribersCollection.findOne({
        email: req.body.email,
      });

      if (checkEmailExists) {
        return res.send({ insertedId: 0 });
      }

      const result = await subscribersCollection.insertOne(req.body);
      res.send(result);
    });

    app.get("/subscribers", verifyToken, verifyAdmin, async (req, res) => {
      const result = await subscribersCollection.find().toArray();
      res.send(result);
    });

    app.post("/applied-trainer", async (req, res) => {
      const checkEmail = await trainerFormCollection.findOne({
        email: req.body.email,
      });

      if (checkEmail) {
        return res.send({ insertedId: 0 });
      }

      const result = await trainerFormCollection.insertOne(req.body);
      res.send(result);
    });

    app.get(
      "/applied-trainer/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await trainerFormCollection.findOne(query);
        res.send(result);
      }
    );

    app.get("/applied-trainer", async (req, res) => {
      const result = await trainerFormCollection.find().toArray();
      res.send(result);
    });

    app.patch("/applied-trainer", async (req, res) => {
      const result = await trainerFormCollection.updateOne(
        { email: req.query.email },
        {
          $set: {
            status: req.body?.status || "accepted",
            feedback: req.body.feedback || "",
          },
        }
      );

      res.send(result);
    });

    app.delete(
      "/applied-trainer/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await trainerFormCollection.deleteOne(query);

        res.send(result);
      }
    );

    app.get("/trainer-detail", async (req, res) => {
      const result = await trainerFormCollection.findOne({
        email: req.query.email,
      });

      res.send(result);
    });

    app.post("/class-details", verifyToken, verifyAdmin, async (req, res) => {
      const result = await classCollection.insertOne(req.body);

      res.send(result);
    });

    app.get("/class-details", async (req, res) => {
      const result = await classCollection.find().toArray();

      res.send(result);
    });

    app.patch("/make-changes", verifyToken, verifyTrainer, async (req, res) => {
      const id = req.body.id;
      const query = { _id: new ObjectId(id) };

      const check = await classCollection.findOne(query);

      for (const apple of check.classInstructors) {
        if (apple == req.body.trainerId) {
          return res.send({ classExists: true });
        }
      }

      if (check.classInstructors.length === 5) {
        return res.send({ classFull: true });
      }

      const result1 = await classCollection.updateOne(query, {
        $push: {
          classInstructors: req.body.trainerId,
        },
      });

      const result2 = await trainerFormCollection.updateOne(
        { email: req.body.email },
        {
          $push: {
            classSelected: id,
          },
        },
        { upsert: true }
      );
      res.send({ result1, result2 });
    });

    app.patch("/class-details", async (req, res) => {
      const result = await trainerFormCollection.updateOne(
        { email: req.body.email },
        {
          $pull: {
            shifts: req.body.shift,
          },
        }
      );

      res.send(result);
    });

    app.patch(
      "/class-details-push",
      verifyToken,
      verifyTrainer,
      async (req, res) => {
        const result = await trainerFormCollection.updateOne(
          { email: req.body.email },
          {
            $push: {
              shifts: {
                $each: req.body.shift,
              },
            },
          }
        );

        res.send(result);
      }
    );

    app.get("/classes", async (req, res) => {
      if (req.query.search === undefined || null) {
        return;
      }
      const makeParse = parseInt(req.query.page);
      const result = await classCollection
        .find({ className: { $regex: req.query.search, $options: "i" } })
        .skip(makeParse * 4)
        .limit(4)
        .toArray();
      res.send(result);
    });

    app.get("/single-class-details/:id", async (req, res) => {
      const result = await classCollection.findOne({
        _id: new ObjectId(req.params.id),
      });

      res.send(result);
    });

    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token });
    });

    app.get("/trainer-details", async (req, res) => {
      const result = await trainerFormCollection.findOne({
        _id: new ObjectId(req.query.id),
      });

      res.send(result);
    });

    app.post("/community-post", async (req, res) => {
      const result = await postsCollection.insertOne(req.body);

      res.send(result);
    });

    app.get("/community-posts-count", async (req, res) => {
      const result = await postsCollection.find().toArray();

      res.send(result);
    });

    app.get("/community-posts", async (req, res) => {
      const result = await postsCollection
        .find()
        .skip(req.query.count * 6)
        .limit(6)
        .toArray();

      res.send(result);
    });

    app.get("/get-post-votes", async (req, res) => {
      const votes = await postsCollection.find().toArray();

      res.send(votes);
    });

    app.patch("/community-posts", async (req, res) => {
      const result = await postsCollection.findOne({
        _id: new ObjectId(req.query.id),
      });

      if (parseInt(req.query.vote) === 1) {
        const newVote = result.vote + 1;

        const update = await postsCollection.updateOne(
          {
            _id: new ObjectId(req.query.id),
          },
          {
            $set: {
              vote: newVote,
            },
          }
        );

        res.send(update);
      } else if (parseInt(req.query.vote) === -1) {
        const newVote = result.vote - 1;
        const update = await postsCollection.updateOne(
          {
            _id: new ObjectId(req.query.id),
          },
          {
            $set: {
              vote: newVote,
            },
          }
        );

        res.send(update);
      }
    });

    app.post("/user-payments", async (req, res) => {
      const getData = await trainerFormCollection.findOne({
        _id: new ObjectId(req.body.trainerId),
      });

      const removeShift = getData.shifts.filter(
        (data) => data.label !== req.body.slot
      );

      const getSlot = getData.shifts.filter(
        (data) => data.label === req.body.slot
      );

      getSlot[0].value = "booked";
      getSlot[0].name = req.query.name;

      removeShift.push(getSlot[0]);

      await trainerFormCollection.updateOne(
        {
          _id: new ObjectId(req.body.trainerId),
        },
        {
          $set: {
            shifts: removeShift,
          },
        }
      );

      const classData = await classCollection.findOne({
        _id: new ObjectId(req.body.classId),
      });

      const newBooked = classData.booked + 1;

      await classCollection.updateOne(
        { _id: new ObjectId(req.body.classId) },
        {
          $set: {
            booked: newBooked,
          },
        }
      );

      const result = await paymentsCollection.insertOne(req.body);

      res.send(result);
    });

    app.get("/user-payments", async (req, res) => {
      const result = await paymentsCollection
        .find({ email: req.query.email })
        .toArray();

      res.send(result);
    });

    app.get("/payments", async (req, res) => {
      const result = await paymentsCollection
        .find({ email: req.query.email })
        .toArray();
      res.send(result);
    });

    app.post("/review", async (req, res) => {
      const result = await reviewCollection.insertOne(req.body);

      res.send(result);
    });

    app.get("/review", async (req, res) => {
      const result = await reviewCollection.find().toArray();

      res.send(result);
    });

    app.get("/highest-booked-classes", async (req, res) => {
      const result = await classCollection
        .find()
        .sort({ booked: -1 })
        .limit(6)
        .toArray();

      res.send(result);
    });
    app.get("/recent-trainers", async (req, res) => {
      const result = await trainerFormCollection.find().limit(3).toArray();

      res.send(result);
    });

    app.get("/payments-and-sum", async (req, res) => {
      const getTotalPrice = await paymentsCollection
        .aggregate([
          {
            $group: {
              _id: null,
              totalPrice: { $sum: "$price" },
            },
          },
        ])
        .toArray();
      const totalPrice = getTotalPrice[0].totalPrice;

      const getIds = await paymentsCollection.find().limit(6).toArray();

      const members = await paymentsCollection
        .aggregate([
          { $group: { _id: "$email" } },
          { $count: "uniqueEmailCount" },
        ])
        .toArray();

      const paidMembers = members[0].uniqueEmailCount;

      const newsletterMembers = await subscribersCollection.find().toArray();

      const newsletterSubscribersCount = newsletterMembers.length;

      const result = {
        getIds,
        totalPrice,
        paidMembers,
        newsletterSubscribersCount,
      };

      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.listen(port);
