const User = require('../models/user');

module.exports.profile = function(req, res){
   if(req.cookies.user_id){
    User.findById(req.cookies.user_id).then(user =>{
      if(user){
        return res.render('user_profile', {
          title: 'User Profile',
          user: user
        })
      }
      // return res.redirect('/users/sign-in');
    });
   }else{
    return res.render('/users/sign-in')
   }
}


// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res) {
  if (req.body.password !== req.body.confirm_password) {
    return res.redirect('back');
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return User.create(req.body);
      } else {
        return Promise.reject("User already exists.");
      }
    })
    .then(user => {
      return res.redirect('/users/sign-in');
    })
    .catch(err => {
      console.log("Error in sign up:", err);
      return res.redirect('back');
    });
};



// module.exports.create=function(req, res){
//     if(req.body.password != req.body.confirm_password){
//         return res.redirect('back');
//     }
//     User.findOne({email: req.body.email}, function(err, user){
//         if(err){console.log("error in finding user in sign up"); return}

//         if(!user){
//             User.create(req.body, function(err, user){
//                 if(err){console.log("error in creating user while signing up"); return}
//                 return res.redirect('/users/sign-in');
//             });
//         }else{
//             return res.redirect('back');
//         }
//     })
// }



// sign in and create the session for data
module.exports.createSession=function(req, res){
  User.findOne({email:req.body.email})
  .then(user => {
    if(user){
      if(user.password !== req.body.password){
        return res.redirect('back');
      }
      res.cookie('user_id',user.id);
      return res.redirect('/users/profile');
    }else{
      return res.redirect('back');
    }
  })
  .catch(err => {
    console.log("error in finding user");
    return;
  })
}