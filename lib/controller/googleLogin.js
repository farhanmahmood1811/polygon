import passport from 'passport';
import { Strategy } from 'passport-google-oauth2';

import Student from '../models/student';

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new Strategy({
    clientID: '2436967569-4ckqpr0ch3q150ob074j1mibfql2trmv.apps.googleusercontent.com',
    clientSecret: 'v79KJ73k1HHKDD9w4PAqi_0-',
    callbackURL: '/auth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    let student;
    try {
      student =  await Student.findOne({id: profile.id});
    } catch (e) {
      return done(e.message, null)
    }

    let tokens = {
      access_token: accessToken,
      refresh_token: refreshToken
    }
    if(!student) {
      let profileData = {}
      profileData['tokens'] = tokens;
      profileData['provider'] = "google";
      profileData['id'] = profile.id;
      profileData['name'] = profile.displayName;
      profileData['gender'] = profile._json.gender;
      const image = profile._json.image
      if(image && image.url && image.url != "") {
        profileData.pictureUrl = image.url;
      }
      student = new Student(profileData);
    } else {
      student.tokens = tokens;
    }

    try {
      await student.save();
      done(null, student)
    } catch(e) {
      done(e.message, null)
    }
  }
));

