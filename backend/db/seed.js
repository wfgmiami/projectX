const db = require( './index' );
const chalk = require( 'chalk' );

console.log( chalk.yellow.inverse.bold( ' Begin Database seed ' ) );
console.log( '---------------------' );

db.sequelize.sync({ force: true })
  .then( () => {
    seeding('UserRole');
    return db.UserRole.bulkCreate(require('./data/user-role'));
  })
  .then( () => {
    seedInfo('UserRole', 'UserAddress');
    return db.UserAddress.bulkCreate(require('./data/user-address'));
  })
  .then( () => {
    seedInfo('UserAddress', 'User');
    return db.User.bulkCreate(require('./data/user'));
  })

  .then( () => {
    seedInfo('UserAddress', 'Author');
    return db.Author.bulkCreate(require('./data/author'));
  })
  .then( () => {
    seedInfo('Author', 'Article');
    return db.Article.bulkCreate(require('./data/article'));
  })

  .catch(er => console.log(er.stack))


function seedInfo(justseeded, nexttoseed) {
  seeded(justseeded);
  seeding(nexttoseed);
}

function seeded(nexttoseed) {
  let msg = ` -> ${nexttoseed} seeded`;
  console.log(chalk.blue.bold( msg ));
  console.log(msg.replace( /./g, '-' ));
}

function seeding(seed) {
  console.log(chalk.magenta( ` - Seeding ${seed}` ));
}

