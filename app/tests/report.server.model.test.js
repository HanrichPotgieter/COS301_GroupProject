'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Report = mongoose.model('Report'),
	Project = mongoose.model('Project');
/**
 * Globals
 */
var user, report, project;

/**
 * Unit tests
 */
describe('Report Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});
		
		project = new Project({
			name: 'Project Name',
			user: user,
			owner : 'Full'
		});

		user.save(function() { 
			report = new Report({
				name: 'Report Name',
				user: user,
				project: project
				
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return report.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			report.name = '';

			return report.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Report.remove().exec();
		User.remove().exec();

		done();
	});
});