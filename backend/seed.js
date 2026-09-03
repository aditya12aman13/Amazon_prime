const bcrypt = require('bcryptjs');
const { sequelize } = require('./models');
const User = require('./models/User');
const Movie = require('./models/Movie');

const seed = async () => {
  await sequelize.sync({ force: true });
  
  // Create Superuser
  const hashedPassword = await bcrypt.hash('admin123', 8);
  await User.create({
    name: 'Superuser',
    email: 'admin@prime.com',
    password: hashedPassword,
    isAdmin: true,
    isSuperuser: true
  });

  // Create Admin user
  const adminPass = await bcrypt.hash('admin123', 8);
  await User.create({
    name: 'Admin',
    email: 'admin2@prime.com',
    password: adminPass,
    isAdmin: true,
    isSuperuser: false
  });

  const movies = [
    // === Featured / Hero ===
    {
      title: 'Babita Singh Reporting',
      description: 'During her first visit to her in-laws, an underestimated cop finds herself entangled in a murder mystery that reveals dark family secrets.',
      thumbnailUrl: 'https://m.media-amazon.com/images/S/pv-target-images/b48da70ce1d4512e9ce459bd57b29a27891bbfa92da9408432ce47db8b211d14._UR1920,1080_RI_SX356_FMwebp_.jpg',
      videoUrl: '#',
      category: 'Amazon Original Movies',
      rating: 'U/A 16+'
    },

    // === Top 10 with Prime ===
    {
      title: 'Reacher',
      description: 'When retired Military Police Officer Jack Reacher is arrested for a murder he did not commit, he finds himself in the middle of a deadly conspiracy.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BYTAzMmY2YOQtNjM2MC00ODdkLWIwOTYtZjFjNGVmMGE0ODJiXkEyXkFqcGc@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Top 10 with Prime',
      rating: 'U/A 16+'
    },
    {
      title: 'The Traitors',
      description: 'Players must figure out who among them are traitors and who are faithful in a game of detection, backstabbing and trust.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZDEwMjE4MzMtZWMxMi00ODA3LWJhYzMtOTdmNWI1ODFiNGNjXkEyXkFqcGc@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Top 10 with Prime',
      rating: 'U/A 13+'
    },
    {
      title: 'Awarapan',
      description: 'A hitman working for an international don gets a task to keep an eye on his boss secret lover.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BMjkzODc0OTctMmQ5YS00MzBmLWIzMjktOTk5MWQ5NmFhNjdlXkEyXkFqcGc@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Top 10 with Prime',
      rating: '18+'
    },
    {
      title: 'Citadel: Honey Bunny',
      description: 'A stuntman and an actress are drawn into a spy world where they must confront their past to protect their future.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BYjZjMjVhODQtYTI5Ny00ZTA5LWI0NTMtMGRkZDlhNmI5MjAxXkEyXkFqcGc@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Top 10 with Prime',
      rating: 'U/A 16+'
    },
    {
      title: 'The Family Man',
      description: 'A middle-class man who works as a senior officer for a special cell of the National Investigation Agency.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BMjIyMzc1MzUxMl5BMl5BanBnXkFtZTgwNjUxNjQxNzM@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Top 10 with Prime',
      rating: 'U/A 16+'
    },
    {
      title: 'Mirzapur',
      description: 'A shocking incident at a wedding procession ignites a series of events entangling the lives of two families in the lawless city of Mirzapur.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZDgxMjc3NjgtN2Y4MC00NjUzLWJiMjItZWRhMDZmMTkxYjRlXkEyXkFqcGc@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Top 10 with Prime',
      rating: '18+'
    },
    {
      title: 'Panchayat',
      description: 'An engineering graduate, for the lack of a better job option, joins as the secretary of a panchayat office in a remote village.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZTk2MjViOTEtZGRkNC00Mzk2LWJmNDUtYWE5MmNhNWYxNTg4XkEyXkFqcGc@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Top 10 with Prime',
      rating: 'U/A 13+'
    },
    {
      title: 'Made in Heaven',
      description: 'Two wedding planners in Delhi run a company called Made in Heaven and face the challenges of modern-day Indian marriages.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BYWRkNjU0NmQtYjU2NS00MDQzLTk4MDYtZjFhODkxNjYyNTIyXkEyXkFqcGc@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Top 10 with Prime',
      rating: 'U/A 16+'
    },
    {
      title: 'Tandav',
      description: 'After the PM dies, a young leader schemes to take the top spot while unrest brews on a university campus.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BODJiYjlhMTctN2MwYi00NGJiLWFmYmQtYTA1ZGNkOTE3NTcxXkEyXkFqcGc@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Top 10 with Prime',
      rating: 'U/A 16+'
    },

    // === Action and Adventure Movies ===
    {
      title: 'Pushpa: The Rise',
      description: 'A labourer rises through the ranks of a red sandalwood smuggling syndicate, making powerful enemies in his path.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BYjE2MTdkMWEtZTBhYS00YmFiLWFhN2UtMjU1YWRiMWI4OTVmXkEyXkFqcGc@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Action and Adventure Movies',
      rating: 'U/A 16+'
    },
    {
      title: 'RRR',
      description: 'A fictitious story about two legendary revolutionaries and their journey away from home before they started fighting for their country.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BNjk4Mjk4NDYtNjU3MC00ZDY4LWI1NjMtNGY5NjhiNzE0NjI3XkEyXkFqcGc@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Action and Adventure Movies',
      rating: 'U/A 13+'
    },
    {
      title: 'KGF Chapter 2',
      description: 'In the blood-soaked Kolar Gold Fields, Rocky faces the consequences of his actions.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BNjI1ZDEyZDctMTA5ZS00NzExLWI5MGItMWFjNGNmOTdjNGRmXkEyXkFqcGc@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Action and Adventure Movies',
      rating: 'U/A 16+'
    },
    {
      title: 'Pathaan',
      description: 'An Indian spy takes on the leader of a group of mercenaries who have planned a deadly attack on India.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BM2QxNjAzZmQtNDAxNC00ZGM4LWIyY2ItNTYwYjRhOGJjYzNlXkEyXkFqcGc@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Action and Adventure Movies',
      rating: 'U/A 13+'
    },
    {
      title: 'War',
      description: 'An Indian soldier is assigned to eliminate a former agent who has gone rogue.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BMTg3MTEwMDctYjFhZS00MjUzLWIyN2EtMWU1MDFlZjMzYWExXkEyXkFqcGc@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Action and Adventure Movies',
      rating: 'U/A 13+'
    },
    {
      title: 'Jawan',
      description: 'A man driven by a personal vendetta against corruption uses his position as a jailer to carry out vigilante justice.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZjI3ZWJjMzYtNTk1MC00ZGI1LTlkOTEtNjEzMWMxZDQ0ZjViXkEyXkFqcGc@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Action and Adventure Movies',
      rating: 'U/A 13+'
    },

    // === Amazon Originals India ===
    {
      title: 'The Last Summer',
      description: 'A group of friends spend their last summer together before college, facing secrets and personal revelations.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BNDE0MWFlZGYtOTI1NC00NzIzLTk1ZDItOGM3MTdkMmNhYjQ4XkEyXkFqcGc@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Amazon Originals India',
      rating: 'U/A 16+'
    },
    {
      title: 'Breathe Into The Shadows',
      description: 'A desperate father goes to extreme lengths to rescue his kidnapped daughter.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BYjlmMWRmZjEtOTE3Yi00ZTVmLWJmMjktMGExNDUzZDM3ODNhXkEyXkFqcGc@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Amazon Originals India',
      rating: 'U/A 16+'
    },
    {
      title: 'Paatal Lok',
      description: 'A downtrodden cop lands a high-profile case. As he unravels the layers, he encounters a terrifying underworld.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BMjI2MDEwNzM2NF5BMl5BanBnXkFtZTgwOTQ5NTIyODM@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Amazon Originals India',
      rating: '18+'
    },
    {
      title: 'Inside Edge',
      description: 'Follows the owners, players, and selectors of a fictional T20 cricket team as they navigate through feelings of power, money, and fame.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BMmRiYjliYTQtZWUyZi00NWFiLThmMDItYTc4NmI4NThiODdmXkEyXkFqcGc@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Amazon Originals India',
      rating: 'U/A 16+'
    },

    // === Bollywood Movies ===
    {
      title: 'Don',
      description: 'Vijay, who resembles a wanted crime boss Don, is recruited to impersonate the recently deceased gangster.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BNmQwOTM5NjgtY2VmNC00ZGFmLTgzNmQtNDYxYjQ2NjUxZGE5XkEyXkFqcGc@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Bollywood Movies',
      rating: 'U/A 13+'
    },
    {
      title: 'Sarbjit',
      description: 'An Indian man is arrested for allegedly being a spy and is sentenced to death in Pakistan.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BNTQ4NmQyMGEtYWViZi00YmI0LThjOTYtNzM0NDVlZDkwODE5XkEyXkFqcGc@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Bollywood Movies',
      rating: 'U/A 16+'
    },
    {
      title: 'Dangal',
      description: 'Former wrestler Mahavir Singh Phogat trains his daughters to become world class wrestlers.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BMTQ4MzQzMzM2Nl5BMl5BanBnXkFtZTgwMTQ1NjkyOTE@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Bollywood Movies',
      rating: 'U/A 13+'
    },
    {
      title: '3 Idiots',
      description: 'Two friends are searching for their long lost companion. They revisit their college days and recall the memories.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZjliMjliMjYtMmVjNC00OGIyLTgyNWYtMjA3MTU0OGZhZmQzXkEyXkFqcGc@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Bollywood Movies',
      rating: 'U/A 13+'
    },

    // === Comedy Movies ===
    {
      title: 'Hera Pheri',
      description: 'Three unemployed men find the answer to all their money problems when they receive a call from a kidnapper.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BOTBkMTkxYTEtMzVhOC00NTkzLWI0OWMtMjlkMjU1ZjhhOWM3XkEyXkFqcGc@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Comedy Movies',
      rating: 'U/A 13+'
    },
    {
      title: 'Welcome',
      description: 'Rajiv falls in love with Sanjana, the sister of two gangsters, Majnu and Uday Shetty.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZmM1OTFhOTUtYTc5OC00MTlhLWJjMWQtNTk1MzA4NmNhZjVlXkEyXkFqcGc@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Comedy Movies',
      rating: 'U/A 13+'
    },

    // === Thriller Movies ===
    {
      title: 'Drishyam',
      description: 'Desperate measures are taken by a man who tries to protect his family from the law, after they commit an accidental crime.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BNDM5NjYyNjc1MF5BMl5BanBnXkFtZTgwMjEwMjkxOTE@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Thriller Movies',
      rating: 'U/A 16+'
    },
    {
      title: 'Andhadhun',
      description: 'A series of mysterious events change the life of a blind pianist who must now report a crime he should technically be unable to witness.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BYzM3ZDAxZDUtODFjOS00M2JkLWIxZjUtMzgyMzNjNjk1ZjQxXkEyXkFqcGc@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Thriller Movies',
      rating: 'U/A 16+'
    },

    // === Drama Movies ===
    {
      title: 'Shershaah',
      description: 'The story of PVC awardee Indian soldier Vikram Batra, who shot to fame during the Kargil War.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BZjI0NmFiMjctNDgzYi00NGEzLThlOGUtNzRjZWIxMTIwMmFiXkEyXkFqcGc@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Drama Movies',
      rating: 'U/A 16+'
    },
    {
      title: 'Rang De Basanti',
      description: 'A British documentary filmmaker hires five Indian college students to act as freedom fighters in her documentary about India.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BYmVkODE5MDQtODkzZi00MDJmLTk2NjMtMjg3OGEzMjg0ZDIzXkEyXkFqcGc@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Drama Movies',
      rating: 'U/A 16+'
    },

    // === Hollywood Movies ===
    {
      title: 'The Dark Knight',
      description: 'When the menace known as the Joker wreaks havoc on Gotham, Batman must face one of the greatest tests of his ability.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Hollywood Hits',
      rating: 'U/A 16+'
    },
    {
      title: 'Inception',
      description: 'A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Hollywood Hits',
      rating: 'U/A 13+'
    },
    {
      title: 'Interstellar',
      description: 'When Earth becomes uninhabitable, a group of explorers undertake the most important mission in human history.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Hollywood Hits',
      rating: 'U/A 13+'
    },
    {
      title: 'The Shawshank Redemption',
      description: 'Over the course of several years, two convicts form a friendship, seeking consolation and eventual redemption.',
      thumbnailUrl: 'https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_QL75_UX820_.jpg',
      videoUrl: '#',
      category: 'Hollywood Hits',
      rating: 'U/A 16+'
    },
  ];

  for (let m of movies) {
    await Movie.create(m);
  }

  console.log('Database seeded successfully!');
  console.log('');
  console.log('=== Superuser Credentials ===');
  console.log('Email: admin@prime.com');
  console.log('Password: admin123');
  console.log('');
  console.log('=== Admin Credentials ===');
  console.log('Email: admin2@prime.com');
  console.log('Password: admin123');
  console.log('');
  console.log(`Total movies seeded: ${movies.length}`);
  process.exit();
};

seed();
