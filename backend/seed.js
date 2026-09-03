const bcrypt = require('bcryptjs');
const { sequelize } = require('./models');
const User = require('./models/User');
const Movie = require('./models/Movie');

const seed = async () => {
  await sequelize.sync({ force: true });
  
  const hashedPassword = await bcrypt.hash('admin123', 8);
  await User.create({
    name: 'Superuser',
    email: 'admin@prime.com',
    password: hashedPassword,
    isAdmin: true,
    isSuperuser: true
  });

  const movies = [
    {
      title: 'Babita Singh Reporting',
      description: 'During her first visit to her in-laws, an underestimated cop finds herself entangled in a murder mystery...',
      thumbnailUrl: 'https://m.media-amazon.com/images/S/pv-target-images/b48da70ce1d4512e9ce459bd57b29a27891bbfa92da9408432ce47db8b211d14._UR1920,1080_RI_SX356_FMwebp_.jpg',
      videoUrl: '#',
      category: 'Amazon Original Movies',
      rating: 'U/A 16+'
    },
    {
      title: 'Reacher',
      description: 'Action-packed series.',
      thumbnailUrl: 'https://m.media-amazon.com/images/S/pv-target-images/becc8f76d9bfbe65b2a30bbdfcb11003666b60c2394e22ec67f8fbcd23e716c5._UR1920,1080_RI_SX356_FMwebp_.jpg',
      videoUrl: '#',
      category: 'Top 10 with Prime',
      rating: 'U/A 16+'
    },
    {
      title: 'Awarapan',
      description: 'A hitman gets a task to keep an eye on his boss secret lover...',
      thumbnailUrl: 'https://m.media-amazon.com/images/S/pv-target-images/cf20b8fbe0d7718e28fb60d15e215444a1bb31737f2cf190bb5ddcfb09baf2f5._UR1920,1080_RI_SX356_FMwebp_.jpg',
      videoUrl: '#',
      category: 'Top 10 with Prime',
      rating: '18+'
    }
  ];

  for (let m of movies) {
    await Movie.create(m);
  }

  console.log('Database seeded successfully');
  process.exit();
};

seed();
