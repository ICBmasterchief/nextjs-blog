import Post from '../../models/Post';

export default async function handler(req, res) {
  try {
    await Post.sync(); 

    if (req.method === 'GET') {
      const posts = await Post.findAll();
      res.status(200).json(posts);
    } else if (req.method === 'POST') {
      const { title, content } = req.body;
      const newPost = await Post.create({ title, content });
      res.status(201).json(newPost);
    } else {
      res.status(405).json({ message: 'Método no permitido' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error en la base de datos' });
  }
}
