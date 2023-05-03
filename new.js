module.exports.createUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        newUser.password = hash;
        newUser.save(callback);
      });
    });
  };
  
  function callIt() {
      module.exports.createUser({ name: 'ridham' }, function (err, user) {
          if (err) {
              console.log(error);
          } else {
              console.log(user);
          }
      });
  }    
  
  callIt();