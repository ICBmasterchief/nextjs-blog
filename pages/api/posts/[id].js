import Post from '../../../models/Post'; 

export default async function handler(req, res) {
  const {
    query: { id },
  } = req;

  try {
    await Post.sync(); 

    if (req.method === 'GET') {
      const post = await Post.findByPk(id); 
      if (!post) {
        return res.status(404).json({ message: 'Post not found' }); 
      }
      res.status(200).json(post); 
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`); 
    }
  } catch (error) {
    res.status(500).json({ error: 'Error en la base de datos' });
  }
}
