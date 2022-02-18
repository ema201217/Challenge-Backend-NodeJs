describe("Authentication - Register and Login", () => {
  let objTest = [
    {
      description: "Successful registration",
      email: "email@email.com",
      pass: "123456",
      path: "/auth/register",
      test: (res) => expect(res.body.meta.ok).to.equal(true),
    },
    {
      description: "Email validation already registered",
      email: "email@email.com",
      pass: "123456",
      path: "/auth/register",
      test: (res) => {
        expect(res.body.meta.ok).equal(false);
        expect(res.body.errors.email.msg).to.equal("Email already exists");
      },
    },
    {
      description: "Empty email validation",
      email: "",
      pass: "123456",
      path: "/auth/register",
      test: (res) => {
        expect(res.body.meta.ok).equal(false);
        expect(res.body.errors.email.msg).to.equal("Email cannot be empty");
      },
    },
    {
      description: "Invalid email validation",
      email: "email",
      pass: "123456",
      path: "/auth/register",
      test: (res) => {
        expect(res.body.meta.ok).equal(false);
        expect(res.body.errors.email.msg).to.equal("Email invalid");
      },
    },
    {
      description: "Empty password validation",
      email: "email2@email.com",
      pass: "",
      path: "/auth/register",
      test: (res) => {
        expect(res.body.meta.ok).equal(false);
        expect(res.body.errors.pass.msg).to.equal("Password cannot be empty");
      },
    },
    {
      description: "Successful login",
      email: "email@email.com",
      pass: "123456",
      path: "/auth/login",
      test: (res) => {
        expect(res.body.ok).to.deep.equal(true);
        expect(res.headers).to.have.property("auth-token");
      },
    },
  ];

  objTest.forEach(({ description, email, pass, path, test }) => {

    it(description, async () => {
      const res = await cy.request({
        method: "POST",
        url: `http://localhost:3000${path}`,
        failOnStatusCode: false,
        body: {
          email,
          pass,
        },
      });
      test(res);
    });
    
  });
});
