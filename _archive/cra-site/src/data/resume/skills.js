const skills = [
  {
    title: 'React',
    competency: 4,
    category: ['Front-end'],
  },
  {
    title: 'NextJS',
    competency: 3,
    category: ['Front-end'],
  },
  {
    title: 'JavaScript',
    competency: 5,
    category: ['Languages', 'Front-end'],
  },
  {
    title: 'TypeScript',
    competency: 3,
    category: ['Languages', 'Front-end'],
  },
  {
    title: 'NodeJS',
    competency: 5,
    category: ['Back-end'],
  },
  {
    title: 'CSS',
    competency: 4,
    category: ['Front-end'],
  },
  {
    title: 'styled-components',
    competency: 3,
    category: ['Front-end'],
  },
  {
    title: 'Python',
    competency: 5,
    category: ['Languages', 'Back-end'],
  },
  {
    title: 'Java',
    competency: 4,
    category: ['Languages', 'Back-end'],
  },
  {
    title: 'C',
    competency: 3,
    category: ['Languages'],
  },
  {
    title: 'C++',
    competency: 3,
    category: ['Languages'],
  },
  {
    title: 'PostgreSQL',
    competency: 4,
    category: ['Databases'],
  },
  {
    title: 'MongoDB',
    competency: 4,
    category: ['Databases'],
  },
  {
    title: 'MySQL',
    competency: 3,
    category: ['Databases'],
  },
  {
    title: 'Langchain',
    competency: 3,
    category: ['AI and ML'],
  },
  {
    title: 'PyTorch',
    competency: 3,
    category: ['AI and ML'],
  },
  {
    title: 'TensorFlow',
    competency: 3,
    category: ['AI and ML'],
  },
  {
    title: 'Scikit-learn',
    competency: 4,
    category: ['AI and ML'],
  },
  {
    title: 'Hugging Face Transformers',
    competency: 3,
    category: ['AI and ML'],
  },
  {
    title: 'spaCy',
    competency: 3,
    category: ['AI and ML'],
  },
  {
    title: 'MLflow',
    competency: 3,
    category: ['AI and ML'],
  },
  {
    title: 'Jest',
    competency: 3,
    category: ['Testing'],
  },
  {
    title: 'Mocha',
    competency: 3,
    category: ['Testing'],
  },
  {
    title: 'Chai',
    competency: 3,
    category: ['Testing'],
  },
  {
    title: 'AWS:EC2',
    competency: 3,
    category: ['Testing', 'Deployment'],
  },
  {
    title: 'AWS:ECS',
    competency: 3,
    category: ['Testing', 'Deployment'],
  },
  {
    title: 'Terraform',
    competency: 3,
    category: ['Testing', 'Deployment'],
  },
  {
    title: 'JUnit',
    competency: 3,
    category: ['Testing'],
  },
  {
    title: 'Docker',
    competency: 3,
    category: ['Deployment'],
  },
  {
    title: 'Git',
    competency: 5,
    category: ['Tools'],
  },
  {
    title: 'npm',
    competency: 3,
    category: ['Tools'],
  },
  {
    title: 'Webpack',
    competency: 3,
    category: ['Tools'],
  },
  {
    title: 'Babel',
    competency: 3,
    category: ['Tools'],
  },
].map((skill) => ({ ...skill, category: skill.category.sort() }));

// this is a list of colors that I like. The length should be === to the
// number of categories. Re-arrange this list until you find a pattern you like.
const colors = [
  '#6968b3',
  '#37b1f5',
  '#40494e',
  '#515dd4',
  '#e47272',
  '#cc7b94',
  '#3896e2',
  '#c3423f',
  '#d75858',
  '#747fff',
  '#64cb7b',
];

const categories = [
  ...new Set(skills.flatMap(({ category }) => category)),
].sort().map((category, index) => ({
  name: category,
  color: colors[index],
}));

export { categories, skills };
