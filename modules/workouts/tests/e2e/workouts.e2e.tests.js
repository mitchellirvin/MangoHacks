'use strict';

describe('Workouts E2E Tests:', function () {
  describe('Test Workouts page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/workouts');
      expect(element.all(by.repeater('workout in workouts')).count()).toEqual(0);
    });
  });
});
