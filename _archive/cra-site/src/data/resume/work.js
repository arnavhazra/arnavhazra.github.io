/**
 * @typedef {Object} Position
 * Conforms to https://jsonresume.org/schema/
 *
 * @property {string} name - Name of the company
 * @property {string} position - Position title
 * @property {string} url - Company website
 * @property {string} startDate - Start date of the position in YYYY-MM-DD format
 * @property {string|undefined} endDate - End date of the position in YYYY-MM-DD format.
 * If undefined, the position is still active.
 * @property {string|undefined} summary - html/markdown summary of the position
 * @property {string[]} highlights - plain text highlights of the position (bulleted list)
 */
const work = [
  {
    name: 'Gen AI Venture',
    position: 'Full-stack, AI + Machine Learning',
    url: '',
    startDate: '2023-03-01',
    endDate: '2023-10-01',
    summary: 'Drove MVP iteration at Gen AI Venture. Built a job recommender system using LLMs, Python and SQL. Integrated Langchain and GPT-4 to build a customer service chatbot. Engineered a retrieval augmented generation agent for documents using Python. Introduced a dynamic D3.js dashboard for real-time data visualization of job skill hierarchies, empowering informed decision-making. Also built a lot more cool stuff that never saw the light of day.',
    highlights: [
      'Led the development of an ML job recommender system, boosting user engagement by 25%.',
      'Pioneered Langchain and GPT-3 integration for a customer service chatbot, improving satisfaction by 50%.',
      'Improved AI system data retrieval efficiency by 30% with a retrieval augmented generation agent.',
      'Designed a D3.js dashboard for real-time data visualization, enhancing decision-making.',
      'Fostered team growth through knowledge-sharing sessions in ML, AI, and cloud computing.',
      'Streamlined deployment processes using Docker and AWS, reducing deployment time by 20%.',
    ],
  },
  {
    name: 'Deepcore AI Incubator',
    position: 'Full-stack',
    url: 'https://deepcore.jp/en/',
    startDate: '2020-09-01',
    endDate: '2021-12-01',
    summary: 'Startup incubator based out of Tokyo, JP. For the MVP, developed an AI-powered iOS app for plant image analysis using Swift and JavaScript. Transformed data into a comprehensive profile containing species details, water intake, temperature requirements, and more. Making sure plant owners do not neglect their plants with intelligent metrics.',
    highlights: [
      'Developed an AI-powered iOS app for plant image analysis, enhancing user engagement.',
      'Led modeling of data and API endpoints, improving system efficiency.',
      'Achieved a Lighthouse SEO score of 100, leading to a 20% increase in user base.',
      'Ensured data privacy through robust security measures using Firebase.',
      'Optimized app performance by 15% through efficient caching strategies.',
    ],
  },
  {
    name: 'Events Management Venture',
    position: 'Full-stack, Consulting',
    url: '',
    startDate: '2022-05-01',
    endDate: '2022-12-01',
    summary: 'Drove MVP iteration for the application UX and backend services for an events hosting app that just launched in Romania.',
    highlights: [
      'Led discussions and Figma wireframe construction for front-end innovation.',
      'Architected a ratings and reviews system, enriching user experience.',
      'Improved Google Lighthouse performance by 120% through text compression and React Lazy Load.',
      'Achieved a 15% overall app performance improvement through seamless collaboration with the back-end team.',
      'Implemented A/B testing, resulting in a 10% increase in user retention.',
      'Introduced a feedback system, contributing to a 30% increase in user satisfaction.',
    ],
  },
];
export default work;
