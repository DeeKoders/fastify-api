const validateData = (request, reply, next) => {
  let { name, email, phno } = request.body;
  const validEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  const validPhNo = !isNaN(phno);
  const validName = isNaN(name);

  if (validEmail && validName && validPhNo)
    request.body = { ...request.body, validData: true };
  else request.body = { ...request.body, validData: false };
  next();
};
module.exports = validateData;
