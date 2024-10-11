import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import sequelize from './lib/sequelize.js';
import Post from './models/Post.js';

async function migratePosts() {
  try {
    
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida.');

    await sequelize.sync();
    console.log('Modelos sincronizados con la base de datos.');

    const postsDirectory = path.join(process.cwd(), 'posts');
    const postFiles = fs.readdirSync(postsDirectory);

    for (const file of postFiles) {
      const filePath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      await Post.create({
        title: data.title || 'Sin título',
        content: content,
      });
      console.log(`Post "${data.title}" migrado exitosamente.`);
    }
  } catch (error) {
    console.error('Error en la migración:', error);
  } finally {
    await sequelize.close();
  }
}

migratePosts();

