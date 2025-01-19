// import { compare, genSalt, hash } from "bcrypt";
// import jwt from "jsonwebtoken";

// import env from "@/env";

// const { sign, verify } = jwt;

// export async function HashPass(password: string) {
//   const salt = await genSalt(Number(env.SALT));
//   const hashPassword = await hash(password.toString(), Number.parseInt(salt));
//   return hashPassword;
// }

// export async function ComparePass(password: string, hashPassword: string) {
//   return await compare(password, hashPassword);
// }

// export function CreateToken(user, time = "24h") {
//   const { uuid, name, email, department } = user;
//   const payload = {
//     uuid,
//     name,
//     email,
//     department,
//   };

//   const token = sign(payload, env.PRIVATE_KEY, { expiresIn: time });

//   if (!token) {
//     return {
//       success: false,
//       error: "Error Signing Token",
//       raw: err,
//     };
//   }

//   user.token = token;
//   return {
//     success: true,
//     token,
//   };
// }

// export function verifyToken(c, next) {
//   const { authorization } = c.req?.headers;
//   const { originalUrl, method } = c.req;

//   if (
//     (originalUrl === "/hr/user/login" && method === "POST")
//     || originalUrl.startsWith("/api-docs")
//   ) {
//     return next();
//   }

//   if (typeof authorization === "undefined") {
//     return c.json({ error: "Unauthorized" });
//   }

//   const token = authorization?.split(" ")[1];
//   verify(token, env.PRIVATE_KEY, (err, user) => {
//     if (err) {
//       return c.json({ error: "Forbidden" });
//     }

//     c.req.user = user;

//     next();
//   });
// }

