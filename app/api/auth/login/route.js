// // /app/api/auth/login/route.js
// import jwt from "jsonwebtoken";

// export async function POST(req) {
//   const { email, password } = await req.json();

// //   if (email === "admin@gmail.com" && password === "1234") {
// //     const token = jwt.sign({ email }, "SECRET_KEY", { expiresIn: "7d" });

// //     return Response.json({ token });
// //   }

// //   return Response.json({ error: "Invalid credentials" }, { status: 401 });
// // }
// const [users] = await db.execute(
//   "SELECT * FROM admins WHERE email=? AND password=?",
//   [email, password]
// );

// if(users.length === 0){
//   return Response.json(
//     {message:"Invalid login"},
//     {status:401}
//   );
// }

// const user = users[0];

// const token = jwt.sign(
//   {
//     id:user.id,
//     email:user.email,
//     role:user.role
//   },
//   process.env.JWT_SECRET,
//   {
//     expiresIn:"7d"
//   }
// );


// return Response.json({
//   token,
//   role:user.role
// });


import jwt from "jsonwebtoken";
import database from "../../../lib/db";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const [users] = await database.execute(
      "SELECT * FROM admins WHERE email = ? AND password = ?",
      [email, password]
    );

    if (users.length === 0) {
      return Response.json(
        { message: "Invalid login" },
        { status: 401 }
      );
    }

    const user = users[0];

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return Response.json({
      token,
      role: user.role,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}