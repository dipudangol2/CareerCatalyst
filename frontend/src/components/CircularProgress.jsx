import React from 'react';

const CircularProgress = ({ progress = 0, size = 150, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const resumeData= JSON.parse(localStorage.getItem("resumeData"));

  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <svg
        width={size}
        height={size}
        style={{ transform: 'rotate(-90deg)' }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="none"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#00ff88"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.4s ease' }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'text-primary',
          fontSize: '1.5rem',
          fontFamily: 'Arial',
        }}
      >
        {Math.round(progress)}%
      </div>
      <div className=' mt-2'>
                <p className='text-textColor-secondary'>{resumeData['overall_score']<25?'Very poor':resumeData['overall_score']<50?'needs improvement':resumeData['overall_score']<75?'average':'Excellent'}</p>
      </div>
    </div>
  );
};

export default CircularProgress;
