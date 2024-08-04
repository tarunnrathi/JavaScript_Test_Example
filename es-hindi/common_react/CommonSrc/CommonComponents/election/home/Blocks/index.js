import dynamic from 'next/dynamic';
const ResultBlock = dynamic(() => import('./ResultBlock'));
const ResultHeadBlock = dynamic(() => import('./ResultHeadBlock'));
const LSHeadBlock = dynamic(() => import('./LSHeadBlock'));

const Blocks = ({ type, ...props }) => {
  switch (type) {
    case 'result': {
      return <ResultBlock {...props} />;
    }
    case 'resultDetail': {
      return <ResultHeadBlock {...props} />;
    }
    case 'LSHead': {
      return <LSHeadBlock {...props} />;
    }
    default: {
      return null;
    }
  }
};

export default Blocks;
