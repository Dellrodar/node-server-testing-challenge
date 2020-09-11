
exports.seed = async function(knex) {
  await knex("users").truncate()
  await knex('users').insert([
        {userName: 'Dellrodar', name:'Emilio' },
        {userName: 'Jennoula', name:'Jenn' },
        {userName: 'Kukupig', name:'Melissa' }
      ]);
};
