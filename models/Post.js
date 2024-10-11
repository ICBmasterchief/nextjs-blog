import { DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize.js'; 

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'Posts', 
  timestamps: true,  
});

export default Post;


