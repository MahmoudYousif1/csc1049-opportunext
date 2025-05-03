import React from 'react';
import { useNavigate } from 'react-router-dom';
import transition from '../components/transition';

function Home() {
  const navigate = useNavigate();
  
  const months = [
    {
      name: 'OCTOBER',
      color: '#D6EDFF',
      buttonColor: '#3B82F6',
      hoverColor: '#94C5FD',
      weeks: [
        { week: '1 October - 7 October', content: 'Introduction to blog + Research & brainstorming project ideas.', link: '/october/week-1' },
        { week: '8 October - 14 October', content: 'Ascertained on an idea and arranged a meeting with supervisor Michael Scriney.', link: '/october/week-2' },
        { week: '15 October - 21 October', content: 'Designed the project proposal form and submitted the relevant files to GitLab.', link: '/october/week-3' },
        { week: '22 October - 31 October', content: 'Prepared for project proposal demonstration + project idea accepted.', link: '/october/week-4' },
      ],
    },
    {
      name: 'NOVEMBER',
      color: '#e8f5e9',
      buttonColor: '#c8e6c9',
      hoverColor: '#a5d6a7',
      weeks: [
        { week: '1 November - 7 November', content: 'Commenced writing the first half of the Functional Specifications document.', link: '/november/week-1' },
        { week: '8 November - 14 November', content: 'Completed the second half of the Functional Specifications document and reviewed it.', link: '/november/week-2' },
        { week: '15 November - 21 November', content: 'Started creating wireframes and UI designs for the project.', link: '/november/week-3' },
        { week: '22 November - 30 November', content: 'Finalized UI/UX design and prepared for project development.', link: '/november/week-4' },
      ],
    },
    {
      name: 'DECEMBER',
      color: '#f3e5f5',
      buttonColor: '#e1bee7',
      hoverColor: '#ce93d8',
      weeks: [
        { week: '22 December - 31 December', content: 'Assignments, exams, and project setup', link: '/december/week-4' },
      ],
    },
    {
      name: 'JANUARY',
      color: '#fff3e0',
      buttonColor: '#ffcc80',
      hoverColor: '#ffb74d',
      weeks: [
        { week: '1 January - 7 January', content: 'Project restructuring and homepage setup', link: '/january/week-1' },
        { week: '8 January - 14 January', content: 'Revamped homepage and improved authentication', link: '/january/week-2' },
        { week: '15 January - 21 January', content: 'Enhanced UI components and authentication', link: '/january/week-3' },
        { week: '22 January - 31 January', content: 'Finalizing UI & User Experience', link: '/january/week-4' },
      ],
    },
    {
      name: 'FEBRUARY',
      color: '#e1f5fe',
      buttonColor: '#81d4fa',
      hoverColor: '#4fc3f7',
      weeks: [
        { week: '1 February - 7 February', content: 'Job posting data integration & database updates.', link: '/february/week-1' },
        { week: '8 February - 14 February', content: 'Implemented and tested new features.', link: '/february/week-2' },
        { week: '15 February - 21 February', content: 'UI/UX improvements and API enhancements.', link: '/february/week-3' },
        { week: '22 February - 28 February', content: 'Documentation and final testing.', link: '/february/week-4' },
      ],
    },
  ];

  return (
    <div style={{ padding: '80px', fontFamily: 'Oxanium', lineHeight: '4rem' }}>
      {months.map((month, index) => (
        <div key={index} style={{ marginBottom: '40px' }}>
          <h1 style={{ textAlign: 'left', color: '#333', fontSize: '1.8rem', fontWeight: 'bold'}}>{month.name}</h1>
          {month.weeks.map((week, weekIndex) => (
            <div
              key={weekIndex}
              onClick={() => navigate(week.link)}
              style={{
                width: '100%',
                padding: '20px',
                marginBottom: '20px',
                boxSizing: 'border-box',
                backgroundColor: month.color,
                borderRadius: '8px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = month.hoverColor}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = month.color}
            >
              <h2 style={{ margin: '0 0 8px', fontSize: '1rem' }}>{week.week}</h2>
              <p style={{ marginBottom: '8px', fontSize: '0.9rem' }}>{week.content}</p>
              <hr style={{ borderTop: '1px solid #ccc', marginTop: '16px' }} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default transition(Home);
