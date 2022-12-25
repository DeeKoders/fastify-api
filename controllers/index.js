const data = require("../utils/data");
const fs = require("fs");

module.exports = {
  info: async (request, reply) => {
    reply.status(200).send({
      read: "/read",
      create: "/create",
      update: "/update/[Phone Number]",
      delete: "/delete/[Phone Number]",
    });
  },
  read: async (request, reply) => {
    if (Object.keys(data).length) {
      reply.status(200).send(data);
    } else reply.status(400).send("No Records Found");
  },
  delete: async (request, reply) => {
    let phno = request.params.phno;
    let matchedKeys = Object.keys(data).find((key) => key === phno);
    if (matchedKeys) {
      delete data[phno];
      fs.writeFileSync("./utils/data.json", JSON.stringify(data));
      reply
        .status(200)
        .send(`Data against Phone Number(${phno}) has been deleted`);
    }
    reply.status(400).send("Phone Number does not exists");
  },
  update: async (request, reply) => {
    let phno = request.params.phno;
    let matchedKeys = Object.keys(data).find((key) => key === phno);
    if (matchedKeys) {
      let name = request.body?.name;
      let email = request.body?.email;
      if (!name || !email) {
        reply.status(400).send("Please Enter Valid Data");
      }
      data[phno] = { name, email, phno };
      fs.writeFileSync("./utils/data.json", JSON.stringify(data));
      reply.status(200).send(data);
    }
    reply.status(400).send("Phone Number does not exists");
  },
  create: async (request, reply) => {
    if (!request?.body?.validData) {
      reply.status(400).send("Please Enter Valid Data");
    }
    let { name, email, phno } = request.body;

    let matchedKeys = Object.keys(data).find((key) => key === phno);
    if (matchedKeys) {
      reply.status(400).send("Phone Number Already Exists");
    }
    let newData = {
      ...data,
      [phno]: {
        name,
        email,
        contact: phno,
      },
    };
    fs.writeFileSync("./utils/data.json", JSON.stringify(newData));
    reply.status(200).send(newData);
  },
};
