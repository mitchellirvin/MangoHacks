'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Workout = mongoose.model('Workout'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, workout;

/**
 * Workout routes tests
 */
describe('Workout CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Workout
    user.save(function () {
      workout = {
        name: 'Workout name'
      };

      done();
    });
  });

  it('should be able to save a Workout if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Workout
        agent.post('/api/workouts')
          .send(workout)
          .expect(200)
          .end(function (workoutSaveErr, workoutSaveRes) {
            // Handle Workout save error
            if (workoutSaveErr) {
              return done(workoutSaveErr);
            }

            // Get a list of Workouts
            agent.get('/api/workouts')
              .end(function (workoutsGetErr, workoutsGetRes) {
                // Handle Workout save error
                if (workoutsGetErr) {
                  return done(workoutsGetErr);
                }

                // Get Workouts list
                var workouts = workoutsGetRes.body;

                // Set assertions
                (workouts[0].user._id).should.equal(userId);
                (workouts[0].name).should.match('Workout name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Workout if not logged in', function (done) {
    agent.post('/api/workouts')
      .send(workout)
      .expect(403)
      .end(function (workoutSaveErr, workoutSaveRes) {
        // Call the assertion callback
        done(workoutSaveErr);
      });
  });

  it('should not be able to save an Workout if no name is provided', function (done) {
    // Invalidate name field
    workout.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Workout
        agent.post('/api/workouts')
          .send(workout)
          .expect(400)
          .end(function (workoutSaveErr, workoutSaveRes) {
            // Set message assertion
            (workoutSaveRes.body.message).should.match('Please fill Workout name');

            // Handle Workout save error
            done(workoutSaveErr);
          });
      });
  });

  it('should be able to update an Workout if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Workout
        agent.post('/api/workouts')
          .send(workout)
          .expect(200)
          .end(function (workoutSaveErr, workoutSaveRes) {
            // Handle Workout save error
            if (workoutSaveErr) {
              return done(workoutSaveErr);
            }

            // Update Workout name
            workout.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Workout
            agent.put('/api/workouts/' + workoutSaveRes.body._id)
              .send(workout)
              .expect(200)
              .end(function (workoutUpdateErr, workoutUpdateRes) {
                // Handle Workout update error
                if (workoutUpdateErr) {
                  return done(workoutUpdateErr);
                }

                // Set assertions
                (workoutUpdateRes.body._id).should.equal(workoutSaveRes.body._id);
                (workoutUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Workouts if not signed in', function (done) {
    // Create new Workout model instance
    var workoutObj = new Workout(workout);

    // Save the workout
    workoutObj.save(function () {
      // Request Workouts
      request(app).get('/api/workouts')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Workout if not signed in', function (done) {
    // Create new Workout model instance
    var workoutObj = new Workout(workout);

    // Save the Workout
    workoutObj.save(function () {
      request(app).get('/api/workouts/' + workoutObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', workout.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Workout with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/workouts/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Workout is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Workout which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Workout
    request(app).get('/api/workouts/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Workout with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Workout if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Workout
        agent.post('/api/workouts')
          .send(workout)
          .expect(200)
          .end(function (workoutSaveErr, workoutSaveRes) {
            // Handle Workout save error
            if (workoutSaveErr) {
              return done(workoutSaveErr);
            }

            // Delete an existing Workout
            agent.delete('/api/workouts/' + workoutSaveRes.body._id)
              .send(workout)
              .expect(200)
              .end(function (workoutDeleteErr, workoutDeleteRes) {
                // Handle workout error error
                if (workoutDeleteErr) {
                  return done(workoutDeleteErr);
                }

                // Set assertions
                (workoutDeleteRes.body._id).should.equal(workoutSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Workout if not signed in', function (done) {
    // Set Workout user
    workout.user = user;

    // Create new Workout model instance
    var workoutObj = new Workout(workout);

    // Save the Workout
    workoutObj.save(function () {
      // Try deleting Workout
      request(app).delete('/api/workouts/' + workoutObj._id)
        .expect(403)
        .end(function (workoutDeleteErr, workoutDeleteRes) {
          // Set message assertion
          (workoutDeleteRes.body.message).should.match('User is not authorized');

          // Handle Workout error error
          done(workoutDeleteErr);
        });

    });
  });

  it('should be able to get a single Workout that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Workout
          agent.post('/api/workouts')
            .send(workout)
            .expect(200)
            .end(function (workoutSaveErr, workoutSaveRes) {
              // Handle Workout save error
              if (workoutSaveErr) {
                return done(workoutSaveErr);
              }

              // Set assertions on new Workout
              (workoutSaveRes.body.name).should.equal(workout.name);
              should.exist(workoutSaveRes.body.user);
              should.equal(workoutSaveRes.body.user._id, orphanId);

              // force the Workout to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Workout
                    agent.get('/api/workouts/' + workoutSaveRes.body._id)
                      .expect(200)
                      .end(function (workoutInfoErr, workoutInfoRes) {
                        // Handle Workout error
                        if (workoutInfoErr) {
                          return done(workoutInfoErr);
                        }

                        // Set assertions
                        (workoutInfoRes.body._id).should.equal(workoutSaveRes.body._id);
                        (workoutInfoRes.body.name).should.equal(workout.name);
                        should.equal(workoutInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Workout.remove().exec(done);
    });
  });
});
