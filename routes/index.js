import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  const name = "Fabiano Santos";
  const age = 30;

  res.send(`Hi, I'm ${name} and I'm ${age} years old`);
});

router.get("/users", (req, res) => {
  res.json({
    users: [
      {
        name: "Fabiano Santos",
        age: 30,
      },
      {
        name: "Fabiano Santos",
        age: 30,
      },
    ],
  });
});

export default router;
