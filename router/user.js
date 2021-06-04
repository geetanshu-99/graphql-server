const express = require("express");
const router = new express.Router();
const jwt = require("jsonwebtoken");
const users = [{ "email": "geetanshu@example.com", "password": 1234567 }];

//Login
router.post("/users/login", async (req, res) => {
  try {
    const user = req.body;
    let k = users.map(a => a);
    let g= k.filter(a => a.password == req.body.password && a.email == req.body.email)
    if(g.length > 0) {
        jwt.sign(
          { user },
          "secretkey",
          { expiresIn: "3000s" },
          (err, token) => {
            res.json({ token, user, status: "ok" });
          }
        );
    }
    else {
        res.json({ status: "error", error: "Invalid email or password" });
    }
  } catch (e) {
    res.json({ status: "error", error: "Invalid email or password" });
    res.status(400).send();
  }
});
// router.post('/api/posts', (req, res)=> {
//     const user= jwt.verify(req.body.token, 'secretkey').user;
// })

// router.post('/employees',(req, res)=> {
//   const user= jwt.verify(req.body.token, 'secretkey').user
//   // res.json(user)
//   if(user) {
//     res.json(employees);
//   }
// })



module.exports = router;
