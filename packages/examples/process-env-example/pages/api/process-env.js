// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    SECRET1: process.env.SECRET1,
    SECRET2: process.env.SECRET2,
  });
}
