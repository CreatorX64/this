const handler = (req, res) => {
  const email = req.body.email;

  // Then save email to your database, etc...

  res.status(200).json({ text: "Hello" });
};

export default handler;
