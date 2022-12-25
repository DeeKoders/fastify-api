const controller = require("../controllers/index");
const validateData = require("../middlewares/validateData");
async function routes(fastify) {
  fastify.get("/", controller.info);
  fastify.get("/read", controller.read);
  fastify.delete("/delete/:phno", controller.delete);
  fastify.put("/update/:phno", controller.update);
  fastify.post(
    "/create",
    {
      preHandler: [validateData],
    },
    controller.create
  );
}

module.exports = routes;
