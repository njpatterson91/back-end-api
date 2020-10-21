
exports.seed = function(knex) {

  const users = [
    {
      id: 9000,
      first_name: "default user",
      last_name: "default",
      email: "test@default.com",
      username: "default",
      password: "default",

      
    }
  ]

      // Inserts seed entries
      return knex('users').insert(users);
    ;
};
