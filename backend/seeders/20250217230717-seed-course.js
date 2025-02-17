'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('courses', [
      {
        title: 'Introduction to Node.js',
        description: 'A beginner-friendly course on Node.js fundamentals.',
        estimatedTime: '5 hours',
        materialsNeeded: 'Laptop, Internet, Node.js installed',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Advanced React Development',
        description: 'Learn advanced techniques in React development.',
        estimatedTime: '10 hours',
        materialsNeeded: 'Laptop, Internet, React setup',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('courses', null, {});    
  }
};
