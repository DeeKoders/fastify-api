const fastify = require("fastify")({
  logger: true,
});
const router = require("./routes");

fastify.register(router);

fastify.listen(process.env.PORT || 3000, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is running on Port ${process.env.PORT || 3000}`);
  // Server is now listening on ${address}
});
